"use client";

/**
 * Single place where GSAP plugins are registered.
 * Import gsap, ScrollTrigger, SplitText and useGSAP from here, never from "gsap" directly,
 * so registration happens exactly once however many components use it.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** The site's one easing curve, as a GSAP ease. Matches --ease-out-expo in globals.css. */
export const EASE = "expo.out";

/** Media queries shared by every gsap.matchMedia() call, so the rules stay in one place. */
export const MQ = {
  /** Motion allowed. */
  motion: "(prefers-reduced-motion: no-preference)",
  /**
   * Motion allowed AND a mouse or trackpad. Smooth scrolling is only for these: Lenis does not
   * smooth touch scrolling (native momentum is better), so on phones it would only burn frames.
   */
  finePointerMotion: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  /**
   * Large screens with motion allowed: pinning and parallax are only enabled here.
   * Mirrors Tailwind's `lg:motion-ok:` so CSS layout and GSAP switch at the same point.
   */
  desktopMotion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
