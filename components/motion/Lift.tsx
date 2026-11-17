"use client";

import { motion, useReducedMotion } from "motion/react";

type LiftProps = {
  children: React.ReactNode;
  /** How far the element rises on hover, in px. */
  distance?: number;
  className?: string;
};

/** Card lift: rises slightly on hover and settles on press. Transform only. */
export function Lift({ children, distance = 8, className }: LiftProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -distance }}
      whileTap={reduce ? undefined : { y: -distance / 2, scale: 0.995 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
