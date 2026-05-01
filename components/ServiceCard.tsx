import Link from "next/link";
import {
  BriefcaseBusiness,
  FileSignature,
  HeartHandshake,
  Home,
  KeyRound,
  Landmark,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServicePage } from "../lib/site";

const iconMap: Record<string, LucideIcon> = {
  Conveyancing: Home,
  Probate: Landmark,
  "Family Law": HeartHandshake,
  Divorce: Users,
  Wills: FileSignature,
  Employment: ShieldCheck,
  "Personal Injury": ScrollText,
  Commercial: BriefcaseBusiness,
  "Landlord Tenant": KeyRound,
};

export function ServiceCard({ service }: { service: ServicePage }) {
  const Icon = iconMap[service.category] || ScrollText;

  return (
    <Link
      href={`/${service.slug}/`}
      className="group rounded-[1.5rem] border border-[var(--line)] bg-white p-6 shadow-[0_22px_70px_rgba(7,24,39,0.08)] transition hover:-translate-y-1 hover:border-[var(--gold)]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--navy)] text-[var(--gold)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-6 text-xl font-semibold text-[var(--navy)]">
        {service.category}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        {service.summary}
      </p>
      <span className="mt-6 inline-flex text-sm font-semibold text-[var(--navy)]">
        Compare options
        <span
          className="ml-2 transition group-hover:translate-x-1"
          aria-hidden="true"
        >
          -&gt;
        </span>
      </span>
    </Link>
  );
}
