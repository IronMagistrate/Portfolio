import Image from "next/image";
import Link from "next/link";
import { type CaseStudy } from "@/content/case-studies";
import { contact, projects, statusLabel, type Project } from "@/content/site";
import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";
import { WordReveal } from "../motion/WordReveal";
import { ProjectVisual } from "../project-visual";
import { Arrow, ButtonLink, Claim, StatusDot, TodoTag } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

/** One numbered part of the case study: a sticky label on the left, content on the right. */
function Part({
  index,
  id,
  title,
  children,
}: {
  index: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`cs-${id}`} className="border-t border-line py-16 md:py-24">
      <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-3 lg:sticky lg:top-28">
            <span className="label text-accent-ink">{pad(index)}</span>
            <SplitHeading as="h2" id={`cs-${id}`} className="font-display text-h3">
              {title}
            </SplitHeading>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export function CaseStudyView({ study, project }: { study: CaseStudy; project: Project }) {
  const position = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(position + 1) % projects.length];
  const isLive = project.status === "live" || project.status === "production";
  let part = 0;

  return (
    <article>
      <header className="container-x flex flex-col gap-10 pt-28 pb-12 md:pt-36">
        <div className="label flex flex-wrap items-center justify-between gap-3 text-muted">
          <Link href="/#work" className="link-sweep inline-flex items-center gap-2 py-1 hover:text-ink">
            <Arrow className="size-4 rotate-180" />
            All work
          </Link>
          <span className="flex items-center gap-2 text-ink">
            <StatusDot live={isLive} />
            {statusLabel[project.status]}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <span className="label text-accent-ink">{project.kind}</span>
          <WordReveal as="h1" className="font-display text-display" segments={[{ text: project.name }]} />
          <p className="max-w-3xl text-lead text-muted">{study.tagline}</p>
          {study.live || project.repo ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {study.live ? (
                <ButtonLink href={study.live} arrow="out" external>
                  Visit live site
                </ButtonLink>
              ) : null}
              {project.repo ? (
                <ButtonLink href={project.repo} variant={study.live ? "ghost" : "primary"} arrow="out" external>
                  View source
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      {/* Same transition name as the home-page card, so this panel morphs out of it. */}
      <div className="container-x pb-16">
        <ProjectVisual project={project} size="hero" />
      </div>

      {/* The container pads; the boxed grid inside it draws the hairlines (its gap shows the
          line colour). Every cell gets the same padding, so the row is balanced edge to edge. */}
      <div className="container-x">
        <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {study.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-2 bg-canvas p-6 lg:p-8">
              <dt className="label text-muted">{fact.label}</dt>
              <dd className="font-display text-2xl md:text-3xl">{fact.value}</dd>
              <dd className="text-sm text-muted">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Part index={++part} id="problem" title="The problem">
        {study.problem.map((paragraph, i) => (
          <Reveal as="p" key={i} delay={i * 0.06} className="text-lead">
            <Claim value={paragraph} />
          </Reveal>
        ))}
      </Part>

      <Part index={++part} id="role" title="My role">
        <Reveal as="p" className="text-lead">
          {study.role.summary}
        </Reveal>
        {/* Three areas sit in one row; four make a 2×2 grid. */}
        <ul
          className={`grid grid-cols-1 gap-px border border-line bg-line ${
            study.role.areas.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3"
          }`}
        >
          {study.role.areas.map((area, i) => (
            <Reveal as="li" key={area.title} delay={i * 0.06} className="flex flex-col gap-3 bg-canvas p-6">
              <span className="label text-accent-ink">{pad(i + 1)}</span>
              <h3 className="font-display text-2xl">{area.title}</h3>
              <p className="text-sm text-muted">{area.body}</p>
            </Reveal>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech} className="label rounded-full border border-line-strong px-3 py-1.5">
              {tech}
            </li>
          ))}
        </ul>
      </Part>

      {study.flow ? (
        <Part index={++part} id="flow" title={study.flow.label}>
          <ol className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {study.flow.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={(i % 2) * 0.06} className="flex flex-col gap-2 bg-canvas p-6">
                <span className="label text-accent-ink">Step {pad(i + 1)}</span>
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="text-sm text-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </Part>
      ) : null}

      <Part index={++part} id="architecture" title="Architecture">
        <Reveal as="p" className="text-lead">
          {study.architecture.summary}
        </Reveal>
        <ol className="border-t border-line">
          {study.architecture.decisions.map((decision, i) => (
            <Reveal as="li" key={decision.title} delay={0.04} className="grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8">
              <span className="label text-muted md:col-span-3">
                {pad(i + 1)} · {decision.tag}
              </span>
              <div className="flex flex-col gap-3 md:col-span-9">
                <h3 className="font-display text-2xl md:text-3xl">{decision.title}</h3>
                <p className="text-muted">{decision.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Part>

      <Part index={++part} id="outcome" title="Outcome">
        <Reveal as="p" className="text-lead">
          <Claim value={study.outcome.summary} />
        </Reveal>
        <ul className="border-t border-line">
          {study.outcome.points.map((point, i) => (
            <Reveal as="li" key={point} delay={i * 0.05} className="flex gap-4 border-b border-line py-5">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-ink" />
              {point}
            </Reveal>
          ))}
        </ul>
      </Part>

      {study.screens.length > 0 ? (
        <Part index={++part} id="screens" title="Screens">
          {/* One per row, full width and uncropped: a screenshot is evidence, so every pixel of
              the interface stays visible (a parallax zoom would cut off its edges). */}
          <ul className="grid grid-cols-1 gap-12">
            {study.screens.map((screen, i) => (
              <Reveal as="li" key={screen.caption} delay={i === 0 ? 0 : 0.05} className="flex flex-col gap-3">
                {screen.src && screen.width && screen.height ? (
                  <Image
                    src={screen.src}
                    alt={`${project.name}: ${screen.caption}`}
                    width={screen.width}
                    height={screen.height}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-auto w-full border border-line"
                  />
                ) : (
                  // Reserved slot: add `src`, `width` and `height` to the screen in case-studies.ts.
                  <div className="flex aspect-[16/10] items-center justify-center border border-dashed border-line-strong bg-surface">
                    <TodoTag why="Add a real screenshot to public/ and set src, width and height in content/case-studies.ts." />
                  </div>
                )}
                <span className="label text-muted">{screen.caption}</span>
              </Reveal>
            ))}
          </ul>
        </Part>
      ) : null}

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} prefetch className="group container-x flex flex-col gap-4 py-16 md:py-24">
          <span className="label text-muted">Next project</span>
          <span className="flex items-center justify-between gap-6">
            <span className="font-display text-h2">
              <span className="link-sweep group-hover:bg-[length:100%_1px] group-hover:bg-[position:0%_100%]">
                {next.name}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,color,border-color] duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
            >
              <Arrow />
            </span>
          </span>
        </Link>
      </nav>

      <aside className="border-t border-line bg-surface light:bg-surface-2">
        <div className="container-x flex flex-col justify-between gap-6 py-12 md:flex-row md:items-center">
          <p className="font-display text-h3">Have something to build?</p>
          <ButtonLink href={`mailto:${contact.email}`} arrow="right">
            {contact.email}
          </ButtonLink>
        </div>
      </aside>
    </article>
  );
}
