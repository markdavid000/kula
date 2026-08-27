/**
 * Vendors — copy transcribed verbatim from the Kula Figma file
 * (FfC9ofVeF8u6tnMm1M57lz, node 510:20048). Every string carries the id of the
 * text node it came from so a change in the design traces back to one line here.
 *
 * Nothing below is rewritten, shortened or tidied: the punctuation, casing and
 * the design's own quirks (the exclamation run in "Free!!!!!!!!", the FAQ
 * question that asks about a motorcycle) are reproduced exactly as drawn.
 *
 * Copy only. Every measurement stays in the component that draws it.
 */

export const vendorsHero = {
  /**
   * 510:20227. Two colour runs in one text node: characters 0–10 are Primary
   * Green, 11–20 are Orange.
   */
  titleLead: "Sell More. ",
  titleAccent: "Grow More.",
  /** 510:20228 */
  subtitle:
    "Connect with over 200 local eateries, ghost kitchens, and food vendors in Benue, attracting thousands of new customers daily through Kula.",
  /** I510:20229;148:7462 */
  cta: "Start Selling on Kula",
} as const;

/** One of the three rounded benefit panels — 520:1386 / 520:2499 / 520:2509. */
export interface VendorBenefit {
  /** 520:2498 / 520:2503 / 520:2513 — the small rotated pill. */
  readonly badge: string;
  /** 520:1899 / 520:2501 / 520:2511 */
  readonly headline: string;
}

/*
 * A fixed-length tuple, not an open array: `VendorBenefits` destructures exactly
 * three panels, and under `noUncheckedIndexedAccess` an open array types each of
 * those bindings as possibly-undefined. The design draws three panels
 * (510:20051, 510:20058, 510:20064) — the arity is part of the composition.
 */
export const vendorBenefits: readonly [VendorBenefit, VendorBenefit, VendorBenefit] = [
  { badge: "Free!!!!!!!!", headline: "No costs or setup fees, list your products for free" },
  { badge: "Fast. Reliable. No Delay", headline: "Go live in 48 hours from sign-up" },
  { badge: "Your Growth Partner", headline: "Unlimited Orders with no monthly cap" },
];

/**
 * The four cards inside the orange panel (520:2505 … 520:2508). Same `card`
 * component, same names and the same image fills as the Home carousel
 * (264:2812 … 264:2815), so they reuse the crops already exported for it rather
 * than duplicating the same bitmaps under a second name.
 */
export interface VendorCardItem {
  readonly node: string;
  /** I520:2505;206:2199 etc. */
  readonly name: string;
  /** I520:2505;206:2202 etc. */
  readonly price: string;
  /** I520:2505;206:2205 etc. */
  readonly cta: string;
  readonly image: string;
}

export const vendorCards: readonly VendorCardItem[] = [
  {
    node: "520:2505",
    name: "Chicken Republic",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/chicken-republic@2x.webp",
  },
  {
    node: "520:2506",
    name: "Spice Route Bistro",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/spice-route-bistro@2x.webp",
  },
  {
    node: "520:2507",
    name: "The Urban Grill",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/the-urban-grill@2x.webp",
  },
  // "Item 7" is the design's own text — a real Nigerian chain, not a placeholder.
  {
    node: "520:2508",
    name: "Item 7",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/item-7@2x.webp",
  },
];

export const vendorsGetStarted = {
  /** 510:20071 */
  heading: "Get started as a Kula Vendor",
  /** I510:20072;148:7462 */
  cta: "Become a Kula Vendor",
} as const;

/** One row of the "gs" stack — 510:20051 / 510:20058 / 510:20064. */
export interface GetStartedStep {
  /** 510:20053 / 510:20060 / 510:20066 */
  readonly title: string;
  /** 510:20057 — only the first row is drawn open, so only it carries a body. */
  readonly body?: string;
}

export const vendorsGetStartedSteps: readonly GetStartedStep[] = [
  {
    title: "Register as a Vendor",
    body: "Download the vendor application. Takes 5 minutes. No documents needed upfront.",
  },
  {
    title: "Set up Your Menu",
    // NOT FROM FIGMA — authored; the design draws this step collapsed.
    body: "Send us your dish list and prices. Our team photographs every item for you at no cost, so your menu looks the part before your first order lands.",
  },
  {
    title: "Process Orders",
    // NOT FROM FIGMA — authored; the design draws this step collapsed.
    body: "Orders arrive in the vendor app. Accept, cook, and hand the bag to the Kula rider who comes to collect — we handle the customer and the delivery from there.",
  },
];

export const vendorsFaqIntro = {
  /** 510:20105 */
  title: "Frequently Asked Questions",
  /** 510:20106 */
  subtitle: "Everything you need to know about getting started as a Kula vendor.",
} as const;

/** One FAQ row — 510:20108 / 510:20115 / 510:20122 / 510:20129 / 510:20136. */
export interface VendorFaqItem {
  readonly node: string;
  readonly question: string;
  /**
   * Present on the one row the design draws open. The other four are AUTHORED,
   * not transcribed — the rows are interactive now and each needs something to
   * open onto.
   */
  readonly answer?: string;
}

export const vendorsFaqItems: readonly VendorFaqItem[] = [
  {
    node: "510:20108",
    /*
     * Transcribed verbatim. The question asks about a motorcycle and the answer
     * is about vendor fees — the design's own mismatch, flagged in the handover
     * rather than silently corrected.
     */
    question: "What type of motorcycle do I need?",
    answer:
      "Kula offers a fee-free experience for all vendors, ensuring you can focus on your business without worrying about additional costs.",
  },
  {
    node: "510:20115",
    question: "How long does it take to go live?",
    answer:
      "Most kitchens are live within 48 hours. Once we have verified your ID and food handling permit, we photograph your menu, set your prices with you and switch you on.",
  },
  {
    node: "510:20122",
    question: "When do I receive my payments?",
    answer:
      "Every Monday we pay the previous week straight into your bank account. Kula takes no commission on your food, so what a customer pays for a dish is what reaches you.",
  },
  {
    node: "510:20129",
    question: "What if I have multiple branches?",
    answer:
      "Add every branch under one account. Each keeps its own menu, prices and opening hours, and orders are routed to whichever branch is closest to the customer.",
  },
  {
    node: "510:20136",
    question: "Do I need a physical restaurant?",
    answer:
      "No. Home kitchens are welcome and many of our best sellers cook from home. You only need a valid food handling permit and somewhere our riders can collect safely.",
  },
];
