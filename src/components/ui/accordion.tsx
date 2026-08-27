"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface AccordionEntry {
  /** Stable key — the Figma node id of the row this transcribes. */
  readonly id: string;
  readonly question: ReactNode;
  readonly answer: ReactNode;
  /** Extra classes for this row alone; the Riders steps colour each one. */
  readonly className?: string;
}

interface AccordionProps {
  items: readonly AccordionEntry[];
  /** `ul` by default; the Riders steps are an ordered list. */
  as?: "ul" | "ol";
  /** Which row starts open. The design always draws exactly one. */
  defaultOpen?: number;
  className?: string;

  /*
   * Styling arrives as class STRINGS, not as `(open) => string` callbacks.
   * These panels render from Server Components, and a function cannot cross the
   * server/client boundary — React throws "Functions cannot be passed directly
   * to Client Components". Strings and elements serialize; functions do not.
   */
  itemClassName?: string;
  itemOpenClassName?: string;
  itemClosedClassName?: string;
  questionClassName?: string;
  questionOpenClassName?: string;
  questionClosedClassName?: string;
  answerClassName?: string;

  /**
   * The two exported glyphs. Both render and cross-fade rather than swapping a
   * single `<img>` src: a swap flashes, and the two files are different sizes
   * (28 for the plus, 24 for the minus) so it also jumps.
   */
  icons: { open: ReactNode; closed: ReactNode };

  /**
   * The design's hairline rule under a row. Drawn on every row after the first,
   * and never under the open one, which has no divider node at its foot.
   */
  dividerClassName?: string;
}

/**
 * An accessible disclosure list.
 *
 * DIRECTED — the design has no interactive variants. Each panel is drawn as one
 * fixed-open row above fixed-closed ones, so the open and closed treatments are
 * transcribed, but the behaviour that moves between them is authored.
 *
 * One row is open at a time, which is the arrangement every panel draws.
 *
 * The height transition uses a `grid-template-rows: 0fr -> 1fr` track rather
 * than animating `height`. `height: auto` is not animatable, and the usual
 * workarounds either hard-code a max-height that clips long answers or measure
 * the panel in JavaScript on every resize. The grid track interpolates to the
 * content's real height with no measurement and no clipping.
 *
 * The panel stays mounted so it can animate; `aria-hidden` keeps a collapsed
 * answer out of the accessibility tree, and `aria-expanded` on the trigger is
 * what communicates state.
 */
export function Accordion({
  items,
  as: List = "ul",
  defaultOpen = 0,
  className,
  itemClassName,
  itemOpenClassName,
  itemClosedClassName,
  questionClassName,
  questionOpenClassName,
  questionClosedClassName,
  answerClassName,
  icons,
  dividerClassName,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const base = useId();

  const fade = "absolute transition-all duration-300 ease-out motion-reduce:transition-none";

  return (
    <List className={className}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const triggerId = `${base}-t-${index}`;
        const panelId = `${base}-p-${index}`;

        return (
          <li
            key={item.id}
            className={cn(
              itemClassName,
              open ? itemOpenClassName : itemClosedClassName,
              item.className,
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              >
                <span
                  className={cn(
                    questionClassName,
                    open ? questionOpenClassName : questionClosedClassName,
                  )}
                >
                  {item.question}
                </span>

                <span
                  aria-hidden
                  className="relative flex size-7 shrink-0 items-center justify-center"
                >
                  <span
                    className={cn(
                      fade,
                      open ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
                    )}
                  >
                    {icons.closed}
                  </span>
                  <span
                    className={cn(
                      fade,
                      open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
                    )}
                  >
                    {icons.open}
                  </span>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              {/*
                The 0fr track only collapses if the child cannot force its own
                height, so this clip is load-bearing, not cosmetic.
              */}
              <div className="overflow-hidden">
                <div className={answerClassName}>{item.answer}</div>
              </div>
            </div>

            {dividerClassName && index > 0 && !open ? (
              <span aria-hidden className={dividerClassName} />
            ) : null}
          </li>
        );
      })}
    </List>
  );
}
