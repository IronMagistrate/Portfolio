import Link from "next/link";
import { getProject, homeWork, statusLabel, type Project } from "@/content/site";
import { Lift } from "../motion/Lift";
import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";
import { ProjectVisual } from "../project-visual";
import { Arrow, StatusDot } from "../ui";

const isLive = (p: Project) => p.status === "live" || p.status === "production";

function MetaRow({ project }: { project: Project }) {
  return (
    <div className="label flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-muted">
      <span className="flex items-center gap-2 text-ink">
        <StatusDot live={isLive(project)} />
        {statusLabel[project.status]}
      </span>
      <span>{project.role}</span>
      <span className="hidden sm:inline">{project.stack.slice(0, 4).join(" · ")}</span>
    </div>
  );
}

function ArrowDisc({ size = "size-10" }: { size?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,color,border-color] duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent`}
    >
      <Arrow />
    </span>
  );
}

/** The one project told in depth: wide cover, its story, and links to its other surfaces. */
function FlagshipCard({ project }: { project: Project }) {
  const name = project.name;
  const summary = project.summary;

  return (
    // Not wrapped in Reveal: the cover's top edge shows on the first screen, and a
    // scroll reveal would keep it invisible until the visitor scrolls.
    <article className="flex flex-col gap-8">
      <Link href={`/work/${project.slug}`} prefetch className="group block" aria-label={`${name}: read the case study`}>
        <Lift distance={6}>
          <ProjectVisual project={project} size="hero" />
        </Lift>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-3 lg:col-span-5">
            <span className="label text-accent-ink">Flagship · {project.kind}</span>
            <h3 className="font-display text-h2">
              <span className="link-sweep group-hover:bg-[length:100%_1px] group-hover:bg-[position:0%_100%]">
                {name}
              </span>
            </h3>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="flex items-start justify-between gap-6">
              <p className="max-w-xl text-lead text-muted">{summary}</p>
              <ArrowDisc size="size-12" />
            </div>
            <MetaRow project={project} />
          </div>
        </div>
      </Link>

      {/* The platform's three apps. One case study covers all of them, so no separate links. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
        <span className="label pt-4 text-muted lg:col-span-5">Three apps, one API</span>
        <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3 lg:col-span-7">
          {homeWork.surfaces.map((surface) => (
            <li key={surface.label} className="flex flex-col gap-1 bg-canvas p-5">
              <span className="font-display text-2xl">{surface.label}</span>
              <span className="text-sm text-muted">{surface.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="article" delay={index * 0.08}>
      <Link href={`/work/${project.slug}`} prefetch className="group block" aria-label={`${project.name}: read the case study`}>
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
          <ArrowDisc />
        </div>
        <div className="mt-5">
          <MetaRow project={project} />
        </div>
      </Link>
    </Reveal>
  );
}

/** Opens the work: the flagship only. The architecture walkthrough follows it on the page. */
export function WorkSection() {
  const flagship = getProject(homeWork.flagship);
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="container-x flex flex-col gap-10 md:gap-12">
        <SplitHeading id="work-title" className="font-display text-h3">
          Selected work
        </SplitHeading>
        {flagship ? <FlagshipCard project={flagship} /> : null}
      </div>
    </section>
  );
}

/** After the walkthrough: the other two featured projects. */
export function MoreWorkSection() {
  const featured = homeWork.featured.map(getProject).filter((p): p is Project => Boolean(p));
  return (
    <section aria-labelledby="more-work-title" className="border-t border-line py-20 md:py-28">
      <div className="container-x flex flex-col gap-12 md:gap-16">
        <SplitHeading as="h2" id="more-work-title" className="font-display text-h3">
          More work
        </SplitHeading>
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          {featured.map((project, i) => (
            <FeaturedCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
