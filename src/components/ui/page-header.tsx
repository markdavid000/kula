import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

/** Consistent opening block for every non-home page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <Container className="py-20">
      {eyebrow ? (
        <p className="text-brand mb-3 text-sm font-semibold tracking-wide uppercase">{eyebrow}</p>
      ) : null}
      <h1 className="max-w-3xl text-6xl">{title}</h1>
      {description ? <p className="text-muted mt-5 max-w-prose text-lg">{description}</p> : null}
      {children}
    </Container>
  );
}
