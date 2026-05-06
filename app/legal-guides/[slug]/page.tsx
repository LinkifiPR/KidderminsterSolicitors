import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageView } from "../../../components/ContentPageView";
import {
  buildCanonicalUrl,
  getPageBySlug,
  guidePages,
} from "../../../lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "guide") {
    return {};
  }

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: buildCanonicalUrl(page.slug),
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: buildCanonicalUrl(page.slug),
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "guide") {
    notFound();
  }

  return <ContentPageView page={page} />;
}
