"use client";

import { nav } from "@/content/site";
import { useActiveSection } from "./use-active-section";

const SECTION_IDS = nav.map((item) => item.id);

/** Bottom tab bar on phones and tablets (the desktop header nav is hidden below lg). */
export function MobileNav() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-4 border-t-2 border-line bg-canvas lg:hidden"
    >
      {nav.map((item, i) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            aria-current={isActive ? "location" : undefined}
            className={`flex flex-col items-center justify-center gap-1 font-mono text-label-sm font-bold uppercase ${
              i < nav.length - 1 ? "border-r-2 border-line" : ""
            } ${isActive ? "bg-accent text-on-accent" : "text-muted"}`}
          >
            {/* No opacity here: at 70% the muted grey failed contrast (Lighthouse, 10 Nov). */}
            <span aria-hidden="true" className="text-[0.6rem]">
              0{i + 1}
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
