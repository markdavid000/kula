import { siteConfig } from "@/lib/site";

/**
 * Delivery for the contact form, through Resend's HTTP API.
 *
 * Plain `fetch` rather than an SDK: it is one POST, and a dependency would add
 * more surface than it removes. Only ever imported from the server action, and
 * every setting is a non-`NEXT_PUBLIC_` variable, so the key never reaches the
 * browser.
 *
 *   RESEND_API_KEY      required — without it `isEmailConfigured()` is false and
 *                       the form tells senders to email us directly instead.
 *   CONTACT_TO_EMAIL    where messages land; defaults to the published address.
 *   CONTACT_FROM_EMAIL  the sender. Defaults to Resend's shared test sender,
 *                       which can only deliver to the Resend account's own
 *                       email — fine while that IS the Kula inbox. Set it to an
 *                       address on a domain verified in Resend for production.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Kula Website <onboarding@resend.dev>";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export type SendResult = { ok: true } | { ok: false; reason: string };

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Everything a visitor typed is escaped before it goes into the HTML body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * A subject line cannot carry a line break — that is how header injection
 * works — so the name is flattened and trimmed before it is used in one.
 */
function subjectSafe(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").slice(0, 80);
}

export function buildContactEmail({ name, email, message }: ContactMessage) {
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  const text = `New message from the ${siteConfig.name} website\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#071f10">
<p style="margin:0 0 16px">New message from the ${siteConfig.name} website</p>
<p style="margin:0"><strong>Name:</strong> ${escapeHtml(name)}</p>
<p style="margin:0 0 16px"><strong>Email:</strong> ${escapeHtml(email)}</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`;

  return {
    from,
    to: [to],
    // Replying in the inbox goes straight to the visitor.
    reply_to: email,
    subject: `Website message from ${subjectSafe(name)}`,
    text,
    html,
  };
}

export async function sendContactEmail(input: ContactMessage): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "not-configured" };

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(buildContactEmail(input)),
      // A hung provider must not hang the form; the sender gets the fallback.
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (response.ok) return { ok: true };

    // The body names the problem (bad key, unverified sender, …). Log it for
    // us; the visitor only ever sees the generic fallback.
    const detail = await response.text().catch(() => "");
    return { ok: false, reason: `resend ${response.status}: ${detail.slice(0, 300)}` };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}
