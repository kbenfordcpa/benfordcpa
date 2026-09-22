import Link from "next/link";

type ServiceCardProps = {
  title: string;
  subtitle?: string;
  summary: string;
  href?: string;
  showDetailsLink?: boolean;
};

export function ServiceCard({
  title,
  subtitle,
  summary,
  href = "/services",
  showDetailsLink = true,
}: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-serif text-xl font-semibold text-navy">{title}</h3>
      {subtitle && (
        <p className="mt-1 text-sm font-medium text-gold-dark">{subtitle}</p>
      )}
      <p className="mt-3 flex-1 text-charcoal/80 leading-relaxed">{summary}</p>
      {showDetailsLink && (
        <Link
          href={href}
          className="mt-4 text-sm font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Learn more about {title}
        </Link>
      )}
    </article>
  );
}
