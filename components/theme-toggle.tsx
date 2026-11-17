"use client";

import { motion } from "motion/react";
import { useLayoutEffect } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / blocked storage: the switch still works for this page view.
  }
}

/** Switch theme with a short cross-fade of the whole page where the browser supports it. */
function toggleTheme() {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && typeof document.startViewTransition === "function") {
    document.startViewTransition(() => setTheme(next));
  } else {
    setTheme(next);
  }
}

/**
 * Animated theme switch. The thumb position and which icon shows are driven purely by CSS
 * from <html data-theme>, so server HTML and client never disagree (no hydration mismatch);
 * Motion adds the press feedback.
 */
export function ThemeToggle() {
  // React's dev Strict Mode remount resets <html> attributes; put the saved theme back.
  // No-op in production, where the inline script in layout.tsx has already applied it.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
    } catch {}
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Switch between dark and light theme"
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-7 w-12 shrink-0 rounded-full border border-line-strong bg-surface"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0.5 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-500 light:translate-x-5"
      >
        {/* Moon (dark) and sun (light) cross-fade and rotate into place. */}
        <svg
          viewBox="0 0 24 24"
          className="absolute size-3 transition-[opacity,transform] duration-500 light:scale-50 light:-rotate-90 light:opacity-0"
          fill="currentColor"
        >
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="absolute size-3 scale-50 rotate-90 opacity-0 transition-[opacity,transform] duration-500 light:scale-100 light:rotate-0 light:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
    </motion.button>
  );
}
