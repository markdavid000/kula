import Image from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { hero, heroDishes } from "@/content/home";

/**
 * Home hero — Figma node 264:2260 (1440 x 959).
 *
 * The section is cream; the dark field is a single very large ellipse
 * (264:2262, 1581 x 1354 at -72,-419) whose bottom arc is the only part that
 * shows. Everything else — copy block, scattered dishes, the noodle blob — sits
 * on top of it.
 *
 * HOW IT RESPONDS
 *
 * At `canvas` the composition is the design's, at design size, centred. The one
 * departure is the ellipse's width, which tracks the viewport so the dark field
 * stays full-bleed; its height does not, because a height that scales makes the
 * arc *sink* on a wide display — at 1920 it dropped past the section and was
 * clipped away entirely. Holding the height flattens the arc instead and keeps
 * its bottom at 935 everywhere.
 *
 * Below `canvas` the field cannot be that ellipse: 1354px of fixed height on a
 * phone leaves a dead slab of dark under the copy. So the same field is drawn a
 * second way — the section's own box with an elliptical bottom edge — which
 * hugs the copy however the text wraps. Same colour, same grid, same curve; the
 * only thing that changes is what supplies the height.
 *
 * The six scattered dishes are re-composed rather than scaled. At design size
 * they flank the copy in two arcs across a 1440-wide field; shrunk to a phone
 * they would be 34px specks in a band across the top. Instead they keep their
 * flanking arrangement but hang off the left and right edges of the tall narrow
 * field, and the sharp labelled dish that anchors the design's lower right
 * becomes the focal piece under the search bar. Nothing is dropped.
 */

/** 264:2641–264:2644 — four overlapping circles making the scalloped blob. */
const blobCircles = [
  { left: 0, top: 0 },
  { left: 0, top: 72 },
  { left: 73, top: 0 },
  { left: 73, top: 72 },
] as const;

/**
 * The grid inside the dark field — Figma frames 264:2263 … 264:2575, each at
 * 40% opacity, holding 21 vertical bars 4px wide on a 112px pitch
 * (`Group 238557`) and 15 bands on a 108.7px pitch rotated -7.05°
 * (`Group 238558`).
 *
 * DELIBERATE DEPARTURE — the colour, and only the colour. The design fills the
 * bars with a gradient from `rgba(6,38,18,0.2)` to `rgba(21,140,66,0)`. Over
 * the #071F10 field that first stop composites to rgb(7,32,16) against a
 * rgb(7,31,16) background: one value in the green channel, which no display
 * resolves. Figma's own render of the frame measures the same 2/255.
 *
 * So the line takes the gradient's *other* stop — rgb(21,140,66), already in
 * the design — which composites to rgb(8,40,20), a delta of 9. Lower
 * GRID_ALPHA toward 0.05 to fade it back out.
 */
const GRID_LINE = "21, 140, 66";
const GRID_ALPHA = 0.2;
const GRID_FROM = `rgba(${GRID_LINE}, ${GRID_ALPHA})`;
const GRID_TO = `rgba(${GRID_LINE}, 0)`;

/**
 * Both runs are drawn the same way: one gradient supplies the paint — a single
 * fade across the whole field, exactly as each rect in the design is filled —
 * and a mask cuts it into 4px lines. The fade belongs to the field, not to the
 * individual cell.
 *
 * The horizontal run is a set of lines, not the design's 520px-tall bands. In
 * the file those bands sit on a 108.7px pitch and so overlap five deep; the only
 * thing that survives the pile-up is the hard top edge of each one, which is
 * what reads as the grid's horizontal rule. Drawing them as bands instead puts a
 * gradient inside every cell — correct as geometry, wrong as the thing you see.
 */
function HeroGrid() {
  const paint = `linear-gradient(to bottom, ${GRID_FROM}, ${GRID_TO})`;
  const rows = "repeating-linear-gradient(to bottom, #000 0 4px, transparent 4px 108.7px)";
  const columns = "repeating-linear-gradient(to right, #000 0 4px, transparent 4px 112px)";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
      {/* `Group 238557` — 4px columns on a 112px pitch. */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: paint, maskImage: columns, WebkitMaskImage: columns }}
      />
      {/* `Group 238558` — 4px rows on a 108.7px pitch, rotated -7.05°. */}
      <div
        className="absolute inset-[-25%]"
        style={{
          transform: "rotate(-7.05deg)",
          backgroundImage: paint,
          maskImage: rows,
          WebkitMaskImage: rows,
        }}
      />
    </div>
  );
}

/**
 * A dish: 124px circle with an 8px inside stroke in Orange (#EA5220). The
 * stroke is an overlay rather than a CSS `border` so the photo still fills the
 * full 124px, the way an inside stroke does in Figma, instead of being inset.
 */
function Dish({
  src,
  priority = false,
  blurred = false,
  ring = "border-8",
  className,
  style,
}: {
  src: string;
  priority?: boolean;
  /** 264:2648–264:2653 sit at 40% under a 12px Figma layer blur; CSS blur is half. */
  blurred?: boolean;
  /** The inside stroke, thinned to match when the dish is drawn smaller. */
  ring?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("relative size-(--dish)", blurred && "opacity-40 blur-[6px]", className)}
      style={style}
    >
      <Image
        src={src}
        alt=""
        width={124}
        height={124}
        priority={priority}
        className="size-full rounded-full object-cover"
      />
      <span className={cn("border-brand absolute inset-0 rounded-full", ring)} />
    </div>
  );
}

/**
 * 264:2640 — the scalloped cream blob, the one sharp dish (264:2645) and its
 * rotated label (264:2646). Kept together because the label is positioned
 * against the blob, not the canvas.
 */
function NoodleBlob({
  className,
  style,
  ...rest
}: {
  className?: string;
  style?: CSSProperties;
} & { "aria-hidden"?: boolean }) {
  return (
    <div className={cn("relative size-[173px] [--dish:124px]", className)} style={style} {...rest}>
      {blobCircles.map((circle) => (
        <span
          key={`${circle.left}-${circle.top}`}
          className="bg-cream absolute size-[100px] rounded-full"
          style={{ left: circle.left, top: circle.top }}
        />
      ))}
      <Dish
        src="/images/hero/spicy-noodles@2x.webp"
        priority
        className="absolute max-w-none"
        style={{ left: 24, top: 20 }}
      />
      {/*
        97 x 26 pill rotated -16.19° (Figma reports -0.28253 rad), offset from
        the blob's own origin. The rotation makes it stand ~13px taller than its
        box, which is the visual top of the whole group.
      */}
      <div
        className="bg-accent absolute flex h-[26px] w-[97px] items-center justify-center rounded-[32px]"
        style={{ left: -3.3, top: -13, transform: "rotate(-16.19deg)" }}
      >
        {/* 264:2647 — Inter 12/18, -0.06px, textCase TITLE. */}
        <span className="text-ink font-sans text-[12px] leading-[18px] tracking-[-0.06px] whitespace-nowrap capitalize">
          {hero.dishLabel}
        </span>
      </div>
    </div>
  );
}

/**
 * Where the six scattered dishes go on a narrow field, as shares of the
 * section's own box.
 *
 * The design flanks the copy with two arcs of three across a 1440-wide field.
 * That arrangement is kept — three down the left edge, three down the right —
 * but mapped onto a box that is tall rather than wide, so the dishes still
 * frame the copy instead of piling into a band above it. The negative offsets
 * are deliberate: the design lets its outer dishes run off the canvas, and the
 * section clips these the same way.
 */
const narrowSpots = [
  { left: "-10%", top: "45%" },
  { left: "12%", top: "60%" },
  { left: "-5%", top: "75%" },
  { left: "80%", top: "43%" },
  { left: "88%", top: "61%" },
  { left: "66%", top: "76%" },
] as const;

export function Hero() {
  return (
    <section
      className={cn(
        "bg-cream relative isolate overflow-hidden",
        // The design's arc bottom (935) plus the 24px of cream it leaves
        // beneath. 66.5972vw * 1440 = 959, so the canvas keeps the design's
        // own height and narrower screens fall back to their content.
        "min-h-[clamp(600px,66.5972vw,959px)]",
        // Room under the focal dish for the arc to close. None at the canvas,
        // where the ellipse supplies its own.
        "canvas:pb-0 pb-14",
      )}
    >
      {/*
        The narrow field: the section's own box with an elliptical bottom edge,
        so it always ends just under the copy however the text wraps.
      */}
      <div
        aria-hidden
        className="bg-ink canvas:hidden absolute inset-0 -z-10 overflow-hidden"
        style={{ borderBottomLeftRadius: "50% 14%", borderBottomRightRadius: "50% 14%" }}
      >
        <HeroGrid />
      </div>

      {/*
        264:2262 — the design's ellipse, verbatim: 1581 x 1354 at -72, -419 on
        the 1440 canvas, so the arc bottoms out at y=935.
      */}
      <div
        aria-hidden
        className="bg-ink canvas:block absolute top-0 left-[-5%] -z-10 hidden h-[1354px] w-[109.79%] -translate-y-[419px] overflow-hidden rounded-[50%]"
      >
        {/*
          The grid's vertical anchor is the design's: the ellipse's top sits at
          section y -1140, so 1108 from it lands on hero y -32, and the run is
          the design's 1023 tall. Horizontally it just spans the ellipse — the
          columns repeat every 112px, so where the tiling starts only shifts the
          phase of a texture.
        */}
        <div className="absolute inset-x-0" style={{ top: 387, height: 1023 }}>
          <HeroGrid />
        </div>
      </div>

      {/* The re-composed scatter. Same six dishes, same blur, same stroke. */}
      <div
        aria-hidden
        className="canvas:hidden pointer-events-none absolute inset-0 [--dish:clamp(58px,16.5vw,104px)]"
      >
        {heroDishes.map((dish, index) => (
          <Dish
            key={`narrow-${index}`}
            src={dish.src}
            blurred
            ring="border-[5px]"
            className="absolute"
            style={narrowSpots[index]}
          />
        ))}
      </div>

      {/* Copy block — 264:2615: 915 wide, 243 from the top, gap 40. */}
      <div className="canvas:px-0 relative mx-auto flex w-full max-w-[915px] flex-col items-center gap-[clamp(24px,2.7778vw,40px)] px-5 pt-[clamp(104px,16.875vw,243px)] sm:px-8">
        {/* 264:2616 — gap 16. */}
        <div className="flex flex-col items-center gap-4 text-center text-white">
          {/*
            264:2617. Gelica SemiBold 60/72, -1.2px, `textCase: TITLE`. The
            display face is substituted — see globals.css.
          */}
          <h1 className="text-[clamp(30px,4.1667vw,60px)] leading-[1.2] font-semibold tracking-[-0.02em] capitalize">
            {hero.headline.lead}
            <span className="text-accent">{hero.headline.highlight}</span>
          </h1>
          {/* 264:2618 — Inter 18/27, -0.09px, fixed 739 wide. */}
          <p className="max-w-[739px] font-sans text-[clamp(16px,1.25vw,18px)] leading-[1.5] font-normal tracking-[-0.005em]">
            {hero.subhead}
          </p>
        </div>

        {/*
          264:2619 — 566 wide, radius 48, cream fill, 1px #E0E0E0 hairline,
          padding 8 with a 24 lead-in, space-between. The lead-in tightens on a
          phone so the placeholder is not squeezed against the button.
        */}
        <form
          method="get"
          action="/vendors"
          role="search"
          className="bg-cream canvas:pl-6 flex w-full max-w-[566px] items-center justify-between gap-2 rounded-[48px] border border-[#e0e0e0] py-2 pr-2 pl-4 shadow-[0_9px_26px_-12px_rgba(226,235,223,0.25)]"
        >
          {/* 264:2633 — gap 4. */}
          <span className="flex min-w-0 flex-1 items-center gap-1">
            <Icon src="/icons/search.svg" size={24} insetY={16.67} insetX={17.15} />
            <label htmlFor="hero-search" className="sr-only">
              {hero.searchLabel}
            </label>
            {/* 264:2638 — Inter 11/16.5, no tracking. */}
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder={hero.searchPlaceholder}
              className="text-ink placeholder:text-ink w-full min-w-0 bg-transparent font-sans text-[11px] leading-[16.5px] outline-none"
            />
          </span>
          <Button className="shrink-0 cursor-pointer" type="submit">
            {hero.cta}
          </Button>
        </form>

        {/*
          The design's sharp labelled dish (264:2645), which anchors the lower
          right of the 1440 composition. On a narrow field it becomes the focal
          piece directly under the search bar — the one dish drawn at full size
          and in focus, with the arc closing beneath it.
        */}
        <NoodleBlob aria-hidden className="canvas:hidden mt-1" />
      </div>

      {/*
        Decorative stage — the design's 1440 canvas at design size, centred.
        Every dish sits exactly where the design puts it; nothing here is
        repositioned or rescaled.
      */}
      <div
        aria-hidden
        className="canvas:block pointer-events-none absolute top-0 left-1/2 hidden h-[959px] w-[1440px] -translate-x-1/2 [--dish:124px]"
      >
        {heroDishes.map((dish, index) => (
          <Dish
            key={`${dish.left}-${dish.top}`}
            src={dish.src}
            priority={index < 2}
            blurred
            className="absolute"
            style={{ left: dish.left, top: dish.top }}
          />
        ))}
        <NoodleBlob className="absolute" style={{ left: 661, top: 720 }} />
      </div>
    </section>
  );
}
