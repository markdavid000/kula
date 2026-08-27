import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { cn } from "@/lib/cn";

export interface Vendor {
  readonly name: string;
  /** Pre-formatted for display, e.g. "Meals from ₦2,200+". */
  readonly priceFrom: string;
  readonly href: Route;
  readonly image?: { readonly src: string; readonly alt: string };
}

/**
 * Vendor tile from the design (Figma node 206:2255).
 *
 * The export pins this at 360px; here it fills its grid track instead so the
 * same component works from 360px phones up to the 1440px canvas.
 */
export function VendorCard({
  vendor,
  className,
  priority = false,
}: {
  vendor: Vendor;
  className?: string;
  /** Set on above-the-fold cards so their image is preloaded, not lazy-loaded. */
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        // `relative` anchors the stretched link below.
        "bg-peach border-ink-soft relative flex flex-col gap-6 rounded-[28px] border p-5",
        "transition-transform duration-200 ease-(--ease-out-soft) hover:-translate-y-1",
        // The link fills the card, so surface its focus ring on the card itself.
        "focus-within:outline-brand focus-within:outline-3 focus-within:outline-offset-2",
        className,
      )}
    >
      <div className="bg-peach-soft relative aspect-[320/122] overflow-hidden rounded-2xl">
        {vendor.image ? (
          <Image
            src={vendor.image.src}
            alt={vendor.image.alt}
            fill
            // Two columns from `md`, three from `lg`, full width below that.
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={priority}
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-ink-soft text-[clamp(19px,1.9444vw,28px)] leading-none">
          {/*
            The whole card is clickable via this stretched link: one tab stop
            and one accessible name, instead of a separate "View" link that
            screen readers announce out of context.
          */}
          <Link
            href={vendor.href}
            // The card draws the focus ring (focus-within above); suppress the
            // link's own so they don't stack.
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {vendor.name}
          </Link>
        </h3>

        <div className="flex items-center justify-between gap-3">
          <span className="bg-peach-soft text-ink rounded-full px-2.5 py-1.5 text-sm font-semibold">
            {vendor.priceFrom}
          </span>
          <span aria-hidden="true" className="text-ink text-sm font-medium underline">
            View
          </span>
        </div>
      </div>
    </article>
  );
}
