import Image from "next/image";

import { cn } from "@/lib/cn";
import { steps, type Step } from "@/content/home";

/**
 * Get your order in 3 easy steps — Figma node 264:2842 (1440 x 1328, page y
 * 4731).
 *
 * Two lemon panels stacked: a 720-tall "Head" whose top corners are rounded to
 * 1000px — which the browser clamps to a true dome at the canvas width — and a
 * flat 608-tall block beneath it holding the cards. The heading and the arrow
 * paint over both.
 *
 * The design overlaps the band above by 4px (Variety of meals ends at page y
 * 4735, this starts at 4731), hence the negative top margin.
 *
 * The dome's radius is written as `50% 100%` rather than 1000px so it stays a
 * dome at any width. At 1440 the two are identical: a 1000px radius on a
 * 1440 x 720 box clamps to 720 x 720, which is exactly 50% of the width and
 * 100% of the height.
 *
 * HOW IT RESPONDS
 *
 * The two lemon panels stay exactly what they are — a dome over a flat block —
 * and only their heights move, with the flat block anchored to the section's
 * bottom so the pair always covers the section however tall the content makes
 * it. Above `canvas` the cards are the design's row of three; below it they
 * stack, and the arrow that points into the row is re-aimed rather than
 * dropped: in a column the card it points at is the one directly beneath.
 */

/** 224:2981 / 224:2987 / 224:2993 — 411 x 434, radius 28, 1px ink. */
function StepCard({ step }: { step: Step }) {
  return (
    <li
      className={cn(
        "bg-lemon inset-ring-ink w-full max-w-[411px] shrink-0",
        "relative overflow-hidden rounded-[28px] inset-ring-1",
        "canvas:h-[434px] canvas:w-[411px]",
      )}
    >
      {/*
        The illustration panel is full-bleed and 309 tall; the artwork itself is
        329 tall and sits 4px above it, so the panel crops the top and bottom.
      */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          // 309 as drawn; shorter on a narrow card so the panel keeps its
          // proportion to the text beneath it rather than towering over it.
          "h-[clamp(196px,21.4583vw,309px)]",
          step.surface,
        )}
      >
        {/*
          The artwork is 329 tall against a 309 panel and 4px proud at the top,
          so the panel crops it — the design's own full-bleed crop. Below the
          canvas the crop is centred instead of top-anchored, which keeps the
          subject in frame as the panel shortens.
        */}
        <Image
          src={step.image}
          alt=""
          width={411}
          height={329}
          className="canvas:top-[-4px] canvas:translate-y-0 absolute top-1/2 left-1/2 h-[329px] w-[411px] max-w-none -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/*
        224:2984 — inset 20 from the card, gap 12. At the canvas the card's fixed
        434 height leaves room under the text; below it the card hugs its
        content, so the bottom inset has to be explicit or the copy sits on the
        border.
      */}
      <div className="canvas:pb-0 flex flex-col gap-3 px-5 pt-4 pb-6">
        {/* Gelica Black 24/28.44. */}
        <h3 className="text-near-black text-[clamp(18px,1.6667vw,24px)] leading-[1.185] font-extrabold">
          {step.title}
        </h3>
        {/* Inter 16/23, -0.3. */}
        <p className="text-stone font-sans text-[16px] leading-[23px] tracking-[-0.3px]">
          {step.body}
        </p>
      </div>
    </li>
  );
}

export function ThreeSteps() {
  return (
    <section
      /*
       * The footer's "How it Works" link (src/content/footer.ts) targets this
       * section — the design's own equivalent. The design attaches no href to
       * that label, so the destination is authored either way.
       */
      id="how-it-works"
      aria-labelledby="three-steps-heading"
      // Below the canvas, room between the meal strip and the arch: the design's 185
      // there is lost once the layout stacks, which left the steps' eyes 34-60px
      // under the dishes. At the canvas the -1 seam overlap is as drawn.
      className="canvas:h-[1328px] canvas:-mt-1 relative mt-[clamp(40px,8vw,115px)]"
    >
      {/* 224:2978 — the dome. */}
      <div
        aria-hidden
        className="bg-lemon absolute inset-x-0 top-0 h-[clamp(240px,50vw,720px)]"
        style={{ borderTopLeftRadius: "50% 100%", borderTopRightRadius: "50% 100%" }}
      />
      {/*
        224:2980 — the flat block the cards sit on. Anchored to the section's
        bottom rather than given the design's 608, so it always meets the dome
        above and the section edge below however tall the cards make it. At the
        canvas the section is 1328 and the dome 720, so this resolves to exactly
        the design's 608.
      */}
      <div className="bg-lemon absolute inset-x-0 top-[clamp(240px,50vw,720px)] bottom-0" />

      {/*
        Everything below is positioned against the section itself. This wrapper
        carries no padding at the canvas and starts at the section's top edge,
        so the design's absolute offsets still resolve exactly where they did.
      */}
      {/*
        Below the canvas the eyes are the first thing in the flow, so without top
        padding they sat at the dome's very top edge, where the dome has no
        width yet and their corners hung out over the cream. The padding drops
        them to where the dome is wide enough to hold them, with room to spare,
        and it grows with the dome. At the canvas everything here is absolute.
      */}
      <div className="canvas:px-0 canvas:pt-0 canvas:pb-0 relative px-(--spacing-gutter) pt-[clamp(32px,6vw,72px)] pb-16">
        {/*
        224:2979 — sized to its render bounds (325.95 x 214.68), which run 13px
        past the node box because the eye outlines overhang it.

        Centred rather than pinned to the design's x of 557. The two are the same
        thing at 1440 (720 - 325.95/2 = 557.03), but a fixed left drifts as the
        window widens — it was 240px off the section's centre at 1920 while the
        heading and cards stayed centred.
      */}
        <Image
          aria-hidden
          src="/icons/steps-eyes.svg"
          alt=""
          width={326}
          height={215}
          /*
          DIRECTED — not in the design, which draws one fixed state.

          The reference recording alternates between two states that are exact
          horizontal mirrors of each other (measured: the pupils sit at -159.4°
          and -20.6° at an identical radius, and 180 - 159.4 = 20.6), snapping
          instantly and dwelling 1.5s in each. So the whole graphic flips.

          Tailwind's `-translate-x-1/2` writes the `translate` property while the
          animation writes `transform`; they are separate properties and compose,
          so the centring survives the flip.
        */
          className="motion-safe:animate-eyes-dart canvas:absolute canvas:top-[195px] canvas:left-1/2 canvas:mx-0 canvas:-translate-x-1/2 mx-auto block h-[clamp(84px,14.9083vw,214.68px)] w-[clamp(128px,22.6354vw,325.95px)]"
        />

        {/*
        224:3001 — Gelica Bold 88/104.28, centred, over a hard Orange shadow.

        Below the canvas the measure is clamp(320px, 72vw, 868px), not 868. The
        dome narrows towards its top, and at tablet widths an 868 measure let the
        heading set on one line wider than the dome at that height, so its ends
        ran out onto the cream. 72vw keeps it to two lines that sit inside the
        curve; 320 keeps a phone at its current two lines. The lines are balanced
        below the canvas so the second is never a lone "steps"; at the canvas
        the design's own break holds (see the note on text-wrap in globals.css).
        Two lines at the canvas width, which is why the box is 208 tall. `z-20`
        keeps it over the arrow, which is the design's own paint order.
      */}
        <h2
          id="three-steps-heading"
          className="text-ink canvas:absolute canvas:top-[490px] canvas:left-1/2 canvas:mt-0 canvas:w-[868px] canvas:max-w-none canvas:-translate-x-1/2 max-canvas:text-balance relative z-20 mx-auto mt-6 w-full max-w-[clamp(320px,72vw,868px)] text-center text-[clamp(34px,6.1111vw,88px)] leading-[1.185] font-bold drop-shadow-[0_4px_4px_#EA5220]"
        >
          {steps.heading}
        </h2>

        {/*
        224:3000 — placed at its render bounds (255.42, 586.73, 238.64 x 204.80)
        rather than its bounding box: the node carries a rotate-and-reflect
        transform, so Figma's box is the AABB of the untransformed frame and
        overstates the painted width by 39px.

        DIRECTED: positioned so the tail meets the start of the "y" descender in
        "your", measured off the rendered glyph at (497.5, 591.5). The design's
        own x cannot be used directly — the heading is set in the substituted
        face, which sets that line ~100px narrower, so every letter falls
        somewhere different. The tail sits 234.6px into the artwork, hence the
        offset. Expressed from the section's centre rather than its left so it
        stays locked to the heading, which is centred too.

        Below `canvas` it is re-aimed rather than dropped: once the cards stack,
        the card it points into is the one directly beneath the heading, so it
        sits centred under the heading and leads the eye straight down into it.
      */}
        <Image
          aria-hidden
          src="/icons/steps-arrow.svg"
          alt=""
          width={239}
          height={205}
          className="canvas:absolute canvas:top-[591.5px] canvas:left-[calc(50%-457.15px)] canvas:mx-0 canvas:mb-0 canvas:h-[204.8px] canvas:w-[238.64px] relative z-10 mx-auto -mb-4 block h-auto w-[clamp(104px,16.5722vw,238.64px)] max-w-none"
        />

        {/*
        224:2981 … 224:2993.

        DIRECTED: centred with an even gap. The design hand-places these at x
        101, 536 and 976 — gaps of 24 and 29, and a row centred on 744 against
        the canvas centre of 720. Centring the group and settling on the design's
        own 24px gap makes it symmetric; the row is then 1281 wide against 1286.
      */}
        <ul className="canvas:absolute canvas:inset-x-0 canvas:top-[807px] canvas:mt-0 canvas:flex canvas:h-[434px] canvas:flex-row canvas:items-stretch canvas:justify-center relative z-10 mx-auto mt-8 grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.cards.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
        </ul>
      </div>
    </section>
  );
}
