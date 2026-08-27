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
