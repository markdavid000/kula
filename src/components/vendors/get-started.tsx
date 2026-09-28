import Image from "next/image";

import { Accordion } from "@/components/ui/accordion";

import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { vendorsGetStarted, vendorsGetStartedSteps } from "@/content/vendors-page";

/**
 * Get started as a Kula Vendor — Figma nodes 510:20070 (the heading stack, page
 * y 2556), 510:20050 "gs" (the three step cards, y 2901) and 510:20073 (the
 * framed photo, y 2777).
 *
 * The three are separate children of the page plate rather than one frame, so
 * the section reassembles them: a centred heading stack, then a two-column row
 * whose left edge is x 138 and whose right edge is x 1302 — a 138px gutter
 * either side, not the site's usual 100.
 *
 * The step cards overlap each other, by 16px and then 8px. That is drawn, not
 * an artefact: 510:20051 runs to y 3062 while 510:20058 starts at 3046. The
 * overlaps are expressed as negative margins so they survive at any width, and
 * because each card's padding and type add up to exactly the height Figma
 * reports (32 + 33 + 16 + 48 + 32 = 161, 32 + 33 + 32 = 97) the flow layout
 * reproduces the canvas composition without a single fixed height.
 */

/**
 * The step cards' three surfaces (510:20051, 510:20058, 510:20064). Deliberately
 * NOT snapped to their nearest neighbours: `--color-ice` is not `--color-sky`
 * (#a9e8ff) and `--color-lime-pale` is not `--color-lemon` (#feffa9).
 */
const stepSurfaces = ["bg-ice", "bg-lime-pale", "bg-orchid"] as const;

/** The overlap each card has with the one above it (510:20058 / 510:20064). */
const stepOverlap = ["", "-mt-4", "-mt-2"] as const;

/** Figma `arrow-forward-circle` (148:4657) — a 19.5 square glyph in a 24 box. */
function ArrowForwardCircle() {
  return (
    <Icon src="/images/vendors/arrow-forward-circle.svg" size={24} insetY={9.375} insetX={9.375} />
  );
}

export function GetStarted() {
  return (
    <section
      aria-labelledby="vendors-get-started-heading"
      className="bg-cream canvas:px-0 relative px-(--spacing-gutter) pt-[clamp(120px,22.0833vw,318px)] pb-[clamp(72px,16.4583vw,237px)]"
    >
      {/*
        `px-0` matters: the two columns below are placed by their Figma x
        on the 1440 canvas (138 and 746), and an absolute `left` is measured from
        this box's padding edge. With the small-screen 32px gutter still applied
        at the canvas width both columns would sit 32px right of the design.
      */}
      <div className="relative mx-auto w-full max-w-(--width-canvas)">
        {/* 510:20070 — vertical, cross-axis centred, gap 24, 974 wide. */}
        <div className="canvas:w-[974px] canvas:max-w-none mx-auto flex w-full max-w-[974px] flex-col items-center gap-6">
          {/* 510:20071 — Gelica Black 72/85.32, centred, over a hard Orange shadow. */}
          <h2
            id="vendors-get-started-heading"
            className="text-ink text-center text-[clamp(32px,5vw,72px)] leading-[1.185] font-extrabold tracking-normal drop-shadow-[0_4px_4px_var(--color-brand)]"
          >
            {vendorsGetStarted.heading}
          </h2>

          {/*
            510:20072 — the shared Button (148:7465) with the
            `arrow-forward-circle` glyph rather than the component's default
            `arrow-forward`. The design gives it no destination; /contact is
            where the site's other vendor CTAs go.
          */}
          <ButtonLink href="/contact" icon={<ArrowForwardCircle />}>
            {vendorsGetStarted.cta}
          </ButtonLink>
        </div>

        {/*
          The row: 715 tall at the canvas width, with the photo block pinned at
          x 746 / y 0 and the step cards at x 138 / y 124. Neither column is
          centred against the other, so both are placed rather than laid out.
        */}
        <div className="canvas:h-[715px] relative mt-[clamp(32px,3.8889vw,56px)] flex flex-col items-center gap-12">
          {/*
            510:20050 "gs" — 501 x 331.

            DIRECTED: interactive, like the other step and FAQ panels. The design
            draws step 1 open and the other two closed, with no variants for the
            states in between, so the two treatments are transcribed and the
            behaviour that moves between them is authored.
          */}
          <Accordion
            as="ol"
            className="canvas:absolute canvas:top-[124px] canvas:left-[138px] canvas:w-[501px] canvas:max-w-none relative flex w-full max-w-[501px] flex-col"
            items={vendorsGetStartedSteps.map((step, index) => ({
              id: step.title,
              question: step.title,
              answer: step.body,
              className: cn(stepSurfaces[index], stepOverlap[index]),
            }))}
            // 510:20051 is the step the design draws open.
            defaultOpen={0}
            // 32 of padding all round; the design's 16px gap to the body moves
            // onto the body so it collapses with it.
            // pb-7 on a phone: the next row overlaps this one by 8px, which left p-5's
            // 20px as 12 between the answer and the row below.
            itemClassName="relative flex flex-col rounded-[12px] p-5 pb-7 transition-[filter] duration-300 ease-out sm:p-8 motion-reduce:transition-none"
            itemClosedClassName="hover:brightness-[0.97]"
            // 510:20053 — Gelica SemiBold 28/33.18, Less black.
            questionClassName="text-ink-soft min-w-0 flex-1 text-left text-[clamp(19px,1.9444vw,28px)] leading-[1.185] font-semibold tracking-normal"
            // 510:20057 — Inter 16/24, -0.08, Grey Color, held to 364.
            answerClassName="text-grey w-full max-w-[364px] pt-4 font-sans text-[16px] leading-[24px] tracking-[-0.08px] canvas:w-[364px] canvas:max-w-none"
            icons={{
              // 510:20055 "tabler:minus" — 24 x 24, 2px round Primary Green stroke.
              open: <Image src="/images/vendors/step-minus.svg" alt="" width={24} height={24} />,
              // 510:20062 "plus" — 28 x 28, 2px round Primary Green stroke.
              closed: <Image src="/images/vendors/step-plus.svg" alt="" width={28} height={28} />,
            }}
          />

          {/*
            510:20073 — a 556 x 715 frame holding an Accent Yellow plate
            (510:20074, 524 x 683, radius 44) and the photo (510:20075, the same
            box offset 32/32, radius 32). The offsets are percentages of the
            frame so the pair keeps its exact relationship as it scales; at 556
            wide they are the design's 32px to the pixel.

            The radius lives on the image itself and nowhere else — a radius on
            both a clipping parent and its child feathers the corner.
          */}
          <div className="canvas:absolute canvas:top-0 canvas:left-[746px] canvas:w-[556px] canvas:max-w-none relative aspect-[556/715] w-full max-w-[556px]">
            <div
              aria-hidden
              className="bg-accent absolute top-0 left-0 h-[95.5245%] w-[94.2446%] rounded-[44px]"
            />
            <Image
              src="/images/vendors/get-started@2x.webp"
              alt="A Kula vendor plating a dish in their kitchen"
              width={524}
              height={683}
              className="absolute top-[4.4755%] left-[5.7554%] h-[95.5245%] w-[94.2446%] rounded-[32px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
