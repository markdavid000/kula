import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f0dd",
    theme_color: "#071f10",
    lang: "en-NG",
    /*
     * Cut from the logo mark in the design's own wordmark artwork (the 4096px
     * image fill behind the footer wordmark, 520:6959) — see
     * docs/asset-exports.md. The maskable one is the chevrons alone on the
     * mark's green, inside the 80% safe zone.
     */
    icons: [
      { src: "/icons/app/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/app/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/app/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
