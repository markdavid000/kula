import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * Note on CSP: this site is fully statically prerendered, so we deliberately do
 * NOT use the nonce-based CSP from the Next.js guide — generating a per-request
 * nonce forces every route into dynamic rendering and gives up the static HTML
 * that makes this site fast. `'unsafe-inline'` in `script-src` is the accepted
 * trade-off for a prerendered marketing site (React's hydration payload is
 * inlined). Tighten to nonces if this app ever grows authenticated, dynamic
 * routes where the XSS surface justifies the rendering cost.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      /*
       * The coverage map (src/components/home/coverage-map.tsx) draws CARTO's
       * raster tiles, so the tile CDN has to be allowed as an image source.
       * Scoped to that one host rather than opening img-src up.
       */
      "img-src 'self' blob: data: https://*.basemaps.cartocdn.com",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Statically typed <Link href> — catches dead internal links at build time.
  typedRoutes: true,

  // Auto-memoization without manual useMemo/useCallback. The Rust port runs
  // natively inside Turbopack, so no babel-plugin-react-compiler and no Babel
  // penalty on build times.
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },

  images: {
    // Serve modern formats; AVIF first, WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // A year of immutable caching for optimized images.
    minimumCacheTTL: 31_536_000,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Hashed font files never change under a given URL.
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
