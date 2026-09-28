import { describe, expect, it } from "vitest";

import { GET } from "@/app/llms.txt/route";
import { ridersFaq } from "@/content/riders-page";
import { pageIndex } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

describe("/llms.txt", () => {
  it("links every indexable page and no other", async () => {
    const text = await GET().text();
    const linked = [...text.matchAll(/\]\(http:\/\/localhost:3000([^)]*)\)/g)].map((m) => m[1]);
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
