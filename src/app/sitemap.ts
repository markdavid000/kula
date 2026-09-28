import type { MetadataRoute } from "next";

import { type PageIndexEntry, pageIndex } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap generated from `pageIndex` — the same table that decides each page's
 * `noindex` — so the sitemap can never list a page that asks not to be indexed,
 * or miss one that should be.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return (Object.entries(pageIndex) as [string, PageIndexEntry][])
    .filter(([, entry]) => entry.indexable)
    .map(([path, entry]) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    }));
}
