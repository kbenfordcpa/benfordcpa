import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-navy-800/10 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-cream/80">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-cream/70">
            Serving {siteConfig.serviceArea.label}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-cream/90 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="text-cream/70">
              Florence, Tuscumbia, Muscle Shoals &amp; the Shoals, AL
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-cream/90 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Home
              </Link>
            </li>
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/90 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-cream/90 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/60 sm:px-6 lg:px-8">
        © {year} {siteConfig.name}. All rights reserved.
        {" · "}
        <Link
          href="/privacy"
          className="text-cream/60 underline-offset-2 hover:text-cream/90 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
