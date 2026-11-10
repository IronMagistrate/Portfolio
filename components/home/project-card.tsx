import Link from "next/link";
import { statusLabel, type Project } from "@/content/site";
import { Claim, VerifyTag } from "../claim";
import { ArrowRight, Bolt, ExternalLink } from "../icons";
import { Tag } from "../ui";

const liveStatuses = new Set(["live", "production"]);

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const isLive = liveStatuses.has(project.status);

  return (
    <article className="lift group flex flex-col justify-between border-2 border-line bg-surface p-6 hover:border-line-strong md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2 border-b border-line pb-2">
          <span className="font-mono text-sm font-bold text-muted group-hover:text-accent-ink">
            {number} {"// "}
            {project.category}
          </span>
          <span className="flex items-center">
            <span
              className={`border px-2 py-0.5 font-mono text-label-sm font-bold uppercase ${
                isLive ? "border-line-strong bg-accent text-on-accent" : "border-line bg-surface-2 text-ink"
              }`}
            >
              {statusLabel[project.status]}
            </span>
            {project.statusVerify ? <VerifyTag why={project.statusVerify} /> : null}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-extrabold uppercase [overflow-wrap:anywhere] group-hover:text-accent-ink sm:text-headline-sm">
            {project.name}
          </h3>
          <p className="font-medium text-muted">{project.summary}</p>
        </div>

        <div className="flex items-start gap-3 border border-line bg-surface-2 p-4">
          <Bolt className="mt-0.5 size-4 shrink-0 text-accent-ink" />
          <div className="flex flex-col">
            <span className="font-mono text-label-sm uppercase text-muted">Key deliverable</span>
            <span className="text-sm font-bold">
              <Claim value={project.deliverable} />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
        <ul className="flex flex-wrap gap-1" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-label-sm uppercase text-muted">
            Role: <Claim value={project.role} />
          </span>
          {project.hasCaseStudy ? (
            <Link
              href={`/work/${project.slug}`}
              // Per-link prefetch resolves the slug-specific content too, not just the shared shell.
              prefetch
              aria-label={`Read the ${project.name} case study`}
              className="inline-flex items-center gap-1 font-mono text-label-md font-bold uppercase group-hover:text-accent-ink"
            >
              Case study <ArrowRight />
            </Link>
          ) : project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} source code on GitHub (opens in a new tab)`}
              className="inline-flex items-center gap-1 font-mono text-label-md font-bold uppercase group-hover:text-accent-ink"
            >
              Source <ExternalLink className="size-3.5" />
            </a>
          ) : (
            <span className="font-mono text-label-sm uppercase text-muted">Case study soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
