import Image from "next/image";

import { Accordion } from "@/components/ui/accordion";

import { ridersFaq } from "@/content/riders-page";
import { cn } from "@/lib/cn";

/**
 * Riders FAQ — Figma node 441:6606 ("faq-section", 1440 x 1143 at page y 3856).
 *
 * The section clips and holds one 949-tall child (441:6607) centred inside it,
 * which leaves 97px of empty band above and below — nothing is actually cut off
 * here, unlike the Home panel this shares its structure with.
 *
 * The panel sets its own 80px gutter (441:6607 has paddingLeft/Right 80), not
 * the site's 100px `Container` gutter, so it lays out its own width: 1440 - 160
 * gutter - 120 gap - 480 left column leaves the list exactly 680.
 *
 * The list is drawn with exactly one row open and five closed, and the file
 * carries no interactive variants. This transcribes the static arrangement: the
 * open row is markup that is open, not a disclosure widget with a default state.
 */

export function RidersFaq() {
  return (
    <section
      aria-labelledby="riders-faq-heading"
      // 171px below the photo card above, which ends at page y 3685.
      className="bg-cream-light canvas:h-[1143px] mt-[clamp(64px,11.875vw,171px)] flex flex-col justify-center overflow-hidden"
    >
      {/* 441:6607 — horizontal, top-aligned, gap 120, padding 80/100. */}
      <div
        className={cn(
          "canvas:flex-row mx-auto flex w-full max-w-(--width-canvas) flex-col",
          "canvas:h-[949px] canvas:items-start shrink-0 items-stretch",
          "canvas:gap-[120px] canvas:px-20 canvas:py-[100px] gap-10 px-(--spacing-gutter) py-14",
        )}
      >
        {/* 441:6608 — 480 wide, vertical, gap 24. */}
        <div className="canvas:w-[480px] canvas:max-w-none flex w-full shrink-0 flex-col gap-6">
          {/*
            441:6609 "Bubbles 1" — a 240 x 122.62 decorative group of speech
            bubbles, the same artwork the Home panel uses. Vector, so it is an
            exported asset.
          */}
          <Image
            src="/icons/faq-bubbles.svg"
            alt=""
            width={240}
            height={123}
            className="canvas:h-[122.62px] h-auto w-[clamp(150px,16.6667vw,240px)] max-w-none"
          />

          {/* 441:6634 — vertical, gap 8; the design gives it a single child. */}
          <div className="flex flex-col gap-2">
            {/* 441:6635 — Gelica SemiBold 60/63, Primary Green. */}
            <h2
              id="riders-faq-heading"
              className="text-ink font-display text-[clamp(30px,4.1667vw,60px)] leading-[1.05] font-semibold"
            >
              {ridersFaq.title}
            </h2>
          </div>

          {/* 441:6636 — Inter 18/27, -0.09 tracking. */}
          <p className="text-grey-mid font-sans text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em]">
            {ridersFaq.subtitle}
          </p>
        </div>

        {/* 441:6637 "FAQ-List" — vertical, no gap between rows, 680 wide. */}
        <Accordion
          className="flex w-full flex-1 flex-col"
          items={ridersFaq.items.map((item) => ({
            id: item.node,
            question: item.question,
            answer: item.answer,
          }))}
          // 441:6638 is the row the design draws open.
          defaultOpen={0}
          itemClassName="relative flex flex-col rounded-[12px] p-8 transition-colors duration-300 ease-out motion-reduce:transition-none"
          itemOpenClassName="bg-brand"
          itemClosedClassName="hover:bg-ink/[0.03]"
          questionClassName="min-w-0 flex-1 text-[clamp(17px,1.5278vw,22px)] leading-[1.2] tracking-normal transition-colors duration-300 ease-out motion-reduce:transition-none"
          questionOpenClassName="text-paper font-question font-normal"
          questionClosedClassName="text-ink font-display font-semibold"
          answerClassName="text-grey-light pt-4 font-sans text-[16px] leading-6 tracking-[-0.08px]"
          icons={{
            // 441:6642 "tabler:minus" — 24 x 24 frame, 2px round white stroke.
            open: <Image src="/icons/faq-minus.svg" alt="" width={24} height={24} />,
            // 441:6649 "plus" — 28 x 28 frame, 2px round Orange stroke.
            closed: <Image src="/icons/faq-plus.svg" alt="" width={28} height={28} />,
          }}
          /*
            LINE nodes, 1px ink at 15%. Zero-height in the auto-layout and
            painted in the pixel *above* their y, so positioned, not bordered.
          */
          dividerClassName="bg-ink/15 absolute inset-x-0 bottom-0 h-px"
        />
      </div>
    </section>
  );
}
