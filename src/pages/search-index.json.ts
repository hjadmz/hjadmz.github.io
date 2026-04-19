import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { tagSlug } from "../lib/tag";

/**
 * Static search index — generated at build time.
 * Consumed by the CommandPalette React island.
 *
 * Keep this flat and small: title, url, type, year/date, tags.
 * Do NOT inline full post bodies — we fuzzy-match on metadata, not content,
 * so the index stays under a few KB even at 300+ entries.
 *
 * Sections:
 *   - "work": case studies.
 *   - "log":  engineering-log posts.
 *   - "tag":  one row per unique tag (pointing at /tag/<slug>). Typing
 *             "accessibility" in ⌘K now surfaces the tag archive AS WELL
 *             AS the posts that carry that tag — the user gets a
 *             scent-trail to the rollup page, not just individual entries.
 *   - "page": static pages (about, contact, spec, etc.).
 */
export const GET: APIRoute = async () => {
  const [blog, work] = await Promise.all([
    getCollection("blog", ({ data }) => !data.draft),
    getCollection("work", ({ data }) => !data.draft),
  ]);

  const logEntries = blog
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) => ({
      type: "log" as const,
      title: post.data.title,
      url: `/log/${post.id}`,
      description: post.data.description ?? "",
      date: post.data.date,
      tags: post.data.tags ?? [],
    }));

  const workEntries = work
    .sort((a, b) => Number(b.data.year) - Number(a.data.year))
    .map((entry) => ({
      type: "work" as const,
      title: entry.data.title,
      url: `/work/${entry.id}`,
      description: entry.data.description ?? "",
      date: entry.data.year,
      tags: [...(entry.data.tags ?? []), entry.data.type],
    }));

  // Tag rollups — every unique tag becomes a searchable entry pointing at
  // /tag/<slug>. Sorted by frequency so the most-referenced tags surface
  // first in the default (empty-query) view of the palette.
  const tagMap = new Map<string, { label: string; count: number }>();
  for (const post of blog) {
    for (const tag of post.data.tags ?? []) {
      const slug = tagSlug(tag);
      const bucket = tagMap.get(slug) ?? { label: tag, count: 0 };
      bucket.count += 1;
      tagMap.set(slug, bucket);
    }
  }
  for (const entry of work) {
    for (const tag of entry.data.tags ?? []) {
      const slug = tagSlug(tag);
      const bucket = tagMap.get(slug) ?? { label: tag, count: 0 };
      bucket.count += 1;
      tagMap.set(slug, bucket);
    }
  }
  const tagEntries = Array.from(tagMap.entries())
    .sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label))
    .map(([slug, { label, count }]) => ({
      type: "tag" as const,
      title: `#${label}`,
      url: `/tag/${slug}`,
      description: `${count} ${count === 1 ? "entry" : "entries"}`,
      date: "",
      tags: [label],
    }));

  const pages = [
    { type: "page" as const, title: "Home", url: "/", description: "", date: "", tags: [] },
    { type: "page" as const, title: "Log", url: "/log", description: "Engineering log + design notes.", date: "", tags: [] },
    { type: "page" as const, title: "Work", url: "/work", description: "Shipped projects.", date: "", tags: [] },
    { type: "page" as const, title: "About", url: "/about", description: "Who I am and how I work.", date: "", tags: [] },
    { type: "page" as const, title: "Contact", url: "/contact", description: "How to reach hjadmz.", date: "", tags: [] },
    { type: "page" as const, title: "Tags", url: "/tag", description: "All tags across the archive.", date: "", tags: [] },
    { type: "page" as const, title: "Spec", url: "/spec", description: "System specification.", date: "", tags: [] },
  ];

  return new Response(
    JSON.stringify({
      generated: new Date().toISOString(),
      items: [...pages, ...workEntries, ...logEntries, ...tagEntries],
    }),
    {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
};
