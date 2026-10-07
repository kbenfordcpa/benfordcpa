import Link from "next/link";

type RelatedLink = {
  href: string;
  label: string;
};

type RelatedLinksProps = {
  heading: string;
  links: readonly RelatedLink[];
};

export function RelatedLinks({ heading, links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  const headingId = heading.toLowerCase().replace(/\s+/g, "-");

  return (
    <nav
      aria-labelledby={headingId}
      className="mt-12 rounded-xl border border-navy/10 bg-white p-6 shadow-sm"
    >
      <h2 id={headingId} className="font-serif text-xl font-semibold text-navy">
        {heading}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-semibold text-navy underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
