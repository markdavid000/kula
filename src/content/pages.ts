/**
 * Marketing copy, transcribed from the Kula Figma document.
 *
 * Provenance note: the design's step lists are drawn as accordions with only
 * the first item expanded, so steps 2 and 3 have no description in the page
 * frame. The descriptions used below are the matching strings from elsewhere in
 * the same Figma document and are marked `fromElsewhereInDoc`. They are the
 * design's own words, but worth a glance during review.
 */

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
  fromElsewhereInDoc?: boolean;
}

/* ---------------------------------------------------------------- Home --- */

export const homeStats: readonly Stat[] = [
  { value: "Under 35 min", label: "Average delivery" },
  { value: "500+", label: "Riders across Benue" },
  { value: "4.8", label: "Average rating" },
  { value: "300+", label: "Restaurants and food spots" },
];

export const whyKula: readonly Feature[] = [
  {
    title: "Exclusive Deals",
    description:
      "Enjoy special promotions and discounts available only through Kula, saving you money while you indulge.",
  },
  {
    title: "Real Time Tracking",
    description:
      "Stay updated with live tracking of your order, so you know exactly when your meal will arrive.",
  },
  {
    title: "Variety of Choices",
    description:
      "From local delicacies to international cuisines, Kula offers a wide range of restaurants to satisfy every palate.",
  },
];

/* ------------------------------------------------------------- Vendors --- */

export const vendorHero = {
  title: "Sell More. Grow More.",
  description:
    "Connect with over 200 local eateries, ghost kitchens, and food vendors in Benue, attracting thousands of new customers daily through Kula.",
  cta: "Get started as a Kula Vendor",
} as const;

export const vendorBenefits: readonly Feature[] = [
  { title: "Fast. Reliable. No Delay", description: "Go live in 48 hours from sign-up" },
  { title: "Your Growth Partner", description: "Unlimited Orders with no monthly cap" },
  { title: "Free", description: "No costs or setup fees, list your products for free" },
];

export const vendorSteps: readonly Step[] = [
  {
    title: "Register as a Vendor",
    description: "Download the vendor application. Takes 5 minutes. No documents needed upfront.",
  },
  {
    title: "Set up Your Menu",
    description:
      "Accept orders, update your menu, and track daily earnings from your phone. Built for low-data environments and older Android phones.",
    fromElsewhereInDoc: true,
  },
  {
    title: "Process Orders",
    description: "Accept orders, update your menu, track daily revenue, and manage your kitchen.",
    fromElsewhereInDoc: true,
  },
];

/* -------------------------------------------------------------- Riders --- */

export const riderHero = {
  title: "Ride. Earn. Own your schedule.",
  description:
    "Deliver on your own terms across Benue. Use the motorcycle you already have, pick your own hours, and cash out every day.",
  cta: "Become a Kula Rider",
} as const;

export const riderBenefits: readonly Feature[] = [
  {
    title: "Rider Community",
    description:
      "Join hundreds of Kula riders. Access exclusive WhatsApp groups, monthly meetups, and peer support.",
  },
  {
    title: "Priority Dispatching",
    description:
      "The more you ride, the higher your priority score. Top riders get first pick of nearby high-value orders.",
  },
  {
    title: "Daily Cash-Outs",
    description:
      "Don't wait for payday. Withdraw your earnings every day, straight to your bank account or mobile money wallet.",
  },
];

export const riderSteps: readonly Step[] = [
  {
    title: "Register as a Rider",
    description:
      "Download the rider application. Takes 5 minutes. You need a valid ID, phone number, and a working motorcycle.",
  },
  {
    title: "Brief Training",
    description:
      "Attend a 2-hour onboarding session at our Makurdi hub. Learn the app, safety protocols, and how to earn more.",
    fromElsewhereInDoc: true,
  },
  {
    title: "Start Earning",
    description: "Accept your first order the same day. Earnings hit your account in real-time.",
    fromElsewhereInDoc: true,
  },
];

export const riderControl = {
  title: "Stay in control of your time.",
  points: [
    "Use your existing motorcycle, no investment required",
    "Earn per delivery — the more you ride, the more you make",
    "No minimum hours or mandatory shifts",
  ],
} as const;

/* ------------------------------------------------- How it works (home) --- */

export interface OrderStep {
  title: string;
  description: string;
  image: string;
  /** Describes the illustration for people who can't see it. */
  alt: string;
}

/**
 * "Get your order in 3 easy steps" — Figma node 264:2842.
 *
 * This section lives in the design as a component instance, so its copy is not
 * reachable by walking the page frame; it came from the REST API, which
 * resolves instances. Illustrations are rendered from the same nodes via
 * `pnpm figma:sync --render`.
 */
export const orderSteps: readonly OrderStep[] = [
  {
    title: "Choose Your Meal",
    description:
      "Browse restaurants and local vendors near you. You can filter by cuisine, rating, or delivery time.",
    image: "/images/step-choose-your-meal.png",
    alt: "A hand scrolling a list of meals in the Kula app.",
  },
  {
    title: "Place an Order",
    description: "Add to cart and checkout in seconds. Pay with card, bank transfer.",
    image: "/images/step-place-an-order.png",
    alt: "A hand tapping Place Order on a ₦4,500 basket in the Kula app.",
  },
  {
    title: "Enjoy Your Meal",
    description:
      "Track your delivery live on the map. Fresh, hot food arrives at your door, enjoy your meal.",
    image: "/images/step-enjoy-your-meal.png",
    alt: "Hands eating a hot bowl of jollof rice delivered by Kula.",
  },
];
