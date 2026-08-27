import Image from "next/image";

import { Accordion } from "@/components/ui/accordion";

import { vendorsFaqIntro, vendorsFaqItems } from "@/content/vendors-page";
import { cn } from "@/lib/cn";

/**
 * Vendors FAQ — Figma node 510:20076 ("faq-section", 1440 x 759 at page y 3729).
 *
 * The section is 759 tall and clips; its single child 510:20077
 * "faq-main-content" is 949 tall and centred inside it, so it hangs 95px past
 * the top and bottom edges and is cut off. That overflow is empty: the child's
 * own 100px top and bottom padding plus its `counterAxisAlignItems: CENTER`
 * put the left column at page y 3933.19 and the list at 3846.5 either way, so
 * the 949 is transcribed as drawn — `shrink-0` under a centring flex column
 * reproduces the symmetric overflow, and `overflow-hidden` reproduces the clip.
 *
 * The panel sets its own 80px gutter (510:20077 has paddingLeft/Right 80), not
 * the site's 100px `Container` gutter, so it lays out its own width:
 * 1440 - 160 gutter - 120 gap - 480 left column leaves the list exactly 680.
 *
 * Five rows, exactly one of them drawn open, and the file carries no
 * interactive variants — the same static arrangement as Home (264:2938) and
 * Riders (441:6606). The open row is markup that is open, not a disclosure
 * widget with a default state; see the handover.
 */

export function VendorsFaq() {
  return (
    <section
      aria-labelledby="vendors-faq-heading"
      className="bg-cream-light canvas:h-[759px] flex flex-col justify-center overflow-hidden"
    >
      {/* 510:20077 — horizontal, cross-axis centred, gap 120, padding 100/80. */}
      <div
        className={cn(
          "canvas:flex-row mx-auto flex w-full max-w-(--width-canvas) flex-col",
          "canvas:h-[949px] canvas:items-center shrink-0 items-stretch",
          "canvas:gap-[120px] canvas:px-20 canvas:py-[100px] gap-10 px-(--spacing-gutter) py-14",
        )}
      >
        {/* 510:20078 — 480 wide, vertical, gap 24. */}
        <div className="canvas:w-[480px] canvas:max-w-none flex w-full shrink-0 flex-col gap-6">
          {/*
            510:20079 "Bubbles 1" — a 240 x 122.62 decorative group of speech
            bubbles, the same artwork Home and Riders use, to the fraction of a
            pixel. Vector, so it is an exported asset.
          */}
          <Image
            src="/icons/faq-bubbles.svg"
            alt=""
            width={240}
            height={123}
            className="canvas:h-[122.62px] h-auto w-[clamp(150px,16.6667vw,240px)] max-w-none"
          />

          {/* 510:20104 — vertical, gap 8; the design gives it a single child. */}
          <div className="flex flex-col gap-2">
            {/* 510:20105 — Gelica SemiBold 60/63, Primary Green. */}
            <h2
              id="vendors-faq-heading"
              className="text-ink font-display text-[clamp(30px,4.1667vw,60px)] leading-[1.05] font-semibold"
            >
              {vendorsFaqIntro.title}
            </h2>
          </div>

          {/* 510:20106 — Inter 18/27, -0.09 tracking. */}
          <p className="text-grey-mid font-sans text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em]">
            {vendorsFaqIntro.subtitle}
          </p>
        </div>

        {/* 510:20107 "FAQ-List" — vertical, no gap between rows, layoutGrow 1. */}
        <Accordion
          className="flex w-full flex-1 flex-col"
          items={vendorsFaqItems.map((item) => ({
            id: item.node,
            question: item.question,
            answer: item.answer,
          }))}
          // 510:20108 is the row the design draws open.
          defaultOpen={0}
          itemClassName="relative flex flex-col rounded-[12px] p-8 transition-colors duration-300 ease-out motion-reduce:transition-none"
          itemOpenClassName="bg-brand"
          itemClosedClassName="hover:bg-ink/[0.03]"
          questionClassName="min-w-0 flex-1 text-[clamp(17px,1.5278vw,22px)] leading-[1.2] tracking-normal transition-colors duration-300 ease-out motion-reduce:transition-none"
          questionOpenClassName="text-paper font-question font-normal"
          questionClosedClassName="text-ink font-display font-semibold"
          answerClassName="text-grey-light pt-4 font-sans text-[16px] leading-[24px] tracking-[-0.08px]"
          icons={{
            // 510:20112 "tabler:minus" — 24 x 24 frame, 2px round white stroke.
            open: <Image src="/icons/faq-minus.svg" alt="" width={24} height={24} />,
            // 510:20119 "plus" — 28 x 28 frame, 2px round Orange stroke.
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
