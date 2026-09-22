import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Blog | Benford Consulting CPA — Shoals, AL",
  },
  description:
    "Practical tax, bookkeeping, and stewardship insights for small businesses and individuals in Florence, Tuscumbia, Muscle Shoals, and the Shoals area.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Benford Consulting CPA — Shoals, AL",
    description:
      "Practical tax, bookkeeping, and stewardship insights for Florence–Tuscumbia / Shoals small businesses and individuals.",
    url: "/blog",
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

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Insights for Shoals stewards
          </h1>
          <p className="mt-4 max-w-2xl text-cream/85">
            Practical notes on tax, bookkeeping, and financial clarity for
            individuals and business owners in Florence, Tuscumbia, Muscle
            Shoals, and across the Shoals — from {siteConfig.shortName}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-navy/10 bg-white p-8 text-center shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Articles coming soon
            </h2>
            <p className="mt-3 text-charcoal/80 leading-relaxed">
              We are preparing practical guidance for Shoals small businesses and
              individuals. In the meantime, explore{" "}
              <Link
                href="/services"
                className="font-semibold text-navy underline-offset-2 hover:underline"
              >
                services
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="font-semibold text-navy underline-offset-2 hover:underline"
              >
                request a consultation
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
                  <time
                    dateTime={post.date}
                    className="text-sm font-medium text-gold-dark"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-navy-800 underline-offset-2 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-charcoal/85 leading-relaxed">
                    {post.description}
                  </p>
                  <p className="mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-navy underline-offset-2 hover:underline"
                    >
                      Read article →
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CtaBanner
        title="Questions about your books or taxes?"
        body="Whether you need tax planning, preparation, bookkeeping, or a clearer system — request a consultation with Benford Consulting."
      />
    </>
  );
}
