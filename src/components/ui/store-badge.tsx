import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * An app-store badge.
 *
 * The design draws these as flat artwork on four different plates (264:2796 on
 * the Featured Vendors panel, 264:3051 and 264:3070 in the footer, 441:6825 on
 * Riders), so the plate itself stays at the call site and only the geometry,
 * the anchor and the interaction live here.
 *
 * DIRECTED — the design attaches no destination and no states. These are real
 * links now, so they are anchors rather than spans: that is what earns the
 * pointer cursor, keyboard focus and middle-click, none of which a <span> gets.
 *
 * The hover borrows the button's language. Every badge carries a hard offset
 * shadow, so hovering lifts the badge off it (moving up-left as the shadow
 * grows) and pressing lands it back down. The shadow colour differs per plate,
 * so the call site passes both rest and hover shadows.
 */
export const storeBadgeBase = cn(
  "flex h-14 w-[197px] items-center gap-1.5 rounded-[120px] px-6 py-2.5",
  "cursor-pointer transition-[transform,box-shadow] duration-200 ease-out",
  "motion-reduce:transition-none",
  "hover:-translate-x-px hover:-translate-y-px",
  "active:translate-x-px active:translate-y-px",
);

export function StoreBadgeLink({
  href,
  icon,
  iconWidth,
  iconHeight,
  eyebrow,
  name,
  className,
  labelClassName,
}: {
  href: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  eyebrow: string;
  name: string;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // The two lines read as one label to a screen reader.
      aria-label={`${eyebrow} ${name}`}
      className={cn(storeBadgeBase, className)}
    >
      <Image src={icon} alt="" width={iconWidth} height={iconHeight} className="shrink-0" />
      {/* itemSpacing -4 in the design, so the two lines overlap by 4px. */}
      <span aria-hidden className={cn("flex flex-col -space-y-1", labelClassName)}>
        <span className="font-sans text-[12px] leading-5 tracking-[-0.15px]">{eyebrow}</span>
        <span className="font-sans text-[clamp(16px,1.3889vw,20px)] leading-[1] font-semibold tracking-[-0.0075em]">
          {name}
        </span>
      </span>
    </a>
  );
}
