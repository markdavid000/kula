import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

interface SectionProps {
  /**
   * Rendered as the section's accessible name. Every landmark section should
   * have one so screen-reader users can navigate between them; pass
   * `titleVisuallyHidden` when the design has no visible heading.
   */
  title: string;
  titleVisuallyHidden?: boolean;
  /** Anchor target, also used to associate the section with its heading. */
  id: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  title,
  titleVisuallyHidden = false,
  id,
  eyebrow,
  description,
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-24", className)}>
      <Container>
        <div className={cn(titleVisuallyHidden ? "sr-only" : "max-w-2xl")}>
          {eyebrow ? (
            <p className="text-brand mb-3 text-sm font-semibold tracking-wide uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 id={headingId} className="text-4xl">
            {title}
          </h2>
          {description ? <p className="text-muted mt-4 text-lg">{description}</p> : null}
        </div>
        <div className={cn(titleVisuallyHidden ? undefined : "mt-14")}>{children}</div>
      </Container>
    </section>
  );
}
