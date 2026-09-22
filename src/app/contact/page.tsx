import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Benford Consulting | CPA Serving the Shoals, AL",
  },
  description:
    "Request a consultation with Benford Consulting for tax, bookkeeping, or financial guidance. Serving individuals and business owners in Florence, Tuscumbia, and the Shoals.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Benford Consulting | CPA Serving the Shoals, AL",
    description:
      "Request a consultation with Benford Consulting for tax, bookkeeping, or financial guidance. Serving Florence, Tuscumbia, and the Shoals.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Contact
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Request a consultation
          </h1>
          <p className="mt-4 max-w-2xl text-cream/85">
            Tell us about your tax, bookkeeping, virtual CFO, or broader
            financial guidance needs. {siteConfig.shortName} serves individuals
            and business owners in Florence, Tuscumbia, Muscle Shoals, and across
            the Shoals of Alabama.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
        <aside className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-navy">
              Reach us directly
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-navy">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-charcoal underline-offset-2 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Service area</dt>
                <dd className="mt-1 text-charcoal/80">
                  {siteConfig.serviceArea.label}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Firm</dt>
                <dd className="mt-1 text-charcoal/80">{siteConfig.name}</dd>
              </div>
            </dl>
            {/* Phone and street address intentionally omitted — not on live site */}
          </div>

          <div className="rounded-xl border border-navy/10 bg-cream-dark/40 p-6">
            <h2 className="font-serif text-lg font-semibold text-navy">
              What to expect
            </h2>
            <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              Share whether you’re interested in{" "}
              <Link
                href="/services"
                className="font-medium text-navy underline-offset-2 hover:underline"
              >
                tax, bookkeeping, virtual CFO, systems, or AI support
              </Link>
              . We’ll use that context to shape the conversation — no
              bookkeeping-only assumption.
            </p>
            <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">
              Prefer to know who you’re working with first? Read{" "}
              <Link
                href="/about"
                className="font-medium text-navy underline-offset-2 hover:underline"
              >
                About Kolby Benford, CPA
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
