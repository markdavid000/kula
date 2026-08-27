"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface CardStackProps {
  children: ReactNode;
  /** Layout for the track that holds the cards. */
  className?: string;
  /**
   * Where the first card comes to rest, in px. The header is fixed AND its wave
   * overhangs its own box — the box is 100 tall but paints to 118 — so this has
   * to clear 118, not 100, or the card tucks under the wave with no gap.
   */
  stickTop?: number;
  /** How far each successive card rests below the one before it. */
  step?: number;
  /**
   * Sizes the box that gets scaled. It must match the card's own width: the
   * scale runs from `origin-top` (top CENTRE), so a box wider than the card
   * shrinks it toward the track's centre instead of its own, and the stacked
   * edges stop lining up.
   */
  cardClassName?: string;
  /** How much a card shrinks once fully covered. */
  shrink?: number;
  /**
   * How far the finished stack holds before it scrolls away, in px. This is the
   * ONLY scroll room the track adds.
   *
   * The last card needs no extra room to reach its resting place. A sticky
   * element is bounded by its containing block's content box, so the last card
   * pins exactly when the track's own content ends — the cards' combined height
   * is already the whole requirement. Anything beyond `hold` is dead space
   * between the finished stack and whatever follows.
   */
  hold?: number;
}

/**
 * Cards that stack as the page scrolls.
 *
 * DIRECTED — not in the design, which draws the three panels as a plain column.
 * Each card pins in turn and the next slides over it; covered cards scale down
 * slightly and rest a few pixels lower, so their top edges show as a stack.
 *
 * `position: sticky` does the pinning. Every card shares one track, so each
 * stays pinned until the track's bottom edge reaches it and then they all leave
 * together — which is what makes them pile up rather than hand off one at a
 * time. Nothing here works if an ancestor sets `overflow: hidden`.
 *
 * The scale is driven from a scroll listener rather than
 * `animation-timeline: view()`. The CSS version needs no JavaScript, but Firefox
 * has not shipped it, and this is the whole point of the section rather than a
 * flourish. The listener is passive and coalesced into one rAF, and it reads
 * geometry it already has, so it stays off the critical path.
 *
 * Under `prefers-reduced-motion` the scaling is skipped entirely and the cards
 * simply stack — the sticky behaviour is layout, not animation.
 */
export function CardStack({
  children,
  className,
  stickTop = 144,
  step = 24,
  cardClassName,
  shrink = 0.05,
  hold = 128,
}: CardStackProps) {
  const track = useRef<HTMLDivElement>(null);
  const spacer = useRef<HTMLDivElement>(null);
  const cards = Children.toArray(children);
  const count = cards.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-stack-card]"));
    if (panels.length < 2) return;

    let frame = 0;

    /* Recomputed on resize so the dwell survives a window change. */
    const measure = () => {
      if (spacer.current) spacer.current.style.height = `${hold}px`;
    };

    const apply = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      // How far the track has travelled through its own scrollable length.
      const travel = box.height - window.innerHeight;
      const progress = travel <= 0 ? 0 : Math.min(Math.max(-box.top / travel, 0), 1);

      panels.forEach((panel, index) => {
        // The last card is never covered, so it never shrinks.
        const target = 1 - (panels.length - 1 - index) * shrink;
        const from = index / panels.length;
        const local = Math.min(Math.max((progress - from) / (1 - from), 0), 1);
        panel.style.scale = String(1 + (target - 1) * local);
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    // Card heights change as fonts and images settle, which moves `need`.
    const ro = new ResizeObserver(onResize);
    panels.forEach((panel) => ro.observe(panel));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count, shrink, stickTop, step, hold]);

  return (
    <div ref={track} className={className}>
      {cards.map((card, index) => (
        <div
          key={index}
          /*
            `w-full min-w-0` is load-bearing, not decoration. Without a definite
            width the wrapper shrink-wraps to max-content, which for a card
            containing a `w-max` carousel track is far wider than the page — the
            card's own `w-full` then has nothing to resolve against and the page
            scrolls sideways.
          */
          className="sticky w-full min-w-0"
          style={{
            top: stickTop + index * step,
            // Later cards paint over earlier ones as they slide up.
            zIndex: index + 1,
          }}
        >
          <div
            data-stack-card
            // Scaling from the top keeps the stacked edges aligned; scaling from
            // the centre would pull each card away from the one above it.
            className={cn("min-w-0 origin-top will-change-transform", cardClassName)}
          >
            {card}
          </div>
        </div>
      ))}

      {/*
        Scroll room for the last card, sized by the effect. It must be a CHILD
        of the track rather than padding on it: a sticky element is bounded by
        its containing block's CONTENT box, so padding-bottom would add page
        height without extending how long a card can stay pinned.
      */}
      <div ref={spacer} aria-hidden className="w-full shrink-0" />
    </div>
  );
}
