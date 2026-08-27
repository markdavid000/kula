/**
 * Return / Refund Policy copy — transcribed verbatim from the Kula Figma file
 * (FfC9ofVeF8u6tnMm1M57lz, node 564:2465 "Refund policy", 1440 x 3896). Node
 * ids are recorded against every string so a change in the design traces back
 * to the exact line here.
 *
 * This is legally binding text. Nothing below is paraphrased, tidied, reflowed
 * or corrected: each `body` is the exact `characters` value of its Figma text
 * node, newlines included. The design draws those newlines as plain line breaks
 * with no bullets, and `LegalPage` reproduces them with `white-space: pre-line`.
 *
 * Two invisible characters in the design are preserved as explicit escapes so
 * they survive editors and formatters: ` ` (NO-BREAK SPACE, three of them
 * in section 3, binding "the app or via <address>" together) and `–` (EN
 * DASH, in "3–7 business days"). Neither is a typo to fix.
 *
 * `title` is stored in the design's own casing; the `textCase: TITLE` on
 * 564:2571 is a presentational transform and lives in the component.
 *
 * One typographic anomaly is deliberately NOT reproduced, and it is recorded
 * here so it is not mistaken for an oversight: heading 564:2551 ("4. Dispute
 * Resolution") carries `fontFamily: Inter` at 32/38.727 where the other three
 * headings — and all 25 headings across the three legal documents — carry
 * `FONTSPRINGDEMO-GelicaRgBold` at 32/37.92. Size, weight (700) and letter
 * spacing (-0.3) are identical; only the face and the auto line height differ,
 * which is the signature of a face that was never applied rather than a chosen
 * contrast. Privacy's §4 (564:2402) is the same slip. `LegalPage` renders every
 * heading in `font-display`. See the deviation log.
 */

import type { LegalDocument } from "@/components/legal/legal-page";

/** Return / Refund Policy — Figma 564:2465. */
export const refundPolicy: LegalDocument = {
  /** 564:2574 */
  eyebrow: "Legal",
  /** 564:2571 */
  title: "Refund Policy",
  /** 564:2572 */
  intro: "We want you to be completely satisfied with your purchase.",
  /** 564:2540 — four blocks, in order. */
  sections: [
    {
      nodeId: "564:2541",
      heading: "1. Eligibility for Refund",
      body: "Refunds apply under the following conditions:\nThe wrong item was delivered.\nThe food arrived spoiled or damaged.\nThe vendor failed to deliver due to unavailability.\nPayment was made but order not processed.",
    },
    {
      nodeId: "564:2544",
      heading: "2. Non-Refundable Cases",
      body: "Refunds are not applicable when:\nCustomer entered an incorrect delivery address.\nCustomer is unavailable at the time of delivery.\nThe food was consumed before complaint.\nOrder cancellation occurs after preparation.",
    },
    {
      nodeId: "564:2547",
      heading: "3. Refund Process",
      body: "Submit a refund request within 24 hours of delivery through the\u00A0app\u00A0or via\u00A0thekulaapp.info@gmail.com.\nRefunds are processed within 3\u20137 business days after verification.\nPayment is returned via the same channel used for the original transaction.",
    },
    {
      nodeId: "564:2550",
      heading: "4. Dispute Resolution",
      body: "Any refund or order dispute will be investigated fairly. Our decision will be based on vendor and rider reports, and may involve evidence such as photos or timestamps.",
    },
  ],
};
