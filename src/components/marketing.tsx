import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import type { Feature, Stat, Step } from "@/content/pages";
import { siteConfig } from "@/lib/site";

/** Headline metrics strip from the home page. */
export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <ul className="grid grid-cols-4 gap-6">
      {stats.map((stat) => (
        <li key={stat.label} className="border-ink/12 border-t pt-4">
          <p className="font-display text-4xl font-semibold">{stat.value}</p>
          <p className="text-muted mt-1 text-sm">{stat.label}</p>
        </li>
      ))}
    </ul>
  );
}

export function FeatureGrid({ features }: { features: readonly Feature[] }) {
  return (
    <ul className="grid grid-cols-3 gap-6">
      {features.map((feature) => (
        <li
          key={feature.title}
          className="bg-peach border-ink-soft flex flex-col gap-3 rounded-[28px] border p-7"
        >
          <h3 className="text-2xl">{feature.title}</h3>
          <p className="text-ink/75 leading-relaxed">{feature.description}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered stepper. Rendered as an ordered list so the sequence is conveyed
 * structurally, not just by the drawn numerals.
 */
export function Steps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="grid grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="border-ink/15 flex flex-col gap-3 rounded-[28px] border border-dashed p-7"
        >
          <span
            aria-hidden="true"
            className="bg-ink text-cream font-display grid size-10 place-items-center rounded-full text-lg font-semibold"
          >
            {index + 1}
          </span>
          <h3 className="text-2xl">{step.title}</h3>
          <p className="text-muted leading-relaxed">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Full-bleed call to action. The design repeats this at the foot of every page. */
export function CtaBanner({
  title,
  href,
  label,
  className,
}: {
  title: string;
  href: "/vendors" | "/riders" | "/contact";
  label: string;
  className?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className={cn("py-24", className)}>
      <Container>
        <div className="bg-ink text-cream flex flex-col items-start gap-8 rounded-[36px] px-16 py-14">
          <h2 id="cta-heading" className="text-accent max-w-2xl text-5xl">
            {title}
          </h2>
          <ButtonLink href={href}>{label}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/**
 * Contact block reproduced from the design's "Need to Reach us?" section.
 *
 * Address, phone and email are real, so they are marked up as `tel:`/`mailto:`
 * links and wrapped in an <address> element.
 */
export function ContactDetails({ children }: { children?: ReactNode }) {
  const { contact } = siteConfig;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <p className="text-ink/75 max-w-prose text-lg leading-relaxed">
          Whether you have questions about our service, need support, or want to partner with us,
          we&apos;d love to hear from you. Our team is ready to assist you with any inquiries.
        </p>

        <address className="mt-8 grid gap-6 not-italic">
          <div>
            <p className="text-muted text-sm font-semibold tracking-wide uppercase">Visit us</p>
            <p className="mt-1 text-lg">
              {contact.address}, {contact.region}
            </p>
          </div>
          <div>
            <p className="text-muted text-sm font-semibold tracking-wide uppercase">Call us</p>
            <a
              href={`tel:${contact.phoneHref}`}
              className="hover:text-brand mt-1 block py-2 text-lg"
            >
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="text-muted text-sm font-semibold tracking-wide uppercase">
              Send us a mail
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-brand mt-1 block py-2 text-lg"
            >
              {contact.email}
            </a>
          </div>
        </address>
      </div>

      {children}
    </div>
  );
}
