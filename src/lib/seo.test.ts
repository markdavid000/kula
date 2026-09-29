import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { pageIndex } from "@/lib/routes";
import { createMetadata, faqPageJsonLd, organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

describe("createMetadata", () => {
  it("gives indexable pages an absolute canonical and no robots override", () => {
    const meta = createMetadata({ title: "Riders", description: "d", path: "/riders" });

    // The origin comes from NEXT_PUBLIC_SITE_URL, which differs between a laptop
    // and CI, so assert against whatever the build resolved.
    expect(meta.alternates?.canonical).toBe(`${siteConfig.url}/riders`);
    expect(meta.robots).toBeUndefined();
  });

  it("marks pages the route table excludes as noindex", () => {
    const meta = createMetadata({ title: "Blog", description: "d", path: "/blog" });

    expect(meta.robots).toEqual({ index: false, follow: true });
  });
});

describe("sitemap", () => {
  it("lists exactly the indexable pages in the route table", () => {
    const urls = sitemap().map((entry) => new URL(entry.url).pathname);
    const indexable = Object.entries(pageIndex)
      .filter(([, entry]) => entry.indexable)
      .map(([path]) => path);

    expect(urls.sort()).toEqual(indexable.sort());
    expect(urls).not.toContain("/blog");
  });
});

describe("faqPageJsonLd", () => {
  it("includes only answered rows", () => {
    const data = faqPageJsonLd([
      { question: "Answered?", answer: "Yes." },
      { question: "Unanswered?" },
    ]);

    expect(data?.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "Answered?",
        acceptedAnswer: { "@type": "Answer", text: "Yes." },
      },
    ]);
  });

  it("returns null rather than an empty FAQPage", () => {
    expect(faqPageJsonLd([{ question: "Unanswered?" }])).toBeNull();
  });
});

describe("organizationJsonLd", () => {
  it("describes a local business with a postal address", () => {
    const [business] = organizationJsonLd()["@graph"];

    expect(business).toMatchObject({
      "@type": "LocalBusiness",
      address: { addressLocality: "Makurdi", addressCountry: "NG" },
      sameAs: expect.arrayContaining(["https://www.tiktok.com/@thekulaapp.ng"]),
    });
  });
});
