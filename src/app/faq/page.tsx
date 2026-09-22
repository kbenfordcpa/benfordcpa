import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "FAQ | Benford Consulting CPA — the Shoals, AL",
  },
  description:
    "Answers about tax planning, bookkeeping, virtual CFO services, CPA credentials, and consultations with Benford Consulting in the Shoals, Alabama.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Benford Consulting CPA — the Shoals, AL",
    description:
      "Answers about tax planning, bookkeeping, virtual CFO services, CPA credentials, and consultations in the Shoals, Alabama.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            FAQ
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 max-w-2xl text-cream/85">
            Plain-language answers for individuals and business owners
            considering a CPA in the Shoals area — from {siteConfig.shortName}.
          </p>
        </div>
      </section>

      <FaqSection
        title="Common questions"
        intro="Written so people and AI systems can cite them accurately. Looking for service details? Explore our services hub."
      />

      <section className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
        <p className="rounded-lg border border-navy/10 bg-cream-dark/40 p-5 text-charcoal/85">
          Still have a question?{" "}
          <Link
            href="/contact"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            Request a consultation
          </Link>{" "}
          or browse{" "}
          <Link
            href="/services"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            services
          </Link>
          .
        </p>
      </section>

      <CtaBanner />
    </>
  );
}
