import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { getPost, getPublishedSlugs } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: {
      absolute: `${post.title} | Benford Consulting`,
    },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  // Drafts intentionally 404 on the public site (no preview query).
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Blog
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-cream/80">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.author}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <aside className="mt-12 rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-navy">
            Work with {siteConfig.shortName}
          </h2>
          <p className="mt-2 text-charcoal/80 leading-relaxed">
            Looking for tax planning, preparation, bookkeeping, or virtual CFO
            support in the Florence–Tuscumbia / Shoals area?{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              Request a consultation
            </Link>{" "}
            or email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </aside>

        <p className="mt-8">
          <Link
            href="/blog"
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline"
          >
            ← Back to blog
          </Link>
        </p>
      </article>

      <CtaBanner />
    </>
  );
}
