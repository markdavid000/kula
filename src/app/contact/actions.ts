"use server";

import { headers } from "next/headers";

import { isEmailConfigured, sendContactEmail } from "@/lib/email";
import { siteConfig } from "@/lib/site";

type Field = "name" | "email" | "message";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Per-field messages, keyed by input name. */
  fieldErrors?: Partial<Record<Field, string>>;
  /**
   * What the visitor typed, handed back on an error. React 19 resets an
   * uncontrolled form after its action returns — even when the return is a
   * validation error — so without this a typo in the email field would wipe
   * the message they had just written. The forms use these as defaultValues.
   */
  values?: Partial<Record<Field, string>>;
}

// Deliberately permissive: the only thing worth rejecting here is input that
// clearly cannot be an address. Real verification is the reply itself.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Upper bounds, so a script cannot post a novel into the inbox. */
const LIMITS = { name: 100, email: 254, message: 5000 } as const;

/**
 * At most RATE_MAX messages per address per window. In memory, so it is per
 * server instance and resets on deploy — a brake on a script hammering the
 * form, not a guarantee. Use a shared store (e.g. Upstash) if abuse appears.
 */
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentSends = new Map<string, number[]>();

function rateLimited(key: string, now = Date.now()): boolean {
  const recent = (recentSends.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    recentSends.set(key, recent);
    return true;
  }
  recent.push(now);
  recentSends.set(key, recent);
  // Keep the map from growing without bound on a long-lived server.
  if (recentSends.size > 5000) recentSends.clear();
  return false;
}

async function clientKey(): Promise<string> {
  try {
    const h = await headers();
    return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  } catch {
    // No request context (e.g. a unit test).
    return "unknown";
  }
}

const FALLBACK = `Sorry, we couldn't send your message just now. Please email us at ${siteConfig.contact.email} and we'll come straight back to you.`;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const values = { name, email, message };

  // Honeypot: bots fill every field, humans never see this one. Report success
  // so the bot learns nothing, and send nothing.
  if (String(formData.get("company") ?? "")) {
    return { status: "success" };
  }

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  else if (name.length > LIMITS.name)
    fieldErrors.name = "Please keep your name under 100 characters.";
  if (!EMAIL.test(email) || email.length > LIMITS.email)
    fieldErrors.email = "Please enter a valid email address.";
  if (message.length < 10) fieldErrors.message = "Please write at least a sentence.";
  else if (message.length > LIMITS.message)
    fieldErrors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  // Not configured yet: say so plainly rather than pretend. Swallowing a
  // message nobody will read is worse than pointing at the published address.
  if (!isEmailConfigured()) {
    console.warn("[contact] RESEND_API_KEY is not set; message not sent");
    return { status: "error", message: FALLBACK, values };
  }

  if (rateLimited(await clientKey())) {
    return {
      status: "error",
      message: `You've sent a few messages in a short time. Please try again in a few minutes, or email us at ${siteConfig.contact.email}.`,
      values,
    };
  }

  const result = await sendContactEmail({ name, email, message });
  if (!result.ok) {
    console.error("[contact] delivery failed:", result.reason);
    return { status: "error", message: FALLBACK, values };
  }

  return { status: "success" };
}
