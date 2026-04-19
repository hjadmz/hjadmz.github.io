# hjadmz.com

Personal site, engineering log, and work archive for hjadmz — Systems
Architect and Design Engineer.

Built as a research-first system, not a template. Every visible decision is
load-bearing; no element exists for decoration.

**Governing law:** Function > Convenience > Aesthetics (FCA).

## Stack

| Layer      | Choice                      |
| ---------- | --------------------------- |
| Framework  | Astro 5 (static output)     |
| UI         | React 19 islands (palette)  |
| Styling    | Tailwind v4 + CSS tokens    |
| Content    | MDX via Content Collections |
| Search     | Fuse.js over a build-time JSON index |
| Motion     | Framer Motion (islands) + CSS keyframes (hero) |
| Fonts      | Fontsource, self-hosted (Inter, JetBrains Mono, Mrs Saint Delafield) |
| Host       | Vercel                      |

## Privacy & security posture

- **No third-party network requests.** Fonts ship from the site's own
  origin via `@fontsource-variable/inter`, `@fontsource/jetbrains-mono`,
  `@fontsource/mrs-saint-delafield` (pinned in `package.json`). No Google
  Fonts, no CDN hotlinking, no IP leak on first paint.
- **Security headers** live in `vercel.json` and apply to every route:
  - `Content-Security-Policy` — script/style/img/font self-origin only.
  - `Strict-Transport-Security` — 2-year HSTS with preload.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `X-Content-Type-Options: nosniff`.
  - `X-Frame-Options: DENY`.
  - `Permissions-Policy` — deny camera, microphone, geolocation, etc.
- **No real name in crawler metadata.** JSON-LD (`WebSite` on every page,
  `BlogPosting` on log entries) uses `hjadmz` as the Person entity name
  and URL. `author` / `publisher` both point to the same entity so
  search engines stitch posts to the alias, not an unlisted human.
- **Known-advisory note.** `pnpm audit` reports GHSA-mr6q-rp88-fx84 on
  `@astrojs/vercel`. That CVE applies to the ISR (on-demand) code path,
  not to static output. This site ships pure static HTML/JS/CSS — the
  vulnerable entry points are never bundled into the deploy. Re-verify
  if you migrate to ISR or server-side rendering.

## Run it

```bash
pnpm install
pnpm dev         # http://localhost:4321
pnpm build       # static output to /dist
pnpm preview
```

Node 18.18+ required (enforced via `engines` in `package.json`).

## Deploy (GitHub Pages)

- Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main` (or manual run)
- Build output: `dist/`

In repository settings, set **Pages → Source** to **GitHub Actions**.

## Project shape

```
src/
  components/      # Astro + React islands (MotionWrapper, Hero, CommandPalette)
  content/
    blog/          # /log entries — MDX, Zod-validated frontmatter
    work/          # /work case studies — MDX, Zod-validated frontmatter
  layouts/
    Base.astro     # site chrome, head, header, footer
  lib/             # date formatting, motion constants, tag slug
  pages/
    index.astro    # hero + recent strip
    log.astro      # log list
    log/[slug].astro
    work.astro     # work list
    work/[slug].astro
    tag/[slug].astro     # dynamic tag archive
    about.astro
    contact.astro
    spec.astro     # system spec
    search-index.json.ts # build-time JSON index for ⌘K
    rss.xml.ts     # build-time RSS feed
  styles/
    global.css     # @theme tokens + base + components
public/            # static assets (favicons, signatures, og image)
```

## Adding content

A new log entry is one file:

```mdx
---
title: "Post title"
description: "One-line summary."
date: "2026-04-16"
tags: ["design", "engineering"]
---

Body goes here.
```

Drop it in `src/content/blog/slug.md`. The list page, RSS feed, search index,
and sitemap update on the next build.

Work entries live in `src/content/work/` with the schema defined in
`src/content.config.ts`.

## Design system

- Palette: `#020617` / `#F9FAFB` (monochrome, AAA on body text). Extreme
  tokens `#000000` / `#FFFFFF` reserved for the hero heading only —
  scarcity earns authority.
- Type: Inter Variable (UI) · JetBrains Mono (technical). Mrs Saint
  Delafield is the "ink on paper" accent — the /about signoff, the
  inline alias in the /about opening line, and the footer motto. Three
  uses, all sharing the same glyph-rendering stabilization (see
  `.footer-motto`, `.signoff-mark`, `.alias` in their respective files)
  so cursive exits don't jitter across opacity transitions.
- Scale: Major Third (1.25), fluid via `clamp()`.
- Motion: critically-overdamped spring — mass 2, stiffness 300, damping 49.
- Reading column: 65ch.

See `/spec` at runtime for the live version.

## Reading surfaces — /log/[slug]

Log detail pages carry two reading aids that are intentionally **not** on
list pages or /work/[slug] (case studies are short; the aids would
outweigh the content):

- **Reading progress bar** — 2px fixed strip at the viewport top edge,
  tracking the article body (`.post-body`), not the document. Dyslexic
  and ADHD readers rely on external progress cues; this is an
  externalized version of the pointer they'd otherwise have to hold
  internally. Fades to `CanvasText` in forced-colors mode.
- **Floating table of contents** — right-rail outline that only appears
  at ≥1200px viewports (where the prose column leaves genuine rail
  space). Uses two `IntersectionObserver`s: one on the post footer to
  hide the rail before it paints over "back to log," and another on
  each heading to drive the scroll-spy active state. Only renders on
  posts with ≥2 h2 sections; a single-section article reads top-to-
  bottom without help.

## Accessibility

- **Body text**: AAA contrast (≥7:1) in both light and dark modes.
- **Supplementary text** (timestamps, tag chips, meta labels): AA (≥4.5:1).
  Narrow scope by design; WCAG permits supplementary content at AA.
- **Prose reading comfort**: `hyphens: auto` + `overflow-wrap: break-word`
  + `word-spacing: 0.02em` on `.prose` to reduce ragged line-breaks and
  help dyslexic readers — without making the type look airy. Disabled
  inside `<code>` / `<pre>` so identifiers stay intact.
- **Respected preferences**:
  - `prefers-reduced-motion: reduce` — kills every animation / transition.
  - `prefers-color-scheme` — native light/dark, no JS toggle.
  - `prefers-contrast: more` — promotes faint tokens to muted, kills
    decorative opacity on chips / labels.
  - `prefers-reduced-transparency: reduce` — drops the palette backdrop
    blur to 0 (`--palette-blur` token).
  - `forced-colors: active` — Windows High Contrast: borders tie to
    `CanvasText`, focus rings to `Highlight`, so the UI survives OS
    color override.
  - `pointer: coarse` — hides keyboard hints on touch devices.
- Full keyboard nav with a WAI-ARIA combobox/listbox command palette:
  `⌘K` / `Ctrl+K` to open, `↑↓` to navigate, `↵` to activate, `esc`
  to dismiss. `aria-activedescendant` keeps virtual focus in sync.
- Focus rings on every interactive element; no disabled tap highlights in
  favor of explicit states.
- Tag schema enforces ≤5 tags per entry at ≤24 chars each — editorial
  discipline as type-safety.
- Alias-first public identity. Real name appears exactly once, in the
  opening line of /about ("Hi, I'm Henry Adams. I go by *hjadmz*
  online."). Every other surface — site chrome, JSON-LD (`Person`
  entity on the WebSite and every BlogPosting), meta tags, OG/Twitter
  cards, the footer signature, the breadcrumb wordmark — stays on the
  alias. The /about opening is the one surface where a reader
  reasonably expects to meet the person behind the handle; treating
  the rest the same way would dilute the alias without adding signal.

## License

MIT. See `LICENSE`.
