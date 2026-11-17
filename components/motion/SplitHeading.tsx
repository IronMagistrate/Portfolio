"use client";

import { useEffect, useRef } from "react";
import { EASE, gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

type SplitHeadingProps = {
  children: React.ReactNode;
  as?: "h2" | "h3" | "p";
  /** Seconds before the first line starts. */
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Masked line-by-line reveal for headings below the fold: each line slides up from behind
 * a clipping mask when the heading scrolls into view.
 *
 * - The split is LAZY: nothing is measured until the heading is about to enter the viewport.
 *   Splitting every heading at page load forced about a second of layout work on a slow
 *   phone before the visitor had scrolled anywhere (Lighthouse, 16 Nov 2026).
 * - The heading is hidden by CSS (`[data-split]`, see globals.css) until its lines are ready,
 *   so the finished text never flashes before animating.
 * - `autoSplit` re-splits when fonts finish loading or the width changes, so lines stay correct.
 * - SplitText keeps the full text in an aria-label, so screen readers read one sentence.
 * - With reduced motion nothing is split or hidden: the heading is simply there.
 *
 * For the page's main headline use WordReveal instead (CSS only, paints immediately).
 */
export function SplitHeading({ children, as = "h2", delay = 0, className, id }: SplitHeadingProps) {
  // h2/h3 and p are different DOM types; the intersection satisfies whichever tag is rendered.
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const Tag = as;
  // contextSafe ties anything created later (from the observer) to this component's GSAP
  // context, so it is reverted on unmount and never doubles up in React Strict Mode.
  const { contextSafe } = useGSAP({ scope: ref });

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MQ.motion).matches) return;

    const reveal = contextSafe(() => {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          el.setAttribute("data-split-ready", "");
          // Returning the tween lets SplitText revert and replay it cleanly on re-split.
          return gsap.from(self.lines, { yPercent: 110, duration: 0.9, ease: EASE, stagger: 0.08, delay });
        },
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          reveal();
        }
      },
      // Fires once the heading is 12% up from the bottom edge of the screen.
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [contextSafe, delay]);

  return (
    <Tag ref={ref} id={id} className={className} data-split="">
      {children}
    </Tag>
  );
}
