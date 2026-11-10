import Link from "next/link";
import { type CaseSection, type CaseStudy, caseStudies } from "@/content/case-studies";
import { claimText, contact, projects, statusLabel } from "@/content/site";
import { Claim, VerifyTag } from "../claim";
import { ArrowRight, ExternalLink, Mail } from "../icons";
import { buttonPrimary, StatusSquare } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const projectIndex = projects.findIndex((p) => p.slug === study.slug);

  return (
    <article>
      <TopBar study={study} index={projectIndex} />
      <TitleBlock study={study} />
      <FactStrip study={study} />
      {study.flow ? <Showcase study={study} /> : null}
      {study.sections.map((section, i) => (
        <SectionPanel key={section.id} section={section} index={i} />
      ))}
      <Pagination slug={study.slug} />
      <ContactBanner />
    </article>
  );
}

function TopBar({ study, index }: { study: CaseStudy; index: number }) {
  const project = projects[index];
  return (
    <div className="border-b-2 border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2 font-mono text-label-md font-bold uppercase md:px-12">
        <Link href="/#work" className="group inline-flex items-center gap-1 hover:text-accent-ink">
          <ArrowRight className="size-4 rotate-180 group-hover:-translate-x-1" />
          Back to all work
        </Link>
        {project ? (
          <span className="flex items-center gap-4">
            <span className="hidden font-normal text-muted sm:inline">Index: {pad(index + 1)}_case_study</span>
            <span className="inline-flex items-center gap-2 border-2 border-line bg-surface-2 px-2 py-0.5">
              <StatusSquare />
              {statusLabel[project.status]}
              {project.statusVerify ? <VerifyTag why={project.statusVerify} /> : null}
            </span>
          </span>
        ) : null}
        <span className="sr-only">{study.title} case study</span>
      </div>
    </div>
  );
}

function TitleBlock({ study }: { study: CaseStudy }) {
  return (
    <header className="border-b-2 border-line px-5 py-10 md:px-12 lg:py-16">
      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
        <div className="fit-title-box flex flex-col gap-3 lg:col-span-8">
          <span className="font-mono text-sm text-accent-ink uppercase">{study.eyebrow}</span>
          <h1 className="fit-title font-display font-extrabold tracking-[-0.03em] uppercase [--fit-max:3.75rem]">
            {study.title}
          </h1>
          <p className="max-w-3xl text-lg leading-7 text-muted">{study.tagline}</p>
        </div>
        {study.live ? (
          <div className="flex items-center lg:col-span-4 lg:justify-end">
            <a href={study.live.href} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
              Visit live site <ExternalLink />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {study.live.verify ? <VerifyTag why={study.live.verify} /> : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}

function FactStrip({ study }: { study: CaseStudy }) {
  return (
    <dl className="grid grid-cols-1 divide-y-2 divide-line border-b-2 border-line bg-surface sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 [&>div]:border-line sm:[&>div:nth-child(odd)]:border-r-2 sm:[&>div:nth-child(-n+2)]:border-b-2 lg:[&>div]:border-b-0 lg:[&>div:not(:last-child)]:border-r-2">
      {study.facts.map((fact, i) => (
        <div key={fact.label} className="flex flex-col gap-1 p-6">
          <dt className="font-mono text-label-sm uppercase text-muted">
            {"// "}
            {pad(i + 1)}_{fact.label}
          </dt>
          <dd className="font-display text-lg font-extrabold uppercase">
            <Claim value={fact.value} />
          </dd>
          <dd className="text-sm text-muted">{fact.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

function Showcase({ study }: { study: CaseStudy }) {
  const flow = study.flow!;
  // Never invent a domain: without a public URL, say so.
  const address = study.live ? `https://${new URL(study.live.href).host}` : "No public URL yet";
  return (
    <section aria-label={flow.label} className="border-b-2 border-line px-5 py-10 md:px-12 lg:py-16">
      <div className="border-2 border-line bg-surface">
        {/* Browser chrome frame: square "traffic lights", per the 0px-radius rule. */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-line px-4 py-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="size-3 shrink-0 border border-line bg-surface-2" />
            <span aria-hidden="true" className="size-3 shrink-0 border border-line bg-surface-2" />
            <span aria-hidden="true" className="size-3 shrink-0 border border-line bg-accent" />
            <span className="ml-2 truncate font-mono text-label-sm uppercase text-muted">{address}</span>
          </div>
        </div>
        {/* Short while it's a placeholder; switch to aspect-[16/9] with the real screenshot. */}
        <div className="flex aspect-[16/5] items-center justify-center border-b-2 border-line bg-surface-2 p-6">
          {/* Real screenshot goes here once captured; the mockup's image was AI-generated. */}
          <span className="border border-dashed border-line px-2 py-1 font-mono text-label-sm uppercase text-muted">
            Screenshot pending
          </span>
        </div>
        {/* 3 columns for 5-6 steps (two even rows), 4 columns for up to 4. */}
        <ol
          className={`grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 ${
            flow.steps.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          }`}
        >
          {flow.steps.map((step, i) => {
            const last = i === flow.steps.length - 1;
            return (
              <li
                key={step.title}
                className={`flex flex-col gap-1 border-2 bg-canvas p-4 light:bg-surface ${
                  last ? "border-accent shadow-[4px_4px_0_var(--shadow-accent)] light:border-ink" : "border-line"
                }`}
              >
                <span className="border-b border-line pb-1 font-mono text-label-sm font-bold text-accent-ink">
                  STEP {pad(i + 1)}
                </span>
                <span className="pt-1 font-display text-lg font-extrabold uppercase">{step.title}</span>
                <span className="text-sm text-muted">{step.body}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function SectionPanel({ section, index }: { section: CaseSection; index: number }) {
  return (
    <section
      aria-labelledby={`cs-${section.id}`}
      className="grid grid-cols-1 border-b-2 border-line lg:grid-cols-12"
    >
      <div className="fit-title-box flex flex-col justify-between gap-6 border-b-2 border-line bg-surface p-6 lg:col-span-4 lg:border-r-2 lg:border-b-0 lg:p-10">
        <div>
          <span className="block font-mono text-sm text-accent-ink uppercase">
            {"// "}section_{pad(index + 1)}
          </span>
          {/* Fit to the narrow 4-column rail: "DECISIONS" overflowed into the text beside it at 36px. */}
          <h2
            id={`cs-${section.id}`}
            className="fit-title mt-1 font-display font-extrabold uppercase tracking-tight [--fit-max:2.25rem]"
          >
            {section.title}
          </h2>
        </div>
        {section.aside ? (
          <div className="hidden lg:block">
            <span className="block font-mono text-label-sm uppercase text-muted">{section.aside.label}:</span>
            <span className="font-mono text-sm font-bold uppercase text-accent-ink">{section.aside.value}</span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-6 p-6 lg:col-span-8 lg:p-10">
        {section.paragraphs.map((p) => (
          <p key={claimText(p)} className="text-lg leading-7">
            <Claim value={p} />
          </p>
        ))}

        {section.cards ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {section.cards.map((card, i) => (
              <li key={card.title} className="flex flex-col gap-4 border-2 border-line bg-surface p-4">
                <span className="font-display text-headline-sm font-extrabold">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-base font-extrabold uppercase">{card.title}</h3>
                  <p className="mt-1 text-sm text-muted">{card.body}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {section.decisions?.map((d, i) => (
          <div key={d.title} className="border-2 border-line bg-surface p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b-2 border-line pb-2 font-mono text-label-sm font-bold uppercase">
              <span>Decision_{pad(i + 1)}</span>
              {d.tag ? <span className="text-accent-ink">{d.tag}</span> : null}
            </div>
            <h3 className="mb-2 font-display text-xl font-extrabold uppercase sm:text-headline-sm">{d.title}</h3>
            <p className="text-muted">{d.body}</p>
            {d.snippet ? (
              <figure className="mt-4 border border-line bg-canvas">
                <figcaption className="flex flex-wrap justify-between gap-2 border-b border-line px-3 py-1 font-mono text-label-sm uppercase text-muted">
                  <span>{d.snippet.file}</span>
                  <span>{d.snippet.caption}</span>
                </figcaption>
                <pre className="overflow-x-auto p-3 font-mono text-sm leading-6 text-accent-ink">
                  <code>{d.snippet.code}</code>
                </pre>
              </figure>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Pagination({ slug }: { slug: string }) {
  // No wrap-around: with two studies, wrapping made "previous" and "next" the same page.
  const i = caseStudies.findIndex((c) => c.slug === slug);
  const prev = i > 0 ? caseStudies[i - 1] : undefined;
  const next = i >= 0 && i < caseStudies.length - 1 ? caseStudies[i + 1] : undefined;
  if (!prev && !next) return null;
  const link = "group flex flex-col gap-4 p-6 hover:bg-surface lg:p-10";
  return (
    <nav aria-label="More case studies" className="grid grid-cols-1 divide-y-2 divide-line border-b-2 border-line md:grid-cols-2 md:divide-x-2 md:divide-y-0">
      {prev ? (
        <Link href={`/work/${prev.slug}`} prefetch className={link}>
          <span className="font-mono text-sm uppercase text-muted">← Previous case study</span>
          <span className="font-display text-xl font-extrabold uppercase group-hover:text-accent-ink sm:text-headline-sm">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden md:block" />
      )}
      {next ? (
        <Link href={`/work/${next.slug}`} prefetch className={`${link} md:items-end md:text-right`}>
          <span className="font-mono text-sm uppercase text-accent-ink">Next case study →</span>
          <span className="font-display text-xl font-extrabold uppercase group-hover:text-accent-ink sm:text-headline-sm">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}

// The banner is lime in both themes, so its button uses fixed ink colours rather than theme tokens.
function ContactBanner() {
  const email = claimText(contact.email);
  return (
    <section className="border-b-2 border-line bg-accent px-5 py-10 text-on-accent md:px-12">
      <div className="fit-title-box flex flex-col items-start justify-between gap-6 xl:flex-row xl:items-center">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-label-sm font-bold uppercase">{"// "}Start a conversation</span>
          <h2 className="fit-title font-display font-extrabold tracking-[-0.03em] uppercase [--fit-max:3rem]">
            Have a system to build?
          </h2>
          <p className="max-w-2xl text-lg">Open to remote full-stack roles and high-impact engineering work.</p>
        </div>
        <a
          href={`mailto:${email}`}
          className="press inline-flex items-center gap-2 border-2 border-[#0a0a0a] bg-[#0a0a0a] px-6 py-3 font-mono text-label-md font-bold text-[#f2f2f2] [--press-shadow:#0a0a0a] [overflow-wrap:anywhere] hover:bg-[#1c1c1c]"
        >
          <Mail /> {email}
        </a>
        {typeof contact.email === "string" ? null : <VerifyTag why={contact.email.verify} tone="on-accent" />}
      </div>
    </section>
  );
}
