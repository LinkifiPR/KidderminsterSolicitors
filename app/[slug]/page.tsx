import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ContentPageView } from "../../components/ContentPageView";
import {
  buildCanonicalUrl,
  buildGuidePath,
  buildPageTitle,
  getPageBySlug,
  getRootPageSlugs,
  socialShareImage,
} from "../../lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getRootPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: { absolute: buildPageTitle(page.title) },
    description: page.metaDescription,
    alternates: {
      canonical: buildCanonicalUrl(page.slug),
    },
    openGraph: {
      title: buildPageTitle(page.title),
      description: page.metaDescription,
      url: buildCanonicalUrl(page.slug),
      images: [socialShareImage],
    },
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  if (page.type === "guide") {
    redirect(buildGuidePath(page.slug));
  }

  return <ContentPageView page={page} />;
}
