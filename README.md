# hjadmz.com

Personal site of **hjadmz** — Design Engineer. Restraint-first systems:
function precedes convenience precedes aesthetics; ornament is never
load-bearing.

Live at **[hjadmz.github.io](https://hjadmz.github.io)** · custom domain
`hjadmz.com` pending DNS.

## Principles

- **Static HTML + CSS. Zero JavaScript. No framework, no build step, no tracking.**
  The page is the artifact — nothing executes, nothing phones home.
- **Tokens, not values.** Every color, size, space, and duration traces to
  the hjadmz brand kit v1.2.0 design tokens. No ad-hoc numbers.
- **WCAG AAA body contrast in both color modes.** Light 19.30:1, dark 16.36:1.
  44 px minimum tap targets. Visible focus rings. `prefers-reduced-motion`
  collapses all motion to zero.
- **The wordmark is frozen geometry** — inlined outlined SVG paths, no font
  dependency, never retyped.
- **≤70 KB first visit, fonts included.** Inter 400/600 + JetBrains Mono 400,
  subset to the glyphs the site uses.

## Structure

```
.
├── index.html                      landing — hero · selected work · writing
├── writing/
│   ├── knowledge-vs-intelligence/  essay
│   └── tools-vs-results/           essay
├── styles.css                      tokens + layout (single stylesheet)
├── fonts/                          subset woff2 · SIL OFL 1.1
├── 404.html · robots.txt · sitemap.xml · _headers
└── favicon.svg · favicon.ico · apple-touch-icon.png · og-image-1200x630.png
```

## Develop

No toolchain. Edit the HTML/CSS, then preview:

```sh
python3 -m http.server 8000   # http://localhost:8000
```

## Deploy

Pushes to `main` deploy automatically via GitHub Actions
(`.github/workflows/pages.yml`). `_headers` carries the CSP and cache rules
for the eventual Cloudflare Pages mirror; GitHub Pages ignores it.

## License

Text and content © 2026 hjadmz. All rights reserved.
The `hjadmz` wordmark and `hj` monogram are trademarks — not licensed for reuse.
Inter (Rasmus Andersson) and JetBrains Mono (JetBrains) are redistributed
under the SIL Open Font License 1.1.

— *Soli Deo Gloria*
