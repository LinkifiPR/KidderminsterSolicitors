import Link from "next/link";
import { servicePages, trustPages } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy)] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--gold)]">
            Kidderminster Solicitors
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
            An independent local guide to finding trusted solicitors in
            Kidderminster. We are not a law firm and do not provide legal
            advice. Enquiries may be passed to a solicitor firm or legal service
            provider, and we may receive a referral fee, marketing fee, or
            commercial payment.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-white">Services</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {servicePages.slice(0, 5).map((page) => (
              <Link key={page.slug} href={`/${page.slug}/`}>
                {page.category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-white">Trust</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {trustPages.map((page) => (
              <Link key={page.slug} href={`/${page.slug}/`}>
                {page.h1}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
