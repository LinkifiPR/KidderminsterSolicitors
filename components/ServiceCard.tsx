import Link from "next/link";
import Image from "next/image";
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
  "Divorce and Separation": Users,
  Wills: FileSignature,
  "Lasting Power of Attorney": FileSignature,
  "Child Law": HeartHandshake,
  "Contested Probate": Landmark,
  "Will Disputes": ScrollText,
  "Elderly Care": HeartHandshake,
  Employment: ShieldCheck,
  "Personal Injury": ScrollText,
  "Commercial Law": BriefcaseBusiness,
  "Landlord Tenant": KeyRound,
  Solicitors: Landmark,
};

const fallbackServiceImage =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80";

const imageMap: Record<string, string> = {
  Conveyancing:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
  Probate:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  "Family Law":
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
  Divorce:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  "Divorce and Separation":
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
  Wills:
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
  "Lasting Power of Attorney":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  "Child Law":
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
  "Contested Probate":
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
  "Will Disputes":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  "Elderly Care":
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
  Employment:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "Personal Injury":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  "Commercial Law":
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
  "Landlord Tenant":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  Solicitors:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
};

export function ServiceCard({ service }: { service: ServicePage }) {
  const Icon = iconMap[service.category] || ScrollText;
  const imageSrc = imageMap[service.category] || fallbackServiceImage;

  return (
    <Link
      href={`/${service.slug}/`}
      className="group overflow-hidden rounded-[1.5rem] border border-[rgba(216,226,234,0.9)] bg-white shadow-[0_18px_55px_rgba(7,24,39,0.08)] transition duration-200 hover:-translate-y-1.5 hover:border-[rgba(23,92,142,0.34)] hover:shadow-[0_26px_80px_rgba(7,24,39,0.12)]"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${service.category} solicitor service in Kidderminster`}
          fill
          sizes="(min-width: 1280px) 302px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,24,39,0.03),rgba(7,24,39,0.22))]" />
      </div>
      <div className="relative z-10 bg-white p-6 pt-0">
        <span className="relative z-20 -mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-[var(--pale-blue)] text-[var(--mid-blue)] shadow-[0_12px_30px_rgba(7,24,39,0.12)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-extrabold text-[var(--navy)]">
          {service.category}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          {service.summary}
        </p>
        <span className="mt-6 inline-flex items-center text-sm font-extrabold text-[var(--trust-blue)]">
          Compare options
          <span
            className="ml-2 transition group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
