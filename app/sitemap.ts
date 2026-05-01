import type { MetadataRoute } from "next";
import { baseUrl, buildCanonicalUrl, getAllPageSlugs } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-01");

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...getAllPageSlugs().map((slug) => ({
      url: buildCanonicalUrl(slug),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: slug.includes("solicitors-kidderminster") ? 0.85 : 0.55,
    })),
  ];
}
