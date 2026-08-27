import { externalLinks } from "@/lib/site";

/**
 * Home page copy, transcribed verbatim from the Kula Figma file
 * (FfC9ofVeF8u6tnMm1M57lz, node 264:2259). Node ids are recorded against each
 * string so a change in the design can be traced to the exact line here.
 *
 * Strings are stored exactly as they appear in Figma's `characters`, including
 * the lower-case headline: the design applies `textCase: TITLE`, which is a
 * presentational transform (`text-transform: capitalize`) and belongs in the
 * component, not in the source text.
 */

/** Hero — 264:2260. */
export const hero = {
  /** 264:2617. Rendered capitalised; `highlight` is the accent-yellow run. */
  headline: {
    lead: "The food basket of the nation, now at your ",
    highlight: "doorstep.",
  },
  /** 264:2618 */
  subhead:
    "Order from your favorite places in Makurdi, Gboko, and Otukpo. Enjoy real food delivered fast, tracked from the kitchen to your door.",
  /** 264:2638 */
  searchPlaceholder: "Search for a meal...",
  /**
   * Not in the design — the field is drawn as static text there. Required once
   * it becomes a real input: a placeholder is not an accessible name, so this
   * backs a visually-hidden `<label>`.
   */
  searchLabel: "Search for a meal",
  /** 264:2647 — also rendered capitalised. */
  dishLabel: "Spicy Noodles",
  /** I264:2639;148:7462. The trailing space is in the design; it renders as nothing. */
  cta: "Order Now",
} as const;

/**
 * The six blurred dishes scattered behind the hero copy, and the one sharp dish
 * in the centre. Positions are the design's own, in px on the 1440 canvas
 * (264:2648–264:2653, 264:2645).
 */
export interface HeroDish {
  readonly src: string;
  readonly left: number;
  readonly top: number;
}

export const heroDishes: readonly HeroDish[] = [
  { src: "/images/hero/dish-1@2x.webp", left: 120, top: 564 },
  { src: "/images/hero/dish-2@2x.webp", left: 288, top: 658 },
  { src: "/images/hero/dish-3@2x.webp", left: 466, top: 734 },
  { src: "/images/hero/dish-4@2x.webp", left: 909, top: 710 },
  { src: "/images/hero/dish-5@2x.webp", left: 1081, top: 637 },
  // 264:2653 reuses 264:2652's image fill.
  { src: "/images/hero/dish-5@2x.webp", left: 1206, top: 515 },
];

/** Featured Vendors panel — 264:2770. */
export const vendorsPanel = {
  /** 264:2794 */
  appPrompt: "Get the Kula app on:",
  /** 264:2818. Gelica Medium 48/64, centred, 1029 wide. */
  about:
    "Kula is a food delivery service in Benue State, known as the food basket of the nation. We are eager to expand to nearby states soon.",
  /** 264:2773 */
  heading: "Featured Vendors",
} as const;

/** The two store buttons — 264:2796 and 264:2802. */
export const appBadges = [
  {
    /** NOT FROM FIGMA — authored destination. See `externalLinks`. */
    href: externalLinks.appStore,
    eyebrow: "Download on the",
    name: "App Store",
    icon: "/icons/app-store-apple.svg",
    iconWidth: 32,
    iconHeight: 32,
  },
  {
    href: externalLinks.googlePlay,
    eyebrow: "Get it on",
    name: "Google Play",
    icon: "/icons/google-play-colour.svg",
    iconWidth: 29,
    iconHeight: 32,
  },
] as const;

/**
 * Vendor cards — 264:2812 … 264:2815. Every card carries the same price line in
 * the design; it is repeated per vendor rather than hoisted, because it reads as
 * per-vendor data that simply has not been filled in yet.
 */
export interface Vendor {
  readonly name: string;
  readonly price: string;
  readonly cta: string;
  readonly image: string;
}

export const vendors: readonly Vendor[] = [
  {
    name: "Chicken Republic",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/chicken-republic@2x.webp",
  },
  {
    name: "Spice Route Bistro",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/spice-route-bistro@2x.webp",
  },
  {
    name: "The Urban Grill",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/the-urban-grill@2x.webp",
  },
  // "Item 7" is the design's own text — a real Nigerian chain, not a placeholder.
  {
    name: "Item 7",
    price: "Meals from ₦2,200+",
    cta: "View",
    image: "/images/vendors/item-7@2x.webp",
  },
];

/**
 * Why Kula? — 264:2668.
 *
 * Each icon is a vector group whose strokes spill past its layout box, so the
 * exported SVG is larger than the box the design lays out. `box` is what the
 * card reserves; `art` and `offset` place the SVG inside it so the glyph lands
 * where Figma puts it.
 */
export interface WhyCard {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
  readonly box: readonly [number, number];
  readonly art: readonly [number, number];
  readonly offset: readonly [number, number];
  /** Tailwind surface class — the design gives each card its own fill. */
  readonly surface: string;
}

export const whyKula = {
  /** 264:2757 (white) over 264:2669 (orange), offset -4/+4. */
  heading: "Why Kula?",
  cards: [
    {
      title: "Variety of Choices",
      body: "From local delicacies to international cuisines, Kula offers a wide range of restaurants to satisfy every palate.",
      icon: "/icons/why-variety.svg",
      box: [64, 69],
      art: [73.5, 73.8],
      offset: [-4.8, 0],
      // 264:2671 — the only card with a stroke, 1px Accent Yellow.
      surface: "bg-lemon inset-ring-1 inset-ring-accent",
    },
    {
      title: "Real Time Tracking",
      body: "Stay updated with live tracking of your order, so you know exactly when your meal will arrive.",
      icon: "/icons/why-tracking.svg",
      box: [64, 85.8],
      art: [74.7, 96.2],
      offset: [-5.4, -5.2],
      surface: "bg-mint",
    },
    {
      title: "Exclusive Deals",
      body: "Enjoy special promotions and discounts available only through Kula, saving you money while you indulge.",
      icon: "/icons/why-deals.svg",
      box: [64, 82.5],
      art: [73.4, 92],
      offset: [-4.7, -4.8],
      surface: "bg-aqua",
    },
  ] satisfies readonly WhyCard[],
} as const;

/**
 * Variety of meals — 264:2655.
 *
 * Eleven circles fanned left to right, growing toward the centre. All are 80%
 * opacity under a 12px Figma layer blur except the focal one (264:2667), which
 * is sharp and fully opaque. `z` is the design's own paint order, which is not
 * left-to-right: the outermost pair sits lowest and the focal circle on top.
 */
export interface Meal {
  readonly src: string;
  readonly left: number;
  readonly top: number;
  readonly size: number;
  readonly z: number;
  readonly sharp?: boolean;
}

export const meals = {
  /** 264:2664 — Gelica Black 72/85.32, centred, with an Orange drop shadow. */
  heading: "Variety of meals you can order",
  circles: [
    { src: "/images/meals/meal-1@2x.webp", left: 179, top: 375, size: 84, z: 1 },
    { src: "/images/meals/meal-2@2x.webp", left: 226, top: 359, size: 116, z: 3 },
    { src: "/images/meals/meal-3@2x.webp", left: 298, top: 343, size: 140, z: 4 },
    { src: "/images/meals/meal-4@2x.webp", left: 370, top: 327, size: 172, z: 7 },
    { src: "/images/meals/meal-5@2x.webp", left: 466, top: 311, size: 212, z: 10 },
    { src: "/images/meals/meal-6@2x.webp", left: 578, top: 311, size: 212, z: 11, sharp: true },
    { src: "/images/meals/meal-7@2x.webp", left: 698, top: 311, size: 212, z: 9 },
    { src: "/images/meals/meal-8@2x.webp", left: 818, top: 327, size: 172, z: 6 },
    { src: "/images/meals/meal-9@2x.webp", left: 922, top: 343, size: 140, z: 5 },
    { src: "/images/meals/meal-10@2x.webp", left: 1014, top: 359, size: 116, z: 2 },
    { src: "/images/meals/meal-11@2x.webp", left: 1103, top: 375, size: 84, z: 0 },
  ] satisfies readonly Meal[],
} as const;

/**
 * Get your order in 3 easy steps — 264:2842.
 *
 * The cards are hand-placed in the design rather than auto-laid-out — x 101, 536
 * and 976, so gaps of 24 and 29 and a row centred on 744 rather than 720. They
 * are rendered as a centred row with an even gap instead; see the component.
 *
 * Each illustration is pre-composited to the photo rect's 411 x 329, because the
 * design puts more than one thing there: the artwork itself (the *visible* fill
 * on the rect — each rect also carries hidden fills that are not what renders),
 * and a small logo watermark cropped out of the logo sheet and laid over it.
 */
export interface Step {
  readonly title: string;
  readonly body: string;
  readonly image: string;
  /** Tailwind class for the illustration panel behind the artwork. */
  readonly surface: string;
}

export const steps = {
  /** 224:3001 — Gelica Bold 88/104.28, centred, over an Orange drop shadow. */
  heading: "Get your order in 3 easy steps",
  cards: [
    {
      title: "Choose Your Meal",
      body: "Browse restaurants and local vendors near you. You can filter by cuisine, rating, or delivery time.",
      image: "/images/steps/step-choose@2x.webp",
      surface: "bg-step-orange",
    },
    {
      title: "Place an Order",
      body: "Add to cart and checkout in seconds. Pay with card, bank transfer.",
      image: "/images/steps/step-order@2x.webp",
      surface: "bg-step-amber",
    },
    {
      title: "Enjoy Your Meal",
      body: "Track your delivery live on the map. Fresh, hot food arrives at your door, enjoy your meal.",
      image: "/images/steps/step-enjoy@2x.webp",
      surface: "bg-step-green",
    },
  ] satisfies readonly Step[],
} as const;

/**
 * Stats ticker — 264:2843.
 *
 * A 76-tall cream strip with a 1px ink stroke, scrolling continuously. The
 * design draws it mid-scroll: the row is centred but 1683px wide against the
 * 1200px its gutters leave, so it overflows and clips at both edges, and the
 * first two items are repeated after the fourth to fill the tail. Those four are
 * the real set; the component repeats them.
 */
export interface Stat {
  readonly icon: string;
  readonly label: string;
}

export const statsTicker: readonly Stat[] = [
  { icon: "/icons/stat-delivery.svg", label: "Average delivery under 35 minutes" },
  { icon: "/icons/stat-bike.svg", label: "500+ riders across Benue" },
  { icon: "/icons/stat-star.svg", label: "4.8 average rating" },
  { icon: "/icons/stat-food.svg", label: "300+ restaurants and food spots" },
];

/**
 * Taste the hype — 264:2886.
 *
 * Two rounded cards side by side under a heading and a CTA, with a green pill
 * badge overlaying the map's lower right.
 */
export const hype = {
  /** 264:2932 — Gelica Black 48/56.88, centred, over an Orange drop shadow. */
  heading: "Order anywhere, we deliver everywhere",
  /** I264:2933;148:7462 */
  cta: "Find a Location",
  /** 264:2937 — Gelica Black 26.06/39.09 in Accent Yellow. */
  badge: "Find Location",
  photoAlt: "A customer browsing the Kula app at home",
  mapAlt: "Map of Benue State showing the towns Kula delivers to",
} as const;
