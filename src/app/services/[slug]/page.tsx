import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { getServiceBySlug, services, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

  const title = `${service.title} | CPA in the Shoals, AL | Benford Consulting`;
  const description = `${service.summary} Serving the Shoals area.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

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
        body={`Request a consultation with ${siteConfig.shortName}. Serving individuals and business owners across the Shoals area.`}
      />
    </>
  );
}
