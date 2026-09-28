import { hero } from "@/content/home";
import { renderOgCard } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export { ogContentType as contentType, ogSize as size } from "@/lib/og";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

/**
 * Home's share card, and the default for every route without its own (the
 * unlisted Blog and Contact pages and the 404).
 */
export default function Image() {
  return renderOgCard({
    eyebrow: "Food delivery in Benue",
    title: hero.headline.lead,
    accent: hero.headline.highlight,
    description: hero.subhead,
    art: "home",
  });
}
