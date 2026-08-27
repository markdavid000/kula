"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { cn } from "@/lib/cn";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "bg-forest inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold text-white",
        "shadow-[inset_0_0_0_2px_var(--color-forest),-2px_3px_0_0_var(--color-forest)]",
        "disabled:opacity-60",
      )}
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

const fieldClass =
  "border-ink/20 bg-cream w-full rounded-2xl border px-4 py-3 text-base placeholder:text-muted/70";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/*
        Errors are announced rather than only coloured — a sighted-only error
        state is invisible to screen readers (WCAG 3.3.1).
      */}
      <div aria-live="polite" className="sr-only">
        {state.message}
      </div>

      {state.status === "error" && state.message ? (
        <p className="border-brand bg-brand/10 text-ink rounded-2xl border px-4 py-3 text-sm">
          {state.message}
        </p>
      ) : null}

      {state.status === "success" ? (
        <p className="border-forest bg-forest/10 rounded-2xl border px-4 py-3 text-sm">
          Thanks — we&apos;ve got your message and will be in touch.
        </p>
      ) : null}

      <Field
        label="Name"
        name="name"
        placeholder="Tell us your name"
        autoComplete="name"
        error={state.fieldErrors?.name}
      />
      <Field
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email address"
        autoComplete="email"
        error={state.fieldErrors?.email}
      />
      <Field
        label="Message"
        name="message"
        placeholder="Write your message here"
        error={state.fieldErrors?.message}
        multiline
      />

      {/* Honeypot — hidden from users, irresistible to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  error,
  multiline = false,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          className={fieldClass}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          className={fieldClass}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      )}
      {error ? (
        <p id={errorId} className="text-brand text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
