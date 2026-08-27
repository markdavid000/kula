import type { FaqItem } from "@/content/faq";

/**
 * FAQ accordion.
 *
 * Built on native `<details>`/`<summary>` rather than a JS disclosure widget:
 * it ships no client JavaScript, is keyboard- and screen-reader-correct for
 * free, and the content stays in the DOM for crawlers. The shared `name` makes
 * it an exclusive accordion in browsers that support it (Chrome 120+, Safari
 * 17.2+); where they don't, several can sit open, which is harmless.
 *
 * The design fills the expanded item with brand orange and flips its text to
 * white (Figma node "faq-item-container", fill rgba(234,82,32,1)).
 */
export function Faq({ items, name }: { items: readonly FaqItem[]; name: string }) {
  return (
    <div className="border-ink/12 divide-ink/12 divide-y border-y">
      {items.map((item) => (
        <details key={item.question} name={name} className="group open:bg-brand open:text-white">
          <summary
            className={[
              "flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-7",
              "font-display text-[clamp(17px,1.5278vw,22px)] font-semibold",
              // Safari renders a disclosure triangle unless this is removed.
              "[&::-webkit-details-marker]:hidden",
            ].join(" ")}
          >
            {item.question}
            <span
              aria-hidden="true"
              className="relative grid size-7 shrink-0 place-items-center rounded-full border border-current/40"
            >
              <span className="block h-0.5 w-3.5 bg-current" />
              {/* The vertical stroke disappears when open, turning + into −. */}
              <span className="absolute block h-3.5 w-0.5 bg-current transition-transform group-open:scale-y-0" />
            </span>
          </summary>
          <div className="px-6 pb-7 text-base leading-relaxed text-white/90">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
