import Image from "next/image";

import { statsTicker } from "@/content/home";

/**
 * Stats ticker — Figma node 264:2843 (1440 x 76, at page y 6059).
 *
 * A cream strip with a 1px ink stroke, scrolling continuously. The design draws
 * a single frame of that scroll: a centred row 1683px wide against the 1200px
 * its gutters leave, overflowing and clipped at both edges, with the first two
 * items repeated after the fourth to fill the tail.
 *
 * The stroke is drawn as an inset shadow rather than a border so it stays inside
 * the 76px height, the way Figma's `strokeAlign: INSIDE` does. Only the
 * horizontal edges are drawn: the design's stroke runs all four sides, but the
 * left and right sit exactly on the canvas edge, where on a full-bleed strip
 * they would read as stray hairlines against the viewport.
 */
export function StatsTicker() {
  // Rendered twice so the track can loop on itself without a seam.
  const track = [...statsTicker, ...statsTicker];

  return (
    <section
      aria-label="Kula at a glance"
      className="bg-cream overflow-hidden shadow-[inset_0_1px_0_0_var(--color-ink),inset_0_-1px_0_0_var(--color-ink)]"
    >
      <ul className="motion-safe:animate-ticker flex w-max py-6">
        {track.map((stat, index) => (
          <li
            key={`${stat.label}-${index}`}
            // The 24px gap rides on each item rather than the flex container, so
            // both halves of the track measure the same and -50% is exact.
            className="mr-6 flex h-7 shrink-0 items-center gap-2"
            // The second pass is the same four facts again; it exists to fill
            // the loop, so it is not announced.
            aria-hidden={index >= statsTicker.length ? true : undefined}
          >
            <Image src={stat.icon} alt="" width={28} height={28} className="size-7 shrink-0" />
            {/* Noto Sans Italic 18/27, -0.09. */}
            <span className="text-ink font-ticker text-[clamp(16px,1.25vw,18px)] leading-[1.5] tracking-[-0.005em] whitespace-nowrap italic">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
