import { refundPolicy } from "@/content/legal-refunds";
import { renderOgCard } from "@/lib/og";

export { ogContentType as contentType, ogSize as size } from "@/lib/og";
export const alt = `${refundPolicy.title} — Kula`;

export default function Image() {
  return renderOgCard({
    eyebrow: "Legal",
    title: refundPolicy.title,
    description: refundPolicy.intro,
    art: "mark",
  });
}
