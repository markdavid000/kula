import Image from "next/image";

import { ridersCare, type RiderCareCard } from "@/content/riders-page";
import { cn } from "@/lib/cn";

/**
 * We take care of our riders — Figma node 441:6517 ("Frame 2147239788",
 * 1144 x 413.78 at page x 148, y 2143).
 *
 * A vertical auto-layout — heading, then a row of three cards — 1144 wide
 * inside the 1440 canvas. That is a 148px gutter, not the site's usual 100px
 * `Container`, so the section carries its own measure.
 *
 * The row's height is set by the tallest card (441:6548, whose content runs
 * 246.78 + 56 of padding); the other two are fixed to the same 302.78 and let
 * their content sit at the top.
 */

/** 441:6520 / 441:6548 / 441:6577 — 360 x 302.78, radius 20, padding 28. */
function CareCard({ card }: { card: RiderCareCard }) {
  const { icon } = card;

  return (
    <li className={cn("h-[302.78px] flex-1 rounded-[20px] p-7", card.surface)}>
      {/* 441:6521 — vertical, gap 24. */}
      <div className="flex flex-col gap-6">
        {/* 441:6522 — vertical, gap 32. */}
        <div className="flex flex-col gap-8">
          {/*
            441:6523 / 441:6551 / 441:6580. The illustration is drawn with a
            thick outline in the card's own colour, so what Figma paints is
            larger than the box the auto-layout gives it — up to 10px taller. The
            span holds the layout box; the image is placed at the render bounds
            inside it so the outline bleeds exactly as far as it does in Figma.
          */}
          <span
            className="relative block shrink-0"
            style={{ width: icon.boxWidth, height: icon.boxHeight }}
          >
            <Image
              src={icon.src}
              alt=""
              width={Math.round(icon.artWidth)}
              height={Math.round(icon.artHeight)}
              className="absolute max-w-none"
              style={{
                left: icon.artLeft,
                top: icon.artTop,
                width: icon.artWidth,
                height: icon.artHeight,
              }}
            />
          </span>

          {/* 441:6546 etc. — Gelica SemiBold 28/33.18, Less black. */}
          <h3 className="text-ink-soft text-[clamp(19px,1.9444vw,28px)] leading-[1.185] font-semibold">
            {card.title}
          </h3>
        </div>

        {/* 441:6547 etc. — Inter 16/24, -0.08, subtext. */}
        <p className="text-subtext font-sans text-[16px] leading-6 tracking-[-0.08px]">
          {card.body}
        </p>
      </div>
    </li>
  );
}

export function WeTakeCare() {
  return (
    <section
      aria-labelledby="riders-care-heading"
      // 168px below the yellow card, which ends at page y 1975.
      className="canvas:px-0 mt-[clamp(72px,11.6667vw,168px)] px-(--spacing-gutter)"
    >
      <div className="mx-auto flex w-full max-w-[1144px] flex-col items-center gap-10">
        {/* 441:6518 — Gelica Black 60/71.1, centred, over a hard Orange shadow. */}
        <h2
          id="riders-care-heading"
          className="text-ink text-center text-[clamp(30px,4.1667vw,60px)] leading-[1.185] font-extrabold drop-shadow-[0_4px_4px_var(--color-brand)]"
        >
          {ridersCare.heading}
        </h2>

        {/* 441:6519 — horizontal, gap 32; 3 x 360 + 2 x 32 = 1144. */}
        <ul className="canvas:flex canvas:grid-cols-none grid w-full gap-8 sm:grid-cols-2">
          {ridersCare.cards.map((card) => (
            <CareCard key={card.node} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}
