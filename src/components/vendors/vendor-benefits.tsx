import Image from "next/image";
import type { ReactNode } from "react";

import { CardStack } from "@/components/ui/card-stack";
import { Carousel } from "@/components/ui/carousel";
import { cn } from "@/lib/cn";
import { vendorBenefits, vendorCards, type VendorCardItem } from "@/content/vendors-page";

/**
 * The three benefit panels — Figma nodes 520:1386 (page y 718), 520:2499
 * (y 1238) and 520:2509 (y 1758). Each is 940 x 480 at x 264, radius 56, with a
 * 2px Primary Green stroke Figma aligns INSIDE — an inset ring, never a border,
 * because a border would push the panel's absolutely-placed contents in by 2px.
 *
 * They are children of the page's cream plate (510:20049, which starts at y 859)
 * but the first one is drawn at y 718, so the stack hangs 141px back up over the
 * hero. That overlap is the design's, reproduced with a negative top margin on
 * the stack; the section is a flex container so the margin cannot collapse out
 * of it.
 *
 * Every panel carries the same 942 x 942 food-doodle bitmap (Food_Pattern_5_01)
 * at x -1, y -462 in the panel's own box, at three different opacities.
 *
 * Panel 3's surface is `--color-tangerine-soft` (520:2509) and the hard shadow
 * under the two dark headlines is `--color-brand-shadow`. The latter is NOT
 * `--color-brand` (#ea5220): 441:6518 and 441:6793 use the brand orange for the
 * same shadow while 520:1899 / 520:2511 use #ed5e3b, so the file is internally
 * inconsistent. Transcribed as drawn and flagged for the designer.
 */

/**
 * The illustration artboards. Every one is a rotated vector frame; Figma reports
 * a bounding box that already includes the rotation (its render bounds match it
 * wherever the panel does not clip), so the artwork is placed and sized by that
 * box with no CSS rotation of its own — the rotation is baked into the export.
 *
 * These are vector illustrations, hundreds of paths each. They are exported
 * assets: nothing here could be redrawn by hand without inventing a different
 * picture. Sizes and offsets are in the panel's own coordinate space.
 */
interface Art {
  readonly src: string;
  readonly left: number;
  readonly top: number;
  readonly w: number;
  readonly h: number;
}

/** 520:1388 — the only artboard the design paints *under* the headline. */
const noFeesArtUnder: readonly Art[] = [
  { src: "/images/vendors/no-fees-art-17.svg", left: 675, top: 246, w: 239.6303, h: 197.0367 },
];

/** 520:1900, 520:2239, 520:2307 — painted over the headline, in this order. */
const noFeesArtOver: readonly Art[] = [
  { src: "/images/vendors/no-fees-art-7.svg", left: 420.0001, top: 234, w: 304.7122, h: 265.8229 },
  {
    src: "/images/vendors/no-fees-art-20.svg",
    left: 163.3344,
    top: 188.418,
    w: 363.4443,
    h: 339.2327,
  },
  { src: "/images/vendors/no-fees-art-16.svg", left: -14, top: 211, w: 300.4667, h: 254.1339 },
];

/** 520:2514 → 520:6014, in the design's own paint order. */
const unlimitedArt: readonly Art[] = [
  { src: "/images/vendors/unlimited-art-15.svg", left: 304, top: 255, w: 331.8401, h: 221.2267 },
  {
    src: "/images/vendors/unlimited-art-13.svg",
    left: 107.265,
    top: 345.4387,
    w: 187.7163,
    h: 134.785,
  },
  { src: "/images/vendors/unlimited-art-5.svg", left: -19, top: 223, w: 189.0437, h: 163.7636 },
  { src: "/images/vendors/unlimited-art-14.svg", left: 547, top: 206, w: 161, h: 108 },
  { src: "/images/vendors/unlimited-art-19.svg", left: 790, top: 357, w: 149, h: 100 },
  { src: "/images/vendors/unlimited-art-12.svg", left: 753, top: 171, w: 185, h: 124 },
  {
    src: "/images/vendors/unlimited-art-2.svg",
    left: 128.0001,
    top: 174,
    w: 188.3789,
    h: 179.3282,
  },
  { src: "/images/vendors/unlimited-art-3.svg", left: 583, top: 358, w: 156, h: 104 },
];

/**
 * The doodles are measured against the panel's own 940 x 480 box, so they are
 * written as shares of it rather than in pixels. The layer then holds that
 * aspect at any width and the whole arrangement scales as one — overlaps,
 * spacing and all — instead of the pieces drifting apart or being cropped.
 *
 * At the canvas the panel IS 940 x 480, so the shares resolve to the design's
 * own pixel offsets exactly.
 *
 * The layer hangs off the panel's BOTTOM below the canvas. In the design the
 * doodles sit under and around the headline (y 171-460 against a headline at
 * 131); centring the layer on a tall narrow panel instead drops them straight
 * over the words. Anchoring it to the bottom keeps the design's stacking — copy
 * above, doodles below — at every width.
 */
const ART_W = 940;
const ART_H = 480;

function ArtLayer({ pieces, className }: { pieces: readonly Art[]; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 aspect-[940/480]",
        "canvas:inset-0 canvas:aspect-auto",
        className,
      )}
    >
      {pieces.map((piece) => (
        <Image
          key={piece.src}
          src={piece.src}
          alt=""
          width={Math.round(piece.w)}
          height={Math.round(piece.h)}
          className="absolute max-w-none"
          style={{
            left: `${(piece.left / ART_W) * 100}%`,
            top: `${(piece.top / ART_H) * 100}%`,
            width: `${(piece.w / ART_W) * 100}%`,
            // Height is a share too, not `auto`: the SVGs' intrinsic ratios are
            // not exactly the boxes the design draws them in, so `auto` resizes
            // them by a pixel or two against the file.
            height: `${(piece.h / ART_H) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * 520:2497 / 520:2502 / 520:2512 — a 29-tall pill, radius 32, 1px Primary Green
 * inside stroke and a hard 0/2 shadow in its own fill colour, rotated -16.19°
 * (Figma reports -0.28253 rad). Inter 14/21, -0.07, textCase Title.
 *
 * The width is the pill's own unrotated width, recovered from the rotated
 * bounding box Figma reports; `left`/`top` place that unrotated box so the
 * rotation lands where the design draws it. Set explicitly rather than hugging
 * the text so the geometry holds whatever the text measures to.
 */
function Badge({
  children,
  width,
  surface,
  className,
}: {
  children: ReactNode;
  width: number;
  surface: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inset-ring-ink flex h-[29px] shrink-0 items-center justify-center rounded-[32px] inset-ring-1",
        surface,
        className,
      )}
      style={{ width, transform: "rotate(-16.19deg)" }}
    >
      <span className="text-ink font-sans text-[14px] leading-[21px] tracking-[-0.07px] whitespace-nowrap capitalize">
        {children}
      </span>
    </span>
  );
}

/**
 * 520:1899 / 520:2501 / 520:2511 — Gelica Bold 40/47.4, no tracking, centred
 * over a hard 0/4/4 shadow. 695 wide, which is the panel's 940 less 122 either
 * side.
 */
function Headline({
  children,
  className,
  shadow,
}: {
  children: ReactNode;
  className?: string;
  shadow: string;
}) {
  return (
    <h2
      className={cn(
        "canvas:absolute canvas:left-[122px] canvas:w-[695px] relative w-full",
        "z-10 text-[clamp(24px,2.7778vw,40px)] leading-[1.185]",
        "text-center font-bold tracking-normal",
        shadow,
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** The panel shell: surface, radius, inside stroke and the doodle bitmap. */
function Panel({
  surface,
  patternOpacity,
  children,
}: {
  surface: string;
  patternOpacity: number;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "inset-ring-ink relative w-full max-w-[940px]",
        "min-h-[clamp(400px,33.3333vw,480px)] px-5 py-9 sm:px-8",
        "flex flex-col items-center overflow-hidden rounded-[clamp(28px,3.8889vw,56px)] inset-ring-2",
        "canvas:h-[480px] canvas:w-[940px] canvas:rounded-[56px] canvas:px-0 canvas:py-0",
        surface,
      )}
    >
      {/* 520:1387 / 520:2500 / 520:2510 — 942 square at x -1, y -462. */}
      <Image
        aria-hidden
        src="/images/vendors/food-pattern.webp"
        alt=""
        width={942}
        height={942}
        className="canvas:-top-[462px] canvas:h-[942px] canvas:w-[942px] pointer-events-none absolute -top-[49.15%] -left-px h-auto w-[100.2%] max-w-none"
        style={{ opacity: patternOpacity }}
      />
      {children}
    </div>
  );
}

/** 520:2505 … 520:2508 — the shared `card` component, 360 x 259. */
function VendorCard({ card }: { card: VendorCardItem }) {
  return (
    <li className="bg-peach inset-ring-ink-soft flex w-[360px] max-w-[calc(100vw-5rem)] shrink-0 flex-col gap-1 rounded-[28px] p-5 inset-ring-1">
      {/* 206:2196 — inner column, gap 24. */}
      <div className="flex flex-col gap-6">
        {/* 206:2197 — 320 x 122, radius 16, 1px Primary Green inside stroke. */}
        <div className="inset-ring-ink relative h-[122px] w-full overflow-hidden rounded-[16px] inset-ring-1">
          <Image src={card.image} alt="" fill sizes="320px" className="object-cover" />
        </div>

        {/* 206:2198 — gap 8. */}
        <div className="flex flex-col gap-2">
          {/* 206:2199 — Gelica SemiBold 28/33.18. */}
          <h3 className="text-ink-soft text-[clamp(19px,1.9444vw,28px)] leading-[1.185] font-semibold">
            {card.name}
          </h3>

          {/* 206:2200 — SPACE_BETWEEN, cross-axis centred. */}
          <div className="flex items-center justify-between">
            {/* 206:2201 — radius 100, padding 6/10. */}
            <span className="bg-peach-soft text-ink rounded-[100px] px-2.5 py-1.5 font-sans text-[14px] leading-[16.94px] font-semibold">
              {card.price}
            </span>
            {/* 206:2203 */}
            <span aria-hidden className="text-slate font-sans text-[14px] leading-[16.94px]">
              •
            </span>
            {/* 206:2204 — radius 56, padding 4 with a 12 lead-in, gap 20. */}
            <span className="bg-brand flex items-center gap-5 rounded-[56px] py-1 pr-1 pl-3">
              <span className="font-sans text-[16px] leading-6 font-medium text-white capitalize">
                {card.cta}
              </span>
              {/* 206:2206 — a 24px white disc, 2px around the 20px glyph. */}
              <span className="flex size-6 shrink-0 items-center justify-center rounded-[48px] bg-white p-0.5">
                <Image src="/icons/arrow-right-round.svg" alt="" width={20} height={20} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export function VendorBenefits() {
  const [noFees, goLive, unlimited] = vendorBenefits;

  return (
    <section aria-label="Why sell on Kula" className="bg-cream relative flex flex-col">
      {/*
        The panels are 40px apart (718 → 1238 → 1758, each 480 tall) and the
        stack starts 141px above this section's own top edge.
      */}
      {/*
        The panels are not centred on the canvas: the design puts them at x 264
        against a right margin of 236, so the left offset is transcribed rather
        than derived from centring.
      */}
      {/*
        DIRECTED: the three panels stack as you scroll rather than sitting in a
        plain column — each pins in turn and the next slides over it. The resting
        look of any one panel is unchanged; only the way you move between them
        is. `items-start` at the canvas width keeps them at the design's x 264
        rather than stretching them.

        The stack holds briefly once composed and is then pushed up by whatever
        follows, like any other scroll — see `CardStack`'s `hold`.
      */}
      <CardStack
        // Matches the panel: 940 as drawn, full width once it reflows.
        cardClassName="w-full max-w-[940px] canvas:w-[940px]"
        className="canvas:items-start canvas:px-0 canvas:pl-[264px] mx-auto -mt-[clamp(48px,9.7917vw,141px)] flex w-full max-w-(--width-canvas) flex-col items-center gap-10 px-(--spacing-gutter)"
      >
        {/* 520:1386 — Accent Yellow, pattern at 6%. */}
        <Panel surface="bg-accent" patternOpacity={0.06}>
          <ArtLayer pieces={noFeesArtUnder} />
          <Badge
            width={76}
            surface="bg-paper shadow-[0_2px_0_0_var(--color-paper)]"
            className="canvas:absolute canvas:top-[105.019px] canvas:left-[165.536px] canvas:mb-0 relative z-30 mb-4"
          >
            {noFees.badge}
          </Badge>
          {/* Shadow: --color-brand-shadow, not --color-brand. */}
          <Headline
            className="text-ink top-[131px]"
            shadow="drop-shadow-[0_4px_4px_var(--color-brand-shadow)]"
          >
            {noFees.headline}
          </Headline>
          <ArtLayer pieces={noFeesArtOver} className="z-20" />
        </Panel>

        {/* 520:2499 — Orange, pattern at 12%. */}
        <Panel surface="bg-brand" patternOpacity={0.12}>
          <Badge
            width={170}
            surface="bg-accent shadow-[0_2px_0_0_var(--color-accent)]"
            className="canvas:absolute canvas:top-[75.123px] canvas:left-[133.672px] canvas:mb-0 relative z-20 mb-4"
          >
            {goLive.badge}
          </Badge>
          <Headline
            className="text-paper top-[107px]"
            shadow="drop-shadow-[0_4px_4px_var(--color-ink)]"
          >
            {goLive.headline}
          </Headline>

          {/*
            520:2504 — a 1240-wide card row at x 24, y 189, gap 24, 8px of
            padding top and bottom. The panel clips it at x 940, so the design
            draws two whole cards and a third cut in half. The visible strip is
            916 wide (940 - 24); making that the scroll port keeps the resting
            composition exact and still lets the fourth card be reached, which
            is the same reading Home's carousel takes.
          */}
          <Carousel
            label="Kula vendors"
            className="canvas:absolute canvas:top-[189px] canvas:left-6 canvas:mt-0 canvas:w-[916px] relative z-30 mt-6 w-full"
            // Matches the viewport's px-2 below the canvas width, on both edges so the
            // end of the track stays reachable.
            viewportClassName="py-2"
            /*
              `pr-6` mirrors the row's 24px left inset at the end of the
              scroll. The viewport is 916 wide at x 24 inside a 940 panel, so its
              right edge IS the panel's edge — without trailing padding the last
              card finishes flush while the first starts 24px in. The padding is
              on the scrolling track, so it counts toward the scroll extent.
            */
            listClassName="pr-6 flex w-max gap-6"
          >
            {vendorCards.map((card) => (
              <VendorCard key={card.node} card={card} />
            ))}
          </Carousel>
        </Panel>

        {/* 520:2509 — --color-tangerine-soft, pattern at 7%. */}
        <Panel surface="bg-tangerine-soft" patternOpacity={0.07}>
          <Badge
            width={151}
            surface="bg-accent shadow-[0_2px_0_0_var(--color-accent)]"
            className="canvas:absolute canvas:top-[71.474px] canvas:left-[134.049px] canvas:mb-0 relative z-20 mb-4"
          >
            {unlimited.badge}
          </Badge>
          <Headline
            className="text-ink top-[107px]"
            shadow="drop-shadow-[0_4px_4px_var(--color-brand-shadow)]"
          >
            {unlimited.headline}
          </Headline>
          <ArtLayer pieces={unlimitedArt} className="z-30" />
        </Panel>
      </CardStack>
    </section>
  );
}
