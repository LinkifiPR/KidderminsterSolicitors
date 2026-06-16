import type { MetadataRoute } from "next";
import {
  baseUrl,
  buildCanonicalUrl,
  getAllPageSlugs,
  guidePages,
} from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const guideUpdatedBySlug = new Map(
    guidePages.map((guide) => [guide.slug, new Date(guide.updated)]),
  );

  return [
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...getAllPageSlugs().map((slug) => ({
      url: buildCanonicalUrl(slug),
      lastModified: guideUpdatedBySlug.get(slug) ?? buildDate,
      changeFrequency: "monthly" as const,
      priority: slug.includes("solicitors-kidderminster") ? 0.85 : 0.55,
    })),
  ];
}
