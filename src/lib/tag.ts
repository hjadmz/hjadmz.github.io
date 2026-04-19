/**
 * Shared tag-slug utility.
 * Every place that links to /tag/[slug] must use this — otherwise anchor
 * targets drift from the pre-rendered static paths and you get 404s.
 *
 *   "Engineering"       → "engineering"
 *   "Design Systems"    → "design-systems"
 *   "WCAG 2.1/AAA"      → "wcag-21aaa"
 *   "A - B"             → "a-b"        (was "a---b" before the collapser)
 *   "  leading space "  → "leading-space"
 *   "trailing -"        → "trailing"
 *
 * Pipeline, top-down:
 *   1. Lowercase + trim whitespace.
 *   2. Drop every char that isn't word / whitespace / hyphen. Punctuation
 *      disappears WITHOUT inserting a separator — that's why "WCAG 2.1"
 *      collapses to "wcag 21" (and then to "wcag-21" in step 3). This
 *      mirrors Jekyll/Kramdown slug semantics.
 *   3. Collapse any run of whitespace to a single hyphen.
 *   4. Collapse any run of hyphens to a single hyphen. Without this, an
 *      input like "A - B" produces "a- -b" after step 2, then "a---b"
 *      after step 3, because the literal hyphen between two spaces
 *      fragments the whitespace-run. The collapser is load-bearing.
 *   5. Strip leading/trailing hyphens so "- tag -" becomes "tag".
 */
export const tagSlug = (raw: string): string =>
  raw
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
