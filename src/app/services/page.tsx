import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { breadcrumbJsonLd } from "@/lib/schema";
import { scriptureQuote, services, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Tax, Bookkeeping & Virtual CFO | Benford Consulting CPA",
  },
  description:
    "Tax planning (including real estate), tax prep, bookkeeping, accounting setup, virtual CFO, and practical AI tools — for individuals and businesses in the Shoals, AL area.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Tax, Bookkeeping & Virtual CFO | Benford Consulting CPA",
    description:
      "Tax planning (including real estate), tax prep, bookkeeping, accounting setup, virtual CFO, and practical AI tools — for individuals and businesses in the Shoals, AL area.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Services
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Financial services rooted in stewardship
          </h1>
          <p className="mt-4 max-w-2xl text-cream/85">
            Six focused services to help individuals and business owners in
            Florence, Tuscumbia, Muscle Shoals, and across the Shoals manage
            their finances with wisdom, clarity, and integrity — from everyday
            tax needs to strategic financial leadership.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <blockquote className="border-l-4 border-gold pl-5 font-serif text-xl italic text-navy/90">
          “{scriptureQuote.text}”
          <footer className="mt-2 text-sm not-italic text-charcoal/70">
            — {scriptureQuote.citation}
          </footer>
        </blockquote>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              subtitle={service.subtitle}
              summary={service.summary}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="rounded-lg border border-navy/10 bg-cream-dark/40 p-5 text-charcoal/85">
          Curious who leads this work? Meet{" "}
          <Link
            href="/about"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            Kolby Benford, CPA
          </Link>
          , read the{" "}
          <Link
            href="/faq"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            FAQ
          </Link>
          , or{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            request a consultation
          </Link>{" "}
          with {siteConfig.shortName}.
        </p>
      </section>

      <CtaBanner
        title="Request a consultation"
        body="Tell us whether you need tax planning or prep, bookkeeping, virtual CFO support, system setup, or AI help for finance workflows — not bookkeeping-only. We’ll start from your goals."
      />
    </>
  );
}
