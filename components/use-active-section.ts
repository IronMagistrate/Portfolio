"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view, for highlighting nav items.
 * Starts as null (nothing highlighted) on both server and client, so hydration matches.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        // First section (in page order) that is inside the band wins.
        setActive(ids.find((id) => visible.get(id)) ?? null);
      },
      // A thin band 30–40% down the viewport: the section crossing it is "current".
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
