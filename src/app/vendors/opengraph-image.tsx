import { vendorsHero } from "@/content/vendors-page";
import { renderOgCard } from "@/lib/og";

export { ogContentType as contentType, ogSize as size } from "@/lib/og";
export const alt = `${vendorsHero.titleLead}${vendorsHero.titleAccent} — Kula for vendors`;

export default function Image() {
  return renderOgCard({
    eyebrow: "Kula for vendors",
    title: vendorsHero.titleLead,
    accent: vendorsHero.titleAccent,
    description: vendorsHero.subtitle,
    art: "vendors",
  });
}
