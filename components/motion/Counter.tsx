"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type CounterProps = {
  /** The real, final number. Rendered on the server, so it is correct without JavaScript. */
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Counts up from 0 to `value` the first time it scrolls into view.
 * Width is reserved for the final number (tabular digits + min-width), so counting
 * never shifts the layout. Reduced-motion visitors just see the final number.
 *
 * Uses an IntersectionObserver rather than a ScrollTrigger: it needs no scroll position,
 * only "has it appeared", and this keeps phones free of ScrollTriggers (and of the
 * whole-page measuring a ScrollTrigger refresh does).
 */
export function Counter({ value, prefix = "", suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${format(value)}${suffix}`;
  // contextSafe ties the tween to this component's GSAP context, so it is killed on unmount.
  const { contextSafe } = useGSAP({ scope: ref });

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MQ.motion).matches) return;

    el.textContent = `${prefix}0${suffix}`;
    const run = contextSafe(() => {
      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 1.4,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${prefix}${format(state.n)}${suffix}`;
        },
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.textContent = finalText;
    };
  }, [contextSafe, value, prefix, suffix, finalText]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums ${className ?? ""}`}
      style={{ minWidth: `${finalText.length}ch` }}
    >
      {finalText}
    </span>
  );
}
