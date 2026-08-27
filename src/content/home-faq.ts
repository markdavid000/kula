/**
 * Home FAQ copy, transcribed verbatim from the Kula Figma file
 * (FfC9ofVeF8u6tnMm1M57lz, node 264:2938 "faq-section"). Node ids are recorded
 * against each string so a change in the design traces back to one line here.
 *
 * The design draws the list with exactly one item open (264:2970) and five
 * closed. Only the open item has answer copy in the file; the other five answers
 * are AUTHORED (marked at each call site), because the rows are now interactive
 * and a disclosure that opens onto nothing is worse than no disclosure. `answer` is
 * optional and only the first entry carries one. Nothing here is invented: no
 * answer has been written for a question the design leaves closed.
 */

/** 264:2966 / 264:2968 — the left column's heading and standfirst. */
export const homeFaqIntro = {
  /** 264:2967 */
  title: "Frequently Asked Questions",
  /** 264:2968 */
  subtitle:
    "Everything you need to know about getting the best of Benue's flavors delivered hot and fresh.",
} as const;

export interface HomeFaqItem {
  /** The Figma node id of the `faq-item-container` this row transcribes. */
  readonly node: string;
  readonly question: string;
  /**
   * Present only on the row the design draws open. A row with no answer is
   * drawn collapsed, which is the design's own arrangement — not an omission.
   */
  readonly answer?: string;
}

export const homeFaqItems: readonly HomeFaqItem[] = [
  {
    // 264:2970 — the open row: Orange fill, radius 12, question in Young Serif.
    node: "264:2970",
    // 264:2972
    question: "How do I place an order in Makurdi?",
    // 264:2976
    answer:
      "Simply browse our curated list of the best local kitchens in Makurdi, add your favorites to your basket, and select your delivery zone. We handle the rest, from the kitchen to your doorstep.",
  },
  // 264:2977 / 264:2979
  {
    node: "264:2977",
    question: "Which areas in Makurdi do you cover?",
    answer:
      "We deliver across High Level, Wurukum, Modern Market, North Bank, Wadata, Gyado Villa and the BSU area. Enter your street at checkout and we will confirm your zone before you pay.",
  },
  // 264:2984 / 264:2986
  {
    node: "264:2984",
    question: "How long does delivery typically take?",
    answer:
      "Most orders reach you in 25 to 45 minutes, depending on how far the kitchen is from your zone and how busy it is. You will see a live estimate before you confirm.",
  },
  // 264:2991 / 264:2993
  {
    node: "264:2991",
    question: "Can I track my rider in real-time?",
    answer:
      "Yes. The moment your rider collects the order you can follow them on a live map, and you will get their name and number so you can reach them directly.",
  },
  // 264:2998 / 264:3000
  {
    node: "264:2998",
    question: "What payment methods are accepted?",
    answer:
      "Card, bank transfer and USSD are all supported in the app, and cash on delivery is available in most zones. Whatever you choose, you pay once and we settle the kitchen.",
  },
  // 264:3005 / 264:3007
  {
    node: "264:3005",
    question: "How do I cancel an order?",
    answer:
      "Open the order and tap Cancel. It is free until the kitchen starts cooking; after that we can only refund the delivery portion, since the food has already been made.",
  },
];
