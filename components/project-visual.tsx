import Image from "next/image";
import { ViewTransition } from "react";
import { projects, type Project } from "@/content/site";

/**
 * The visual panel for a project. It appears twice with the same transition name, on the
 * home-page card and at the top of the case study, so the browser morphs one into the other
 * during navigation (React <ViewTransition>, see the bundled view-transitions guide).
 *
 * With a cover it shows the screenshot. Without one (private projects) it is typographic:
 * the project's name and index on a tinted panel, and on a case-study page it is a short
 * title band rather than a big empty box.
 */
export function ProjectVisual({
  project,
  size = "card",
}: {
  project: Project;
  size?: "card" | "hero";
}) {
  const index = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0");
  const cover = project.cover;

  if (cover) {
    return (
      <ViewTransition name={`project-visual-${project.slug}`} share="morph" default="none">
        <div
          className={`relative w-full overflow-hidden border border-line bg-surface ${
            size === "hero" ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={cover.src}
            alt={`${project.name}: home screen`}
            fill
            // The case-study cover is the page's largest image: load it first.
            priority={size === "hero"}
            sizes={size === "hero" ? "(min-width: 1440px) 1312px, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
            // Anchored top-left, where every app keeps its logo and navigation, so a narrow
            // crop (the 4:3 home card) trims the right edge instead of the brand.
            className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </ViewTransition>
    );
  }

  return (
    <ViewTransition name={`project-visual-${project.slug}`} share="morph" default="none">
      <div
        className={`relative flex w-full flex-col justify-between overflow-hidden border border-line bg-surface p-5 md:p-8 ${
          size === "hero" ? "min-h-48 md:min-h-56" : "aspect-[4/3]"
        }`}
      >
        {/* Faint oversized index, purely decorative: generated content, not real text, so it is
            skipped by screen readers and by text-contrast checks. */}
        <span
          aria-hidden="true"
          data-index={index}
          className={`pointer-events-none absolute -right-2 -bottom-[0.22em] font-display leading-none text-surface-2 select-none before:content-[attr(data-index)] ${
            size === "hero" ? "text-[10rem] md:text-[14rem]" : "text-[13rem] md:text-[18rem]"
          }`}
        />
        <div className="label relative flex items-center justify-between text-muted">
          <span>{project.kind}</span>
          {project.year ? <span>{project.year}</span> : null}
        </div>
        <span aria-hidden="true" className="relative font-display text-h3">
          {project.name}
        </span>
      </div>
    </ViewTransition>
  );
}
