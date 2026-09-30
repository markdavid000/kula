import { ridersHero } from "@/content/riders-page";
import { renderOgCard } from "@/lib/og";

export { ogContentType as contentType, ogSize as size } from "@/lib/og";
export const alt = `${ridersHero.title} — Kula for riders`;

export default function Image() {
  return renderOgCard({
    eyebrow: "Kula for riders",
    title: ridersHero.title,
    description: ridersHero.subtitle,
    art: "riders",
  });
}
