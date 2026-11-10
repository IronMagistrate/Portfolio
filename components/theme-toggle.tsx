"use client";

import { useLayoutEffect } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / blocked storage: the switch still works for this page view.
  }
}

/**
 * DARK | LIGHT segmented switch.
 * Which half is highlighted is decided purely by CSS from <html data-theme>,
 * so the server HTML and the client never disagree (no hydration mismatch, no flash).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // React's dev Strict Mode remount resets <html> attributes; put the saved theme back.
  // No-op in production, where the inline script in layout.tsx has already applied it.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch {}
  }, []);

  return (
    <button
      type="button"
      aria-label="Toggle colour theme"
      onClick={() => applyTheme(currentTheme() === "dark" ? "light" : "dark")}
      className={`flex items-center border-2 border-line bg-surface p-1 font-mono text-label-sm font-bold uppercase ${className}`}
    >
      <span className="bg-ink px-1.5 py-0.5 text-canvas light:bg-transparent light:text-muted">
        Dark
      </span>
      <span className="px-1.5 py-0.5 text-muted light:bg-accent light:text-on-accent">
        Light
      </span>
    </button>
  );
}
