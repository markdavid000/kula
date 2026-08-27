import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * An exported Figma icon, positioned inside its frame the way the design draws
 * it.
 *
 * Figma icons are a glyph sitting inside a larger square frame with padding
 * baked in as an inset — `arrow-forward`, for instance, is a 16.875 x 15.75
 * path inside a 24 x 24 box. Rendering the exported SVG at the frame size would
 * stretch the glyph to fill it, so the inset is reproduced here instead.
 *
 * Icons are always exported assets, never hand-authored paths: we don't have
 * the real vector data, so anything drawn by hand is a guess.
 *
 * `tint` recolours the glyph. Figma bakes a fill into every export — the
 * location pin ships as `#373737` — and an <img> cannot be recoloured by CSS,
 * so a tinted icon is painted as a background in `currentColor` and the SVG is
 * used as an alpha mask. The exported file stays the source of truth for the
 * shape either way; only the paint changes.
 */
export function Icon({
  src,
  alt = "",
  size,
  insetY,
  insetX,
  className,
  tint = false,
}: {
  src: string;
  /** Empty for decorative icons, which is the usual case. */
  alt?: string;
  /** The Figma frame size in px — the box, not the glyph. */
  size: number;
  /** Glyph inset within the frame, as a percentage, per the design. */
  insetY: number;
  insetX: number;
  className?: string;
  /**
   * Take the glyph's colour from `currentColor` instead of the fill Figma
   * exported. Set this wherever the icon sits on a plate the design did not
   * export it against.
   */
  tint?: boolean;
}) {
  return (
    <span
      className={cn("relative block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute max-w-none"
        style={{ top: `${insetY}%`, bottom: `${insetY}%`, left: `${insetX}%`, right: `${insetX}%` }}
      >
        {tint ? (
          <span
            role={alt ? "img" : undefined}
            aria-label={alt || undefined}
            aria-hidden={alt ? undefined : true}
            className="block h-full w-full bg-current"
            style={{
              maskImage: `url(${src})`,
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskImage: `url(${src})`,
              WebkitMaskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        ) : (
          <Image src={src} alt={alt} fill sizes={`${size}px`} />
        )}
      </span>
    </span>
  );
}
