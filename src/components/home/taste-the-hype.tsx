import Image from "next/image";

import { CoverageMap } from "@/components/home/coverage-map";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { coverageLocations, coverageMapsUrl } from "@/content/coverage";
import { hype } from "@/content/home";

/**
 * Taste the hype — Figma node 264:2886 (1440 x 1006, at page y 6135).
 *
 * A heading and CTA over two 580 x 680 cards with a 50px radius. Both cards clip
 * a photo larger than themselves, so each image is baked to the crop the frame
 * performs rather than positioned and clipped at runtime.
 *
 * HOW IT RESPONDS
 *
 * The two cards keep their 580 x 680 proportions until there is no room, then
 * stack and fill the measure; their radius scales with them so the corner never
 * looks heavier than the card. The live map keeps working at every width — it
 * refits its bounds on resize — and the "Order anywhere" badge moves from the
 * design's own spot to the card's bottom edge once the card is too narrow to
 * hold it there.
 *
 * The 50px radius is set on the cards only, never also on the images they clip.
 * Two rounded masks over the same corner multiply their antialiasing and feather
 * the curve over several pixels; the design's edge is a clean one-pixel step.
 *
 * The design's decorative grid frame (264:2887) is `visible: false` here, so it
 * is deliberately absent.
 */
export function TasteTheHype() {
  return (
    <section
      aria-labelledby="hype-heading"
      className="bg-cream-light canvas:h-[1006px] relative overflow-hidden"
    >
      {/* 264:2931 — heading over CTA, gap 24, centred. */}
      <div className="canvas:absolute canvas:inset-x-0 canvas:top-[112px] canvas:px-0 canvas:pt-0 relative flex flex-col items-center gap-6 px-(--spacing-gutter) pt-16">
        {/* 264:2932 — Gelica Black 48/56.88 over a hard Orange shadow. */}
        <h2
          id="hype-heading"
          className="text-ink max-w-none text-center text-[clamp(26px,3.3333vw,48px)] leading-[1.185] font-extrabold drop-shadow-[0_4px_4px_#EA5220]"
        >
          {hype.heading}
        </h2>
        {/*
          264:2933 — the same Button as everywhere else (148:7465), with the
          location pin in place of the arrow.
        */}
        <ButtonLink
          href="/vendors"
          icon={
            <Icon
              src="/icons/location.svg"
              // Figma exports the pin filled #373737; on the green plate it is
              // white, so it is tinted from the button's own text colour.
              tint
              className="text-white"
              size={30}
              insetY={6.25}
              insetX={18.75}
            />
          }
        >
          {hype.cta}
        </ButtonLink>
      </div>

      {/*
        264:2926 and 264:2929 — 580 x 680 each, 20px apart, the pair centred on
        the canvas.
      */}
      <div className="canvas:absolute canvas:inset-x-0 canvas:top-[297px] canvas:mt-0 canvas:flex-row canvas:gap-5 canvas:px-0 canvas:pb-0 relative mx-auto mt-10 flex flex-col items-center justify-center gap-8 px-(--spacing-gutter) pb-16 lg:flex-row lg:items-stretch">
        {/* Frame 61 — the photo fills the card. */}
        <div className="canvas:w-[580px] relative h-[clamp(300px,47.2222vw,680px)] w-full max-w-[580px] overflow-hidden rounded-[clamp(24px,3.4722vw,50px)] bg-white">
          <Image
            src="/images/hype/couch@2x.webp"
            alt={hype.photoAlt}
            width={580}
            height={680}
            className="h-full w-full object-cover"
          />
        </div>

        {/*
          Frame 62. DIRECTED, twice over:

          1. The map fills the card. The design sizes it 584 tall in a 680 card,
             leaving a 96px band of the card's white below it and a hard edge
             where the map stops, which read as unequal card heights.
          2. It is a REAL map, not the design's flat screenshot — see
             `CoverageMap`. The card still clips it to the 50px radius.

          The card is a fixed 680 at the canvas width and 420 below it, because
          a slippy map has no intrinsic height to flow to.
        */}
        <div className="canvas:w-[580px] relative h-[clamp(300px,47.2222vw,680px)] w-full max-w-[580px] overflow-hidden rounded-[clamp(24px,3.4722vw,50px)] bg-white">
          <CoverageMap className="h-full w-full" />

          {/*
            The map itself is aria-hidden — a pile of tile <img>s and absolutely
            positioned pins is noise to a screen reader. The information it
            carries, which towns Kula covers, is given here in text instead.
          */}
          <p className="sr-only">
            {hype.mapAlt}: {coverageLocations.map((l) => l.name).join(", ")}.
          </p>

          {/*
            264:2934 — the badge, at 324,479 within this card. Two ellipses: a
            solid green one and an inner one ringed in sand.
          */}
          {/*
            264:2934 — the badge, at 324,479 within this card. Two ellipses: a
            solid green one and an inner one ringed in sand.

            DIRECTED: a real link, opening Google Maps over the same area in a
            new tab. It sits above Leaflet's panes, which run to z-index 700, so
            the stacking value has to clear them rather than the usual z-10.
          */}
          <a
            href={coverageMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${hype.badge} — open the Kula delivery area in Google Maps`}
            className="canvas:top-[479px] canvas:bottom-auto canvas:left-[324px] canvas:h-[87px] canvas:w-[240px] canvas:translate-x-0 absolute bottom-5 left-1/2 z-[900] flex h-[clamp(56px,6.0417vw,87px)] w-[clamp(168px,16.6667vw,240px)] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[50%] bg-[var(--color-forest)] transition-[transform,box-shadow] duration-200 ease-out hover:scale-[1.04] hover:shadow-[0_10px_24px_-6px_rgba(3,103,41,0.65)] active:scale-[0.98] motion-reduce:transition-none"
          >
            <span className="border-sand absolute inset-x-2 inset-y-[5px] rounded-[50%] border-[2.59px]" />
            {/* 264:2937 — Gelica Black 26.06/39.09. */}
            <span className="text-accent relative text-[clamp(18px,1.8097vw,26.06px)] leading-[1.5] font-extrabold">
              {hype.badge}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
