import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { ServiceCard } from "@/components/ServiceCard";
import { getAllPosts } from "@/lib/blog";
import { faqs, scriptureQuote, services, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "CPA in the Shoals, AL | Benford Consulting",
  },
  description:
    "Alabama CPA helping individuals and business owners with tax, bookkeeping, and financial guidance across the Shoals area. Faithful stewardship. Sound advice.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CPA in the Shoals, AL | Benford Consulting",
    description:
      "Alabama CPA helping individuals and business owners with tax, bookkeeping, and financial guidance across the Shoals area.",
    url: "/",
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
}

const howItWorksSteps = [
  {
    title: "Reach out",
    body: "Share what you need — tax, books, virtual CFO, or systems — via the contact form or email.",
  },
  {
    title: "Clarify goals",
    body: "A consultation focused on your situation in the Shoals area.",
  },
  {
    title: "Move forward",
    body: "Practical next steps grounded in stewardship — clear advice you can act on.",
  },
] as const;

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 2);
  const faqTeasers = faqs.slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Alabama CPA · the Shoals
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85 leading-relaxed">
            {siteConfig.description} Benford Consulting is a licensed CPA
            practice helping individuals and business owners across{" "}
            <strong className="font-semibold text-cream">
              the Shoals area of Alabama
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
            <h2
              id="who-what-where"
              className="font-serif text-lg font-semibold text-navy"
            >
              Who we are
            </h2>
            <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              <Link
                href="/about"
                className="font-medium text-navy underline-offset-2 hover:underline"
              >
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
              <Link
                href="/services"
                className="font-medium text-navy underline-offset-2 hover:underline"
              >
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
              Individuals and business owners in the Shoals area —{" "}
              <Link
                href="/contact"
                className="font-medium text-navy underline-offset-2 hover:underline"
              >
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
              href={`/services/${service.slug}`}
            />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/services"
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Explore all services →
          </Link>
        </p>
      </section>

      <section
        className="border-y border-navy/10 bg-cream-dark/40"
        aria-labelledby="trust-line"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p
            id="trust-line"
            className="text-center text-sm text-charcoal/80 leading-relaxed"
          >
            Led by{" "}
            <Link
              href="/about"
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              {siteConfig.founder.name}, {siteConfig.founder.jobTitle}
            </Link>
            {" — "}
            {siteConfig.founder.credentials}. Serving{" "}
            {siteConfig.serviceArea.label}.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="how-it-works-home"
      >
        <h2
          id="how-it-works-home"
          className="font-serif text-3xl font-semibold text-navy sm:text-4xl"
        >
          How it works
        </h2>
        <p className="mt-3 max-w-2xl text-charcoal/80">
          A simple path from first conversation to clear next steps.
        </p>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-serif text-sm font-semibold text-cream"
                aria-hidden
              >
                {index + 1}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {latestPosts.length > 0 && (
        <section
          className="border-t border-navy/10 bg-cream-dark/30"
          aria-labelledby="latest-from-blog"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="latest-from-blog"
                className="font-serif text-3xl font-semibold text-navy sm:text-4xl"
              >
                From the blog
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-navy underline-offset-2 hover:underline"
              >
                View all articles →
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <article className="h-full rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
                    <time
                      dateTime={post.date}
                      className="text-sm font-medium text-gold-dark"
                    >
                      {formatDate(post.date)}
                    </time>
                    <h3 className="mt-2 font-serif text-xl font-semibold text-navy">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">
                      {post.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="faq-teasers"
      >
        <h2
          id="faq-teasers"
          className="font-serif text-3xl font-semibold text-navy sm:text-4xl"
        >
          Quick answers
        </h2>
        <p className="mt-3 text-charcoal/80">
          A couple of frequently asked questions — see the full{" "}
          <Link
            href="/faq"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            FAQ
          </Link>{" "}
          for more.
        </p>
        <dl className="mt-8 space-y-4">
          {faqTeasers.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm"
            >
              <dt className="font-serif text-lg font-semibold text-navy">
                {faq.question}
              </dt>
              <dd className="mt-2 text-sm text-charcoal/85 leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6">
          <Link
            href="/faq"
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Read all FAQs →
          </Link>
        </p>
      </section>

      <CtaBanner />
    </>
  );
}
