"use client";

import { nav } from "@/content/site";
import { useActiveSection } from "./use-active-section";

// Module-level so the hook's effect dependency stays stable between renders.
const SECTION_IDS = nav.map((item) => item.id);

export function NavLinks() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav aria-label="Sections" className="hidden h-full items-stretch border-x-2 border-line lg:flex">
      {nav.map((item, i) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            aria-current={isActive ? "location" : undefined}
            className={`flex items-center px-6 font-mono text-label-md font-bold uppercase ${
              i < nav.length - 1 ? "border-r-2 border-line" : ""
            } ${isActive ? "bg-accent text-on-accent" : "text-muted hover:bg-surface hover:text-ink"}`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
