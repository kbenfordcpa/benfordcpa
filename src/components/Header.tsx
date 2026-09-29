"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ClientPortalLink } from "@/components/ClientPortalLink";
import { siteConfig } from "@/lib/site";

const clientPortalButtonClassName =
  "whitespace-nowrap rounded-md bg-gold text-center font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-800/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Benford Consulting"
            width={200}
            height={54}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <ClientPortalLink
          className={`${clientPortalButtonClassName} inline-flex shrink-0 items-center justify-center px-3 py-2 text-sm sm:px-4`}
        />

        <nav
          className="ml-auto hidden items-center gap-6 lg:flex"
          aria-label="Primary"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Request Consultation
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex shrink-0 items-center justify-center rounded-md p-2 text-navy lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-navy-800/10 bg-cream px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-2 py-2 text-base font-medium text-charcoal hover:bg-cream-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ClientPortalLink
                className={`mt-1 block w-full px-4 py-2.5 text-sm ${clientPortalButtonClassName}`}
                onClick={() => setOpen(false)}
              />
            </li>
            <li>
              <Link
                href="/contact"
                className="block rounded-md bg-navy px-4 py-2.5 text-center text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                onClick={() => setOpen(false)}
              >
                Request Consultation
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
