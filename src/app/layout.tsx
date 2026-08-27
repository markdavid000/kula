import type { Metadata, Viewport } from "next";
import { Bitter, Inter, Noto_Sans, Roboto_Flex, Young_Serif } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

/**
 * Fonts are self-hosted by next/font at build time: no request to Google, no
 * render-blocking stylesheet, and a generated size-adjust fallback that removes
 * the layout shift a swapping webfont would otherwise cause (CLS).
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * The design sets one recurring label style in Roboto Flex — "Get the Kula app
 * on:" and its counterparts on five of the six pages. Loaded at a single weight
 * so it costs little.
 */
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-flex",
  display: "swap",
});

/**
 * The stats ticker (264:2843) is the one place the design sets Noto Sans, and it
 * sets the italic cut specifically (`NotoSans-Italic`). Loaded at that one style
 * so the cost of transcribing it faithfully stays small.
 */
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-noto-sans",
  display: "swap",
});

/**
 * The design sets Young Serif on every FAQ question — 22/26.4, weight 400 — on
 * Home (264:2972), Vendors (510:20110) and Riders (441:6640). It ships in only
 * one weight, which is what the design uses.
 */
const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-young-serif",
  display: "swap",
});

/** Stands in for the design's licensed Gelica display face — see globals.css. */
const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    // Every child page supplies only its own name; the brand is appended here.
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Stops iOS Safari auto-linking numbers in copy as phone numbers.
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  // Matches the header, so mobile browser chrome blends into the page.
  themeColor: "#071f10",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={`${inter.variable} ${bitter.variable} ${robotoFlex.variable} ${notoSans.variable} ${youngSerif.variable} h-full antialiased`}
    >
      {/*
        `relative` anchors the header, which the design draws as an overlay on
        each page's first section rather than as a band above it.
      */}
      <body className="relative flex min-h-full flex-col">
        <SkipLink />
        <SiteHeader />
        {/* tabIndex -1 makes the skip link's target focusable. */}
        {/*
          The footer is NOT rendered here. The design draws it as a child of each
          page frame with a different gap above it on every page (12 / 232 / -13 /
          241 / 246 / 196) and a different card on Vendors, so each page renders
          its own <KulaFooter topGap={…} variant={…} />.
        */}
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
