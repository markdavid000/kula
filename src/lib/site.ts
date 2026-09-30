import type { Route } from "next";

/**
 * Single source of truth for site-wide constants.
 *
 * Content here is transcribed from the Kula Figma document (Kula.fig), not
 * invented — legal entity, address, phone and email all come from the design's
 * contact and legal frames.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required for production builds — it drives canonical URLs, the sitemap and structured data.",
    );
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Kula",
  legalName: "KulaApp Limited",
  tagline: "Your everyday delivery super-app",
  heroHeadline: "The food basket of the nation, now at your doorstep.",
  description:
    "Order from your favorite places in Makurdi, Gboko, and Otukpo. Enjoy real food delivered fast, tracked from the kitchen to your door.",
  about:
    "Kula is a food delivery service in Benue State, known as the food basket of the nation. We are eager to expand to nearby states soon.",
  url: resolveSiteUrl(),
  locale: "en_NG",
  country: "NG",
  currency: "NGN",
  /**
   * The towns the hero subhead names (264:2618), and the ones structured data
   * declares as served. The coverage map plots more towns and the Riders FAQ
   * names fewer — this list follows the hero until the business confirms one.
   */
  servedCities: ["Makurdi", "Gboko", "Otukpo"],
  contact: {
    address: "11 Victor Malu Road, New GRA, Makurdi",
    /** `address`, split into the parts schema.org's PostalAddress wants. */
    streetAddress: "11 Victor Malu Road, New GRA",
    locality: "Makurdi",
    region: "Benue State",
    phone: "+234 (0)816 913 4590",
    /** E.164, for tel: links. */
    phoneHref: "+2348169134590",
    email: "thekulaapp.info@gmail.com",
  },
} as const;

export interface NavItem {
  readonly href: Route;
  readonly label: string;
}

export interface PrimaryNavItem extends NavItem {
  /**
   * Box width in px, taken from the design. The nav items sit flush against
   * each other (gap 0) inside a 644px row and centre their own label, so the
   * spacing between labels is a function of these widths — dropping them and
   * using a uniform gap would not reproduce the design.
   */
  readonly width: number;
}

/** Header navigation — widths from Figma nodes 264:3102–3106. */
export const primaryNav: readonly PrimaryNavItem[] = [
  { href: "/", label: "Home", width: 116 },
  { href: "/vendors", label: "Vendors", width: 132 },
  { href: "/riders", label: "Riders", width: 132 },
  // { href: "/blog", label: "Blog", width: 132 },
  // { href: "/contact", label: "Contact Us", width: 132 },
];

/** Footer "Company" column, matching the design's footer link list. */
export const footerNav: readonly NavItem[] = [
  { href: "/vendors", label: "Vendors" },
  { href: "/riders", label: "Riders" },
  // { href: "/blog", label: "Blog" },
  // { href: "/contact", label: "Contact Us" },
];

export const legalNav: readonly NavItem[] = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/refunds", label: "Refund Policy" },
];

/**
 * Off-site destinations for the store badges and social icons.
 *
 * NOT FROM FIGMA. The design draws these as flat artwork with no link attached.
 *
 * The three social profiles are CONFIRMED by the Kula team (note the TikTok
 * handle is `thekulaapp.ng`), and are also published as `sameAs` in the
 * structured data. The two store links are still PLACEHOLDERS until the apps
 * are published — confirm them before launch.
 */
export const externalLinks = {
  appStore: "https://apps.apple.com/app/kula",
  googlePlay: "https://play.google.com/store/apps/details?id=com.kula",
  x: "https://x.com/thekulaapp",
  instagram: "https://www.instagram.com/thekulaapp",
  tiktok: "https://www.tiktok.com/@thekulaapp.ng",
} as const;

/** The confirmed profiles — the ones safe to assert as this business's own. */
export const socialProfiles = [externalLinks.x, externalLinks.instagram, externalLinks.tiktok];
