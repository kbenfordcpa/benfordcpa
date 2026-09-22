import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Benford Consulting, LLC",
  description:
    "How Benford Consulting, LLC collects and uses information on www.benfordcpa.com — contact forms, Google Analytics, Microsoft Clarity, cookies, and your choices.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Benford Consulting, LLC",
    description:
      "How Benford Consulting collects and uses website information, analytics, and cookies.",
    url: "/privacy",
  },
};

const linkClass =
  "font-medium text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-cream/85">
            {siteConfig.name} — last updated September 22, 2026
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="leading-relaxed text-charcoal/85">
          Benford Consulting, LLC (“we,” “us”) respects your privacy. This page
          explains what information we collect through our website at{" "}
          <a href="https://www.benfordcpa.com" className={linkClass}>
            www.benfordcpa.com
          </a>
          , how we use it, and your choices.
        </p>

        <section className="mt-12" aria-labelledby="information-you-provide">
          <h2
            id="information-you-provide"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Information you provide
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            If you contact us (for example through our contact form or by
            email), we collect the details you choose to send — such as your
            name, email address, and message. We use that information only to
            respond to your inquiry and to provide CPA and related services you
            request. We do not sell your personal information.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="website-analytics">
          <h2
            id="website-analytics"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Website analytics
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            We use Google Analytics 4 to understand how visitors use our site
            (for example, which pages are viewed and how people find us). Google
            may collect technical information such as your IP address (we
            request IP anonymization where available), browser type, device
            type, and pages visited. You can learn more in{" "}
            <a
              href="https://policies.google.com/privacy"
              className={linkClass}
              rel="noopener noreferrer"
              target="_blank"
            >
              Google’s privacy policy
            </a>{" "}
            and manage ads/analytics preferences through Google’s tools where
            available.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="session-replay">
          <h2
            id="session-replay"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Session replay (Microsoft Clarity)
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            We use Microsoft Clarity to improve the website experience. Clarity
            may record anonymized or masked session activity on our site — such
            as mouse movements, clicks, and scrolling — so we can see how pages
            work in practice. Clarity can also collect technical information
            similar to other analytics tools. Session recordings are used to fix
            usability issues and improve content; they are not used to collect
            your CPA client file or tax data through this website. Learn more in{" "}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              className={linkClass}
              rel="noopener noreferrer"
              target="_blank"
            >
              Microsoft’s privacy statement
            </a>{" "}
            and Clarity’s documentation.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="cookies">
          <h2
            id="cookies"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Cookies and similar technologies
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            Analytics and Clarity tools may use cookies or similar technologies.
            You can control cookies through your browser settings. Blocking some
            cookies may affect how the site works or how we measure visits.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="retention">
          <h2
            id="retention"
            className="font-serif text-2xl font-semibold text-navy"
          >
            How long we keep information
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            Contact messages are kept as long as needed to respond and for
            ordinary business or legal records. Analytics and Clarity data are
            retained according to those providers’ settings and our business
            needs.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="third-party-links">
          <h2
            id="third-party-links"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Third-party links
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            Our site may link to other websites. Their privacy practices are
            their own; this policy applies only to benfordcpa.com.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="children">
          <h2
            id="children"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Children
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            This website is not directed at children under 13, and we do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="contact">
          <h2
            id="contact"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Contact
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            Questions about this policy or your information:
          </p>
          <p className="mt-2 leading-relaxed text-charcoal/85">
            Email:{" "}
            <a href={`mailto:${siteConfig.email}`} className={linkClass}>
              {siteConfig.email}
            </a>
          </p>
        </section>

        <section className="mt-12" aria-labelledby="changes">
          <h2
            id="changes"
            className="font-serif text-2xl font-semibold text-navy"
          >
            Changes
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            We may update this policy from time to time. The “Last updated” date
            at the top will change when we do.
          </p>
        </section>
      </article>
    </>
  );
}
