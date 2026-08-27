import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { ridersHero } from "@/content/riders-page";

/**
 * Riders hero — Figma node 517:1265 ("hero", 1440 x 1374 at page y -2).
 *
 * A Primary Green plate that runs from the top of the page to y 1372, with the
 * headline stack centred at y 242 and a scattering of flat decorative vectors
 * over it. The plate is 496px taller than its own content: the yellow "Stay in
 * control" card (441:6800) starts at y 851 and covers the rest of it, which is
 * why the next section pulls itself up by 521px rather than this one ending at
 * the wave.
 *
 * Two rectangles in the frame — 516:1190 (a 3% photographic wash) and 516:1195
 * — are `visible: false` in the file and are therefore not drawn.
 *
 * Everything absolute below is measured on the 1440 canvas, so it all lives
 * inside a centred `max-w-canvas` box: pinning to the viewport would push the
 * artwork off the composition the moment the window is wider than 1440. The
 * frame clips (`clipsContent: true`), which is what crops the rider
 * illustration at the right edge.
 */

/**
 * The flat vector decorations. Figma exports each glyph UNROTATED, and reports a
 * bounding box that is the AABB of the rotated result — so neither number can be
 * used on its own.
 *
 * Each piece is therefore drawn at its own unrotated size, centred on the centre
 * of Figma's bounding box, and then rotated. Rotating about the centre leaves
 * that centre fixed, so the painted AABB lands exactly on the design's box.
 *
 * The sizes are verified against the boxes: 129.347 x 57.695 rotated 5.54°
 * gives 134.31 x 69.91, which is 516:1202's box to four decimals.
 */
const decorations = [
  // 516:1202 — Primary Green Darkest (#002611), rotated -5.54°.
  {
    src: "/icons/riders-hero-mark-1.svg",
    left: 120.11,
    top: 188.36,
    w: 129.347,
    h: 57.695,
    rotate: -5.54,
  },
  // 516:1201 — the same glyph as 516:1200, unrotated.
  { src: "/icons/riders-hero-mark-2.svg", left: 926, top: 159, w: 178.2695, h: 57.695 },
  // 516:1200
  { src: "/icons/riders-hero-mark-2.svg", left: 385, top: 407, w: 178.2695, h: 57.695 },
  // 516:1197 — Accent Yellow with a Primary Green Darkest stroke, rotated -22.73°.
  {
    src: "/icons/riders-hero-spark-1.svg",
    left: 172.5,
    top: 335.3,
    w: 80.0595,
    h: 25.0198,
    rotate: -22.73,
  },
  // 516:1198 — the same glyph, rotated +18.78°.
  {
    src: "/icons/riders-hero-spark-2.svg",
    left: 1167.29,
    top: 411.92,
    w: 80.0595,
    h: 25.0198,
    rotate: 18.78,
  },
  // 516:1199 — a smaller glyph of the same family, rotated +39.6° at half opacity.
  {
    src: "/icons/riders-hero-spark-3.svg",
    left: 1222.66,
    top: 351.3,
    w: 49.7431,
    h: 15.9594,
    rotate: 39.6,
    opacity: 0.5,
  },
] as const;

export function RidersHero() {
  return (
    <section
      aria-labelledby="riders-hero-heading"
      className="bg-ink canvas:h-[1372px] canvas:pb-0 relative isolate overflow-hidden pb-14"
    >
      <div className="canvas:h-full relative mx-auto w-full max-w-(--width-canvas)">
        {/*
          The birds and sparks are measured against the 1440 x 1372 frame, so
          they are written as shares of it. The layer holds that aspect below the
          canvas, which keeps the whole scatter in proportion — same spacing,
          same overlaps — rather than letting the pieces drift as the frame
          reflows. At the canvas the frame IS 1440 x 1372, so the shares resolve
          to the design's own offsets exactly.
        */}
        <div
          aria-hidden
          className="canvas:inset-0 canvas:aspect-auto pointer-events-none absolute inset-x-0 top-0 block aspect-[1440/1372]"
        >
          {decorations.map((piece, index) => (
            <Image
              key={`${piece.src}-${index}`}
              src={piece.src}
              alt=""
              width={Math.round(piece.w)}
              height={Math.round(piece.h)}
              className="absolute max-w-none"
              style={{
                left: `${(piece.left / 1440) * 100}%`,
                top: `${(piece.top / 1372) * 100}%`,
                width: `${(piece.w / 1440) * 100}%`,
                height: `${(piece.h / 1372) * 100}%`,
                ...("rotate" in piece ? { transform: `rotate(${piece.rotate}deg)` } : null),
                ...("opacity" in piece ? { opacity: piece.opacity } : null),
              }}
            />
          ))}
        </div>

        {/*
          The headline block. 516:1191 and the button (516:1194) are two separate
          children of the hero frame — the frame is not an auto-layout — so the
          68px between them is a hand-placed offset (the stack runs 242–384, the
          button sits at 452), not a gap. Only the h1/paragraph pair below is an
          auto-layout, and that one is a real 16px gap.
        */}
        <div className="canvas:absolute canvas:top-[242px] canvas:left-1/2 canvas:w-[915px] canvas:-translate-x-1/2 canvas:px-0 canvas:pt-0 relative z-10 mx-auto flex w-full flex-col items-center px-(--spacing-gutter) pt-[clamp(112px,16.8056vw,242px)]">
          {/* 516:1191 — vertical, cross-axis centred, gap 16, 915 wide. */}
          <div className="flex w-full flex-col items-center gap-4">
            {/* 516:1192 — Gelica SemiBold 60/72, -1.2. */}
            <h1
              id="riders-hero-heading"
              className="text-paper text-center text-[clamp(30px,4.1667vw,60px)] leading-[1.2] font-semibold tracking-[-0.02em]"
            >
              {ridersHero.title}
            </h1>

            {/* 516:1193 — Inter 18/27, -0.09, 739 wide inside the 915 column. */}
            <p className="text-paper canvas:w-[739px] canvas:max-w-none w-full max-w-[739px] text-center text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em]">
              {ridersHero.subtitle}
            </p>
          </div>

          {/*
            516:1194 — the shared Button. Its trailing glyph (the `location`
            instance) is `visible: false` in this instance, so no icon is drawn.
          */}
          <div className="mt-[clamp(32px,4.7222vw,68px)]">
            <ButtonLink href="/contact" showArrow={false}>
              {ridersHero.cta}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/*
        516:1196 — the bridge, and the rider that runs along it.

        DIRECTED, three changes from the static design:

        1. FULL-BLEED. The bridge spans the whole viewport, not the 1440
           canvas box, so it still reaches both screen edges above 1440.
        2. BRIGHTER. The design draws it at 60% opacity, which reads as barely
           there; raised to 90%.
        3. THE RIDER SITS ON THE DECK AND RIDES IT. The design has 516:1203
           floating clear of the bridge, rotated -24.893deg — a mid-air pose.
           For a rider travelling the deck the rotation is dropped so both
           tyres meet the road.

        The placement is measured, not eyeballed. Rendering the bridge SVG and
        scanning it row by row, the deck is the only full-width run of ink:
        rows 142-143 of 219, i.e. 65.068% down. The rider artwork's lowest
        opaque pixel (its rear tyre) is at 90.08% of its own height. Putting
        the tyre on the deck is therefore
            top = 65.068% - 0.9008 x (rider height)
        which holds at any size, so the same expression works for the shorter
        bridge below the canvas width.
      */}
      <div className="canvas:absolute canvas:inset-x-0 canvas:top-[657.43px] canvas:bottom-auto canvas:mt-0 canvas:h-[219.13px] pointer-events-none relative mt-12 h-[clamp(96px,15.2174vw,219.13px)] w-full">
        {/*
          The design draws this 1645 wide at x -2 in a 1440 frame — deliberately
          oversized so the frame crops it. Stretching it to exactly the viewport
          width squeezes it by 12.5% and shortens every wave, which also throws
          off the path the rider follows. Width and offset are therefore given as
          shares of the frame (1645/1440 and -2/1440) so the artwork keeps its
          drawn scale at any viewport.
        */}
        <Image
          aria-hidden
          src="/icons/riders-hero-wave.svg"
          alt=""
          width={1645}
          height={219}
          className="absolute top-0 left-[-0.139%] h-full w-[114.236%] max-w-none opacity-90"
        />

        {/*
          The ride loops end to end, RIGHT to LEFT — the direction the artwork
          faces. `translateX(100vw)` starts it fully off the right edge and
          `-100%` carries it fully past the left, so the loop has no visible
          jump. The section clips, so nothing escapes to make the page scroll
          sideways.

          The rider keeps the design's own pose — 516:1203's -24.893deg rotation,
          riding just clear of the deck rather than sitting on it. Solving the
          design's numbers: the artwork is a 257.16 square whose top sits at
          482.51 while the deck falls at 800.01, so its foot clears the deck by
          60.34px, which is 0.2347 of the artwork's size. Expressed against
          `--rider-size` the whole relationship holds at any scale, hence the
          1.2347 (1 + 0.2347) in the offset.

          Travel AND lean are the one `rider-ride` animation on this wrapper.
          They must not be split back onto two elements: two animations on two
          elements are not phase-locked, and once either restarts on its own the
          lean drifts out of step with the bob and the rider tilts down as it
          climbs. The keyframes compose them as `translate() rotate()` in a
          single `transform`, which spins the rider about its own centre and
          then moves it along the bridge — the separate `rotate` PROPERTY cannot,
          because CSS resolves it before `transform` and the travel would run
          down a -24.9deg diagonal.

          `--bridge-h` is this layer's own height, which the ride's vertical
          track is expressed against so the bob scales with the bridge.

          Under `prefers-reduced-motion` the animation never starts, so the image
          carries the design's own -24.893deg pose instead. That rotation is
          scoped to `motion-reduce` precisely because it would otherwise compound
          with the rotation the keyframes already apply.
        */}
        <div
          aria-hidden
          /*
            Both variables are anchored to the design at the canvas —
            15.2174vw * 1440 = 219.13 and 17.8583vw * 1440 = 257.16 — so the
            rider and its ride scale with the bridge instead of being pinned to
            it. The keyframes express the bob as a share of `--bridge-h` and the
            travel as a share of `--rider-size`, so the whole animation follows
            without a single number changing.
          */
          className="motion-safe:animate-rider-ride absolute left-0 [--bridge-h:clamp(96px,15.2174vw,219.13px)] [--rider-size:clamp(112px,17.8583vw,257.16px)]"
          style={{
            width: "var(--rider-size)",
            top: "calc(65.068% - 1.2347 * var(--rider-size))",
          }}
        >
          <Image
            src="/images/riders/rider-illustration@2x.webp"
            alt=""
            width={257}
            height={257}
            className="w-full max-w-none motion-reduce:rotate-[-24.893deg]"
          />
        </div>
      </div>
    </section>
  );
}
