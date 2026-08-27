import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { StoreBadgeLink } from "@/components/ui/store-badge";
import { cn } from "@/lib/cn";
import { footer, socialAccounts, storeBadges, type FooterLink } from "@/content/footer";

/**
 * Footer — Figma node 264:3012 ("Footer  17", 1440 x 1148 at page y 8805).
 *
 * Three stacked plates, measured from the CTA strip's top edge (page y 8761),
 * which is where this component starts:
 *
 *   0 – 240     green CTA strip (264:3067), torn along both edges
 *   240 – 846   cream (the footer frame's own #FEF9EE fill)
 *   846 – 1192  the dark plate (454:6912), torn along its top edge
 *
 * plus two free-floating pieces that straddle those bands: the cream app card
 * (264:3042) at 448 and its green offset backdrop (264:3015) at 480. The card
 * hangs 52px over the dark plate, so the three have to be ordered explicitly:
 * backdrop under plate under card. `isolate` on the root keeps those z-indexes
 * from competing with anything else on the page.
 *
 * Note the frame itself starts at 8805, 44px *below* the CTA strip, and does not
 * clip — the strip and its torn top edge are drawn outside their own frame. The
 * 12px top margin is the gap the design leaves between the FAQ panel above
 * (574:2843, ending at 8749) and the strip.
 */

/** 264:3050 / 264:3069 — the pair of store badges, gap 20. */
function StoreBadgeRow({ plate }: { plate: "dark" | "light" }) {
  return (
    <div className="flex flex-wrap gap-5">
      {storeBadges.map((badge) => (
        <StoreBadgeLink
          key={badge.name}
          href={badge.href}
          icon={plate === "dark" ? badge.iconOnDark : badge.iconOnLight}
          iconWidth={badge.iconWidth}
          iconHeight={badge.iconHeight}
          eyebrow={badge.eyebrow}
          name={badge.name}
          className={cn(
            "justify-center",
            plate === "dark"
              ? // 264:3051 / 264:3057 — Primary Green fill, no stroke, no shadow
                // (both inner shadows on the node are `visible: false`). With no
                // shadow to lift off, the hover deepens the plate instead.
                "bg-ink hover:bg-ink-deep text-white"
              : // 264:3070 / 264:3076 — white fill, a 2px INSIDE stroke (hence
                // inset-ring, which does not displace the contents the way a
                // border would) and a hard white drop shadow at +4/+4, radius 0.
                cn(
                  "bg-paper text-ink inset-ring-ink inset-ring-2",
                  "shadow-[4px_4px_0_0_var(--color-paper)]",
                  "hover:shadow-[6px_6px_0_0_var(--color-paper)]",
                  "active:shadow-[2px_2px_0_0_var(--color-paper)]",
                ),
          )}
        />
      ))}
    </div>
  );
}

/** 520:6961 / 520:6966 — a link column, gap 16, Inter 14/16.943. */
function LinkColumn({ label, links }: { label: string; links: readonly FooterLink[] }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-sans text-[14px] leading-[16.943px] tracking-[-0.042px] text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * The design draws the footer as a child of each page frame, not as shared site
 * furniture, and the gap from the last section to the CTA strip differs on every
 * page: 12 on Home, 232 on Vendors, -13 on Riders (the footer overlaps the FAQ),
 * 241 on Terms, 246 on Privacy, 196 on Refunds. That is why the gap is a prop
 * and why this renders per page rather than from the root layout — a single
 * root instance would be up to 234px wrong.
 */
export function KulaFooter({
  topGap = 12,
  variant = "consumer",
}: {
  topGap?: number;
  variant?: "consumer" | "vendor";
}) {
  const isVendor = variant === "vendor";
  const card = isVendor ? footer.vendorCard : footer.card;

  return (
    <footer className="bg-cream-light relative isolate" style={{ marginTop: topGap }}>
      {/* ---------------------------------------------------------------- */}
      {/* 264:3067 CTA-Strip — 1440 x 240, Primary Green, 100px gutters,    */}
      {/* space-between, contents vertically centred.                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-forest canvas:h-[240px] canvas:py-0 relative z-20 py-12">
        {/*
          264:3013 / 264:3014 — the torn edges. Both are filled in the strip's
          own Primary Green, so they read as the strip's outline rather than as
          separate shapes; nothing here clips, so they reach into the cream above
          and below.

          264:3013 sits at page y 8707, 54px above the strip; 264:3014 at 8963,
          which is 38px past the strip's bottom at the design height. Anchoring
          the second one to the bottom rather than to the design's y keeps it on
          the edge if the strip ever grows taller than the design height.

          Both files must carry `preserveAspectRatio="none"` so the artwork
          stretches to the viewport instead of letterboxing to its 1440 intrinsic
          width — the REST export omits that attribute, which is what caused the
          letterboxing on the Why Kula edges.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[clamp(30px,3.75vw,54px)] left-0 h-[clamp(42px,5.2778vw,76px)] w-full overflow-hidden"
        >
          <Image
            aria-hidden
            src="/icons/footer-edge-top.svg"
            alt=""
            width={1440}
            height={76}
            className="absolute left-1/2 h-full w-full max-w-none min-w-[900px] -translate-x-1/2"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[clamp(21px,2.6389vw,38px)] left-0 h-[clamp(42px,5.2778vw,76px)] w-full overflow-hidden"
        >
          <Image
            aria-hidden
            src="/icons/footer-edge-bottom.svg"
            alt=""
            width={1440}
            height={76}
            className="absolute left-1/2 h-full w-full max-w-none min-w-[900px] -translate-x-1/2"
          />
        </div>

        <Container className="canvas:flex-row canvas:items-center canvas:gap-0 relative flex h-full flex-col items-start justify-between gap-8">
          {/* 264:3068 — Gelica SemiBold 48/60 in a fixed 464-wide box, which is
              what decides where the headline breaks. */}
          <h2 className="canvas:w-[464px] w-full text-[clamp(26px,3.3333vw,48px)] leading-[1.25] font-semibold text-white">
            {footer.cta.heading}
          </h2>
          {/* 264:3069 — 414 x 56, hard against the right gutter. */}
          <StoreBadgeRow plate="light" />
        </Container>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Cream band — the footer frame's own fill, page y 9001–9607.       */}
      {/* Static on purpose: the card below positions against the <footer>, */}
      {/* not against this spacer.                                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="canvas:h-[606px] canvas:px-0 canvas:py-0 px-(--spacing-gutter) py-12">
        {/*
          The card box. Absolute against the <footer> at the canvas so the
          design offsets still resolve; in flow below it. It carries no
          z-index of its own on purpose — `position` with `z-index: auto`
          creates no stacking context, so the plate and the card below still
          compare against the dark plate (z-20) exactly as they did as
          siblings, which is what keeps the plate tucked under it.

          For the same reason it takes a plain `left` at the canvas rather than
          `-translate-x-1/2`: a transform DOES create a stacking context, which
          would trap the card's z-30 inside this box and drop the whole group
          under the dark plate — the torn wave then cuts across the card. The
          card is centred with a half-width of 626 rather than its true 626.5,
          which lands on x=94 at the canvas — the file's own integer — instead
          of the 93.5 that feathers its 1px ring. It also happens to be exactly
          right: the design centres this card half a pixel right of the canvas
          centre. The plate's offsets are then measured from the card, so both
          land on the design's 76 and 1362.
        */}
        <div className="canvas:absolute canvas:top-[448px] canvas:left-[calc(50%-626px)] canvas:w-[1253px] canvas:max-w-none relative mx-auto w-full max-w-[1253px]">
          {/*
          264:3015 — a green plate offset behind the card: 1286 x 450 against the
          card's 1253 x 450, sitting 32px lower. Only its left and right slivers
          are ever seen, because the card covers the middle and the dark plate
          covers everything below y 9607.

          Both it and the card are centred rather than pinned to their Figma x
          (76 and 94), per their own CENTER constraints; the plate's centre is 1px
          left of the canvas centre and the card's is 0.5px right of it, so the
          overhang is 17.5px left / 15.5px right here against the design's 18/15.

          Drawn only at the design width: it is a fixed-offset decoration and has
          no meaning once the card starts resizing.
        */}
          {isVendor && (
            <Image
              src="/images/footer/vendor-mascot@2x.webp"
              alt={card.imageAlt}
              width={660}
              height={660}
              sizes="660px"
              className="canvas:absolute canvas:-top-[161px] canvas:left-1/2 canvas:mx-0 canvas:-mb-0 canvas:ml-[-18px] canvas:w-[660px] relative z-40 mx-auto -mb-4 block h-auto w-[clamp(170px,32vw,300px)] max-w-none"
            />
          )}
          {/* The card's own box, so the offset plate sizes to the CARD, not to
              the group the mascot joins below the canvas. */}
          <div className="relative">
            <div
              aria-hidden
              /*
            Sized from the card rather than given the design's 1286: it is the
            card plus 33px of width, 32px lower, at the same height — which is
            exactly what the file draws — so it keeps that relationship at every
            width instead of being a fixed slab behind a fluid card.
          */
              className="bg-forest inset-ring-ink canvas:-left-[18px] canvas:-right-[15px] canvas:translate-x-0 absolute -inset-x-[clamp(6px,1.1458vw,16.5px)] top-[clamp(10px,2.2222vw,32px)] z-10 block h-full -translate-x-px rounded-[24px] inset-ring-1"
            />

            {/*
          264:3042 — the app card, 1253 x 450, radius 24, Cream Warm with a 1px
          INSIDE Primary Green stroke. It clips (`clipsContent: true`), which is
          what cuts 29px off the right of the illustration.

          The radius lives here and nowhere else: putting it on the image as well
          would multiply the two antialiased masks and feather the corner.
        */}
            <div className="bg-cream-warm inset-ring-ink canvas:h-[450px] relative z-30 overflow-hidden rounded-[24px] inset-ring-1">
              {/* 264:3046 — heading over the app pitch, gap 32, 82 from the card's
              left edge and 135 from its top. */}
              <div className="canvas:absolute canvas:top-[135px] canvas:left-[82px] canvas:w-[587px] canvas:p-0 flex flex-col gap-8 p-7 sm:p-10">
                {/* 264:3047 — Gelica Bold 36/42.66. */}
                <h2 className="text-ink text-[clamp(22px,2.5vw,36px)] leading-[1.185] font-bold">
                  {card.heading}
                </h2>
                {/* 264:3048 — prompt over badges, gap 16. */}
                <div className="flex flex-col gap-4">
                  {/*
                264:3049 — Roboto Flex 20/28 on the consumer footer; 510:20187 is
                Inter 18/27 at -0.09 on Vendors. A different face, not a resize.
              */}
                  <p
                    className={cn(
                      "text-ink",
                      isVendor
                        ? "font-sans text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em]"
                        : "font-label text-[clamp(16px,1.3889vw,20px)] leading-[1.4]",
                    )}
                  >
                    {card.appPrompt}
                  </p>
                  <StoreBadgeRow plate="dark" />
                </div>
              </div>

              {/*
            539:7398 — 587 x 448 at (695, 2) inside the card, scaleMode FILL. The
            source is 1090 x 832 and the box 587 x 448, the same 1.310 ratio, so
            "cover" resolves to a plain resize and the crop is baked at that size
            rather than performed at runtime.
          */}
              {!isVendor && (
                <Image
                  src="/images/footer/handoff@2x.webp"
                  alt={card.imageAlt}
                  width={587}
                  height={448}
                  sizes="(min-width: 1440px) 587px, 100vw"
                  className="canvas:absolute canvas:top-[2px] canvas:left-[695px] canvas:h-[448px] canvas:w-[587px] block h-auto w-full max-w-none"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 454:6912 — the dark plate, 1440 x 346 at page y 9607.             */}
      {/* ---------------------------------------------------------------- */}
      <div className="canvas:h-[346px] canvas:pb-0 relative z-20 bg-[#052d1d] pb-12">
        {/*
          454:6936 / 454:6938 — two 572 x 80 torn pieces at page y 9546, 61px
          above the plate. They are Forest Deep (#042D1C), *not* the plate's own
          Primary Green, so they read as a separate band rather than as an
          outline. The 296px they leave between them at the design width is the
          design's own gap, so the widths are expressed as 572/1440 and stay
          proportional at any viewport.

          Like the strip's edges, both files must carry
          `preserveAspectRatio="none"`.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[clamp(34px,4.2361vw,61px)] left-0 h-[clamp(44px,5.5556vw,80px)] w-[39.7222%] overflow-hidden"
        >
          <Image
            aria-hidden
            src="/icons/footer-wave-left.svg"
            alt=""
            width={572}
            height={80}
            className="absolute left-1/2 h-full w-full max-w-none min-w-[360px] -translate-x-1/2"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[clamp(34px,4.2361vw,61px)] right-0 h-[clamp(44px,5.5556vw,80px)] w-[39.7222%] overflow-hidden"
        >
          <Image
            aria-hidden
            src="/icons/footer-wave-right.svg"
            alt=""
            width={572}
            height={80}
            className="absolute left-1/2 h-full w-full max-w-none min-w-[360px] -translate-x-1/2"
          />
        </div>

        <Container className="relative pt-[clamp(72px,8.75vw,126px)]">
          {/*
            520:6957 — 1168 wide, centred, space-between, tops aligned. The
            205.667px between columns is what space-between computes from the
            four hug widths (225 / 87 / 111 / 128); it is not an item spacing.
          */}
          <div className="canvas:flex canvas:w-[1168px] canvas:justify-between canvas:gap-0 mx-auto grid w-full grid-cols-2 items-start gap-x-8 gap-y-10 sm:grid-cols-4">
            {/* 520:6958 — wordmark over tagline, gap 17. */}
            <div className="flex flex-col gap-[17px]">
              {/*
                520:6959 — 178 x 60, scaleMode STRETCH, so the imageTransform is
                the crop rect: source x 920–3235, y 343–1123 (2315 x 780) of the
                4096 x 1459 artwork. That is a 2.968 ratio against the box's
                2.967, so the crop is a plain resize with no squeeze, and it is
                baked at 178 x 60 rather than performed at runtime.

                Not the header's shared /images/logo asset: that one is the
                *dark* wordmark drawn 184 wide, and 184 carries two 2px gaps the
                header's three-piece composite (264:3091–3093) inserts. Reusing
                it here would both squeeze the glyphs by 3.3% and put a
                near-black wordmark on the #071F10 plate. The artwork in the
                file is white, which is what this crop keeps.
              */}
              <Image
                src="/images/footer/wordmark@2x.webp"
                alt={footer.brand.logoAlt}
                width={178}
                height={60}
                className="h-auto w-[clamp(132px,12.3611vw,178px)] max-w-none"
              />
              {/* 520:6960 — Inter 14/16.943. */}
              <p className="w-full max-w-[225px] font-sans text-[14px] leading-[16.943px] tracking-[-0.042px] text-white">
                {footer.brand.tagline}
              </p>
            </div>

            {/* The design gives neither column a heading, so the accessible
                name for each landmark is authored here. */}
            <LinkColumn label="Company" links={footer.siteLinks} />
            <LinkColumn label="Legal" links={footer.legalLinks} />

            {/* 520:6970 — 128 wide (fixed), heading over icons, gap 24. */}
            <div className="flex w-[128px] flex-col gap-6">
              {/* 520:6971 — Inter 16/19.364. */}
              <p
                id="footer-social-heading"
                className="font-sans text-[16px] leading-[19.364px] tracking-[-0.048px] text-white"
              >
                {footer.social.heading}
              </p>
              {/* 520:6972 — row of three 32 x 32 frames, gap 16. */}
              {/*
                520:6972 — row of three 32 x 32 frames, gap 16.

                DIRECTED: real anchors, not the design's flat artwork. The icon
                carries the accessible name, so the <img> alt is emptied and the
                name moves to the link itself.
              */}
              <ul aria-labelledby="footer-social-heading" className="flex gap-4">
                {socialAccounts.map((account) => (
                  <li key={account.name} className="flex">
                    <a
                      href={account.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Kula on ${account.name}`}
                      className={cn(
                        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full",
                        "transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none",
                        "opacity-80 hover:scale-110 hover:opacity-100 active:scale-95",
                      )}
                    >
                      <Image src={account.icon} alt="" width={32} height={32} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/*
        520:6869 — the Vendors mascot, 660 x 660, scaleMode FILL over a square
        1254 source, so "cover" resolves to a plain resize.

        Figma places it at (702, 243) in the footer FRAME's box, but this
        component's origin is the CTA strip's top edge, which sits 44px above
        that frame (the strip is at frame-local y -44). So the y here is 243 + 44
        = 287, the same +44 every other offset in this file already carries.

        Deliberately NOT a child of the card: in the design it is the footer
        frame's last child, so it paints over the card and overhangs its top edge
        by 161px (the card starts at 404). Nesting it in the card would clip it,
        because the card sets `clipsContent`.

        At the canvas it hangs 161px above the card's top edge, over the card's
        empty right half — which is what the design draws.

        Below the canvas the card's copy fills the whole width, so there is no
        empty half left to overhang: the mascot would sit straight on top of the
        heading. It moves above the card instead, still overlapping it by a few
        pixels so the two still read as one group.
      */}
    </footer>
  );
}
