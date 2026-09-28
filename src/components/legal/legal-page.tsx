import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

/**
 * Shared shell for the three legal documents — Terms & Conditions (533:6982),
 * Privacy Policy (564:2316) and Refund Policy (564:2465).
 *
 * The three frames are the same drawing with different words, and the cache
 * proves it: an ink hero band (`Frame 2147239790`, 1440 x 564 — 564:1195 /
 * 564:2428 / 564:2568) carrying a rotated "Legal" pill, a title and a one-line
 * intro, then a single column of headed prose blocks (`Frame 2147224731`,
 * 1280 wide at an 80px gutter — narrower than the site's usual 100px, and the
 * design's own number). Every visual value lives here; every word lives in the
 * page's content module.
 *
 * The "Need to Reach us?" band that follows the prose on all three pages
 * (574:2728 / 574:2786 / 574:2843-equivalent) is node-for-node identical to the
 * one on Home — a structural diff of all 57 nodes comes back empty — so it is
 * not transcribed here. Pages pass `<ReachUs />` in as `children` instead.
 */

/**
 * One headed prose block — Figma `Frame 2147224xxx`: a VERTICAL auto-layout,
 * itemSpacing 24, holding exactly one heading and one body text node.
 */
export interface LegalSection {
  /** Figma node id of the block frame, so copy can be traced to the design. */
  readonly nodeId?: string;
  /** Clause heading exactly as drawn, numbering included: "1. Introduction". */
  readonly heading: string;
  /**
   * The clause body, verbatim from Figma's `characters`.
   *
   * The design draws each clause as ONE text node, so its `\n`s are literal
   * line breaks — there are no bullets, list markers or indents anywhere in the
   * three documents, and an empty source line is an empty 27px line on the
   * page. `white-space: pre-line` reproduces that exactly, which is why this is
   * a single string rather than an array of paragraphs: splitting it would
   * force a decision about spacing that the design has already made.
   *
   * Verified against the cache on Terms: every block's height is an exact
   * multiple of the 27px line box, and the 12 heights sum with the eleven 64px
   * gaps to 563:1249's own 2286. Where a body's height exceeds
   * `27 * (its newline count + 1)` — blocks 2, 4, 8, 9 and 10 — the extra line
   * is Figma WRAPPING that source line at the 1280px measure, not a break the
   * transcription may add. Inter is the real face here, not a substitution, so
   * the browser reproduces those wraps.
   */
  readonly body: string;
}

/** The complete content of one legal page. */
export interface LegalDocument {
  /** The small rotated pill above the title (564:2314) — "Legal" on all three. */
  readonly eyebrow: string;
  /** The page title (564:2309). Stored in the design's casing; see `capitalize`. */
  readonly title: string;
  /** The single line beneath the title (564:2310). */
  readonly intro: string;
  /** The prose blocks, in the order the design lists them. */
  readonly sections: readonly LegalSection[];
}

/**
 * 564:2313 — the "Legal" pill: 100 x 37 unturned, radius 32, accent fill, a 1px
 * ink stroke set INSIDE, and a hard 0/2 drop shadow in the fill's own colour
 * (which is what leaves the 2px yellow sliver under the outline).
 *
 * The cache carries no `relativeTransform` for any node in this file, so the
 * angle is derived from the bounding boxes instead. The frame hugs a 36 x 21
 * text node inside 32/8 padding, so unturned it is 100 x 37; its AABB is
 * 105.28596 x 55.73913. Solving `W = w·cos + h·sin`, `H = w·sin + h·cos` gives
 * cos 0.980912 / sin 0.194454 — a rotation of 11.2145°. The AABB alone cannot
 * give the sign; it is counter-clockwise, matching the identical sticker on the
 * Home hero (264:2646), which the cached render 264-2260.png shows tilting up
 * to the right.
 *
 * It is positioned against the TITLE, not the canvas. Its absolute x tracks the
 * title's width across the three pages (385 on Terms, 497 on Privacy and
 * Refunds) while its offset from the title's own left edge stays at -33.4px
 * ±2px, and its vertical offset is -33.63px on all three to the pixel. So
 * anchoring it to the heading is the design's own relationship — and it is the
 * only anchoring that survives the Gelica → Bitter substitution changing how
 * wide each title renders.
 *
 * `left`/`top` place the UNTURNED box; CSS rotates about the centre, which is
 * what reproduces the measured AABB.
 *
 * The offsets below `canvas` are derived, and they are not free choices. The
 * design threads this gap: rotation grows the pill's 37px box to a 55.66px
 * AABB, so its lowest point sits 46.33px below whatever `top` says, and at
 * -33.63 that lands 12.7px under the title's line-box top — 0.2px clear of the
 * 60/72 title's ink, which starts at 12.9. The smaller type steps start their
 * ink higher inside a shorter line box, so the same `top` would drive the pill
 * straight through the word. Each step below therefore keeps the same 0-1px
 * clearance against its own ink top ((L - 0.752·F) / 2, the ratio measured off
 * 564:2309). `left` likewise tightens as the page gutter narrows, so the pill
 * never leaves the viewport.
 *
 * Below the canvas the title is 30px on a 36px line, so its ink starts 6.7px
 * down and the pill's foot must sit at -1 against that: top = 6.7 - 1 - 46.33
 * = -40.6. `left` pulls in to -4, because a phone title fills the measure and
 * the canvas -33.41 put the pill 8px from the screen edge, over the words.
 */
function EyebrowPill({ children }: { children: ReactNode }) {
  return (
    <span
      className="bg-accent text-ink inset-ring-ink canvas:top-[-33.63px] canvas:left-[-33.41px] absolute top-[-40.6px] left-[-4px] inline-flex items-center rounded-[32px] px-[32px] py-[8px] text-[14px] leading-[21px] font-normal tracking-[-0.07px] whitespace-nowrap capitalize shadow-[0_2px_0_0_var(--color-accent)] inset-ring-1"
      style={{ transform: "rotate(-11.2145deg)" }}
    >
      {children}
    </span>
  );
}

export function LegalPage({
  document: doc,
  children,
}: {
  document: LegalDocument;
  /** Sections the page renders after the prose — the shared contact band. */
  children?: ReactNode;
}) {
  return (
    <>
      <article>
        {/*
          564:1195 — the ink band, 1440 x 564, fill `Primary Green`.

          `z-10` and no `overflow-hidden`: the wave at the foot of this section
          hangs 36px past the band and has to paint OVER the cream section that
          follows it, which a later sibling would otherwise cover.
        */}
        <section aria-labelledby="legal-title" className="bg-ink text-paper relative z-10">
          {/*
            564:1196 "Food_Pattern_5_01 1" — a 1443 x 1276 rect at band-local
            (-1, -712) at 6% opacity. fills[0] is `visible: false`; fills[1] is
            the live one, scaleMode STRETCH with imageTransform
            [[1,0,0],[0,0.88426888,0]], i.e. the source's full width and top
            88.43%. Baked to exactly the 1440 x 564 slice the band reveals, so
            the crop is the design's rather than a runtime approximation — the
            crop rectangle's aspect comes out at 2.5532, the band's exactly.
          */}
          <Image
            src="/images/legal/hero-pattern@2x.webp"
            alt=""
            aria-hidden
            width={1440}
            height={564}
            sizes="100vw"
            priority
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.06]"
          />

          <Container className="relative">
            {/*
              564:2308 — 915 wide, centred, gap 16, its top at 265 and 184 of
              band left beneath (265 + 72 + 16 + 27 + 184 = 564). The 265/184
              split is the design's; the smaller steps below `canvas` are
              derived, and clear the fixed header.
            */}
            <div className="mx-auto flex w-full max-w-[915px] flex-col items-center gap-4 pt-[clamp(140px,18.4028vw,265px)] pb-[clamp(88px,12.7778vw,184px)]">
              {/*
                `w-fit` so the pill can hang off the title's own left edge. It
                costs nothing: the text node is centred inside its 915 frame, so
                hugging it and centring the hug lands in the same place, and if
                the title ever outgrew 915 the hug would fill and wrap exactly
                as the fixed frame does.
              */}
              <div className="relative w-fit">
                {/*
                  564:2309 — Gelica SemiBold 60/72, -1.2px, white,
                  `textCase: TITLE`. `capitalize` is that transform, not a
                  guess: the cached render of the Home headline (264:2617, same
                  textCase) shows Figma capitalising every word including "Of"
                  and "At", which is precisely what CSS `capitalize` does. The
                  content module keeps the untransformed characters.
                */}
                <h1
                  id="legal-title"
                  className="text-center text-[clamp(30px,4.1667vw,60px)] leading-[1.2] font-semibold tracking-[-0.02em] capitalize"
                >
                  {doc.title}
                </h1>
                <EyebrowPill>{doc.eyebrow}</EyebrowPill>
              </div>

              {/* 564:2310 — Inter 18/27, -0.09px, white, 739 wide, centred. */}
              <p className="max-w-[739px] text-center text-[clamp(16px,1.25vw,18px)] leading-[1.5] font-normal tracking-[-0.005em]">
                {doc.intro}
              </p>
            </div>
          </Container>

          {/*
            576:2959 "Vector 34" — 1471 x 112 at band-local y 488, filled in the
            band's own ink. Its top edge is flat and invisible against the band;
            its wavy bottom edge scallops 36px into the section below, which is
            where `bottom-[-36px]` comes from (488 + 112 = 600, i.e. 36 past the
            band's 564).

            Drawn as a masked div rather than an <img>, the same technique
            site-header.tsx uses for its wave band: the SVG carries only the
            silhouette, the fill stays a token, and the shape is authored
            `preserveAspectRatio="none"` so it spans any viewport width instead
            of the design's fixed 1471 (which would overflow 1440 and scroll).

            The SVG itself cannot be exported while Figma is rate-limited — it is
            listed as an outstanding asset. It is deliberately NOT substituted
            with one of the existing /icons/header-wave-*.svg files: those are
            different vectors (Vector 31/32/33) and only look similar.
          */}
          <div
            aria-hidden
            className="bg-ink pointer-events-none absolute inset-x-0 bottom-[-36px] h-[112px]"
            style={{
              maskImage: "url(/icons/legal-hero-wave.svg)",
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskImage: "url(/icons/legal-hero-wave.svg)",
              WebkitMaskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </section>

        {/*
          563:1249 — the prose column: 1280 wide inside an 80px gutter, starting
          at page y 682 (118 below the band) and ending 160 above the contact
          band. The page frame behind it is `hero` (533:6984), filled cream.
          Vertical gaps below `lg` are derived.
        */}
        <div className="bg-cream pt-[118px] pb-[160px]">
          {/* 80 at the canvas, tapering to the site's 20px thumb margin like
              --spacing-gutter; a fixed 80 left a 230px column on a phone. */}
          <Container className="px-[clamp(20px,5.5556vw,80px)]">
            {/* VERTICAL auto-layout, itemSpacing 64. */}
            <div className="flex flex-col gap-[64px]">
              {doc.sections.map((section) => (
                /* Each block: VERTICAL auto-layout, itemSpacing 24. */
                <section
                  key={section.nodeId ?? section.heading}
                  className="flex flex-col gap-[24px]"
                >
                  {/* Gelica Rg Bold 32/37.92, -0.3px, `Primary Color`. */}
                  <h2 className="text-navy font-display text-[clamp(21px,2.2222vw,32px)] leading-[1.185] font-bold tracking-[-0.009375em]">
                    {section.heading}
                  </h2>
                  {/*
                    Inter 18/27, -0.09px, `Primary Color`. `pre-line` keeps the
                    design's own line breaks — see `LegalSection.body`.
                  */}
                  <p className="text-navy text-[clamp(16px,1.25vw,18px)] leading-[1.5] font-normal tracking-[-0.005em] whitespace-pre-line">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </Container>
        </div>
      </article>

      {children}
    </>
  );
}
