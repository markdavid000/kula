import { FaqSection } from "@/components/home/faq-section";
import { FeaturedVendors } from "@/components/home/featured-vendors";
import { Hero } from "@/components/home/hero";
import { MealVariety } from "@/components/home/meal-variety";
import { ReachUs } from "@/components/home/reach-us";
import { StatsTicker } from "@/components/home/stats-ticker";
import { TasteTheHype } from "@/components/home/taste-the-hype";
import { ThreeSteps } from "@/components/home/three-steps";
import { WhyKula } from "@/components/home/why-kula";
import { JsonLd } from "@/components/json-ld";
import { KulaFooter } from "@/components/layout/kula-footer";
import { homeFaqItems } from "@/content/home-faq";
import { createMetadata, faqPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const faqJsonLd = faqPageJsonLd(homeFaqItems);

/**
 * Home — Figma node 264:2259.
 *
 * Every section below is transcribed from the design, in the design's own order:
 * hero, Featured Vendors, Why Kula, Variety of Meals, 3 Easy Steps, stats strip,
 * Taste the Hype, FAQ, Contact. The footer (264:3012) is rendered per page
 * rather than from the root layout — see `KulaFooter` for why.
 */
export default function HomePage() {
  return (
    <>
      {/* 264:2260 */}
      <Hero />

      {/*
        264:2770. The design puts nothing between the hero and this panel — the
        stats strip that used to sit here is section 6, far below (264:2843).
      */}
      <FeaturedVendors />

      {/* 264:2668 */}
      <WhyKula />

      {/* 264:2655 */}
      <MealVariety />

      {/* 264:2842 */}
      <ThreeSteps />

      {/* 264:2843 */}
      <StatsTicker />

      {/* 264:2886 */}
      <TasteTheHype />

      {/* 264:2938 */}
      <FaqSection />

      {/*
        574:2843. The design repeats this band verbatim on Vendors, Terms,
        Privacy and Refunds — a 57-node diff of 574:2901 / 574:2728 / 574:2729 /
        574:2786 against this frame returns zero differences — so all five routes
        render the same component.
      */}
      <ReachUs />

      {/* 264:3012 — 12px below the contact band (574:2843 ends 8749, strip 8761). */}
      <KulaFooter topGap={12} />

      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
    </>
  );
}
