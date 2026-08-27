import type { MetadataRoute } from "next";

import { legalNav, primaryNav, siteConfig } from "@/lib/site";

/**
 * Sitemap generated from the same nav config the site renders, so a new page
 * cannot be added to the navigation and forgotten here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const marketing = primaryNav.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    lastModified,
    // The home page is the entry point; the rest sit a step below it.
    changeFrequency: (item.href === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const legal = legalNav.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...marketing, ...legal];
}
