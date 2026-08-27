import { ReachUs } from "@/components/home/reach-us";
import { KulaFooter } from "@/components/layout/kula-footer";
import { LegalPage } from "@/components/legal/legal-page";
import { termsAndConditions } from "@/content/legal-terms";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.intro,
  path: "/legal/terms",
});

/**
 * Terms & Conditions — Figma 533:6982 (1440 x 5380).
 *
 * The frame is: hero band + prose column + the "Need to Reach us?" band
 * (574:2728) + the shared footer. Only the first two are page-specific, so they
 * live in `LegalPage`; the contact band is node-for-node identical to Home's
 * (all 57 nodes match), so it is the already-transcribed `ReachUs`; the footer
 * comes from the root layout. Every visual value lives in `LegalPage`, every
 * word in `@/content/legal-terms`.
 */
export default function TermsPage() {
  return (
    <LegalPage document={termsAndConditions}>
      <ReachUs />
      {/* 533:7148 — 241px below the contact band (574:2728 ends 3947, strip 4188). */}
      <KulaFooter topGap={241} />
    </LegalPage>
  );
}
