import Link from "next/link";

import { cn } from "@/lib/cn";
import type { PrimaryNavItem } from "@/lib/site";

/**
 * A single header navigation item.
 *
 * Figma `Component 4 / 8 / 9 / 10 / 12` (224:2830, 224:2855, 224:2858,
 * 224:2861, 224:2872). Each is a fixed-width, 24px-tall box with its label
 * centred inside; the boxes butt up against one another with no gap.
 *
 * The design ships no hover, active or current-page state for these. The nav
 * items are component INSTANCES, so a hover variant may exist in the component
 * set, but that lives outside the page frames and could not be fetched.
 *
 * DIRECTED — the hover ring is authored from a supplied reference: a hand-drawn
 * scalloped ellipse around the label. It is generated as a sine-modulated
 * ellipse rather than drawn by hand, so the ripples stay even. It rides on a
 * pseudo-element-style span so it can scale independently of the label, and it
 * is `preserveAspectRatio="none"` so one file fits every label width.
 *
 *
 * `aria-current` is still set — it is what tells assistive tech which page you
 * are on, and it has no visual weight.
 */
export function NavLink({
  item,
  active,
  className,
}: {
  item: PrimaryNavItem;
  active: boolean;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      style={{ width: item.width }}
      className={cn(
        "text-ink group relative block h-6 text-center text-[16px] leading-6 font-normal tracking-[-0.08px]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 h-[44px] w-[calc(100%-8px)]",
          "-translate-x-1/2 -translate-y-1/2 bg-[length:100%_100%] bg-no-repeat",
          "bg-[url('/icons/nav-hover-squiggle.svg')]",
          "scale-90 opacity-0 transition-[opacity,transform] duration-300 ease-out",
          "group-hover:scale-100 group-hover:opacity-100",
          "group-focus-visible:scale-100 group-focus-visible:opacity-100",
          "motion-reduce:transition-none",
        )}
      />
      <span className="relative">{item.label}</span>
    </Link>
  );
}
