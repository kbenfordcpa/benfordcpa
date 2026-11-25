import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqSection } from "@/components/FaqSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";
import { getPostsForService } from "@/lib/blog";
import { openGraphWithDefault } from "@/lib/og";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/schema";
import { getServiceBySlug, services, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ExtraBullet = {
  label?: string;
  text: string;
};

type ExtraSection = {
  heading: string;
  intro?: string;
  bullets?: readonly ExtraBullet[];
  closing?: string;
};

function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service not found" };
  }

  const title =
    ("seoTitle" in service && service.seoTitle) ||
    `${service.title} | CPA in Florence, AL | Benford Consulting`;
  const description =
    ("seoDescription" in service && service.seoDescription) ||
    `${service.summary} Serving Florence, Alabama.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: openGraphWithDefault({
      title,
      description,
      url: `/services/${service.slug}`,
    }),
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const extraSections =
    "extraSections" in service
      ? (service.extraSections as readonly ExtraSection[])
      : [];
  const serviceFaqs =
    "faqs" in service
      ? (service.faqs as readonly { question: string; answer: string }[])
      : [];
  const relatedServiceLinks =
    "relatedServiceLinks" in service
      ? (service.relatedServiceLinks as readonly {
          href: string;
          label: string;
        }[])
      : [];
  const relatedReading =
    "relatedReading" in service
      ? (service.relatedReading as readonly { href: string; label: string }[])
      : getPostsForService(service.slug).map((post) => ({
          href: `/blog/${post.slug}`,
          label: post.title,
        }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceJsonLd(service)} />
      {serviceFaqs.length > 0 ? <JsonLd data={faqPageJsonLd(serviceFaqs)} /> : null}

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Services · {siteConfig.serviceArea.label}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-2 text-sm font-medium text-gold">{service.subtitle}</p>
          <p className="mt-4 max-w-2xl text-cream/85 leading-relaxed">
            {service.summary}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        {"detailParagraph" in service && service.detailParagraph && (
          <p className="text-lg text-charcoal/85 leading-relaxed">
            {service.detailParagraph}
          </p>
        )}

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-cream p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy">
              What it is
            </dt>
            <dd className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              {service.whatItIs}
            </dd>
          </div>
          <div className="rounded-lg bg-cream p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy">
              Who it’s for
            </dt>
            <dd className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              {service.whoItsFor}
            </dd>
          </div>
          <div className="rounded-lg bg-cream p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy">
              Outcome
            </dt>
            <dd className="mt-2 text-sm text-charcoal/80 leading-relaxed">
              {service.outcome}
            </dd>
          </div>
        </dl>

        {"howItWorks" in service && service.howItWorks && (
          <section className="mt-12" aria-labelledby="how-it-works">
            <h2
              id="how-it-works"
              className="font-serif text-2xl font-semibold text-navy"
            >
              How it works
            </h2>
            <ol className="mt-6 space-y-4">
              {service.howItWorks.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-lg border border-navy/10 bg-white p-4 shadow-sm"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-sm font-semibold text-cream"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <p className="text-charcoal/85 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {extraSections.map((section) => {
          const id = headingId(section.heading);
          const bullets = section.bullets ?? [];
          return (
            <section key={section.heading} className="mt-12" aria-labelledby={id}>
              <h2 id={id} className="font-serif text-2xl font-semibold text-navy">
                {section.heading}
              </h2>
              {section.intro ? (
                <p className="mt-4 text-charcoal/85 leading-relaxed">
                  {section.intro}
                </p>
              ) : null}
              {bullets.length > 0 ? (
                <ul className="mt-6 list-disc space-y-3 pl-5 text-charcoal/85 leading-relaxed">
                  {bullets.map((bullet) => (
                    <li key={bullet.label ? `${bullet.label}:${bullet.text}` : bullet.text}>
                      {bullet.label ? (
                        <>
                          <strong className="font-semibold text-navy">
                            {bullet.label}:
                          </strong>{" "}
                          {bullet.text}
                        </>
                      ) : (
                        bullet.text
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.closing ? (
                <p className="mt-6 text-charcoal/85 leading-relaxed">
                  {section.closing}
                </p>
              ) : null}
            </section>
          );
        })}

        {serviceFaqs.length > 0 ? (
          <FaqSection
            title="Common questions"
            intro={null}
            items={serviceFaqs}
            embedded
          />
        ) : null}

        <RelatedLinks heading="Related services" links={relatedServiceLinks} />
        <RelatedLinks heading="Related reading" links={relatedReading} />

        <p className="mt-12">
          <Link
            href="/services"
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            ← Back to all services
          </Link>
        </p>
      </article>

      <CtaBanner
        title={`Interested in ${service.title}?`}
        body={`Request a consultation with ${siteConfig.shortName}. Serving individuals and business owners in Florence, Alabama.`}
      />
    </>
  );
}
