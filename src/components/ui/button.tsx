import Link from "next/link";
import type { Route } from "next";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary";

/**
 * Shared visual contract for buttons and button-styled links.
 *
 * Transcribed from Figma component `Button` (148:7465): a 40px-radius pill with
 * a 2px white border, a hard un-blurred shadow offset -2px/+3px in the fill
 * colour, and 14/24 padding.
 *
 * The design ships no hover, focus, active or disabled state for this component.
 *
 * DIRECTED — hover and active are authored. The motion is built out of the one
 * thing the design does give us: the hard un-blurred shadow offset -2/+3. On
 * hover the button lifts away from that shadow (it deepens to -4/+5 and the
 * button moves the opposite way, up and right), and on press it lands on it
 * (shadow collapses to -1/+1 and the button moves down into the gap). Nothing
 * resizes, so no neighbouring layout moves.
 *
 * `:focus-visible` is applied globally in globals.css (WCAG 2.4.7).
 */
const base = cn(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[40px] border-2 px-6 py-3.5",
  "text-[16px] leading-6 font-semibold tracking-[-0.5px] whitespace-nowrap",
  "transition-[transform,box-shadow,background-color,color] duration-200 ease-out",
  "motion-reduce:transition-none",
  "disabled:pointer-events-none disabled:opacity-50",
);

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-forest border-white text-white",
    "shadow-[-2px_3px_0_0_var(--color-forest)]",
    "hover:-translate-y-[2px] hover:translate-x-[2px] hover:shadow-[-4px_5px_0_0_var(--color-forest)]",
    "active:translate-x-0 active:translate-y-[1px] active:shadow-[-1px_1px_0_0_var(--color-forest)]",
  ),
  /*
   * NOT FROM FIGMA. No secondary button appears in any of the six frames; this
   * is carried over from the earlier export for the pages not yet rebuilt.
   * Delete it once nothing references `variant="secondary"`.
   */
  secondary: cn("border-ink text-ink", "hover:bg-ink hover:text-cream", "active:translate-y-[1px]"),
};

/** Figma `arrow-forward` (148:4647) — a 16.875 x 15.75 glyph in a 24 x 24 box. */
function ArrowForward() {
  return <Icon src="/icons/arrow-forward.svg" size={24} insetY={17.19} insetX={14.84} />;
}

interface CommonProps {
  variant?: ButtonVariant;
  /** Trailing arrow, shown by default on CTAs as in the design. */
  showArrow?: boolean;
  /**
   * Replaces the arrow. The design reuses this component with a different
   * trailing glyph in places — a location pin on "Find a Location" (264:2933).
   */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  showArrow = true,
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...props}>
      {children}
      {icon ?? (showArrow ? <ArrowForward /> : null)}
    </button>
  );
}

/**
 * Internal links are checked against the real route table by `typedRoutes`;
 * external ones are free-form but must opt in explicitly, which is what earns
 * them the new tab and the `noopener` rel.
 */
export type ButtonLinkProps = CommonProps &
  ({ href: Route; external?: false } | { href: string; external: true });

/**
 * A link that looks like a button.
 *
 * Deliberately a separate component rather than a polymorphic `as` prop: an
 * anchor and a button have different semantics, keyboard behaviour and
 * attributes, and collapsing them tends to produce inaccessible hybrids.
 */
export function ButtonLink(props: ButtonLinkProps) {
  const { variant = "primary", showArrow = true, icon, className, children } = props;
  const classes = cn(base, variants[variant], className);
  const arrow = icon ?? (showArrow ? <ArrowForward /> : null);

  if (props.external) {
    return (
      <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={props.href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
