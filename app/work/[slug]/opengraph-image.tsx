import { ImageResponse } from "next/og";
import { caseStudies } from "@/content/case-studies";
import { getProject } from "@/content/site";
import { OgCard, ogSize } from "@/lib/og-card";

export const alt = "Case study by Enoch Enebeli";
export const size = ogSize;
export const contentType = "image/png";

// One preview image per case study, generated at build time.
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return new ImageResponse(
    <OgCard eyebrow={project ? project.kind : "Case study"} title={project ? project.name : "Case study"} footer="Case study" />,
    size,
  );
}
