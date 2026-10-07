import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { services, type Service } from "@/lib/site";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const serviceSlugs = new Set<string>(services.map((service) => service.slug));

export type ServiceSlug = Service["slug"];

export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  draft: boolean;
  /**
   * Service slugs this post discusses. Tag future posts in front matter:
   * `relatedServices: [tax-planning, bookkeeping]`.
   * Service pages list posts that include their slug.
   */
  relatedServices: ServiceSlug[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
  contentHtml: string;
};

function ensureBlogDir(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"));
}

function parseFile(filename: string): BlogPost {
  const fullPath = path.join(BLOG_DIR, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const slugFromFile = filename.replace(/\.md$/, "");

  const slug =
    typeof data.slug === "string" && data.slug.length > 0
      ? data.slug
      : slugFromFile;

  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? ""),
    slug,
    draft: Boolean(data.draft),
    relatedServices: parseRelatedServices(data.relatedServices, slug),
    content,
    contentHtml: "",
  };
}

function parseRelatedServices(value: unknown, slug: string): ServiceSlug[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(
      `Blog post "${slug}": relatedServices must be a YAML list of service slugs.`,
    );
  }

  const seen = new Set<string>();
  const slugs: ServiceSlug[] = [];

  for (const item of value) {
    if (typeof item !== "string" || item.length === 0) {
      throw new Error(
        `Blog post "${slug}": relatedServices entries must be service slug strings.`,
      );
    }
    if (!serviceSlugs.has(item)) {
      throw new Error(
        `Blog post "${slug}": unknown relatedServices slug "${item}".`,
      );
    }
    if (seen.has(item)) continue;
    seen.add(item);
    slugs.push(item as ServiceSlug);
  }

  return slugs;
}

async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * All posts sorted by date descending.
 * By default excludes drafts (for public lists / sitemap).
 */
export function getAllPosts(options?: {
  includeDrafts?: boolean;
}): BlogPostMeta[] {
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = ensureBlogDir()
    .map(parseFile)
    .filter((post) => includeDrafts || !post.draft)
    .map(({ content: _c, contentHtml: _h, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

/**
 * Single post by slug. Returns null if missing.
 * Draft posts are returned only when includeDrafts is true
 * (public routes should leave that false so drafts 404).
 */
export async function getPost(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<BlogPost | null> {
  const includeDrafts = options?.includeDrafts ?? false;
  const files = ensureBlogDir();

  for (const filename of files) {
    const post = parseFile(filename);
    if (post.slug !== slug) continue;
    if (post.draft && !includeDrafts) return null;
    const contentHtml = await renderMarkdown(post.content);
    return { ...post, contentHtml };
  }

  return null;
}

export function getPublishedSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Published posts that list this service, newest first. */
export function getPostsForService(serviceSlug: string): BlogPostMeta[] {
  return getAllPosts().filter((post) =>
    post.relatedServices.includes(serviceSlug as ServiceSlug),
  );
}
