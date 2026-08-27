import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Horizontal rhythm for the whole site.
 *
 * Measured from the design, not chosen: the 1440px canvas puts its `nav bar`
 * (264:3089) and every content frame inside a 100px gutter, giving 1240px of
 * content. At ≥1440px this reproduces that exactly.
 *
 * There is no narrower step. The design has no tablet or mobile frame, and the
 * responsive layer is being rebuilt from scratch, so this is the canvas gutter
 * at every width for now.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-(--width-canvas) px-(--spacing-gutter)", className)}>
      {children}
    </Tag>
  );
}
