import { ReachUs } from "@/components/home/reach-us";
import { JsonLd } from "@/components/json-ld";
import { KulaFooter } from "@/components/layout/kula-footer";
import { LegalPage } from "@/components/legal/legal-page";
import { refundPolicy } from "@/content/legal-refunds";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: refundPolicy.title,
  description: refundPolicy.intro,
  path: "/legal/refunds",
});

// There is no /legal index page, so the trail goes straight from Home.
const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: refundPolicy.title, path: "/legal/refunds" },
]);

/**
 * Return / Refund Policy — Figma 564:2465 (1440 x 3896).
 *
 * The frame is the same drawing as Terms & Conditions and Privacy with
 * different words: the ink hero band (564:2568, 1440 x 564 — node-for-node the
 * Terms band, down to the pill AABB of 105.28596 x 55.73913 and its title
 * offsets) over a 1280-wide prose column (564:2540, four blocks, gap 64,
 * heading/body gap 24, ending 160 above the contact band), then the "Need to
 * Reach us?" band (574:2786) and the shared footer. So every visual value comes
 * from `LegalPage`, every word from `@/content/legal-refunds`, the contact band
 * is the already-transcribed `ReachUs` — its inputs are the #e5e5e5 row
 * (574:2829 → `--color-rule`) — and the footer is rendered by the root layout.
 * There is nothing page-specific left to draw here.
 */
export default function RefundsPage() {
  return (
    <LegalPage document={refundPolicy}>
      <ReachUs />
      {/* 564:2467 — 196px below the contact band (574:2786 ends 2508, strip 2704). */}
      <KulaFooter topGap={196} />
      <JsonLd data={breadcrumbs} />
    </LegalPage>
  );
}
