"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

interface CarouselProps {
  /** Names the region, e.g. "Featured vendors". */
  label: string;
  /** Positioning for the carousel as a whole — the design's own placement. */
  className?: string;
  /**
   * The scrolling viewport. Where the track carries a horizontal inset, this
   * must also carry a matching `scroll-p*`: scroll-snap aligns a card to the
   * scrollport edge, which ignores padding, so without it the resting position
   * skips the inset and the first card sits flush against the edge.
   */
  viewportClassName?: string;
  /** The track. Children are the `<li>` cards. */
  listClassName?: string;
  children: ReactNode;
}

/**
 * A card carousel.
 *
 * DIRECTED — the design draws a static row of cards clipped by its panel and
 * specifies no interaction. The resting composition is unchanged: the same cards
 * at the same size and gap, clipped at the same width. What is added is the
 * ability to move through them.
 *
 * Built on a native scroll container rather than a transform-driven track. That
 * gives touch-drag, trackpad swipe, keyboard arrows and native scroll snapping
 * for free, and it degrades to exactly the previous behaviour with JavaScript
 * off — the buttons are the only part that needs JS, and they are hidden until
 * the effect confirms there is somewhere to scroll.
 *
 * One card plus one gap is the step, measured off the rendered cards rather than
 * hard-coded, so it stays right at every breakpoint.
 */
export function Carousel({
  label,
  className,
  viewportClassName,
  listClassName,
  children,
}: CarouselProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [scrollable, setScrollable] = useState(false);

  const sync = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    /*
      The buttons answer "is there meaningfully more to see", not "is scrollLeft
      exactly at the maximum". A smooth `scrollBy` can settle a few pixels short
      of the end and refuse to go further — fractional card widths and snap
      settling both cause it — so an exact comparison leaves Next enabled with
      nothing left to reveal. SLACK is well under the 24px gap between cards, so
      it can never hide a real one.
    */
    const SLACK = 8;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > SLACK);
    setAtStart(el.scrollLeft <= SLACK);
    setAtEnd(el.scrollLeft >= max - SLACK);
  }, []);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    for (const child of el.querySelectorAll(":scope > ul > li")) ro.observe(child);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const page = (direction: -1 | 1) => {
    const el = viewport.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(":scope > ul > li");
    const first = items[0];
    const second = items[1];
    // Card width plus the real gap, read off the DOM rather than assumed.
    const step = first
      ? second
        ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
        : first.getBoundingClientRect().width
      : el.clientWidth;
    el.scrollBy({
      left: step * direction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const control = cn(
    "pointer-events-auto absolute top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center",
    "bg-paper text-ink inset-ring-ink cursor-pointer rounded-full inset-ring-1",
    "shadow-[2px_2px_0_0_var(--color-ink)]",
    "transition-[transform,box-shadow,opacity] duration-200 ease-out motion-reduce:transition-none",
    "hover:-translate-y-[calc(50%+1px)] hover:shadow-[3px_3px_0_0_var(--color-ink)]",
    "active:translate-y-[calc(-50%+1px)] active:shadow-[1px_1px_0_0_var(--color-ink)]",
    // Kept in the layout when unavailable so the row does not shift.
    "disabled:pointer-events-none disabled:opacity-0",
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
    >
      <div
        ref={viewport}
        // Focusable so the region can be scrolled with the arrow keys, which is
        // the keyboard path through the cards.
        tabIndex={0}
        className={cn(
          /*
            Proximity, not mandatory. Mandatory forces a rest on a snap point,
            and where a card is wider than the snapport — which it is on a phone,
            once the scroll padding is taken off a 350px viewport — the browser
            clamps instead, leaving the last few pixels of the track unreachable
            and the Next button permanently enabled. Proximity assists a drag
            without ever holding the track short of its end. The buttons page by
            an exact card-plus-gap, so the crisp stepping comes from them.
          */
          "snap-x snap-proximity overflow-x-auto overscroll-x-contain",
          // The native bar would sit under the cards and is not in the design.
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          viewportClassName,
        )}
      >
        {/*
          Every card snaps to the viewport's start edge, EXCEPT the last, which
          snaps to the end. With `snap-start` on all of them the final snap
          position is the last card's left edge, so the track can never scroll
          the last few pixels to its true end — the trailing padding stays
          unreachable and the Next button never disables. Letting the last card
          snap to the end makes the end a legal resting place.
        */}
        <ul className={cn("[&>li]:snap-start [&>li:last-child]:snap-end", listClassName)}>
          {children}
        </ul>
      </div>

      {scrollable ? (
        <>
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label={`Previous ${label.toLowerCase()}`}
            className={cn(control, "left-3")}
          >
            {/* The design ships only a forward arrow; back is the same glyph turned. */}
            <Icon
              src="/icons/arrow-forward.svg"
              tint
              className="rotate-180"
              size={24}
              insetY={17.19}
              insetX={14.84}
            />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label={`Next ${label.toLowerCase()}`}
            className={cn(control, "right-3")}
          >
            <Icon src="/icons/arrow-forward.svg" tint size={24} insetY={17.19} insetX={14.84} />
          </button>
        </>
      ) : null}
    </div>
  );
}
