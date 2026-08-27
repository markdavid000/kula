import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social share card, rendered at build time.
 *
 * Deliberately uses system fonts rather than fetching a webfont binary: the
 * card is generated for every page that lacks its own, and a font fetch per
 * render is a build-time cost with no visual payoff at this size.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f8f0dd",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", fontSize: 44, fontWeight: 800, color: "#036729" }}>
        {siteConfig.name}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            color: "#071f10",
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#5c5346", maxWidth: 900 }}>
          {siteConfig.description}
        </div>
      </div>

      <div style={{ display: "flex", height: 12, background: "#ea5220", borderRadius: 999 }} />
    </div>,
    size,
  );
}
