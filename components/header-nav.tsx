"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { nav } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Header links and theme switch, entering one after another on first load. */
export function HeaderNav() {
  const reduce = useReducedMotion();

  return (
    <motion.nav
      aria-label="Main"
      className="flex items-center gap-5 sm:gap-8"
      initial="hidden"
      animate="shown"
      variants={{ shown: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
    >
      {nav.map((item) => (
        <motion.span
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : -10 },
            shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
          }}
        >
          {/* Real Links ("/#work", "/contact"): they work from every page, not only the home page. */}
          <Link href={item.href} className="label link-sweep py-2 text-muted hover:text-ink">
            {item.label}
          </Link>
        </motion.span>
      ))}
      <motion.span
        className="flex"
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : -10 },
          shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        }}
      >
        <ThemeToggle />
      </motion.span>
    </motion.nav>
  );
}
