import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: {
    path: string;
    changeFrequency: "weekly" | "monthly";
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  ];

  const staticEntries = routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path || "/"}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
