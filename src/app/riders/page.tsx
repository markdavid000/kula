import { KulaFooter } from "@/components/layout/kula-footer";
import { RidersFaq } from "@/components/riders/faq-section";
import { RidersHero } from "@/components/riders/hero";
import { StartEarning } from "@/components/riders/start-earning";
import { StayInControl } from "@/components/riders/stay-in-control";
import { WeTakeCare } from "@/components/riders/we-take-care";
import { ridersHero } from "@/content/riders-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Riders",
  description: ridersHero.subtitle,
  path: "/riders",
});

/**
 * Riders — Figma node 441:6478 (1440 x 6178).
 *
 * The page frame holds four children. Three of them are transcribed here, in
 * the order the design stacks them down the canvas:
 *
 *   517:1265   the dark hero, page y 0–1372
 *   441:6800   the Accent Yellow "Stay in control" card, y 851–1975, which
 *              overlaps the hero by 521px
 *   441:6517   "We take care of our riders", y 2143–2557
 *   441:6792 + 510:25744 + 510:25764   "Start earning in 3 steps", y 2749–3685
 *   441:6606   the FAQ panel, y 3856–4999
 *
 * The fourth, 458:7415 "header", is the shared site header and is already
 * rendered by the root layout. So is the footer (441:6680, which carries the
 * CTA strip 441:6735 inside it) — it is the same component on every page and
 * does not belong to this route.
 *
 * Note that 517:1265 and 441:6516 are both named "hero". They are different
 * things: the first is the dark plate at the top, the second is the cream frame
 * that holds everything below it. The cream is the page background, so 441:6516
 * needs no element of its own.
 */
export default function RidersPage() {
  return (
    <>
      <RidersHero />
      <StayInControl />
      <WeTakeCare />
      <StartEarning />
      <RidersFaq />

      {/* 441:6680 — the footer OVERLAPS the FAQ by 13px (441:6606 ends 4999, strip 4986). */}
      <KulaFooter topGap={-13} />
    </>
  );
}
