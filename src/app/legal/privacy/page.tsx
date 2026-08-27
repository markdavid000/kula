import { ReachUs } from "@/components/home/reach-us";
import { KulaFooter } from "@/components/layout/kula-footer";
import { LegalPage } from "@/components/legal/legal-page";
import { privacyPolicy } from "@/content/legal-privacy";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.intro,
  path: "/legal/privacy",
});

/**
 * Privacy Policy — Figma 564:2316 (1440 x 4926).
 *
 * The frame is the same drawing as Terms & Conditions with different words: the
 * ink hero band (564:2428, 1440 x 564 — node-for-node the Terms band, down to
 * the pill's -33.63px vertical offset from the title) over a 1280-wide prose
 * column (564:2391, nine blocks, gap 64, heading/body gap 24), then the "Need
 * to Reach us?" band (574:2729) and the shared footer. So every visual value
 * comes from `LegalPage`, every word from `@/content/legal-privacy`, the
 * contact band is the already-transcribed `ReachUs`, and the footer is rendered
 * by the root layout. There is nothing page-specific left to draw here.
 */
export default function PrivacyPage() {
  return (
    <LegalPage document={privacyPolicy}>
      <ReachUs />
      {/* 564:2318 — 246px below the contact band (574:2729 ends 3488, strip 3734). */}
      <KulaFooter topGap={246} />
    </LegalPage>
  );
}
