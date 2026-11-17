"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Magnetic } from "../motion/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

type WorkGridProps = {
  /** Every project card, already rendered on the server, in display order. */
  cards: React.ReactNode[];
  /** How many show before "Show more". */
  initial?: number;
};

/**
 * Shows the first few project cards, then reveals the rest on request.
 *
 * - The hidden cards are mounted only when revealed, then rise in one after another.
 * - Focus moves to the first newly revealed card, so keyboard and screen-reader users
 *   land on the new content instead of staying on a button that changed.
 * - The button says how many more there are, and aria-expanded tells assistive technology
 *   whether the extra cards are showing.
 * - Every project also has its own case-study page and sitemap entry, so nothing is
 *   hidden from search engines.
 */
export function WorkGrid({ cards, initial = 4 }: WorkGridProps) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const firstNew = useRef<HTMLDivElement>(null);
  const extraId = useId();
  const visible = cards.slice(0, initial);
  const extra = cards.slice(initial);
  // Set on "More work", consumed once the new cards exist. A ref, not state: it only
  // signals the effect and should never cause a render of its own.
  const focusPending = useRef(false);

  useEffect(() => {
    if (expanded && focusPending.current) {
      focusPending.current = false;
      firstNew.current?.querySelector<HTMLElement>("a")?.focus();
    }
  }, [expanded]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-10 gap-y-20 lg:grid-cols-2 lg:gap-x-16">
        {visible}
        <AnimatePresence initial={false}>
          {expanded
            ? extra.map((card, i) => (
                <motion.div
                  key={i}
                  ref={i === 0 ? firstNew : undefined}
                  id={i === 0 ? extraId : undefined}
                  initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : 16, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                >
                  {card}
                </motion.div>
              ))
            : null}
        </AnimatePresence>
      </div>

      {extra.length > 0 ? (
        <div className="mt-20 flex flex-col items-center gap-4 md:mt-28">
          {/* Hairline that the button sits on, like a fold in the page. */}
          <div className="relative flex w-full items-center justify-center">
            <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
            <Magnetic>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={expanded ? extraId : undefined}
                onClick={() => {
                  if (!expanded) focusPending.current = true;
                  setExpanded((value) => !value);
                }}
                className="group/more relative inline-flex items-center gap-4 rounded-full border border-line-strong bg-canvas py-2 pr-2 pl-6 text-sm font-medium transition-colors duration-300 hover:border-ink"
              >
                {expanded ? "Show less" : "More work"}
                <span className="flex size-10 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-500 group-hover/more:rotate-90">
                  {/* Plus that turns into a minus: the vertical stroke folds away. */}
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path
                      d="M12 5v14"
                      className={`origin-center transition-transform duration-500 ${expanded ? "scale-y-0" : "scale-y-100"}`}
                    />
                  </svg>
                </span>
              </button>
            </Magnetic>
          </div>
          <span className="label text-muted" aria-live="polite">
            {expanded
              ? `Showing all ${String(cards.length).padStart(2, "0")}`
              : `${String(visible.length).padStart(2, "0")} of ${String(cards.length).padStart(2, "0")} · ${extra.length} more`}
          </span>
        </div>
      ) : null}
    </>
  );
}
