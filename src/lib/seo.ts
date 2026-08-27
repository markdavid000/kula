import type { Metadata } from "next";
import type { Route } from "next";

import { siteConfig } from "@/lib/site";

interface PageMetaOptions {
  title: string;
  description: string;
  /** Route-relative path, e.g. "/vendors". Drives the canonical URL. */
  path: Route;
  /** Legal/utility pages that should not compete in search results. */
  noIndex?: boolean;
}

/**
 * Build per-page metadata with a canonical URL and matching OG/Twitter cards.
 *
 * Every page gets an explicit canonical: without one, query-string variants
 * (utm_*, share ids) are indexed as duplicates and split ranking signals.
 */
export function createMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetaOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * Organization + WebSite structured data for the home page.
 *
 * `WebSite` with `potentialAction` is what enables a sitelinks search box;
 * `Organization` backs the knowledge panel.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        areaServed: { "@type": "Country", name: "Nigeria" },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en-NG",
      },
    ],
  };
}

/** Breadcrumbs help search engines render the site hierarchy under a result. */
export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, siteConfig.url).toString(),
    })),
  };
}
