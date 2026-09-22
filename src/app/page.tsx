import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { faqPageJsonLd } from "@/lib/schema";
import { scriptureQuote, services, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "CPA in Florence & Tuscumbia, AL | Benford Consulting",
  },
  description:
    "Alabama CPA helping individuals and business owners with tax, bookkeeping, and financial guidance across the Florence–Tuscumbia / Shoals area. Faithful stewardship. Sound advice.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CPA in Florence & Tuscumbia, AL | Benford Consulting",
    description:
      "Alabama CPA helping individuals and business owners with tax, bookkeeping, and financial guidance across the Florence–Tuscumbia / Shoals area.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />

      <section className="relative overflow-hidden bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Alabama CPA · Florence–Tuscumbia / Shoals
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85 leading-relaxed">
            {siteConfig.description} Benford Consulting is a licensed CPA
            practice helping individuals and business owners across{" "}
            <strong className="font-semibold text-cream">
              Florence, Tuscumbia, Muscle Shoals, and the Shoals of Alabama
            </strong>{" "}
            with tax, bookkeeping, and sound financial guidance.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Request a Consultation
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-cream/40 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-b border-navy/10 bg-cream-dark/50"
        aria-labelledby="who-what-where"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 id="who-what-where" className="font-serif text-lg font-semibold text-navy">
              Who we are
            </h2>
            <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              <Link href="/about" className="font-medium text-navy underline-offset-2 hover:underline">
                Kolby Benford, CPA
              </Link>{" "}
              — licensed in Alabama — founded {siteConfig.shortName} on a
              stewardship conviction: manage what you’ve been given with wisdom
              and integrity.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-navy">
              What we do
            </h2>
            <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              Tax planning (including real estate), tax preparation, bookkeeping,
              accounting setup, virtual CFO, and practical AI for finance
              workflows — see{" "}
              <Link href="/services" className="font-medium text-navy underline-offset-2 hover:underline">
                all services
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-navy">
              Who we serve
            </h2>
            <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              Individuals and business owners in Florence, Tuscumbia, Muscle
              Shoals, and the wider Shoals area —{" "}
              <Link href="/contact" className="font-medium text-navy underline-offset-2 hover:underline">
                reach out
              </Link>{" "}
              to start a conversation.
            </p>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="services-preview"
      >
        <div className="max-w-2xl">
          <h2
            id="services-preview"
            className="font-serif text-3xl font-semibold text-navy sm:text-4xl"
          >
            Financial services rooted in stewardship
          </h2>
          <p className="mt-3 text-charcoal/80">
            Six focused offerings — from everyday tax needs to strategic
            financial leadership — for clients across the Shoals, Alabama.
          </p>
        </div>
        <blockquote className="mt-8 border-l-4 border-gold pl-5 font-serif text-lg italic text-navy/90">
          “{scriptureQuote.text}”
          <footer className="mt-2 text-sm not-italic text-charcoal/70">
            — {scriptureQuote.citation}
          </footer>
        </blockquote>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              subtitle={service.subtitle}
              summary={service.summary}
              href={`/services#${service.slug}`}
            />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/services"
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Explore full service descriptions →
          </Link>
        </p>
      </section>

      <FaqSection />

      <CtaBanner />
    </>
  );
}
