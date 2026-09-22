import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "About Kolby Benford, CPA | the Shoals, AL",
  },
  description:
    "Meet Kolby Benford, licensed Alabama CPA — Air Force veteran, public accounting background, and Controller in the Shoals area. Stewardship-minded guidance for your finances.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Kolby Benford, CPA | the Shoals, AL",
    description:
      "Meet Kolby Benford, licensed Alabama CPA — Air Force veteran, public accounting background, and Controller in the Shoals area.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            About
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            About Kolby Benford, CPA
          </h1>
          <p className="mt-4 max-w-2xl text-cream/85">
            Founder of {siteConfig.name} — licensed Alabama CPA serving the
            Shoals area with stewardship-minded financial guidance.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <section aria-labelledby="conviction">
          <h2
            id="conviction"
            className="font-serif text-2xl font-semibold text-navy"
          >
            A conviction about stewardship
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            Kolby founded Benford Consulting out of a simple conviction: the
            abilities we’re given are meant to be used well. Being a good steward
            — of finances, of time, of the gifts God has given each of us — has
            become central not just to his career, but to how he tries to live
            day to day. He believes we all have a purpose, and Benford Consulting
            exists to help others steward what they’ve been given so they can
            pursue theirs.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="expertise">
          <h2
            id="expertise"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Credentials &amp; experience
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-charcoal/85 leading-relaxed">
            <li>
              <strong>Licensed CPA in Alabama</strong>, earning certification in
              2022.
            </li>
            <li>
              <strong>Five years in public accounting</strong> at a small firm —
              individual and corporate taxation, payroll tax and reporting, and
              monthly, quarterly, and annual bookkeeping — with{" "}
              <strong>real estate taxation</strong> as a particular focus.
            </li>
            <li>
              In <strong>2024</strong>, transitioned into industry as{" "}
              <strong>Controller</strong> for an insurance agency in the Shoals
              area, leading the accounting department and overseeing financial
              reporting across multiple entities.
            </li>
          </ul>
          <p className="mt-4 text-charcoal/85 leading-relaxed">
            That mix of public accounting depth and controller-level leadership
            informs how Benford Consulting delivers{" "}
            <Link
              href="/services"
              className="font-medium text-navy underline-offset-2 hover:underline"
            >
              tax, bookkeeping, and virtual CFO services
            </Link>{" "}
            for local individuals and business owners.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="service">
          <h2
            id="service"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Service &amp; integrity
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            Before his accounting career, Kolby served in the United States Air
            Force and attended the United States Air Force Academy in Colorado.
            The Air Force’s core values — integrity first, service before self,
            and excellence in all we do — became more than words he learned
            there; they’re principles he’s carried into his work every day since.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="community">
          <h2
            id="community"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Life in the Shoals
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            Kolby lives in the Shoals area with his wife, Leann, and their
            son, Thomas. They’re active members of Spring Valley Church of God.
            Outside of work, Kolby enjoys spending time with his family, camping,
            and woodworking.
          </p>
        </section>

        <aside className="mt-12 rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-navy">
            Work with Kolby
          </h2>
          <p className="mt-2 text-charcoal/80">
            Looking for a CPA in the Shoals who brings
            both technical skill and a stewardship mindset?{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              Request a consultation
            </Link>{" "}
            or explore{" "}
            <Link
              href="/services"
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              services
            </Link>
            .
          </p>
        </aside>
      </article>

      <CtaBanner
        title="Let’s talk about your next step"
        body="Share what you need — tax planning, preparation, bookkeeping, virtual CFO, or systems help — and we’ll start from there."
      />
    </>
  );
}
