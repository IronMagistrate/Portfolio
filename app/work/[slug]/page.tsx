import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getProject, profile } from "@/content/site";

// Prerender every case study at build time. Unknown slugs fall through to notFound().
// (`dynamicParams` is not available with Cache Components, so it is not set here.)
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const project = getProject(slug);
  if (!study || !project) return {};
  // Title goes through the root layout's "%s | Enoch Enebeli" template.
  const title = `${project.name} case study`;
  return {
    title,
    description: study.tagline,
    alternates: { canonical: `/work/${slug}` },
    // A page's openGraph object REPLACES the layout's (no deep merge), so repeat siteName/locale.
    openGraph: {
      type: "article",
      siteName: profile.name,
      locale: "en_NG",
      title,
      description: study.tagline,
      url: `/work/${slug}`,
    },
    twitter: { card: "summary_large_image", title, description: study.tagline },
  };
}

/*
 * Partial Prefetching builds ONE App Shell per route, shared by every /work/* link,
 * so the shell must not depend on the slug. The params promise is passed down and
 * awaited inside <Suspense> (see the bundled adopting-partial-prefetching guide).
 * The <ViewTransition> wrapper lives here, in the page, so enter/exit fire on navigation.
 */
export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      <div>
        <Suspense fallback={<CaseStudySkeleton />}>
          <CaseStudyContent params={params} />
        </Suspense>
      </div>
    </ViewTransition>
  );
}

async function CaseStudyContent({ params }: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const project = getProject(slug);
  if (!study || !project) notFound();
  return <CaseStudyView study={study} project={project} />;
}

// Tall on purpose: a short skeleton let the footer paint high and then jump down when the
// real content streamed in (a layout shift). At 150svh the footer starts off-screen.
function CaseStudySkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading case study" className="container-x flex min-h-[150svh] flex-col gap-6 pt-36">
      <div className="h-4 w-40 bg-surface" />
      <div className="h-24 w-2/3 bg-surface" />
      <div className="h-5 w-full max-w-2xl bg-surface" />
    </div>
  );
}
