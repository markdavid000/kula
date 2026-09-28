import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { vendorsHero } from "@/content/vendors-page";

/**
 * Vendors hero — Figma node 510:20224 (1440 x 959 at page y 0), holding the
 * "hero" frame 510:20225 and the food band 520:6874.
 *
 * The frame is drawn 959 tall, but only its first 859px are ever seen: the
 * section below it (510:20049) is an opaque cream plate that starts at page y
 * 859 and paints over the rest, cutting the food band mid-artwork. `h-859`
 * plus `overflow-hidden` reproduces exactly that image with one box instead of
 * two, and the benefit panels then hang 141px back up into it — which is the
 * design's own overlap, not a nudge.
 *
 * The food band (520:6874) is drawn x=0 w=1440 — full-bleed across the design's
 * whole canvas — so it spans the VIEWPORT, not a centred 1440 box. The clip and
 * the height therefore live on the section itself. Only the copy column is
 * canvas-capped: it is centred, so `left-1/2 -translate-x-1/2` puts it in the
 * same place at 1440 and keeps it centred above that.
 */
export function VendorsHero() {
  return (
    <section
      aria-labelledby="vendors-hero-heading"
      className="bg-cream canvas:h-[859px] relative overflow-hidden"
    >
      <div className="relative">
        {/* 510:20226 — vertical, cross-axis centred, gap 16, 915 wide at x 263. */}
        <div className="canvas:absolute canvas:top-[244px] canvas:left-1/2 canvas:w-[915px] canvas:max-w-none canvas:-translate-x-1/2 canvas:px-0 canvas:pt-0 relative z-10 mx-auto flex w-full flex-col items-center px-(--spacing-gutter) pt-[clamp(112px,16.9444vw,244px)]">
          {/*
            510:20227 — Gelica SemiBold 60/72, -1.2, centred, textCase Title.
            One text node with two colour runs: "Sell More. " in Primary Green,
            "Grow More." in Orange.
          */}
          <h1
            id="vendors-hero-heading"
            className="text-ink text-center text-[clamp(30px,4.1667vw,60px)] leading-[1.2] font-semibold tracking-[-0.02em] capitalize"
          >
            {vendorsHero.titleLead}
            <span className="text-brand">{vendorsHero.titleAccent}</span>
          </h1>

          {/* 510:20228 — Inter 18/27, -0.09, 739 wide inside the 915 column. */}
          <p className="text-ink canvas:w-[739px] canvas:max-w-none mt-4 w-full max-w-[739px] text-center text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em]">
            {vendorsHero.subtitle}
          </p>

          {/*
            510:20229 — the shared Button (148:7465). Its trailing glyph is the
            `location` instance and it is `visible: false` here, so no icon is
            drawn. The design gives the button no destination; /contact is where
            every other "start selling" CTA on the site goes.
          */}
          <div className="mt-9">
            <ButtonLink href="/contact" showArrow={false}>
              {vendorsHero.cta}
            </ButtonLink>
          </div>
        </div>

        {/*
          520:6874 — 1440 x 538 at y 398, an alpha PNG whose aspect (2051:767)
          the box matches exactly, so it is a straight resize with no crop. It
          paints over the headline stack in the design too; the artwork is
          transparent where they meet.

          Below the canvas width it drops into flow under the copy: held at
          y 398 it would be a 146px-tall sliver marooned in the middle of an
          otherwise empty band. It is also held to a minimum width and cropped
          rather than squeezed down to the viewport, so the food stays legible
          on a phone instead of becoming a 146px ribbon.
        */}
        <div className="canvas:mt-0 canvas:h-auto canvas:overflow-visible relative mt-10 h-[clamp(284px,37.3611vw,538px)] w-full overflow-hidden">
          <Image
            src="/images/vendors/food-band@2x.webp"
            alt=""
            width={1440}
            height={538}
            // The band is 759 x 283 art. From 760px up its box is 100vw x
            // 37.3611vw — the art's own ratio — but below that it holds 760
            // wide, so the height floors at 284 (760 / 2.677) rather than 200,
            // which had squashed the food 42% flat on a phone.
            //
            // Never narrower than its 760px floor, otherwise the viewport width.
            // Without this the browser assumes 1440 and a phone downloads 3840w.
            sizes="(max-width: 760px) 760px, 100vw"
            priority
            className="canvas:absolute canvas:inset-x-0 canvas:top-[398px] canvas:left-0 canvas:h-[538px] canvas:w-full canvas:min-w-0 canvas:translate-x-0 absolute left-1/2 h-full w-full max-w-none min-w-[760px] -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
