"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type ParallaxProps = {
  children: React.ReactNode;
  /** Total travel as a percentage of the element's height (e.g. 12 = moves from -6% to +6%). */
  amount?: number;
  className?: string;
  /** Inline styles for the outer box, e.g. an aspectRatio taken from the image's own size. */
  style?: React.CSSProperties;
};

/**
 * Scroll-linked drift for imagery. The outer box clips; the inner layer is slightly
 * oversized and slides vertically as the box crosses the viewport.
 * Desktop with motion allowed only: on phones and with reduced motion it is a static box.
 */
export function Parallax({ children, amount = 12, className, style }: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const box = outer.current;
      const layer = inner.current;
      if (!box || !layer) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.desktopMotion, () => {
        const half = amount / 2;
        // Oversize by the travel distance so the edges never show while sliding.
        gsap.set(layer, { scale: 1 + amount / 100 });
        gsap.fromTo(
          layer,
          { yPercent: -half },
          {
            yPercent: half,
            ease: "none",
            scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: outer },
  );

  return (
    <div ref={outer} className={`overflow-hidden ${className ?? ""}`} style={style}>
      <div ref={inner} className="size-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
