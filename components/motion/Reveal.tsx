"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds to wait before starting; use small steps (0.06–0.1) to stagger siblings. */
  delay?: number;
  /** Distance travelled upward, in px. Ignored when the visitor prefers reduced motion. */
  y?: number;
  className?: string;
  /** Element to render. Kept to block-level tags that make sense as a reveal wrapper. */
  as?: "div" | "li" | "section" | "article" | "p";
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fade-and-rise when the element scrolls into view, once.
 * Animates only opacity and transform, so it cannot shift layout.
 * With reduced motion it becomes a plain fade.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.6, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
