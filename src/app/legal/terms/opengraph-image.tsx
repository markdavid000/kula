import { termsAndConditions } from "@/content/legal-terms";
import { renderOgCard } from "@/lib/og";

export { ogContentType as contentType, ogSize as size } from "@/lib/og";
export const alt = `${termsAndConditions.title} — Kula`;

export default function Image() {
  return renderOgCard({
    eyebrow: "Legal",
    title: termsAndConditions.title,
    description: termsAndConditions.intro,
    art: "mark",
  });
}
