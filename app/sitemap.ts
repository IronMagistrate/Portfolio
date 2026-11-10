import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { SITE_URL } from "@/lib/site-url";

// lastModified is left out on purpose: `new Date()` would claim every page changed on
// every build (and Cache Components rejects reading the clock during prerender).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${SITE_URL}/work/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
