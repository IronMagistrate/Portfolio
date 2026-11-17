import Link from "next/link";
import { projects, statusLabel, type Project } from "@/content/site";
import { Lift } from "../motion/Lift";
import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";
import { ProjectVisual } from "../project-visual";
import { Arrow, StatusDot } from "../ui";
import { WorkGrid } from "./work-grid";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    // The second column sits lower on large screens, for an editorial stagger.
    <Reveal as="article" delay={(index % 2) * 0.08} className={index % 2 === 1 ? "lg:mt-32" : ""}>
      <Link
        href={`/work/${project.slug}`}
        // Per-link prefetch also resolves the slug-specific content, so the visual can morph.
        prefetch
        className="group block"
        aria-label={`${project.name}: read the case study`}
      >
        <Lift>
          <ProjectVisual project={project} />
        </Lift>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-h3">
              <span className="link-sweep group-hover:bg-[length:100%_1px] group-hover:bg-[position:0%_100%]">
                {project.name}
              </span>
            </h3>
            <p className="max-w-md text-muted">{project.summary}</p>
          </div>
          <span
            aria-hidden="true"
            className="mt-2 flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,color,border-color] duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
          >
            <Arrow />
          </span>
        </div>
        <div className="label mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-muted">
          <span className="flex items-center gap-2 text-ink">
            <StatusDot live={project.status === "live" || project.status === "production"} />
            {statusLabel[project.status]}
          </span>
          <span>{project.role}</span>
          <span className="hidden sm:inline">{project.stack.slice(0, 3).join(" · ")}</span>
        </div>
      </Link>
    </Reveal>
  );
}

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <SplitHeading id="work-title" className="font-display text-h2">
            Selected work
          </SplitHeading>
          <Reveal as="p" className="label max-w-xs text-muted">
            {String(projects.length).padStart(2, "0")} projects. Platforms I built alone or lead, and one in the open.
          </Reveal>
        </div>
        {/* Cards render on the server; WorkGrid only decides how many show. */}
        <WorkGrid cards={projects.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} />)} />
      </div>
    </section>
  );
}
