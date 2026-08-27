"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  /** Per-field messages, keyed by input name. */
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

// Deliberately permissive: the only thing worth rejecting client-side is input
// that clearly cannot be an address. Real verification is the confirmation mail.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Honeypot: bots fill every field, humans never see this one.
  if (String(formData.get("company") ?? "")) {
    return { status: "success" };
  }

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (message.length < 10) fieldErrors.message = "Please write at least a sentence.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  // TODO(integration): forward to the Kula inbox — drop an email provider
  // (Resend, Postmark) or a CRM call in here and return { status: "success" }.
  //
  // Until that exists we must not report success: silently swallowing a message
  // nobody will read is worse than telling the sender the truth. We degrade to
  // the published address instead, so the page stays useful either way.
  console.warn("[contact] delivery not configured; message dropped", { email });

  return {
    status: "error",
    message:
      "Our contact form isn't connected yet. Please email us at thekulaapp.info@gmail.com and we'll come straight back to you.",
  };
}
