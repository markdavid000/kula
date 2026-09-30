"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import { NavLink } from "@/components/layout/nav-link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { externalLinks, primaryNav, siteConfig } from "@/lib/site";

/**
 * Site header — Figma node 264:3085, identical on all six pages.
 *
 * The header is 1440 x 120 sitting at page y = -8, so it *overlays* the first
 * section rather than pushing it down; its own frame is transparent and the
 * cream band is drawn by three stacked wave vectors. Hence the negative offsets
 * below — they are the design's coordinates converted from the header's local
 * space into the page's.
 *
 * It is `fixed` rather than `absolute` so it stays put while the page scrolls,
 * and the wave band runs the full viewport width rather than stopping at the
 * 1440 canvas. Neither is in the Figma file; both are directed changes.
 *
 * HOW IT RESPONDS
 *
 * The band, the bar and the wordmark are all fluid, each anchored so that at
 * 1440 it lands on the design's own number (see `--kula-wave` below). Nothing
 * steps at a breakpoint, so the header shrinks smoothly rather than jumping.
 *
 * The centred nav is the one thing that cannot be fluid: it is five fixed-width
 * boxes totalling ~660px, and because it is centred it needs that much clear
 * space between the wordmark and the store buttons. That only exists from
 * 1280 up, so below `xl` the links move into a disclosure panel. The links stay
 * in the DOM at every width — the panel is collapsed, not unmounted — so
 * crawlers and assistive tech always see the full navigation.
 *
 * A client component because it owns the disclosure state and needs the current
 * pathname to mark the active item.
 */

/**
 * The three wave layers, bottom to top (264:3086, 264:3087, 264:3088).
 *
 * Each is drawn as a masked div rather than an `<img>`: the SVG supplies only
 * the silhouette, so the fill can carry a backdrop filter. The shapes are
 * authored `preserveAspectRatio="none"`, so they stretch to any viewport width
 * without distorting the wave's read.
 *
 * `top` and `height` are shares of the band rather than the design's pixel
 * offsets, so the whole stack scales as one: at the design's 118px band they
 * resolve to exactly 112 tall at 6, -2 and -10, which is what the file draws.
 *
 * Layers 1 and 2 are the thin glass strips that show below the solid band;
 * layer 3 is the opaque cream the nav sits on, which stays opaque so the nav
 * stays legible over whatever scrolls beneath it.
 */
const waves = [
  { src: "/icons/header-wave-1.svg", top: "5.0847%", fill: "bg-wash-green/40 backdrop-blur-lg" },
  { src: "/icons/header-wave-2.svg", top: "-1.6949%", fill: "bg-wash-lime/35 backdrop-blur-md" },
  { src: "/icons/header-wave-3.svg", top: "-8.4746%", fill: "bg-cream" },
] as const;

/**
 * The two store buttons — Figma 264:3095 and 264:3098.
 *
 * DIRECTED: real anchors. The design draws them as flat artwork with no
 * destination, so the hrefs are authored (see `externalLinks`) and the states
 * are authored too — a plain <span> gets no pointer, no focus and no
 * middle-click.
 */
const appLinks = [
  {
    src: "/icons/google-playstore.svg",
    label: "Get Kula on Google Play",
    href: externalLinks.googlePlay,
  },
  {
    src: "/icons/apple.svg",
    label: "Get Kula on the App Store",
    href: externalLinks.appStore,
  },
] as const;

/** Shared between the bar and the disclosure panel. */
const storeButton = cn(
  "border-ink flex cursor-pointer items-center justify-center overflow-clip rounded-[72px] border bg-white/6",
  // 56 with a 24px icon at the canvas. Below it the button is 44, and p-3 plus
  // the 1px border left 18px inside — narrower than the 24px icon, so flex
  // shrank the icon's WIDTH and not its height and the Apple mark drew 18 x 24,
  // visibly stretched. p-2.5 leaves 22px for a 20px icon that cannot shrink.
  //
  // The canvas had the same fault, only milder: 56 less p-4 and the 1px border
  // is 22, and the image's preflight `max-width: 100%` clamped the 24px icon to
  // 22 x 24. Figma draws the stroke INSIDE the 16px padding, so 15px plus the
  // border is the design's own 24px box.
  "size-11 p-2.5 canvas:size-14 canvas:p-[15px]",
  "transition-[transform,background-color] duration-200 ease-out motion-reduce:transition-none",
  "hover:bg-ink/10 hover:scale-105 active:scale-95",
);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Any navigation dismisses the panel — including back/forward, which an
  // onClick handler on the links would miss. Adjusting state during render is
  // React's documented pattern for reacting to a changed prop; an effect here
  // would queue a second render pass and briefly paint the stale open menu.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape closes the panel and returns focus to the control that opened it, so
  // keyboard users are never dropped at the top of the document.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className="fixed inset-x-0 top-0 z-999"
      /*
       * The band height, and the single number the whole header scales from.
       * 8.1944vw * 1440 = 118, the design's own band, so the clamp reproduces
       * the file exactly at the canvas and tapers to a 76px band on a phone.
       */
      style={
        {
          ["--kula-wave" as string]: "clamp(76px, 8.1944vw, 118px)",
          ["--kula-bar" as string]: "clamp(64px, 6.9444vw, 100px)",
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-(--kula-wave)"
      >
        {waves.map((wave) => (
          <div
            key={wave.src}
            className={cn("absolute inset-x-0 h-[94.9153%]", wave.fill)}
            style={{
              top: wave.top,
              maskImage: `url(${wave.src})`,
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskImage: `url(${wave.src})`,
              WebkitMaskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      <Container className="canvas:py-5 relative z-20 flex h-(--kula-bar) items-center justify-between gap-3 py-3">
        <Link href="/" className="flex min-h-11 shrink-0 items-center">
          <Image
            src="/images/logo/kula-wordmark@2x.png"
            alt={`${siteConfig.name} — home`}
            width={184}
            height={60}
            priority
            className="h-auto w-[clamp(116px,12.7778vw,184px)] max-w-none"
          />
        </Link>

        {/*
          The nav is centred on the header, not spaced between the logo and the
          store buttons — in Figma it is an absolutely positioned child
          (264:3101) at the nav bar's horizontal centre, 34px from its top. That
          centring is why it needs the full 1280: it must clear the wordmark on
          one side and the store buttons on the other.
        */}
        <nav
          aria-label="Primary"
          className="absolute top-[34px] left-1/2 hidden -translate-x-1/2 xl:block"
        >
          <ul className="flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink item={item} active={isActive(item.href)} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="canvas:gap-[22px] flex shrink-0 items-center gap-2">
          {/*
            Kept out of the bar on the smallest phones, where a third round
            button crowds the wordmark. They are not lost — the panel below
            carries them at every width where they are hidden here.
          */}
          <div className="canvas:gap-[22px] hidden items-center gap-2 sm:flex">
            {appLinks.map((app) => (
              <a
                key={app.src}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={app.label}
                className={storeButton}
              >
                <Image
                  src={app.src}
                  alt=""
                  width={24}
                  height={24}
                  className="canvas:size-6 size-5 max-w-none shrink-0"
                />
              </a>
            ))}
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="primary-nav-panel"
            className={cn(
              "border-ink text-ink flex size-11 items-center justify-center rounded-full border bg-white/6",
              "transition-[transform,background-color] duration-200 ease-out motion-reduce:transition-none",
              "hover:bg-ink/10 active:scale-95 xl:hidden",
            )}
          >
            <span className="sr-only">{open ? "Close main menu" : "Open main menu"}</span>
            {/*
              Two bars that cross into an X rather than a glyph swap, so the
              control reads as one object changing state.
            */}
            <span aria-hidden className="relative block h-[14px] w-[20px]">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "bg-ink absolute left-0 block h-[2px] w-full rounded-full",
                    "transition-transform duration-300 ease-out motion-reduce:transition-none",
                    i === 0
                      ? open
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-0"
                      : open
                        ? "bottom-1/2 translate-y-1/2 -rotate-45"
                        : "bottom-0",
                  )}
                />
              ))}
            </span>
          </button>
        </div>
      </Container>

      {/*
        The disclosure panel. Collapsed with a 0fr/1fr grid row rather than
        `hidden`, so it can animate open and the links stay in the DOM for
        crawlers and for `aria-expanded` to describe something real.
        `visibility` is what takes the collapsed panel out of the tab order —
        height alone would leave the links focusable behind the fold.
      */}
      {/*
        The panel starts at the bar's bottom edge, UNDER the wave band (the
        waves are z-10, the panel is not). It used to be pushed down below the
        band so the scallops would not be sliced, which left the page showing
        through between the scallops and the panel's flat top — the lower wave
        strips are translucent glass. Tucked under, the cream scallops melt into
        the cream panel and the glass tints the panel instead of the page. The
        top padding is the band's overhang, so the first link clears the waves.
        It also starts 24px up behind the (transparent) bar: at the far left and
        right the band curls up, and without that the page peeked through the
        two corners above the panel.

        Soft bottom corners and the shadow live on this outer box: the inner
        wrapper has to clip for the 0fr/1fr collapse, and would clip them.
      */}
      <div
        id="primary-nav-panel"
        className={cn(
          "-mt-6 grid overflow-hidden rounded-b-[28px] shadow-[0_18px_40px_-24px_rgba(7,31,16,0.45)] xl:hidden",
          "transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none",
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Primary"
            className="bg-cream relative pt-[calc(var(--kula-wave)-var(--kula-bar)+1.5rem)]"
          >
            <Container className="pt-2 pb-3">
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <li key={item.href} className="border-ink/8 border-b last:border-b-0">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "text-ink flex items-center justify-between py-3.5 text-[16px] leading-6 font-normal tracking-[-0.005em]",
                        "transition-[padding-left,color] duration-200 ease-out hover:pl-1.5 motion-reduce:transition-none",
                        isActive(item.href) && "text-brand font-medium",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) ? (
                        <span aria-hidden className="bg-brand size-1.5 rounded-full" />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 py-4 sm:hidden">
                {appLinks.map((app) => (
                  <a
                    key={app.src}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={app.label}
                    className={storeButton}
                  >
                    <Image
                      src={app.src}
                      alt=""
                      width={24}
                      height={24}
                      className="canvas:size-6 size-5 max-w-none shrink-0"
                    />
                  </a>
                ))}
              </div>
            </Container>
          </nav>
        </div>
      </div>
    </header>
  );
}
