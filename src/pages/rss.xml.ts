import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

/**
 * RSS 2.0 feed for /log.
 * Generated at build time, zero runtime cost.
 *
 * Why not @astrojs/rss? The package adds a dependency and a layer of
 * abstraction for something that's ~40 lines of string templating.
 * Minimum viable dependency surface per the FCA protocol.
 */

const SITE = "https://hjadmz.com";
const TITLE = "hjadmz";
const DESCRIPTION =
  "Design decisions, engineering rationale, and process notes from hjadmz.";

// XML escape — blogposts can contain `&`, `<`, `>`, `'`, `"`.
const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// RSS item cap. Convention is 20–50 items per feed. At 50, a feed stays
// under ~25KB and readers (NetNewsWire, Feedly, Reeder) render it instantly.
// Older posts live on /log permanently — the feed is a "recent" stream,
// not an archive. Raise only if there's a specific reader-side reason.
const FEED_ITEM_CAP = 50;

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort(
      (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )
    .slice(0, FEED_ITEM_CAP);

  const items = posts
    .map((post) => {
      const url = `${SITE}/log/${post.id}`;
      const pubDate = new Date(post.data.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.data.description ?? "")}</description>
    </item>`;
    })
    .join("\n");

  // xml-stylesheet processing instruction — browsers apply the XSL transform
  // for a readable HTML view. Feed readers ignore it and consume RSS directly.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss-styles.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
