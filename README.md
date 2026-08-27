# Kula — website

Marketing site for Kula, a Nigerian food-delivery service. Built from the
[Kula Website Figma export](https://claude.ai/design/p/418b81c8-9280-4516-9bd0-4115fd7f2011).

Next.js 16 (App Router, Turbopack) · React 19.2 · TypeScript · Tailwind CSS v4.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
pnpm dev
```

`NEXT_PUBLIC_SITE_URL` is the site's absolute origin. It drives `metadataBase`,
canonical URLs, `sitemap.xml` and JSON-LD. Production builds **fail fast**
without it rather than silently shipping `localhost` canonicals.

## Scripts

| Command         | What it does                                                 |
| --------------- | ------------------------------------------------------------ |
| `pnpm dev`      | Dev server                                                   |
| `pnpm build`    | Production build                                             |
| `pnpm validate` | format check → lint → typecheck → unit tests (pre-push gate) |
| `pnpm test`     | Vitest unit/component tests                                  |
| `pnpm test:e2e` | Playwright, against a real production build                  |
| `pnpm analyze`  | Build with the bundle analyzer                               |

## Architecture

```
src/
  app/            Routes. Also robots.ts, sitemap.ts, manifest.ts, opengraph-image.tsx
  components/
    layout/       Header, footer, skip link
    ui/           Button, Container, Section, PageHeader
  content/        Page data, kept separate from presentation for a future CMS
  lib/            site config, SEO helpers, cn()
```

### Design tokens

`src/app/globals.css` holds the whole design language in a Tailwind v4 `@theme`
block. Figma emits ~200 raw aliases; only the values the website actually
renders are promoted, under semantic names (`cream`, `ink`, `brand`, `forest`,
`peach`), so components express intent rather than hue.

**Fonts.** The design specifies **Gelica** for display type — a commercial
Fontspring face that the export only references. We substitute **Bitter**, the
same substitution the design's own preview harness makes. When the licence is
in place, change `--font-display` in `globals.css` and the `Bitter` import in
`app/layout.tsx`; nothing else needs to change.

### Performance

- Every route is statically prerendered.
- Fonts self-hosted via `next/font` — no third-party request, no render-blocking
  stylesheet, and a generated size-adjust fallback that removes webfont CLS.
- React Compiler enabled through the native Rust port in Turbopack, so
  auto-memoization costs no Babel time at build.
- AVIF/WebP via `next/image` with explicit `sizes`; the first vendor card is
  marked `priority` for LCP.

### Security

`next.config.ts` sets HSTS, CSP, `Permissions-Policy`, `Referrer-Policy` and
`X-Content-Type-Options` on every response, and drops `x-powered-by`. The e2e
suite asserts these are actually served.

The CSP is static and allows `'unsafe-inline'` for scripts. This is deliberate:
the nonce-based CSP from the Next.js guide forces every route into dynamic
rendering, which would throw away the prerendered HTML. Revisit if the app grows
authenticated, dynamic routes.

### Accessibility

Skip link, a single `h1` per page, labelled landmark sections, `aria-current` on
active nav, a mobile menu whose `aria-expanded` is honest and which returns
focus to its trigger on <kbd>Esc</kbd>, one consistent `:focus-visible` ring,
and `prefers-reduced-motion` honoured globally. Vendor cards use a stretched
link so the whole card is one tab stop with one accessible name.

## Syncing from Figma

```bash
# one-time: read-only personal access token, never committed
read -rs "token?Figma token: " && printf '%s\n' "$token" > ~/.figma-token \
  && chmod 600 ~/.figma-token && unset token

pnpm figma:sync "https://www.figma.com/design/<key>/Kula" --nodes 264:2259
pnpm figma:sync <key> --render "I264:2842;224:2982" --format png --scale 2
```

Reads `$FIGMA_TOKEN` or `~/.figma-token` and passes it only as a request header —
the value is never printed or logged. Output goes to `design/<fileKey>/`, which
is gitignored; diffing `document.json` between syncs shows exactly what the
designer changed.

Two things worth knowing:

- **`--images` is opt-in.** Image fills are per-_file_, not per-node, and this
  Figma file holds 745 of them belonging to unrelated work. Use `--render` with
  specific node ids instead.
- **Use the REST API for component instances.** Instance text lives in the
  component definition, not under the page frame, so walking a `.fig` export
  misses it. The "3 easy steps" section was found exactly this way.

## Where the content came from

The design API caps file reads at 256 KB and `Components.bundle.js` is larger,
so the page-level components were unreachable through it. Content was instead
recovered from the source `Kula.fig`, which is a ZIP containing `canvas.fig`
(header + deflate schema + **zstd** payload, `fig-kiwi` v106) and all 611 source
images. Decoding that yields the full 46,491-node scene graph — geometry, fills,
fonts and text — which is a better source than the export would have been.

All legal copy in `src/content/legal.ts` is transcribed **verbatim** from that
document. It is never paraphrased or regenerated.

## Outstanding

- **FAQ answers.** The design draws its accordions collapsed, so only one answer
  per page exists in the file. Those are verbatim; the rest are marked
  `draft: true` in `src/content/faq.ts` and need sign-off. Grep for `draft: true`.
- **Contact form delivery.** `src/app/contact/actions.ts` validates and guards
  against bots but has no provider wired up, so it reports the failure and
  points senders at the published email rather than pretending to succeed.
- **Imagery.** The "3 easy steps" illustrations are placed, rendered from Figma
  at 2× into `public/images/`. The design's vendor cards use flat placeholder
  shapes rather than photos, so those match as-is. Remaining decorative art
  (hero food badges, "taste the hype") is identified but not yet placed.
- **Blog.** Linked from the design's nav, but the file contains no blog screen —
  it needs a content model before it can be built.
