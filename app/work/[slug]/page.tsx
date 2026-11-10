import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

// Prerender every case study at build time. Unknown slugs fall through to notFound().
// (`dynamicParams` is not available with Cache Components, so it is not set here.)
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  // Title goes through the root layout's "%s | Enoch Enebeli" template.
  const title = `${study.title} case study`;
  return {
    title,
    description: study.tagline,
    alternates: { canonical: `/work/${study.slug}` },
    // A page's openGraph object REPLACES the layout's (no deep merge), so repeat siteName/locale.
    openGraph: {
      type: "article",
      siteName: "Enoch Enebeli",
      locale: "en_NG",
      title,
      description: study.tagline,
      url: `/work/${study.slug}`,
    },
    twitter: { card: "summary_large_image", title, description: study.tagline },
  };
}

/*
 * Partial Prefetching builds ONE App Shell per route, shared by every /work/* link,
 * so the shell must not depend on the slug. Awaiting `params` at the top of the page
 * would tie it to one URL (Next flags this as "URL data outside of Suspense").
 * Instead the promise is passed down and awaited inside <Suspense>.
 * See node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md
 */
export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}

async function CaseStudyContent({ params }: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}

// Tall on purpose: a short skeleton let the footer paint high and then jump down when the
// real content streamed in (Lighthouse CLS 0.27). At 150vh the footer starts off-screen.
function CaseStudySkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading case study" className="flex min-h-[150vh] flex-col">
      <div className="h-10 border-b-2 border-line bg-surface" />
      <div className="flex flex-col gap-4 border-b-2 border-line px-5 py-16 md:px-12">
        <div className="h-4 w-48 bg-surface-2" />
        <div className="h-14 w-2/3 bg-surface-2" />
        <div className="h-5 w-full max-w-2xl bg-surface-2" />
      </div>
    </div>
  );
}
