import Image from "next/image";

import { Accordion } from "@/components/ui/accordion";

import { cn } from "@/lib/cn";
import { homeFaqIntro, homeFaqItems } from "@/content/home-faq";

/**
 * Frequently Asked Questions — Figma node 264:2938 (1440 x 914, page y 7016).
 *
 * The section frame is 914 tall and clips; its single child 264:2939
 * "faq-main-content" is 949 tall and is centred inside it, so it hangs 17.5px
 * past the top and bottom edges and gets cut off. That overflow is empty space:
 * the content frame's two columns (350.6 and 640 tall) are themselves vertically
 * centred, so both centre lines land on page y 7473 either way. The 949 is
 * transcribed as drawn — `shrink-0` under a centring flex column reproduces the
 * symmetric overflow, and the section's `overflow-hidden` reproduces the clip.
 *
 * The section's own gutter is 80px, not the site's usual 100px `Container`
 * gutter (264:2939 has paddingLeft/Right 80), so it lays out its own width.
 *
 * The list is drawn with exactly one row open and five closed, and the file
 * carries no interactive variants — see the open question in the handover. This
 * transcribes the static arrangement: the open row is markup that is open, not
 * a disclosure widget with a default state.
 */

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-cream-light canvas:h-[914px] flex flex-col justify-center overflow-hidden"
    >
      {/*
        264:2939 — horizontal, cross-axis centred, gap 120, padding 80/12.
        Below the canvas width the two columns stack; that step is derived, the
        design has no narrow frame.
      */}
      <div
        className={cn(
          "canvas:flex-row mx-auto flex w-full max-w-(--width-canvas) flex-col",
          "canvas:h-[949px] canvas:items-center shrink-0 items-stretch",
          "canvas:gap-[120px] canvas:px-20 canvas:py-3 gap-10 px-(--spacing-gutter) py-14",
        )}
      >
        {/* 264:2940 — 480 wide, vertical, gap 24. */}
        <div className="canvas:w-[480px] canvas:max-w-none flex w-full shrink-0 flex-col gap-6">
          {/*
            264:2941 "Bubbles 1" — a 240 x 122.62 decorative group of speech
            bubbles. Vector artwork, so it is an exported asset.
          */}
          <Image
            src="/icons/faq-bubbles.svg"
            alt=""
            width={240}
            height={123}
            className="canvas:h-[122.62px] h-auto w-[clamp(150px,16.6667vw,240px)] max-w-none"
          />

          {/* 264:2966 — vertical, gap 8; the design gives it a single child. */}
          <div className="flex flex-col gap-2">
            {/* 264:2967 — Gelica SemiBold 60/63, Primary Green. */}
            <h2
              id="faq-heading"
              className="text-ink font-display text-[clamp(30px,4.1667vw,60px)] leading-[1.05] font-semibold"
            >
              {homeFaqIntro.title}
            </h2>
          </div>

          {/* 264:2968 — Inter 18/27, -0.09 tracking. */}
          <p className="text-grey-mid font-sans text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em]">
            {homeFaqIntro.subtitle}
          </p>
        </div>

        {/* 264:2969 "FAQ-List" — vertical, no gap between rows, 680 wide. */}
        {/* layoutGrow 1 — 1440 - 160 gutter - 120 gap - 480 column = 680. */}
        {/* 264:2969 "FAQ-List" — vertical, no gap between rows, 680 wide. */}
        <Accordion
          className="flex w-full flex-1 flex-col"
          items={homeFaqItems.map((item) => ({
            id: item.node,
            question: item.question,
            answer: item.answer,
          }))}
          // 264:2970 is the row the design draws open.
          defaultOpen={0}
          itemClassName="relative flex flex-col rounded-[12px] p-8 transition-colors duration-300 ease-out motion-reduce:transition-none"
          itemOpenClassName="bg-brand"
          itemClosedClassName="hover:bg-ink/[0.03]"
          questionClassName="min-w-0 flex-1 text-[clamp(17px,1.5278vw,22px)] leading-[1.2] tracking-normal transition-colors duration-300 ease-out motion-reduce:transition-none"
          questionOpenClassName="text-paper font-question font-normal"
          questionClosedClassName="text-ink font-display font-semibold"
          // 264:2976 — Inter 16/24, -0.08. The design's 16px gap to the answer
          // lives on the answer so it collapses with it.
          answerClassName="text-grey-light pt-4 font-sans text-[16px] leading-[24px] tracking-[-0.08px]"
          icons={{
            // 264:2974 "tabler:minus" — 24 x 24 frame, 2px round white stroke.
            open: <Image src="/icons/faq-minus.svg" alt="" width={24} height={24} />,
            // 264:2981 "plus" — 28 x 28 frame, 2px round Orange stroke.
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
