import { externalLinks } from "@/lib/site";

import type { Route } from "next";

/**
 * Footer copy, transcribed verbatim from the Kula Figma file
 * (FfC9ofVeF8u6tnMm1M57lz, node 264:3012 "Footer  17"). Node ids are recorded
 * against each string so a change in the design can be traced to the exact line
 * here.
 *
 * Strings are stored exactly as they appear in Figma's `characters` — including
 * the non-breaking space that opens the tagline (520:6960), which is in the
 * design and is preserved rather than trimmed.
 *
 * The footer's own frame supplies no hrefs: every link target below is the
 * matching route in this app, not a value read from the design.
 */

export interface FooterLink {
  readonly href: Route;
  readonly label: string;
}

/**
 * A store badge — 264:3051 / 264:3057 (on the cream card) and 264:3070 /
 * 264:3076 (on the green CTA strip). Same copy in both places; only the plate
 * colour differs, which is why the Apple glyph is carried in two cuts. The
 * Google Play mark is the same four-colour artwork on either plate.
 */
export interface StoreBadge {
  /** NOT FROM FIGMA — the design attaches no destination. See `externalLinks`. */
  readonly href: string;
  readonly eyebrow: string;
  readonly name: string;
  /** Used on the ink-filled badge. */
  readonly iconOnDark: string;
  /** Used on the white-filled badge. */
  readonly iconOnLight: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
}

export const storeBadges: readonly StoreBadge[] = [
  {
    href: externalLinks.appStore,
    /** 264:3055 / 264:3074 */
    eyebrow: "Download on the",
    /** 264:3056 / 264:3075 */
    name: "App Store",
    /** 264:3053 — `ic:twotone-apple`, white. */
    iconOnDark: "/icons/app-store-apple.svg",
    /** 264:3072 — the same glyph in Primary Green. */
    iconOnLight: "/icons/app-store-apple-dark.svg",
    iconWidth: 32,
    iconHeight: 32,
  },
  {
    href: externalLinks.googlePlay,
    /** 264:3064 / 264:3083 */
    eyebrow: "Get it on",
    /** 264:3065 / 264:3084 */
    name: "Google Play",
    /** 264:3059–264:3062 — the four-colour mark, identical on both plates. */
    iconOnDark: "/icons/google-play-colour.svg",
    iconOnLight: "/icons/google-play-colour.svg",
    iconWidth: 29,
    iconHeight: 32,
  },
];

export interface SocialAccount {
  /** NOT FROM FIGMA — authored destination. See `externalLinks`. */
  readonly href: string;
  readonly name: string;
  readonly icon: string;
}

/**
 * 520:6973–520:6978 — three 32 x 32 glyphs, Accent Yellow with a 1.333px Orange
 * outside stroke. The design attaches no URL to any of them, so they are drawn
 * as images rather than links; see the deviation log.
 */
export const socialAccounts: readonly SocialAccount[] = [
  { name: "X", icon: "/icons/social-x.svg", href: externalLinks.x },
  { name: "Instagram", icon: "/icons/social-instagram.svg", href: externalLinks.instagram },
  { name: "TikTok", icon: "/icons/social-tiktok.svg", href: externalLinks.tiktok },
];

export const footer = {
  /** CTA-Strip — 264:3067. */
  cta: {
    /** 264:3068 — Gelica SemiBold 48/60, white, in a 464-wide box. */
    heading: "Hungry? Place your order on Kula now!",
  },

  /** The cream app card — 264:3042. */
  card: {
    /** 264:3047 — Gelica Bold 36/42.66. */
    heading: "Order your meals in seconds!",
    /** 264:3049 — Roboto Flex 20/28. */
    appPrompt: "Get the mobile app",
    /**
     * NOT FROM FIGMA. 539:7398 is an illustration and needs an accessible
     * description; Figma carries none, so this is authored.
     */
    imageAlt: "A Kula rider handing a bag of food to a customer at their door",
  },

  /**
   * The Vendors footer — 510:20150. Structurally identical to Home's 264:3012
   * (a 73-node recursive diff returns only a frame-name difference against
   * Riders and all three legal footers), except for the three values below.
   */
  vendorCard: {
    /** 510:20185 — Gelica Bold 36/42.66, same as Home's. */
    heading: "Join the Kula team as a vendor",
    /**
     * 510:20187 — Inter 18/27, -0.09. Home's counterpart (264:3049) is Roboto
     * Flex 20/28 with no tracking, so this is a genuinely different type style,
     * not the same label at another size.
     */
    appPrompt: "Get the mobile app",
    /**
     * NOT FROM FIGMA. 520:6869 is an illustration and needs an accessible
     * description; Figma carries none, so this is authored.
     */
    imageAlt: "The Kula mascot welcoming a new vendor to the platform",
  },

  /** Brand column — 520:6958. */
  brand: {
    /**
     * 520:6959 — the wordmark, drawn 178 x 60 from its own crop of the source
     * artwork (public/images/footer/wordmark@2x.webp), not the header's asset.
     */
    logoAlt: "Kula",
    /** 520:6960 — the leading character is U+00A0, exactly as in the design. */
    tagline: "\u00A0your everyday delivery super-app",
  },

  /** 520:6961 */
  siteLinks: [
    { href: "/vendors", label: "Vendors" },
    { href: "/riders", label: "Riders" },
    // { href: "/blog", label: "Blog" },
    { href: "/#how-it-works", label: "How it Works" },
  ] as readonly FooterLink[],

  /** 520:6966 */
  legalLinks: [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/refunds", label: "Refund Policy" },
  ] as readonly FooterLink[],

  /** 520:6970 */
  social: {
    /** 520:6971 — Inter 16/19.36. */
    heading: "Follow us on",
  },
} as const;
