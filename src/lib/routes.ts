import type { MetadataRoute, Route } from "next";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export interface PageIndexEntry {
  /**
   * Whether search engines may index the page. `false` emits `noindex` from
   * `createMetadata` AND keeps the page out of the sitemap — the two can never
   * disagree, because both read this one flag.
   */
  readonly indexable: boolean;
  readonly changeFrequency?: ChangeFrequency;
  readonly priority?: number;
}

/**
 * Every routable page and how search engines should treat it.
 *
 * This is the single source of truth for indexing. The sitemap is generated
 * from it, and `createMetadata` only accepts a path that appears here, so a new
 * page does not type-check until someone has decided whether it is indexable.
 *
 * Non-indexable pages are deliberately NOT disallowed in robots.txt: a crawler
 * that is blocked from fetching a page never sees its `noindex`, and can still
 * index the bare URL from inbound links.
 */
export const pageIndex = {
  "/": { indexable: true, changeFrequency: "weekly", priority: 1 },
  "/vendors": { indexable: true, changeFrequency: "monthly", priority: 0.8 },
  "/riders": { indexable: true, changeFrequency: "monthly", priority: 0.8 },
  "/legal/terms": { indexable: true, changeFrequency: "yearly", priority: 0.3 },
  "/legal/privacy": { indexable: true, changeFrequency: "yearly", priority: 0.3 },
  "/legal/refunds": { indexable: true, changeFrequency: "yearly", priority: 0.3 },

  // Placeholder: no designed screen and no posts yet. Flip once it has content.
  "/blog": { indexable: false },
  // Not designed, unlinked from the nav, and its form has no delivery wired up.
  "/contact": { indexable: false },
} as const satisfies Record<Route, PageIndexEntry>;

export type IndexedPath = keyof typeof pageIndex;

/** The paths search engines may index — the ones listed in sitemap.xml. */
export type IndexablePath = {
  [P in IndexedPath]: (typeof pageIndex)[P]["indexable"] extends true ? P : never;
}[IndexedPath];
