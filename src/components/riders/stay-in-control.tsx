import Image from "next/image";

import { StoreBadgeLink } from "@/components/ui/store-badge";
import { storeBadges } from "@/content/footer";
import { ridersControl } from "@/content/riders-page";
import { cn } from "@/lib/cn";

/**
 * Stay in control of your time — Figma node 441:6800 ("Frame 2147239764",
 * 1280 x 1124 at page x 80, y 851).
 *
 * An Accent Yellow card with a 68px radius and a 1px Primary Green inside
 * stroke, laid over the bottom of the hero: the hero plate runs to y 1372 and
 * this card starts at 851, so it overlaps by 521px. That is the whole reason
 * for the negative top margin — the card is not "after" the hero in the design,
 * it sits on top of it.
 *
 * The card is 1280 wide inside the 1440 canvas, i.e. an 80px gutter rather than
 * the site's usual 100px `Container`, so it lays out its own width.
 *
 * The stroke is transcribed as an `inset-ring`, not a `border`: Figma's INSIDE
 * stroke overlaps the padding and does not displace the contents, which is what
 * an inset ring does and a border does not.
 */

/** 441:6840 / 441:6842 / 441:6844 — the same 509 x 160 clipped frame, 24px apart. */
const swooshTops = [335, 359, 383] as const;

/** 441:6850 / 441:6856 / 441:6862 — a white pill, 623 x 56, radius 80/56/48. */
function BenefitPill({ text, tone }: { text: string; tone: string }) {
  return (
    <li
      /*
        56 tall as drawn. Below the canvas the pill is too narrow for the copy to
        stay on one line, so it hugs its lines (min 56) instead of squeezing two
        or three of them into a fixed 56 at line-height 1.
      */
      className="bg-paper inset-ring-ink canvas:h-14 canvas:py-0 flex min-h-14 items-center gap-3 rounded-[28px] px-6 py-3 inset-ring-1"
    >
      {/* 441:6852 — a 20px Green Mid disc with a 1.5px inside stroke. */}
      <span className="bg-green-mid inset-ring-near-black flex size-5 shrink-0 items-center justify-center rounded-full inset-ring-[1.5px]">
        {/* 441:6853 / 441:6854 — an 11 x 11 frame holding a 1.375px white tick. */}
        <Image
          src="/icons/riders-check.svg"
          alt=""
          width={11}
          height={11}
          className="h-[11px] w-[11px]"
        />
      </span>
      {/* 441:6855 etc. — Gelica Medium 20/20. */}
      <span
        className={cn(
          "font-display canvas:leading-[1] text-[clamp(16px,1.3889vw,20px)] leading-[1.25] font-medium",
          tone,
        )}
      >
        {text}
      </span>
    </li>
  );
}

/** 441:6825 / 441:6831 — 197 x 56, radius 120, Primary Green with a white ring. */

export function StayInControl() {
  return (
    <section
      aria-labelledby="riders-control-heading"
      className="canvas:-mt-[521px] relative isolate -mt-8 md:-mt-14 lg:-mt-24"
    >
      <div className="canvas:px-20 relative mx-auto w-full max-w-(--width-canvas) px-(--spacing-gutter)">
        {/*
          441:6773 "Eyes 3" — 172.35 x 231.26 at page (1159, 1927), i.e. 1076px
          down the card. It is a sibling *under* the card in the design's paint
          order, so its top 48px are hidden behind the card and only the rest
          shows below the bottom edge. `z-0` rather than a negative z-index: a
          negative one would drop it behind this section's own box.
        */}
        <Image
          aria-hidden
          src="/icons/riders-eyes.svg"
          alt=""
          width={172}
          height={231}
          className="canvas:top-[1076px] canvas:right-auto canvas:bottom-auto canvas:left-[1159px] canvas:h-[231.26px] canvas:w-[172.35px] absolute right-3 -bottom-6 z-0 block h-auto w-[clamp(72px,11.9688vw,172.35px)] max-w-none"
        />

        <div
          className={cn(
            "bg-accent inset-ring-ink relative z-10 w-full inset-ring-1",
            "rounded-[clamp(28px,4.7222vw,68px)] px-5 py-10 sm:px-8",
            "canvas:h-[1124px] canvas:rounded-[68px] canvas:px-0 canvas:py-0",
          )}
        >
          {/*
            The artwork layer. Every offset is measured on the 1280 x 1124 card,
            so it is written as a share of it: the layer holds that aspect below
            the canvas and the swooshes and mascots scale together instead of
            scattering. At the canvas the card IS 1280 x 1124, so the shares
            resolve to the design's own offsets exactly.
          */}
          <div
            aria-hidden
            className="canvas:inset-0 canvas:aspect-auto pointer-events-none absolute inset-x-0 top-0 block aspect-[1280/1124]"
          >
            {swooshTops.map((top) => (
              <Image
                key={top}
                src="/icons/riders-control-swoosh.svg"
                alt=""
                width={509}
                height={160}
                className="absolute left-[57.266%] h-[14.235%] w-[39.766%] max-w-none opacity-20"
                style={{ top: `${(top / 1124) * 100}%` }}
              />
            ))}

            {/*
              441:6846 "Mystery Item A". Figma reports rotation = 180°, which is
              either a true half-turn or a horizontal flip — atan2 gives 180° for
              both, and this cache carries no `relativeTransform` to tell them
              apart by determinant.

              Its drop shadow settles it. The shadow is offset (0, +4) with
              radius 20, and effects transform with the node, so a half-turn
              would flip that to (0, -4) and put the render bounds 24px above the
              box and 16px below. Figma reports the opposite — render y 1294
              against a box y of 1310, i.e. -16 top / +24 bottom — so the shadow
              still points DOWN and the transform preserves +y. That rules out a
              half-turn and leaves the horizontal flip, which is what is drawn.
            */}
            <Image
              src="/images/riders/mascot-thumbs-up@2x.webp"
              alt=""
              width={283}
              height={304}
              className="canvas:top-[40.836%] absolute top-[8.5%] left-[76.641%] h-[27.046%] w-[22.109%] max-w-none scale-x-[-1] drop-shadow-[0_4px_20px_color-mix(in_srgb,var(--color-void)_45%,transparent)]"
            />

            {/*
              441:6847 "Mystery Item B" — unrotated, and painted over A.

              Below the canvas both mascots move up beside the eyes. The layer
              keeps the card's 1280:1124 aspect, so on a narrow card their design
              height (~36-41% down) is exactly where the two-line headline sits,
              and they were drawn on top of "control of". The top-right corner is
              the room the narrow card actually leaves.
            */}
            <Image
              src="/images/riders/mascot-waving@2x.webp"
              alt=""
              width={251}
              height={251}
              className="canvas:top-[36.299%] absolute top-[4%] left-[64.297%] h-[22.331%] w-[19.609%] max-w-none drop-shadow-[0_4px_12px_color-mix(in_srgb,var(--color-void)_55%,transparent)]"
            />
          </div>

          {/* 441:6802 "Eyes 3" — 138.41 x 116.53 at (50, 72) on the card. */}
          <Image
            aria-hidden
            src="/icons/riders-control-eyes.svg"
            alt=""
            width={138}
            height={117}
            className="canvas:absolute canvas:top-[72px] canvas:left-[50px] canvas:mb-0 canvas:h-[116.53px] canvas:w-[138.41px] relative mb-2 block h-auto w-[clamp(84px,9.6118vw,138.41px)] max-w-none"
          />

          {/*
            441:6821 — Gelica Bold 70/82.95 over a hard shadow, rotated -5.274°.

            Figma gives the rotated bounding box (711.52 x 229.57 at 59, 141.77 on
            the card); the text frame itself is 699.2 x 166 — two lines of 82.95 —
            and is placed here by the centre those two share (414.76, 256.55), so
            the rotation lands where the design draws it. Using the box's own
            left/top would shift the headline 6px left and 32px up.

            The drop shadow is `--color-brand-shadow` #ed5e3b, which is NOT the
            Orange the other two headings use (441:6518 and 441:6793 are both
            #ea5220 / `--color-brand`). Transcribed as drawn; the inconsistency
            is in the Figma file and is flagged for the designer.
          */}
          <h2
            id="riders-control-heading"
            className={cn(
              "text-ink max-w-none font-bold drop-shadow-[0_4px_4px_var(--color-brand-shadow)]",
              "relative w-full rotate-[-5.274deg] text-[clamp(32px,4.8611vw,70px)] leading-[1.185]",
              "canvas:absolute canvas:top-[173.56px] canvas:left-[65.16px] canvas:h-[166px] canvas:w-[699.2px]",
              "",
            )}
          >
            {ridersControl.heading}
          </h2>

          {/* 441:6849 — vertical, gap 24, 623 wide at (72, 415). */}
          <ul
            className={cn(
              "flex flex-col gap-6",
              "canvas:absolute canvas:top-[415px] canvas:left-[72px] canvas:mt-0 canvas:w-[623px] canvas:max-w-none relative mt-8 w-full",
              "",
            )}
          >
            {ridersControl.benefits.map((benefit, index) => (
              <BenefitPill
                key={benefit.node}
                text={benefit.text}
                // The design paints the first label Primary Green and the other
                // two #131313. Transcribed as drawn, inconsistent as it is.
                tone={index === 0 ? "text-ink" : "text-near-black"}
              />
            ))}
          </ul>

          {/* 441:6848 — Gelica Medium 48/64, centred, 1029 wide. */}
          <p
            className={cn(
              "text-near-black font-display max-w-none text-center font-medium",
              "relative mt-10 w-full text-[clamp(26px,3.3333vw,48px)] leading-[1.333333]",
              "canvas:absolute canvas:top-[760px] canvas:left-1/2 canvas:mt-0 canvas:w-[1029px] canvas:-translate-x-1/2",
              "",
            )}
          >
            {ridersControl.body}
          </p>

          {/* 441:6822 — vertical, cross-axis centred, gap 16, at (433, 952). */}
          <div
            className={cn(
              "flex flex-col items-center gap-4",
              "relative mx-auto mt-10 w-full max-w-[414px]",
              "canvas:absolute canvas:top-[952px] canvas:left-1/2 canvas:mx-0 canvas:mt-0 canvas:w-[414px] canvas:max-w-none canvas:-translate-x-1/2",
              "",
            )}
          >
            {/* 441:6823 — Roboto Flex 20/28. */}
            <p className="text-ink font-label text-center text-[clamp(16px,1.3889vw,20px)] leading-[1.4]">
              {ridersControl.appLabel}
            </p>

            {/* 441:6824 — horizontal, gap 20. */}
            <div className="flex flex-wrap justify-center gap-5">
              {storeBadges.map((badge) => (
                <StoreBadgeLink
                  key={badge.name}
                  href={badge.href}
                  icon={badge.iconOnDark}
                  iconWidth={badge.iconWidth}
                  iconHeight={badge.iconHeight}
                  eyebrow={badge.eyebrow}
                  name={badge.name}
                  className={cn(
                    "bg-ink text-paper inset-ring-paper justify-center inset-ring-2",
                    /*
                      The badge's hard 4/4/0 shadow (441:6825, 441:6831). Note
                      this is `--color-forest-shadow` #062612, NOT
                      `--color-forest-darkest` #002611 — different colours.
                    */
                    "shadow-[4px_4px_0_0_var(--color-forest-shadow)]",
                    "hover:shadow-[6px_6px_0_0_var(--color-forest-shadow)]",
                    "active:shadow-[2px_2px_0_0_var(--color-forest-shadow)]",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
