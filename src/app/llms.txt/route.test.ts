import { describe, expect, it } from "vitest";

import { GET } from "@/app/llms.txt/route";
import { ridersFaq } from "@/content/riders-page";
import { pageIndex } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

describe("/llms.txt", () => {
  it("links every indexable page and no other", async () => {
    const text = await GET().text();
    // Links are absolute on whatever origin the build resolved (localhost on a
    // laptop, NEXT_PUBLIC_SITE_URL in CI), so read the paths off that origin.
    const linked = [...text.matchAll(/\]\((https?:\/\/[^)]+)\)/g)]
      .map((m) => new URL(m[1]!))
      .filter((url) => url.origin === new URL(siteConfig.url).origin)
      .map((url) => url.pathname);
    const indexable = Object.entries(pageIndex)
      .filter(([, entry]) => entry.indexable)
      .map(([path]) => path);

    expect(linked.sort()).toEqual(indexable.sort());
  });

  it("carries the key facts and the FAQ answers the pages render", async () => {
    const text = await GET().text();

    expect(text).toContain(siteConfig.contact.address);
    expect(text).toContain(siteConfig.servedCities.join(", "));
    for (const item of ridersFaq.items) expect(text).toContain(`### ${item.question}`);
  });
});
