/**
 * Privacy Policy copy — transcribed verbatim from the Kula Figma file
 * (FfC9ofVeF8u6tnMm1M57lz, node 564:2316). Node ids are recorded against every
 * string so a change in the design traces to the exact line here.
 *
 * This is legally binding text. Nothing below is paraphrased, tidied, reflowed
 * or corrected: each `body` is the exact `characters` value of its Figma text
 * node, newlines included. The design draws those newlines as plain line breaks
 * with no bullets, and `LegalPage` reproduces them with `white-space: pre-line`.
 *
 * The copy carries exactly two non-ASCII characters, and both are the design's:
 *   - U+2013 EN DASH, four times in section 2 ("Personal Information – Name…").
 *     Kept literal, so the clause still reads as prose under review. It is an
 *     en dash, not a hyphen, and must not be "corrected" to one.
 *   - U+00A0 NO-BREAK SPACE, once in section 6, between "contact" and the
 *     email address. Written as the escape `\u00a0` because the character
 *     is invisible in an editor, and a plain space would silently rewrite
 *     legally binding text.
 *
 * `title` is stored in the design's own casing; the `textCase: TITLE` on
 * 564:2431 is a presentational transform and lives in the component.
 *
 * Verified against the cache by diffing every string here against its node's
 * `characters`: 21 of 21 exact, punctuation and line breaks included.
 * Geometry matches too — each block's height is its heading's line box plus
 * the 24px gap plus 27px per rendered body line, giving 116 / 197 / 224 / 117 /
 * 197 / 197 / 89 / 89 / 89, which sums with the eight 64px gaps to 564:2391's
 * own 1827. Blocks 1 and 4 render one line more than their body has newlines:
 * that extra line is Figma WRAPPING the source line at the 1280px measure, not
 * a break this transcription may add, so the browser reproduces it unaided.
 *
 * Block 4 is the one that is not 116-shaped. Its heading node (564:2402) has
 * lost its font binding in the design and so carries a 38.73px line box where
 * the other eight carry 37.92px; `LegalPage` sets 37.92 for all nine. See the
 * deviation log.
 */

import type { LegalDocument } from "@/components/legal/legal-page";

/** Privacy Policy — Figma 564:2316. */
export const privacyPolicy: LegalDocument = {
  /** 564:2434 */
  eyebrow: "Legal",
  /** 564:2431 */
  title: "Privacy Policy",
  /** 564:2432 */
  intro: "Your privacy is important to us. Learn how we collect and use your information.",
  /** 564:2391 — nine blocks, in the order the auto-layout stacks them. */
  sections: [
    {
      nodeId: "564:2392",
      heading: "1. Introduction",
      body: "KulaApp Limited respects your privacy and is committed to protecting your personal information in accordance with the Nigeria Data Protection Regulation (NDPR).",
    },
    {
      nodeId: "564:2395",
      heading: "2. Information We Collect",
      body: "We may collect:\nPersonal Information – Name, email, phone number, delivery address.\nPayment Data – Transaction records (handled securely via third-party processors).\nLocation Data – For delivery tracking and service accuracy.\nUsage Data – Device type, IP address, and app activity for analytics.",
    },
    {
      nodeId: "564:2398",
      heading: "3. How We Use Your Information",
      body: "We use your data to:\nProcess and deliver your orders.\nProvide customer support.\nImprove app performance and user experience.\nSend updates, promotions, and service notifications.\nComply with legal obligations.",
    },
    {
      nodeId: "564:2401",
      heading: "4. Data Protection and Security",
      body: "We implement strong security measures to protect user data from unauthorized access, disclosure, or misuse. Payment details are encrypted and handled by trusted gateways (e.g., Flutterwave or Paystack).",
    },
    {
      nodeId: "564:2404",
      heading: "5. Sharing of Information",
      body: "We may share information with:\nPartner vendors and riders to fulfill orders.\nPayment processors for transactions.\nLaw enforcement when required by law.\nWe do not sell or rent user data to third parties.",
    },
    {
      nodeId: "564:2407",
      heading: "6. User Rights",
      body: "You have the right to:\nAccess, update, or delete your personal data.\nWithdraw consent to data processing.\nRequest a copy of your stored information.\nTo exercise these rights, contact\u00a0thekulaapp.info@gmail.com",
    },
    {
      nodeId: "564:2410",
      heading: "7. Cookies and Tracking",
      body: "Our website/app uses cookies to enhance user experience, analytics, and targeted promotions. You may disable cookies in your browser settings.",
    },
    {
      nodeId: "564:2416",
      heading: "8. Data Retention",
      body: "We retain your information only as long as necessary for business or legal reasons, after which it is securely deleted.",
    },
    {
      nodeId: "564:2413",
      heading: "9. Updates to this Policy",
      body: "KulaApp Limited may update this policy periodically. Users will be notified of significant changes through the app or email.",
    },
  ],
};
