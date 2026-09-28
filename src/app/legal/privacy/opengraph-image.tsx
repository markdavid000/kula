import { privacyPolicy } from "@/content/legal-privacy";
import { renderOgCard } from "@/lib/og";

export { ogContentType as contentType, ogSize as size } from "@/lib/og";
export const alt = `${privacyPolicy.title} — Kula`;

export default function Image() {
  return renderOgCard({
    eyebrow: "Legal",
    title: privacyPolicy.title,
    description: privacyPolicy.intro,
    art: "mark",
  });
}
