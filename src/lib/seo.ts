import type { Metadata } from "next";

import { type IndexedPath, pageIndex } from "@/lib/routes";
import { siteConfig, socialProfiles } from "@/lib/site";

interface PageMetaOptions {
  title: string;
  description: string;
  /**
   * Route-relative path, e.g. "/vendors". Drives the canonical URL, and must be
   * listed in `pageIndex`, which decides whether the page is indexable.
   */
  path: IndexedPath;
}

/**
 * Build per-page metadata with a canonical URL and matching OG/Twitter cards.
 *
 * Every page gets an explicit canonical: without one, query-string variants
 * (utm_*, share ids) are indexed as duplicates and split ranking signals.
 */
export function createMetadata({ title, description, path }: PageMetaOptions): Metadata {
  const url = absoluteUrl(path);

  /*
   * No `images` here, deliberately. Contrary to the docs, a config image beats
   * a route's own `opengraph-image` file in Next 16.3, so setting a fallback
   * would put the Home card on every page. Each route has a card file instead.
   */
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
    ...(pageIndex[path].indexable ? {} : { robots: { index: false, follow: true } }),
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

const organizationId = `${siteConfig.url}/#organization`;

/**
 * Organization + WebSite structured data, rendered site-wide from the root
 * layout.
 *
 * The organization is typed `LocalBusiness` (a subtype of `Organization`) so it
 * can carry the Makurdi office address and phone — which is what makes Kula
 * eligible for local results. It is not a `FoodEstablishment`: Kula delivers
 * food, it does not cook it.
 *
 * `sameAs` asserts that the listed profiles ARE this business, which is how
 * search and AI engines join the site to its social accounts — so it carries
 * only the handles the Kula team has confirmed, never the placeholder store
 * links.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": organizationId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: absoluteUrl("/images/logo/kula-wordmark@2x.png"),
        image: absoluteUrl("/opengraph-image"),
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneHref,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.streetAddress,
          addressLocality: siteConfig.contact.locality,
          addressRegion: siteConfig.contact.region,
          addressCountry: siteConfig.country,
        },
        sameAs: socialProfiles,
        areaServed: siteConfig.servedCities.map((name) => ({ "@type": "City", name })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contact.email,
          telephone: siteConfig.contact.phoneHref,
          areaServed: siteConfig.country,
          availableLanguage: ["en"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": organizationId },
        inLanguage: "en-NG",
      },
    ],
  };
}

/** Breadcrumbs help search engines render the site hierarchy under a result. */
export function breadcrumbJsonLd(trail: readonly { name: string; path: IndexedPath }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export interface FaqEntry {
  readonly question: string;
  readonly answer?: string;
}

/**
 * FAQPage structured data for a page's accordion.
 *
 * Only rows that are rendered on the page with a real answer are included —
 * structured data that says something the visible page does not is a spam
 * signal.
 *
 * Returns null when nothing is left, so the caller renders no empty block.
 */
export function faqPageJsonLd(items: readonly FaqEntry[]) {
  const entries = items.filter((item): item is FaqEntry & { answer: string } =>
    Boolean(item.answer),
  );
  if (entries.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
