"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
 * Not created on touch devices or when the visitor prefers reduced motion: the page then
 * scrolls natively.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.finePointerMotion, () => {
      const lenis = new Lenis({
        duration: 1.1,
        // Same-page links (#work, #contact) scroll smoothly and stop below the fixed header.
        anchors: { offset: -72 },
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Cleanup runs when the media query stops matching or the provider unmounts.
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  // Next.js resets the scroll position on navigation; tell Lenis, or it would glide back
  // to where the previous page was scrolled. Then let ScrollTrigger re-measure the new page.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis && !window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
