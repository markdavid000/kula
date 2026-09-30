import { ReachUs } from "@/components/home/reach-us";
import { JsonLd } from "@/components/json-ld";
import { KulaFooter } from "@/components/layout/kula-footer";
import { VendorBenefits } from "@/components/vendors/vendor-benefits";
import { VendorsFaq } from "@/components/vendors/faq-section";
import { GetStarted } from "@/components/vendors/get-started";
import { VendorsHero } from "@/components/vendors/hero";
import { vendorsFaqItems, vendorsHero } from "@/content/vendors-page";
import { breadcrumbJsonLd, createMetadata, faqPageJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Vendors",
  description: vendorsHero.subtitle,
  path: "/vendors",
});

const faqJsonLd = faqPageJsonLd(vendorsFaqItems);
const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Vendors", path: "/vendors" },
]);

/**
 * Vendors — Figma node 510:20048 (1440 x 7075).
 *
 * The page frame has three children: the hero band (510:20224), the cream plate
 * that carries everything else (510:20049) and the shared header (510:20223),
 * which the root layout already renders. The plate's own children are the real
 * sections, in the order they run down the canvas:
 *
 *   520:1386 / 520:2499 / 520:2509   the three 940 x 480 benefit panels,
 *                                    page y 718–2238. The first is drawn 141px
 *                                    above the plate's own top edge, so the
 *                                    stack overlaps the hero.
 *   510:20070 + 510:20073 + 510:20050  "Get started as a Kula Vendor" — three
 *                                    sibling frames, y 2556–3492, reassembled
 *                                    into one section.
 *   510:20076                        the FAQ panel, y 3729–4488
 *   574:2901                         "Need to Reach us?", y 4488–5307
 *   510:20150                        the footer, which is site furniture
 *
 * 574:2901 is not a variant of Home's contact band (574:2843) — it is the same
 * frame duplicated onto this page. Every measurement, fill, type style and
 * string in the two subtrees matches, so this route renders the component that
 * already transcribes it rather than a second copy of the same 250 lines.
 *
 * The footer (510:20150) is likewise shared, but note that its CTA card is not
 * identical to Home's: the headline reads "Join the Kula team as a vendor", the
 * "Get the mobile app" label is Inter 18/27 rather than Roboto Flex 20/28, and
 * the illustration is a different bitmap. That belongs to the footer component,
 * not to this route — see the handover.
 */
export default function VendorsPage() {
  return (
    <>
      {/* 510:20224 */}
      <VendorsHero />

      {/* 520:1386, 520:2499, 520:2509 */}
      <VendorBenefits />

      {/* 510:20070, 510:20073, 510:20050 */}
      <GetStarted />

      {/* 510:20076 */}
      <VendorsFaq />

      {/* 574:2901 */}
      <ReachUs />

      {/* 510:20150 — 232px below the contact band (574:2901 ends 5307, strip 5539). */}
      <KulaFooter topGap={232} variant="vendor" />

      <JsonLd data={breadcrumbs} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
    </>
  );
}
