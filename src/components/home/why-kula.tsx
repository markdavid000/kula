import Image from "next/image";

import { cn } from "@/lib/cn";
import { whyKula, type WhyCard } from "@/content/home";

/**
 * Why Kula? — Figma node 264:2668 (1440 x 634, at page y 3109).
 *
 * A deep-green band whose top and bottom edges are torn rather than straight:
 * two 1440 x 80 vector groups in the band's own colour (264:2765 at y -43,
 * 264:2758 at y 624) that reach past the band into the cream on either side.
 * Both must overflow, so nothing here clips.
 *
 * The three cards are top-aligned and their icons differ in height (69, 85.8,
 * 82.5), so the titles deliberately sit at three different heights — that is
 * the design, not a misalignment.
 *
 * The top margin is the cream the design leaves between this band and the
 * Featured Vendors panel above: that panel ends at page y 2744 and this one
 * starts at 3109.
 *
 * HOW IT RESPONDS
 *
 * The torn edges are the band's signature and they stay, at every width — they
 * are `preserveAspectRatio="none"` vectors, so they stretch across the viewport
 * and only their depth is scaled. The heading leaves its design offset and
 * centres once it has to wrap, and the row of three becomes a column.
 */

/** 264:2671 / 264:2699 / 264:2728 — 360 x 303, radius 20, padding 28. */
function Card({ card }: { card: WhyCard }) {
  return (
    <li
      className={cn(
        "canvas:w-[360px] flex w-full max-w-[360px] flex-col rounded-[20px] p-7",
        card.surface,
      )}
    >
      {/* 264:2672 — inner column, gap 24. */}
      <div className="flex flex-col gap-6">
        {/* 264:2673 — icon over title, gap 32. */}
        <div className="flex flex-col gap-8">
          {/*
            The icon's strokes spill past its layout box, so the box is reserved
            here and the larger artwork is offset inside it.
          */}
          <span
            className="relative block shrink-0"
            style={{ width: card.box[0], height: card.box[1] }}
          >
            <Image
              src={card.icon}
              alt=""
              width={card.art[0]}
              height={card.art[1]}
              className="absolute max-w-none"
              style={{ left: card.offset[0], top: card.offset[1] }}
            />
          </span>
          {/* Gelica SemiBold 28/33.18. */}
          <h3 className="text-ink-soft text-[clamp(19px,1.9444vw,28px)] leading-[1.185] font-semibold">
            {card.title}
          </h3>
        </div>
        {/* Inter 16/24, -0.08. */}
        <p className="text-subtext font-sans text-[16px] leading-6 tracking-[-0.08px]">
          {card.body}
        </p>
      </div>
    </li>
  );
}

export function WhyKula() {
  return (
    <section
      aria-labelledby="why-kula-heading"
      className="bg-ink-deep canvas:h-[634px] relative mt-[clamp(112px,25.3472vw,365px)]"
    >
      {/*
        264:2765 / 264:2758 — the torn edges. Same fill as the band, so they read
        as the band's own outline rather than as separate shapes, and the section
        is not clipped so they reach into the cream above and below.

        No negative z-index: the section is positioned, so it paints its own
        background *after* any negative-z descendant, and the band simply
        covered them. Painting in DOM order puts them over the band and still
        under the cards, which come later.

        The lower edge is anchored to the section's bottom rather than the
        design's y=624, which is the same thing at the canvas height (634 - 80 +
        70) but keeps it on the edge once the band grows taller on small
        screens.

        Both files carry `preserveAspectRatio="none"` so the artwork stretches to
        the viewport instead of letterboxing to its 1440 intrinsic width. The
        REST export omits that attribute where the MCP adds it, so it is set by
        hand. They are named `-edge-` rather than `-wave-` because the earlier
        URLs were cached without it.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[clamp(22px,2.9861vw,43px)] left-0 h-[clamp(40px,5.5556vw,80px)] w-full overflow-hidden"
      >
        <Image
          aria-hidden
          src="/icons/why-edge-top.svg"
          alt=""
          width={1440}
          height={80}
          className="absolute left-1/2 h-full w-full max-w-none min-w-[900px] -translate-x-1/2"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[clamp(36px,4.8611vw,70px)] left-0 h-[clamp(40px,5.5556vw,80px)] w-full overflow-hidden"
      >
        <Image
          aria-hidden
          src="/icons/why-edge-bottom.svg"
          alt=""
          width={1440}
          height={80}
          className="absolute left-1/2 h-full w-full max-w-none min-w-[900px] -translate-x-1/2"
        />
      </div>

      {/*
        Positioned against the section itself: no padding at the canvas and
        flush with the section's top edge, so the design's absolute offsets
        still resolve exactly where they did.
      */}
      <div className="canvas:px-0 canvas:py-0 relative px-(--spacing-gutter) py-14">
        {/*
        264:2757 over 264:2669 — the same word twice, white 4px up and right of
        an orange copy. Reproduced as a hard text-shadow rather than two nodes.

        Centred on the design's own centre (x 663), which is 57px left of the
        canvas centre. That is what the file says; the card row below it *is*
        centred, so the two do not share an axis.
      */}
        <h2
          id="why-kula-heading"
          className="canvas:absolute canvas:top-[80px] canvas:left-1/2 canvas:mx-0 canvas:-translate-x-[calc(50%+57px)] canvas:px-5 canvas:whitespace-nowrap relative mx-auto text-center text-[clamp(32px,4.8611vw,70px)] leading-[1.185] font-extrabold text-white drop-shadow-[-4px_4px_0_#EA5220]"
        >
          {whyKula.heading}
        </h2>

        {/*
        264:2670 — row of three, gap 32.

        DIRECTED: centred rather than pinned to the design's x=153. The design's
        row centre is 725 against the canvas centre of 720, so at 1440 this moves
        it 5px left; above 1440 it is the difference between centred and stuck to
        the left edge.
      */}
        <ul className="canvas:absolute canvas:top-[246px] canvas:left-1/2 canvas:mt-0 canvas:flex canvas:w-[1144px] canvas:-translate-x-1/2 canvas:flex-row canvas:items-stretch relative mx-auto mt-10 grid w-full max-w-[1144px] justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyKula.cards.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}
