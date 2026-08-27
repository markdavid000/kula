/**
 * FAQ content.
 *
 * The Figma document shows these accordions collapsed, so only the one expanded
 * item per page carries a written answer. Those are marked `verbatim` and are
 * the design's exact words.
 *
 * The remaining answers are marked `draft: true` — they were written to keep
 * the section shippable and are grounded only in facts stated elsewhere in the
 * design (35-minute average delivery, Makurdi/Gboko/Otukpo coverage, daily
 * cash-outs, 48-hour vendor onboarding, fee-free vendor accounts). They need
 * sign-off before launch — grep for `draft: true`.
 */

export interface FaqItem {
  question: string;
  answer: string;
  /** True when the answer is placeholder copy awaiting client sign-off. */
  draft?: boolean;
}

export const homeFaqs: readonly FaqItem[] = [
  {
    question: "How do I place an order in Makurdi?",
    // verbatim — design node "answer-text" under the expanded FAQ item
    answer:
      "Simply browse our curated list of the best local kitchens in Makurdi, add your favorites to your basket, and select your delivery zone. We handle the rest, from the kitchen to your doorstep.",
  },
  {
    question: "How do I cancel an order?",
    answer:
      "You can cancel from the Orders tab in the app while your order is still being confirmed. Once the kitchen has started preparing it, cancellation is no longer possible — contact support and we will help.",
    draft: true,
  },
  {
    question: "Can I track my rider in real-time?",
    answer:
      "Yes. Once your order is dispatched you will see your rider move on the map, along with an updating arrival estimate, right up to your door.",
    draft: true,
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "You can pay by local card, bank transfer, or your in-app wallet. Cash on delivery is available with selected vendors.",
    draft: true,
  },
  {
    question: "How long does delivery typically take?",
    answer:
      "Deliveries average under 35 minutes. Distance, weather and how busy the kitchen is can affect this, and your live estimate always reflects current conditions.",
    draft: true,
  },
  {
    question: "Which areas in Makurdi do you cover?",
    answer:
      "We deliver across Makurdi, Gboko and Otukpo, and to nearby areas covered by Kula riders. Enter your address in the app to confirm your delivery zone.",
    draft: true,
  },
];

export const vendorFaqs: readonly FaqItem[] = [
  {
    question: "Do I need a physical restaurant?",
    // verbatim
    answer:
      "Kula offers a fee-free experience for all vendors, ensuring you can focus on your business without worrying about additional costs.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Most vendors are live within 48 hours of signing up. Registration itself takes about five minutes and needs no documents upfront.",
    draft: true,
  },
  {
    question: "When do I receive my payments?",
    answer:
      "Earnings are settled to your registered bank account on a regular payout cycle, and your daily revenue is visible in the vendor app at any time.",
    draft: true,
  },
  {
    question: "What if I have multiple branches?",
    answer:
      "You can run multiple branches under one vendor account, each with its own menu, opening hours and delivery zone.",
    draft: true,
  },
];

export const riderFaqs: readonly FaqItem[] = [
  {
    question: "Can I choose my own working hours?",
    // verbatim — design node under the expanded rider FAQ item
    answer: "With Kula, you control orders. Log in anytime and cash out daily. Kula adapts to you.",
  },
  {
    question: "Do I need to be in Makurdi?",
    answer:
      "You need to ride in an area Kula covers. We currently operate across Makurdi, Gboko and Otukpo, with more of Benue coming.",
    draft: true,
  },
  {
    question: "What type of motorcycle do I need?",
    answer:
      "Any roadworthy motorcycle you already own. There is no vehicle investment required to start riding with Kula.",
    draft: true,
  },
  {
    question: "How does payment work?",
    answer:
      "You earn per delivery and can withdraw daily, straight to your bank account or mobile money wallet — no waiting for payday.",
    draft: true,
  },
  {
    question: "Is there a minimum number of deliveries?",
    answer:
      "No. There are no minimum hours and no mandatory shifts. The more you ride, the higher your priority score for nearby high-value orders.",
    draft: true,
  },
];
