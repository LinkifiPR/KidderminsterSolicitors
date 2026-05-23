import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageView } from "../../components/ContentPageView";
import { buildCanonicalUrl, getPageBySlug } from "../../lib/site";

const page = getPageBySlug("ecommerce-terms-solicitors");

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: page?.title ?? "Ecommerce Terms Solicitors",
  description:
    page?.metaDescription ??
    "Compare ecommerce terms solicitor options for online shops, checkout terms, refunds, delivery, subscriptions, digital products, and consumer compliance.",
  alternates: {
    canonical: buildCanonicalUrl("ecommerce-terms-solicitors"),
  },
  openGraph: {
    title: page?.title ?? "Ecommerce Terms Solicitors",
    description:
      page?.metaDescription ??
      "Compare ecommerce terms solicitor options for online shops, checkout terms, refunds, delivery, subscriptions, digital products, and consumer compliance.",
    url: buildCanonicalUrl("ecommerce-terms-solicitors"),
  },
};

export default function EcommerceTermsPage() {
  if (!page || page.type !== "service") {
    notFound();
  }

  return <ContentPageView page={page} />;
}
