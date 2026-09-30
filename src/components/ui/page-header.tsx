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
    /*
     * The top padding clears the fixed header: its wave band is
     * clamp(76px, 8.1944vw, 118px) tall and overlays the page, so a plain
     * py-20 put the eyebrow underneath it on a phone.
     */
    <Container className="pt-[calc(clamp(76px,8.1944vw,118px)+2.5rem)] pb-20">
      {eyebrow ? (
        <p className="text-brand mb-3 text-sm font-semibold tracking-wide uppercase">{eyebrow}</p>
      ) : null}
      <h1 className="max-w-3xl text-[clamp(36px,4.1667vw,60px)] leading-[1.1]">{title}</h1>
      {description ? <p className="text-muted mt-5 max-w-prose text-lg">{description}</p> : null}
      {children}
    </Container>
  );
}
