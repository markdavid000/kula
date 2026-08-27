import Image from "next/image";
import Link from "next/link";

import { Carousel } from "@/components/ui/carousel";
import { StoreBadgeLink } from "@/components/ui/store-badge";
import { cn } from "@/lib/cn";
import { appBadges, vendors, vendorsPanel, type Vendor } from "@/content/home";

/**
 * Featured Vendors — Figma node 264:2770 (1280 x 1522, at page 80,1222).
 *
 * A peach panel with a 68px radius, holding the app pitch, the about line, a
 * strung-up pair of characters and the vendor carousel. The phone mockup
 * (264:2771) breaks out above the panel's top edge, which is why the section
 * carries top padding and nothing clips.
 *
 * At `canvas` (1440) the panel is the design's 1280 wide, so the page's 80px
 * gutter falls out of `max-w` and centring. The decorative layer — phones,
 * swag line, strings, characters, eyes — is absolutely placed at the design's
 * own coordinates; the readable content sits in flow, with margins chosen so it
 * lands exactly where the design puts it.
 *
 * HOW IT RESPONDS
 *
 * Below `canvas` the panel stops being a fixed 1522-tall board and becomes a
 * column: phones, pitch, about, decorations, heading, carousel — which is the
 * design's own top-to-bottom order, so the narrow layout reads as the same
 * composition rather than a rearrangement.
 *
 * The decorations are re-composed, not dropped. The swag line becomes a
 * full-width rule; the two characters hang from it on their strings, which is
 * what they do in the design; and the eyes sit opposite them, left of the
 * heading, exactly the pairing the 1440 board has. Everything the design draws
 * is still on the page at 320px.
 */

/**
 * 264:2771's three phones, back to front. `left`/`top`/`width` are percentages
 * of the group's 436 x 561 box; `fan` is the hover offset as a share of the
 * phone's own width, so it scales with the group.
 */
interface Phone {
  readonly src: string;
  readonly w: number;
  readonly h: number;
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly z: number;
  readonly fan: string;
  /** Only the front phone is worth pre-loading; it is the one you see first. */
  readonly priority?: boolean;
}

const PHONES: readonly Phone[] = [
  {
    src: "/images/home/mockup_three.svg",
    w: 219,
    h: 360,
    left: 49.771,
    top: 18.004,
    width: 50.229,
    z: 1,
    // +243px of 219
    fan: "group-hover/phones:translate-x-[110.959%]",
  },
  {
    src: "/images/home/mockup_two.svg",
    w: 236,
    h: 442,
    left: 27.064,
    top: 9.982,
    width: 54.128,
    z: 2,
    // +121px of 236
    fan: "group-hover/phones:translate-x-[51.271%]",
  },
  {
    src: "/images/home/mockup_one.svg",
    w: 300,
    h: 562,
    left: 0,
    top: 0,
    width: 68.807,
    z: 3,
    priority: true,
    // -66px of 300
    fan: "group-hover/phones:-translate-x-[22%]",
  },
];

/** 264:2812 — 360 x 259, radius 28, 1px #262826, 20 padding, 4 gap. */
function VendorCard({ vendor, priority }: { vendor: Vendor; priority: boolean }) {
  return (
    /*
      DIRECTED — the design gives the card no states. On hover it lifts onto a
      hard Orange offset shadow, the same hard-shadow language the buttons and
      store badges use, and the "View" pill brightens with it. The whole card is
      the target, so the hover lives here rather than on the pill.
    */
    <li
      className={cn(
        cn(
          // 360 as drawn, but never wider than the scrollport. A snap item wider
          // than its snapport makes the browser clamp instead of snapping, which
          // left the last few pixels of the track unreachable on a phone — and a
          // card wider than the screen was wrong there anyway. 3.5rem is the
          // track's 24px inset either side plus room for a scrollbar.
          "w-[360px] max-w-[calc(100vw-3.5rem)]",
          "bg-peach inset-ring-ink-soft group/card relative flex shrink-0 cursor-pointer flex-col gap-1 rounded-[28px] p-5 inset-ring-1",
        ),
        "transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-brand)]",
      )}
    >
      {/* 206:2196 — inner column, gap 24. */}
      <div className="flex flex-col gap-6">
        {/* 206:2197 — 320 x 122, radius 16, 1px ink. */}
        <div className="inset-ring-ink relative h-[122px] w-full overflow-hidden rounded-[16px] inset-ring-1">
          <Image
            src={vendor.image}
            alt=""
            fill
            sizes="320px"
            priority={priority}
            className="object-cover"
          />
        </div>

        {/* 206:2198 — gap 8. */}
        <div className="flex flex-col gap-2">
          {/* 206:2199 — Gelica SemiBold 28/33.18. */}
          <h3 className="text-ink-soft text-[clamp(19px,1.9444vw,28px)] leading-[1.185] font-semibold">
            {vendor.name}
          </h3>

          {/*
            206:2200 — metadata row. SPACE_BETWEEN, not a fixed gap: Figma
            reports itemSpacing 16 but the alignment overrides it, and the three
            children land 27px apart either side of the bullet.
          */}
          <div className="flex items-center justify-between">
            {/* 206:2201 — pill, radius 100, padding 6/10. */}
            <span className="bg-peach-soft text-ink rounded-[100px] px-2.5 py-1.5 font-sans text-[14px] leading-[16.94px] font-semibold">
              {vendor.price}
            </span>
            {/* 206:2203 */}
            <span aria-hidden className="text-slate font-sans text-[14px] leading-[16.94px]">
              •
            </span>
            {/* 206:2204 — radius 56, padding 4 with a 12 lead-in, gap 20. */}
            {/*
              206:2204 — radius 56, padding 4 with a 12 lead-in, gap 20.

              DIRECTED: a real link. The design attaches no destination, so it
              points at the vendors listing. `after:absolute after:inset-0`
              stretches the hit area over the whole card, so the card is
              clickable and shows a pointer while the accessible name stays on
              this one control instead of being duplicated across the card.
            */}
            <Link
              href="/vendors"
              aria-label={`${vendor.cta} ${vendor.name}`}
              className="bg-brand group-hover/card:bg-brand-strong flex cursor-pointer items-center gap-5 rounded-[56px] py-1 pr-1 pl-3 transition-colors duration-200 ease-out after:absolute after:inset-0 after:rounded-[28px] motion-reduce:transition-none"
            >
              <span aria-hidden className="font-sans text-[16px] leading-6 font-medium text-white">
                {vendor.cta}
              </span>
              {/* 206:2206 — 24px white disc, 2px padding around the 20px glyph. */}
              <span className="flex size-6 shrink-0 items-center justify-center rounded-[48px] bg-white p-0.5">
                <Image src="/icons/arrow-right-round.svg" alt="" width={20} height={20} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export function FeaturedVendors() {
  return (
    <section className="bg-cream relative">
      {/* Clears the phone mockup, which stands 153px above the panel. */}
      <div className="canvas:px-0 mx-auto max-w-[1280px] px-(--spacing-gutter) pt-[clamp(104px,18.2639vw,263px)]">
        <div className="bg-peach inset-ring-ink canvas:h-[1522px] canvas:px-0 canvas:pb-0 relative rounded-[clamp(28px,4.7222vw,68px)] px-5 pb-12 inset-ring-1 sm:px-8">
          {/*
            264:2771 — the three app screens, now as three separate exports so
            they can move independently.

            Each phone is placed by its own render bounds inside the group's
            436 x 561 box, taken from the design: front (-15,-14) 300x561,
            middle (103,42) 236x442, back (202,87) 219x360, all shifted by the
            group's own (+15,+14) origin. They are expressed as percentages so
            the whole composition scales as one when the group narrows.

            The group breaks out of the panel's top edge at every width. At the
            canvas that is the design's -153.4; below it the overhang is the
            same share of the group's own width (153.4 / 436), so the phones sit
            on the edge the same way however small they get.

            DIRECTED — the fan is not in the design. On hover the phones spread
            until they sit edge to edge, which is what the reference recording
            shows. The distances are measured off that recording: the front
            phone moves 66px left, the middle 121px right and the back 243px
            right. Each is written as a share of that phone's OWN width, so the
            fan scales with the group rather than drifting apart.
          */}
          <div
            role="img"
            aria-label="The Kula app showing today's specials, a vendor list and an order summary"
            className={cn(
              "group/phones relative mx-auto aspect-[436/561] w-[clamp(200px,30.2778vw,436px)] max-w-none",
              "mt-[calc(clamp(70px,10.6528vw,153.4px)*-1)]",
              "canvas:absolute canvas:top-[-153.4px] canvas:left-[419.8px] canvas:mx-0 canvas:mt-0 canvas:w-[436px]",
            )}
          >
            {PHONES.map((phone) => (
              <Image
                key={phone.src}
                src={phone.src}
                alt=""
                width={phone.w}
                height={phone.h}
                priority={phone.priority === true}
                className={cn(
                  "absolute",
                  "transition-transform duration-500 ease-out motion-reduce:transition-none",
                  phone.fan,
                )}
                style={{
                  left: `${phone.left}%`,
                  top: `${phone.top}%`,
                  width: `${phone.width}%`,
                  zIndex: phone.z,
                }}
              />
            ))}
          </div>

          {/* 264:2793 — app pitch, 40 from the left, 192 from the top. */}
          <div className="canvas:absolute canvas:top-[192px] canvas:left-10 canvas:mt-0 mt-10">
            {/* 264:2794 — Roboto Flex 20/28. */}
            <p className="text-ink font-label text-[clamp(16px,1.3889vw,20px)] leading-[1.4]">
              {vendorsPanel.appPrompt}
            </p>
            {/* 264:2795 — gap 20. */}
            <div className="mt-4 flex flex-col gap-5">
              {appBadges.map((badge) => (
                <StoreBadgeLink
                  key={badge.name}
                  href={badge.href}
                  icon={badge.icon}
                  iconWidth={badge.iconWidth}
                  iconHeight={badge.iconHeight}
                  eyebrow={badge.eyebrow}
                  name={badge.name}
                  // 264:2796 — ink plate, 2px white INSIDE stroke, hard 4/4 shadow.
                  className={cn(
                    "bg-ink inset-ring-2 inset-ring-white",
                    "shadow-[4px_4px_0_0_var(--color-forest-shadow)]",
                    "hover:shadow-[6px_6px_0_0_var(--color-forest-shadow)]",
                    "active:shadow-[2px_2px_0_0_var(--color-forest-shadow)]",
                  )}
                  labelClassName="text-white"
                />
              ))}
            </div>
          </div>

          {/* 264:2818 — Gelica Medium 48/64, 1029 wide, centred. */}
          <p className="text-near-black font-display canvas:absolute canvas:top-[521px] canvas:left-[125px] canvas:mt-0 canvas:w-[1029px] mt-10 text-center text-[clamp(26px,3.3333vw,48px)] leading-[1.333333] font-medium">
            {vendorsPanel.about}
          </p>

          {/*
            The same five decorations the canvas board carries, re-composed for
            a column: the swag line as a full-width rule, the two characters
            hanging from it on their own strings, and the eyes facing them from
            the other side — which is how the 1440 board pairs them.
          */}
          <div aria-hidden className="canvas:hidden mt-10">
            {/* 264:2817 — the swag line, 36px orange stroke. */}
            <Image
              src="/icons/vendors-swag-line.svg"
              alt=""
              width={1331}
              height={143}
              className="h-auto w-full max-w-none"
            />
            <div className="-mt-[6%] flex items-start justify-between">
              {/* 264:2774 — the eyes, dropped to sit on the heading's line. */}
              <Image
                src="/icons/eyes.svg"
                alt=""
                width={138}
                height={117}
                className="mt-[8%] h-auto w-[clamp(56px,13vw,138px)] max-w-none self-end"
              />
              <div className="flex items-start gap-[6%]">
                {/* 264:2819 / 264:2820 — the strings, then what hangs from them. */}
                {[
                  { src: "/images/home/hanging-mascot.svg", w: 140, h: 140, drop: "58%" },
                  { src: "/images/home/hanging-burger.svg", w: 130, h: 140, drop: "94%" },
                ].map((piece) => (
                  <div key={piece.src} className="flex flex-col items-center">
                    <span
                      className="bg-brand w-[clamp(4px,1vw,8px)]"
                      style={{ height: `calc(clamp(56px,10vw,154px) * ${piece.drop})` }}
                    />
                    <Image
                      src={piece.src}
                      alt=""
                      width={piece.w}
                      height={piece.h}
                      className="h-auto w-[clamp(58px,13vw,140px)] max-w-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*
            Decorative layer — only placeable at the design's own width, and
            clipped to the panel: the swag line is 1331 wide against the panel's
            1280, and Figma renders it cut at both edges (its render bounds are
            exactly the panel's). The clip lives here rather than on the panel so
            the phone mockup can still break out of the top.
          */}
          <div
            aria-hidden
            className="canvas:block pointer-events-none absolute inset-0 hidden overflow-hidden rounded-[68px]"
          >
            {/* 264:2817 — the swag line, 36px orange stroke. */}
            <Image
              src="/icons/vendors-swag-line.svg"
              alt=""
              width={1331}
              height={143}
              className="absolute top-[746.3px] left-[-17.5px] max-w-none"
            />
            {/* 264:2819 / 264:2820 — the two strings the characters hang from. */}
            <span className="bg-brand absolute top-[830px] left-[1124px] h-[98px] w-2" />
            <span className="bg-brand absolute top-[841px] left-[852px] h-[154px] w-2" />
            {/* 264:2822 then 264:2821 — mascot behind, burger in front. */}
            <Image
              src="/images/home/hanging-mascot.svg"
              alt=""
              width={140}
              height={140}
              className="absolute top-[971px] left-[813px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]"
            />
            <Image
              src="/images/home/hanging-burger.svg"
              alt=""
              width={130}
              height={140}
              className="absolute top-[904px] left-[1055px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
            />
            {/* 264:2774 */}
            <Image
              src="/icons/eyes.svg"
              alt=""
              width={138}
              height={117}
              className="absolute top-[970px] left-10"
            />
          </div>

          {/*
            264:2773 — Gelica Bold 72/85.32, rotated -5.27° (Figma reports
            -0.09205 rad) over an orange drop shadow.

            Positioned by the element box, not the 603x140 Figma reports: that
            is the *bounding* box of the rotated node. Unturned it is 597.7x85.4,
            so the element's own origin sits 2.65 right and 27.3 down from the
            box Figma quotes.
          */}
          <h2
            className="text-ink canvas:absolute canvas:top-[1081.3px] canvas:left-[35.65px] canvas:mt-0 canvas:w-[603px] relative z-10 mt-4 w-full text-center text-[clamp(32px,5vw,72px)] leading-[1.185] font-bold whitespace-nowrap drop-shadow-[0_4px_4px_#ED5E3B]"
            style={{ transform: "rotate(-5.27deg)" }}
          >
            {vendorsPanel.heading}
          </h2>

          {/*
            264:2811 — the card row: 1240 wide from x=40, so the fourth card is
            deliberately cut by the panel edge. The design draws that peek but
            specifies no interaction. DIRECTED: a carousel. The resting frame is
            unchanged — same cards, same 24 gap, clipped at the same 1200 — and
            the arrows plus drag are what reach the card the panel cuts off.

            Below the canvas it breaks out of the panel's padding so the row can
            bleed to the panel edge, which is what keeps the "there is more"
            peek the design relies on.
          */}
          <Carousel
            label="Featured vendors"
            className="canvas:absolute canvas:top-[1215px] canvas:left-10 canvas:mx-0 canvas:mt-0 canvas:w-[1200px] relative -mx-5 mt-8 w-auto sm:-mx-8"
            /*
              Scroll padding matching the track's inset, so a card comes to rest
              on the inset instead of skipping it, and the last card can still
              reach the true end of the track.
            */
            viewportClassName="scroll-px-5 px-5 py-2 sm:scroll-px-8 sm:px-8 canvas:scroll-px-0 canvas:px-0"
            listClassName="flex w-max gap-6"
          >
            {vendors.map((vendor, index) => (
              <VendorCard key={vendor.name} vendor={vendor} priority={index === 0} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
