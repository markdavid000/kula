# Figma asset exports

**All 52 vector assets are exported and in `public/`.** Nothing is outstanding.

The raster images (photos and bitmap illustrations) were never fetched from the
export endpoint — they were composited locally from the image fills cached under
`design/FfC9ofVeF8u6tnMm1M57lz/images/`, which is why they rendered while the
vectors did not.

## How they were fetched

`/v1/images` served 36 before hitting its quota. The remaining 16 came from the
MCP `download_assets` tool, which draws on a separate quota; where it returned
unnamed SVGs they were matched to nodes by exact viewBox dimensions and fill
colour, and two even carried their Figma layer names (`tabler:minus`, `plus`).

Both REST endpoints were rate-limited afterwards (`retry-after` ≈ 60 hours), so
re-running the exporter is only possible once that clears.

## Full-bleed artwork

Six files span the viewport and carry `preserveAspectRatio="none"`, added after
export because the REST exporter omits it. Without it the artwork letterboxes to
its intrinsic width instead of stretching:

- `footer-edge-top.svg`, `footer-edge-bottom.svg`
- `footer-wave-left.svg`, `footer-wave-right.svg`
- `riders-hero-wave.svg`
- `legal-hero-wave.svg`

## Exports that needed cleaning

`legal-hero-wave.svg` came back from Figma as the node rendered **in context** —
an opaque `#1E1E1E` artboard rect, the cream page rect, the green hero rect and a
clip path, with the wave as one path inside. It is used as a CSS alpha mask, and
a mask over a fully opaque rect masks nothing, so the hero rendered as a solid
block rather than a wave. The file now holds the silhouette path alone.

Worth remembering: this is the same opaque-background artifact that affected the
logo export earlier. A file that looks fine on its own can still be wrong for
masking — check the payload, not just that the request succeeded.

## Authored, not exported

`nav-hover-squiggle.svg` is **not** from Figma. The nav items are component
instances and their hover variant lives in the component set, outside the page
frames, so it could not be fetched. It is generated as a sine-modulated ellipse
from the supplied reference screenshot. Swap it for the real export when the
component set becomes reachable.

## App icons and share-card artwork

The site had no icon of its own — `src/app/favicon.ico` was the Next.js
default. Every icon is now cut from the Kula logo mark (the green chevron
circle) in the 4096 × 1459 wordmark artwork behind the footer wordmark
(520:6959), cached as
`design/FfC9ofVeF8u6tnMm1M57lz/images/23a36f1e43f80108eba9ce9028c243cf7c5f1ab1.png`.
The mark is ~700px across there, so every size is a downscale.

- `src/app/favicon.ico` (16/32/48), `src/app/icon.png` (512) and
  `public/icons/app/icon-{192,512}.png` — the circle on transparency.
- `src/app/apple-icon.png` (180) and `public/icons/app/icon-maskable-512.png` —
  the chevrons alone on the mark's own green (#1C8042, `--color-green-mid`),
  full bleed, because iOS fills transparency with black and Android masks the
  edges. The chevrons are isolated by their whiteness over that green rather
  than by pasting the circle onto it, which left a visible ring at its
  antialiased edge.

`assets/og/` holds the share cards' inputs as PNG/woff, because Satori reads
neither webp nor woff2: the mark, the wordmark, three mascots trimmed from the
site's own webp exports (`riders/mascot-waving`, `riders/mascot-thumbs-up`,
`footer/vendor-mascot`), and Bitter 700 and Inter 400/600 from Fontsource
(SIL Open Font License).
