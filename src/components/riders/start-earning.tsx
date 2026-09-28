import Image from "next/image";

import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ridersSteps } from "@/content/riders-page";
import { cn } from "@/lib/cn";

/**
 * Start earning in 3 steps — Figma nodes 441:6792 (the heading stack), 510:25744
 * ("gs", the three step rows) and 510:25764 (the photo card), page y 2749–3685.
 *
 * The three pieces are siblings on the page rather than one frame, so the
 * geometry is transcribed from their absolute positions: the heading is centred
 * at the top, the rows sit at page x 138 and the photo card at x 746. Those two
 * columns span 138–1302, which is symmetric about the canvas centre, so the
 * lower half lays out as a centred 1164 measure with the two columns pinned
 * inside it.
 *
 * "gs" is NOT an auto-layout frame: the rows are hand-placed and each one
 * overlaps the row above it by 8px (3105 + 185 = 3290, but row 2 starts at
 * 3282). That overlap is reproduced with a negative margin, and every row is
 * `relative` so the later ones keep painting over the earlier ones.
 */

export function StartEarning() {
  return (
    <section
      aria-labelledby="riders-steps-heading"
      // 192.22px below the card row above, which ends at page y 2556.78.
      className="canvas:px-0 mt-[clamp(72px,13.3486vw,192.22px)] px-(--spacing-gutter)"
    >
      {/* 441:6792 — vertical, cross-axis centred, gap 24, hugging its content. */}
      <div className="mx-auto flex w-full max-w-[803px] flex-col items-center gap-6">
        {/* 441:6793 — Gelica Black 72/85.32, centred, over a hard Orange shadow. */}
        <h2
          id="riders-steps-heading"
          className="text-ink text-center text-[clamp(32px,5vw,72px)] leading-[1.185] font-extrabold drop-shadow-[0_4px_4px_var(--color-brand)]"
        >
          {ridersSteps.heading}
        </h2>

        {/*
          441:6794 — the shared Button with `arrow-forward-circle` (148:7463)
          rather than the plain arrow: a 19.5 glyph in a 24 box.
        */}
        <ButtonLink
          href="/contact"
          icon={
            <Icon src="/icons/arrow-forward-circle.svg" size={24} insetY={9.375} insetX={9.375} />
          }
        >
          {ridersSteps.cta}
        </ButtonLink>
      </div>

      {/*
        The lower half: 1164 wide (page x 138–1302) and 715 tall (page y
        2970–3685), 56px under the heading stack. Below the canvas width the two
        columns stack.
      */}
      <div className="canvas:block canvas:h-[715px] canvas:gap-0 relative mx-auto mt-14 flex w-full max-w-[1164px] flex-col items-center gap-10">
        {/* 510:25744 "gs" — 501 wide, pinned at 135px down the block. */}
        {/*
          510:25744 "gs" — 501 wide, pinned 135px down the block. Not an
          auto-layout: each row overlaps the one above by 8px, so the rows stay
          `relative` and later ones paint over earlier ones.
        */}
        {/*
          510:25744 "gs" — 501 wide, pinned 135px down the block. Not an
          auto-layout: each row overlaps the one above by 8px, which the negative
          margin reproduces, and every row stays `relative` so the later ones
          keep painting over the earlier ones.
        */}
        <Accordion
          as="ol"
          className={cn(
            "flex w-full max-w-[501px] flex-col",
            "canvas:absolute canvas:top-[135px] canvas:left-0 canvas:w-[501px] canvas:max-w-none",
            "mx-auto",
          )}
          items={ridersSteps.steps.map((step, index) => ({
            id: step.node,
            question: step.title,
            answer: step.answer,
            className: cn(step.surface, index > 0 && "-mt-2"),
          }))}
          // 510:25745 is the step the design draws open.
          defaultOpen={0}
          // pb-7 on a phone: the next row overlaps this one by 8px, which left p-5's
          // 20px as 12 between the answer and the row below.
          itemClassName="relative flex flex-col rounded-[12px] p-5 pb-7 transition-[filter] duration-300 ease-out sm:p-8 motion-reduce:transition-none"
          itemClosedClassName="hover:brightness-[0.97]"
          // 510:25747 etc. — Gelica SemiBold 28/33.18, Less black.
          questionClassName="text-ink-soft min-w-0 flex-1 text-left text-[clamp(19px,1.9444vw,28px)] leading-[1.185] font-semibold"
          /*
            510:25751 — Inter 16/24, -0.08, Grey Color. The design fixes this to
            364 wide inside the row's 437 of content, so it wraps earlier than
            the row does; transcribed rather than left to fill.
          */
          answerClassName="text-grey w-full max-w-[364px] pt-4 font-sans text-[16px] leading-6 tracking-[-0.08px] canvas:w-[364px] canvas:max-w-none"
          icons={{
            // 510:25749 "tabler:minus" — 24 x 24, 2px round Primary Green stroke.
            open: <Image src="/icons/riders-step-minus.svg" alt="" width={24} height={24} />,
            // 510:25756 "plus" — 28 x 28, 2px round Primary Green stroke.
            closed: <Image src="/icons/riders-step-plus.svg" alt="" width={28} height={28} />,
          }}
        />

        {/*
          510:25764 — the 556 x 715 photo card: an Accent Yellow plate at its
          top-left corner and the photo itself offset 32px down and right of it,
          so the plate shows as a hard offset shadow along the top and left.

          The wrapper is the whole 556 x 715 group, not the photo, so the plate's
          overhang stays inside the block at every width — hanging the plate off
          the photo at -32/-32 instead pushed it past the gutter on a phone.
        */}
        <div
          className={cn(
            "canvas:max-w-none relative w-full max-w-[556px]",
            "canvas:absolute canvas:top-0 canvas:left-[608px] canvas:h-[715px] canvas:w-[556px]",
          )}
        >
          {/* 510:25765 — 524 x 683, radius 44, i.e. the group less the 32 offset. */}
          <span
            aria-hidden
            className="bg-accent absolute top-0 left-0 h-[calc(100%-32px)] w-[calc(100%-32px)] rounded-[44px]"
          />

          {/*
            510:25766 — 524 x 683 at (32, 32) on the group. This span carries no
            radius of its own: a radius on both a clipping wrapper and the image
            it clips multiplies the two antialiased masks and feathers the
            corners, so it belongs on the image alone.
          */}
          <span className="relative mt-8 ml-8 block w-[calc(100%-32px)]">
            <Image
              src="/images/riders/rider-photo@2x.webp"
              alt={ridersSteps.photoAlt}
              width={524}
              height={683}
              className="canvas:h-[683px] aspect-[524/683] h-auto w-full rounded-[32px] object-cover"
            />

            {/*
              510:25767 — a 135 x 100 charcoal plate at (189, 243) on the photo,
              with the Kula mark (510:25768, composited from three crops of one
              source image) centred in it. Expressed as a percentage of the photo
              so it holds its place when the photo scales below the canvas width;
              at 1440 it resolves to exactly 189 and 243.
            */}
            <span className="bg-charcoal canvas:h-[100px] canvas:w-[135px] absolute top-[35.578%] left-[36.069%] flex h-[14.641%] w-[25.763%] items-center justify-center rounded-[clamp(16px,2.2222vw,32px)]">
              <Image
                src="/images/riders/app-badge-logo@2x.webp"
                alt=""
                width={77}
                height={79}
                className="canvas:h-[78.9px] canvas:w-[77.32px] h-auto w-[57.3%] max-w-none"
              />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
