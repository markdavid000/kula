import type { Vendor } from "@/components/vendor-card";

/**
 * Featured vendors.
 *
 * Names and pricing are the real values from the design's vendor cards
 * (Figma nodes 206:2255 / 206:2358 / 206:2361). Imagery is not wired up yet —
 * the card falls back to its peach surface until the design's bitmaps are
 * available locally.
 *
 * This lives in `content/` rather than in the page so it can be swapped for a
 * CMS or API read without touching the presentation layer.
 */
export const featuredVendors: readonly Vendor[] = [
  { name: "Chicken Republic", priceFrom: "Meals from ₦2,200+", href: "/vendors" },
  { name: "Spice Route Bistro", priceFrom: "Meals from ₦2,200+", href: "/vendors" },
  { name: "The Urban Grill", priceFrom: "Meals from ₦2,200+", href: "/vendors" },
];
