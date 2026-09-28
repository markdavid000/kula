"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

import { cn } from "@/lib/cn";

import { meals } from "@/content/home";

/**
 * Variety of meals — Figma node 264:2655 (1440 x 712, at page y 4023).
 *
 * A cream band holding a heading and a fanned row of eleven food circles that
 * grow toward the middle, all blurred and semi-transparent except the focal one.
 * Each circle carries an 8px white inside stroke and a #FAEEEA plate behind the
 * photo, which is what shows through at the blurred edges.
 *
 * The top margin is the cream the design leaves above it: Why Kula ends at page
 * y 3743 and this band starts at 4023.
 *
 * The circles are a fixed 1440 composition, so they live in a centred stage of
 * that width and the section clips — which is what the design frame does too
 * (`clipsContent: true`).
 *
 * HOW IT RESPONDS
 *
 * The fan is not rearranged and no circle is dropped: the stage is scaled as a
 * single object, so the row keeps its exact proportions and overlaps and simply
 * gets smaller. `--fan` drives both the scale and the band's height together,
 * so the cream never gains a gap under the row. Cropping the sides instead was
 * the alternative, and it loses half the fan on a phone; scaling keeps all
 * eleven dishes on screen at every width.
 *
 * The heading leaves the stage on narrow screens and sits in flow above it,
 * because at 1045px wide and `nowrap` it cannot do anything else.
 */
export function MealVariety() {
  /*
    Which dish is in focus. `null` means nobody is hovering, and the design's own
    focal dish holds focus. Tracking it in state rather than with CSS `:hover`
    alone is what lets the OTHER dishes — including the design's focal one — fall
    out of focus while the cursor is on a different dish, which is what the
    reference recording shows: exactly one dish is ever sharp.
  */
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="meal-variety-heading"
      className={cn(
        // Below the canvas the heading starts under the eyes, not beside them. The
        // eyes are clamp(72px, 11.7361vw, 169px) wide at 169:231, so
        // clamp(98px, 16.0417vw, 231px) tall, hanging from 51px above the
        // section; the padding is their foot plus 16. A fixed pt-16 cleared them
        // only on a phone — at laptop widths the one-line heading ran under them.
        "bg-cream canvas:pt-12 relative mt-[clamp(88px,19.4444vw,280px)] pt-[calc(clamp(98px,16.0417vw,231px)-35px)] pb-6",
        // The one number the band scales by: the stage's scale and the band's
        // height both read it, so they can never drift apart.
        // The row spans 1008px (x 179..1187). Each step is the largest scale
        // that still fits all eleven dishes in that width, so none is ever
        // cropped away — at `lg` the row fits at full design size.
        "[--fan:0.34] sm:[--fan:0.61] md:[--fan:0.74] lg:[--fan:1]",
        "canvas:h-[712px] canvas:[--fan:1] canvas:pt-0 canvas:pb-0",
      )}
    >
      {/*
        264:2664 — Gelica Black 72/85.32, centred on the canvas, over a hard
        Orange shadow offset 4px down.
      */}
      <h2
        id="meal-variety-heading"
        className="text-ink canvas:absolute canvas:top-[174px] canvas:left-1/2 canvas:w-[1045px] canvas:max-w-none canvas:-translate-x-1/2 canvas:px-0 canvas:whitespace-nowrap relative z-10 mx-auto w-full max-w-[1045px] px-5 text-center text-[clamp(32px,5vw,72px)] leading-[1.185] font-extrabold drop-shadow-[0_4px_4px_#EA5220]"
      >
        {meals.heading}
      </h2>

      {/*
        The stage is the design's canvas. Below `canvas` it is pinned to the
        section's bottom edge so the row stays in view as the heading grows;
        -149 puts the circles' baseline 40px clear of the section bottom.

        It is also nudged 37px right once cropped: the row spans 179..1187, so
        its own centre is 683 against the canvas centre of 720. At the design's
        width that offset is the design; once the sides crop away it just reads
        as the focal circle sitting off to one side.
      */}
      {/*
        The clip lives on this wrapper rather than the section, so the eyes above
        can still overhang. The stage's empty margins fall outside it, which is
        all that gets cut.
      */}
      <div
        aria-hidden
        className="canvas:absolute canvas:inset-0 canvas:mt-0 canvas:h-auto pointer-events-none relative mt-6 h-[calc(292px*var(--fan))] overflow-hidden"
      >
        {/*
          `origin-top` is `50% 0`, so the stage scales about its own centre and
          the row stays centred on the band at every scale.
        */}
        <div className="canvas:top-0 absolute top-[calc(-271px*var(--fan))] bottom-auto left-1/2 h-[712px] w-[1440px] origin-top -translate-x-1/2 scale-(--fan)">
          {meals.circles.map((circle, index) => {
            const inFocus = focused === null ? circle.sharp === true : focused === index;

            return (
              <div
                key={circle.src + circle.left}
                onPointerEnter={() => setFocused(index)}
                onPointerLeave={() => setFocused((current) => (current === index ? null : current))}
                /*
                DIRECTED — the design draws one fixed focal dish and specifies no
                interaction. Hovering any dish now makes it the focal one: it
                sharpens, comes to full opacity, grows and rises above its
                neighbours, exactly as the reference recording shows the focus
                following the cursor.

                The resting treatment is unchanged. It moves from the inline
                style to classes because an inline `filter`/`opacity` would beat
                the hover variant on specificity; `z` rides a custom property for
                the same reason. `pointer-events-auto` re-enables just the dishes
                inside a layer that is otherwise click-through.
              */
                className={cn(
                  "pointer-events-auto absolute rounded-full transition duration-300 ease-out",
                  "motion-reduce:transition-none",
                  // 264:2648-style treatment: 80% under a 12px Figma layer blur,
                  // which is half that in CSS. The focal dish has neither.
                  inFocus ? "opacity-100 blur-none" : "opacity-80 blur-[6px]",
                  // Only a dish the cursor picked grows; the design's resting
                  // focal dish is drawn at its own size.
                  focused === index ? "z-30 scale-[1.6]" : "z-(--dish-z)",
                )}
                style={
                  {
                    left: circle.left,
                    top: circle.top,
                    width: circle.size,
                    height: circle.size,
                    "--dish-z": circle.z,
                  } as CSSProperties
                }
              >
                {/* The plate colour sits under the photo and shows at the blurred rim. */}
                <span className="bg-blush absolute inset-0 rounded-full" />
                <Image
                  src={circle.src}
                  alt=""
                  width={circle.size}
                  height={circle.size}
                  className="absolute inset-0 size-full rounded-full object-cover"
                />
                {/* 8px white inside stroke. */}
                <span className="absolute inset-0 rounded-full border-8 border-white" />
              </div>
            );
          })}
        </div>
      </div>

      {/*
        264:2823 — a child of the design's parent container rather than of this
        frame, which is why it sits 51px above the section's own top edge.

        Anchored to the heading's measure rather than the window: the design has
        it overlapping the end of "order" by ~14px, and pinning it to the right
        of the viewport pulled it away as the window widened — 71px adrift at
        1600, 231px at 1920. Sharing the heading's 1045 measure keeps the overlap
        constant at every width.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[51px] z-10">
        <div className="relative mx-auto w-full max-w-[1045px]">
          {/*
            The design hangs these off the right of the heading's measure. Once
            that measure is the viewport there is no room outside it, so they
            tuck just inside the edge instead of being pushed off-screen.
          */}
          <Image
            src="/icons/meals-eyes.svg"
            alt=""
            width={169}
            height={231}
            className="canvas:-right-[157px] canvas:w-[169px] absolute right-1 h-auto w-[clamp(72px,11.7361vw,169px)] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
