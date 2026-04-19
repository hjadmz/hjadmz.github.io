<?xml version="1.0" encoding="UTF-8"?>
<!--
  rss-styles.xsl — browser-side XSLT for /rss.xml

  Why:
    When a reader opens /rss.xml in a browser, the default rendering is
    either raw XML or a generic "this is a feed" message. Neither honors
    the brand voice. This stylesheet transforms the same XML feed into a
    readable HTML page, in-browser, client-side, zero extra network cost.

  Contract:
    - Valid RSS 2.0 still ships to feed readers (they ignore xml-stylesheet).
    - Browsers apply this transform and get a clean, monochrome reading view
      that matches the rest of the site (Inter + JetBrains Mono, same
      palette, same reading column).
    - All styles are inlined — no external stylesheet can fail to load.

  Palette:
    Pinned Tailwind Slate values mirror src/styles/global.css.
    prefers-color-scheme handles light/dark without JS.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <title>
          <xsl:value-of select="/rss/channel/title" /> &#8212; RSS Feed
        </title>
        <style type="text/css">
          :root {
            --bg: #F9FAFB;
            --surface: #FFFFFF;
            --text: #020617;
            --text-muted: #475569;
            --text-faint: #64748B;
            --border: #E2E8F0;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #020617;
              --surface: #0F172A;
              --text: #E2E8F0;
              --text-muted: #97A6BB;
              --text-faint: #8293A5;
              --border: #1E293B;
            }
          }
          * { box-sizing: border-box; }
          html {
            background: var(--bg);
            color: var(--text);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          body {
            margin: 0;
            padding: 2rem 1.5rem 4rem;
            max-width: 66ch;
            margin-inline: auto;
          }
          .feed-badge {
            display: inline-block;
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.6875rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--text-faint);
            opacity: 0.7;
            margin-bottom: 0.5rem;
          }
          h1 {
            font-size: 1.953rem;
            font-weight: 700;
            letter-spacing: -0.01em;
            margin: 0 0 0.5rem;
            line-height: 1.2;
          }
          .feed-desc {
            color: var(--text-muted);
            margin: 0 0 1rem;
            font-size: 1rem;
            max-width: 60ch;
          }
          .feed-hint {
            color: var(--text-faint);
            font-size: 0.8125rem;
            margin: 0 0 3rem;
            padding: 0.75rem 1rem;
            border-left: 2px solid var(--border);
            background: transparent;
          }
          .feed-hint code {
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.8125rem;
            color: var(--text);
            background: var(--surface);
            padding: 0.1rem 0.35rem;
            border-radius: 0.25rem;
          }
          .feed-home {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text);
            text-decoration: none;
            margin-bottom: 2rem;
          }
          .feed-home:hover { color: var(--text-muted); }
          .section-label {
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-faint);
            margin: 0 0 1.25rem;
          }
          ul.items {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          li.item {
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--border);
          }
          .item-meta {
            display: flex;
            gap: 0.75rem;
            align-items: baseline;
            flex-wrap: wrap;
            margin-bottom: 0.25rem;
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.75rem;
            color: var(--text-faint);
            font-variant-numeric: tabular-nums;
          }
          .item-title {
            font-size: 1.25rem;
            font-weight: 600;
            letter-spacing: -0.01em;
            line-height: 1.3;
            margin: 0 0 0.25rem;
          }
          .item-title a {
            color: var(--text);
            text-decoration: none;
          }
          .item-title a:hover { text-decoration: underline; }
          .item-desc {
            color: var(--text-muted);
            margin: 0.25rem 0 0;
            font-size: 0.9375rem;
          }
          footer.feed-footer {
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            font-family: "JetBrains Mono", ui-monospace, monospace;
            font-size: 0.6875rem;
            color: var(--text-faint);
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <a href="/" class="feed-home">&#8592; hjadmz.com</a>
        <p class="feed-badge">RSS Feed</p>
        <h1><xsl:value-of select="/rss/channel/title" /> &#8212; log</h1>
        <p class="feed-desc"><xsl:value-of select="/rss/channel/description" /></p>
        <div class="feed-hint">
          <strong>You're looking at an RSS feed.</strong> Subscribe in any
          reader (Feedly, NetNewsWire, Reeder) using the URL
          <code><xsl:value-of select="/rss/channel/atom:link/@href" /></code>.
        </div>

        <p class="section-label">Entries</p>
        <ul class="items">
          <xsl:for-each select="/rss/channel/item">
            <li class="item">
              <div class="item-meta">
                <time>
                  <xsl:value-of select="substring(pubDate, 1, 16)" />
                </time>
              </div>
              <h2 class="item-title">
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </h2>
              <xsl:if test="description != ''">
                <p class="item-desc">
                  <xsl:value-of select="description" />
                </p>
              </xsl:if>
            </li>
          </xsl:for-each>
        </ul>

        <footer class="feed-footer">
          <p>
            RSS 2.0 &#183; Generated at build time &#183;
            <a>
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link" />
              </xsl:attribute>
              hjadmz.com
            </a>
          </p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
