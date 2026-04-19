import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING } from "../lib/motion";

/*
  Section taxonomy. "tag" is a first-class type:
  the search-index emits one entry per unique tag pointing at /tag/<slug>,
  so a user typing "accessibility" gets BOTH the matching posts/work AND
  a scent-trail to the rollup page. Order is intentional:
    work → log → tag → page
  Individual matches come first (what the user most likely wants); tag
  rollups surface right after (landing page for the theme); static pages
  close the list (lowest-signal catch-all).
*/
type IndexItemType = "log" | "work" | "tag" | "page";

interface IndexItem {
  type: IndexItemType;
  title: string;
  url: string;
  description: string;
  date: string;
  tags: string[];
}

const TYPE_LABEL: Record<IndexItemType, string> = {
  work: "work",
  log: "log",
  tag: "tag",
  page: "page",
};

const SECTION_ORDER: IndexItemType[] = ["work", "log", "tag", "page"];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<IndexItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  /*
    Listbox ref lets us scroll the active option into view when keyboard
    nav walks past the visible window. Without this, hitting ArrowDown
    past the last-visible row silently moves `activeIndex` off-screen
    and the user loses their place.
  */
  const listboxRef = useRef<HTMLDivElement>(null);

  // Lazy-load the search index the first time the palette opens.
  // Keeps initial page weight low (0KB) until a user actually searches.
  const loadIndex = useCallback(async () => {
    if (loaded) return;
    try {
      const res = await fetch("/search-index.json", { cache: "force-cache" });
      const data = await res.json();
      setIndex(data.items ?? []);
      setLoaded(true);
    } catch (err) {
      console.error("[palette] failed to load search index", err);
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setQuery("");
      setActiveIndex(0);
      loadIndex();
      setTimeout(() => inputRef.current?.focus(), 10);
    };
    window.addEventListener("open-palette", handleOpen);
    return () => window.removeEventListener("open-palette", handleOpen);
  }, [loadIndex]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  /*
    Fuse config — tuned for "intuitive" search, not clever search.

    threshold: 0.28 (tighter than the stock 0.35). At 0.35 the matcher
    was accepting partial character collisions — e.g. "spring" was
    pulling "hjadmz.com" to the top because Fuse's Bitap distance let
    fragments of unrelated titles score. 0.28 keeps fuzzy tolerance
    for typos while demanding the query actually means something in
    the item.

    Keys: title carries most of the signal (0.65). Tags are the second
    most intentional surface — if the user types "motion" they almost
    certainly want the tag rollup and tagged posts, so tags get 0.22.
    Description is a tiebreaker (0.13), useful when a post's title
    doesn't contain the search term but the lede explains the concept.

    ignoreLocation lets "fca" find "The FCA Protocol" regardless of
    where FCA sits inside the title — important because our titles
    vary in length.

    minMatchCharLength: 2 keeps single-letter jitter from lighting
    up every item while the user's still typing the first character.
  */
  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 0.65 },
          { name: "tags", weight: 0.22 },
          { name: "description", weight: 0.13 },
        ],
        threshold: 0.28,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [index]
  );

  const results = useMemo<IndexItem[]>(() => {
    if (!query.trim()) {
      // Default view: a curated sample of recent items (Work first, then recent Log).
      const works = index.filter((i) => i.type === "work").slice(0, 3);
      const logs = index.filter((i) => i.type === "log").slice(0, 5);
      const pages = index.filter((i) => i.type === "page");
      return [...works, ...logs, ...pages];
    }
    return fuse.search(query).map((r) => r.item).slice(0, 20);
  }, [query, index, fuse]);

  // Group results by type, preserving SECTION_ORDER
  const grouped = useMemo(() => {
    const groups = new Map<IndexItemType, IndexItem[]>();
    for (const type of SECTION_ORDER) groups.set(type, []);
    for (const item of results) {
      groups.get(item.type)?.push(item);
    }
    return SECTION_ORDER
      .map((type) => ({ type, items: groups.get(type) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [results]);

  // Reset active index whenever results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, index]);

  // Flat ordered list that matches the visual render order — used for keyboard nav
  const flatResults = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  /*
    Keep the active option in view. Queries the option by data-index
    within the listbox so we don't need to allocate N refs. `block:
    "nearest"` scrolls minimally (only if the option is out of view),
    which matches Raycast / macOS Spotlight behavior — no jarring
    jump when the active row is already visible.
  */
  useEffect(() => {
    if (!isOpen) return;
    const el = listboxRef.current?.querySelector(
      `[data-palette-index="${activeIndex}"]`
    );
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(flatResults.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + flatResults.length) % Math.max(flatResults.length, 1));
      } else if (e.key === "Enter" && flatResults[activeIndex]) {
        window.location.href = flatResults[activeIndex].url;
      } else if (e.key === "Tab") {
        /*
          Focus trap. The palette is role="dialog" aria-modal="true" — ARIA
          requires focus to stay inside while it's open. Our only Tab-able
          element IS the input (options are driven by ArrowUp/ArrowDown via
          aria-activedescendant, not by focus migration). So the correct
          behavior is simply: Tab does nothing inside the palette.
          preventDefault keeps the user on the input instead of letting
          the browser walk focus onto background content that's visually
          hidden behind the backdrop.
        */
        e.preventDefault();
      }
    },
    [flatResults, activeIndex]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgb(2 6 23 / 0.4)",
              /*
                Blur intensity is token-driven — `--palette-blur` resolves
                to 4px by default and falls back to 0 under
                `prefers-reduced-transparency: reduce` (see global.css).
                Users who request reduced transparency (vestibular
                sensitivity, high-motion sensitivity, or older GPUs that
                stutter on backdrop-filter) get a clean translucent
                scrim instead of a blurred one.
              */
              backdropFilter: "blur(var(--palette-blur))",
              WebkitBackdropFilter: "blur(var(--palette-blur))",
              zIndex: 400,
            }}
          />
          {/*
            Bulletproof centering: DO NOT use `transform: translateX(-50%)`.
            Framer-motion animates `y` via transform and clobbers any inline
            transform we set. The result was a palette that appeared visually
            left-shifted on mount (the transform fought framer's y-tween).

            Instead, use the `inset-inline: 0 + margin-inline: auto` pattern.
            The dialog is a block-level fixed element that centers itself
            horizontally via auto margins within its inset bounds — zero
            transform conflict with framer's Y animation.

            Width collapses to `min(calc(100vw - 2rem), 520px)` so a 360px
            phone gets 328px of palette (still comfortable), and a 2560px
            display caps at 520px (never becomes a banner).

            Top uses `max(3rem, 12vh)` to guarantee a reasonable gap from
            the top on tiny viewports while scaling down from 15% on desktop.
          */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={SPRING}
            role="dialog"
            aria-label="Search the site"
            aria-modal="true"
            style={{
              position: "fixed",
              top: "max(3rem, 12vh)",
              left: 0,
              right: 0,
              marginInline: "auto",
              width: "min(calc(100vw - 2rem), 520px)",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-lg)",
              zIndex: 401,
              overflow: "hidden",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              // Leave breathing room above the bottom of the viewport; the
              // dialog must not clip off-screen when results are long.
              maxHeight: "min(70dvh, 560px)",
            }}
          >
            <div
              style={{
                padding: "0.875rem 1rem",
                borderBottom: "1px solid var(--color-border-subtle)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              {/*
                Stroke 2.4 on a 24-unit viewBox displayed at 15 renders
                at ~1.5 CSS pixels — matches the site-wide icon weight
                contract (see Base.astro nav-search + scroll-to-top).
              */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ color: "var(--color-text-faint)", opacity: 0.7, flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="7.5" />
                <line x1="20.5" y1="20.5" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search work, log, tags, pages…"
                aria-label="Search the site"
                /*
                  Combobox pattern: the input is the focus owner, the
                  listbox is the virtual focus target. aria-activedescendant
                  tells screen readers which option is "active" without
                  actually moving DOM focus off the input. The ID must
                  match `palette-option-${flat-index}` on the active <a>.
                */
                role="combobox"
                aria-expanded={flatResults.length > 0}
                aria-controls="palette-listbox"
                aria-autocomplete="list"
                aria-activedescendant={
                  flatResults.length > 0
                    ? `palette-option-${activeIndex}`
                    : undefined
                }
                autoComplete="off"
                spellCheck={false}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  // 16px prevents iOS zoom-on-focus
                  fontSize: "16px",
                  color: "var(--color-text)",
                }}
              />
            </div>
            <div
              ref={listboxRef}
              id="palette-listbox"
              role="listbox"
              aria-label="Search results"
              style={{
                overflowY: "auto",
                padding: "0.25rem 0",
                flex: 1,
              }}
            >
              {!loaded && (
                <div
                  style={{
                    padding: "1.5rem 1rem",
                    textAlign: "center",
                    color: "var(--color-text-faint)",
                    fontSize: "0.875rem",
                  }}
                >
                  Loading…
                </div>
              )}
              {loaded && grouped.length === 0 && (
                <div
                  style={{
                    padding: "2rem 1rem",
                    textAlign: "center",
                    color: "var(--color-text-faint)",
                    fontSize: "0.875rem",
                  }}
                >
                  No matches.
                </div>
              )}
              {loaded &&
                grouped.map((group) => {
                  // Compute the flat index offset for each item in this group
                  let flatIdx = 0;
                  for (const g of grouped) {
                    if (g.type === group.type) break;
                    flatIdx += g.items.length;
                  }
                  const headingId = `palette-group-${group.type}`;
                  return (
                    // Presentational wrapper — the parent is role="listbox",
                    // so all descendants must be role="option" (no nested groups
                    // inside a listbox per ARIA 1.2). We group visually only.
                    <div key={group.type}>
                      <div
                        id={headingId}
                        role="presentation"
                        style={{
                          padding: "0.5rem 1rem 0.25rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--color-text-faint)",
                          opacity: 0.7,
                        }}
                      >
                        {TYPE_LABEL[group.type]}
                      </div>
                      {group.items.map((item, i) => {
                        const index = flatIdx + i;
                        const active = index === activeIndex;
                        return (
                          <a
                            /*
                              Composite key: url alone collides if a tag and
                              a page share a URL (they don't today, but the
                              composite is cheap insurance against future
                              indexer changes).
                            */
                            key={`${item.type}-${item.url}`}
                            id={`palette-option-${index}`}
                            data-palette-index={index}
                            href={item.url}
                            role="option"
                            aria-selected={active}
                            aria-describedby={headingId}
                            onMouseEnter={() => setActiveIndex(index)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "0.75rem",
                              padding: "0.625rem 1rem",
                              textDecoration: "none",
                              color: "var(--color-text)",
                              fontSize: "0.9375rem",
                              backgroundColor: active
                                ? "var(--color-surface-raised)"
                                : "transparent",
                              borderLeft: active
                                ? "2px solid var(--color-text)"
                                : "2px solid transparent",
                              transition: "background-color 120ms, border-color 120ms",
                            }}
                          >
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.title}
                            </span>
                            {item.date && (
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.6875rem",
                                  color: "var(--color-text-faint)",
                                  fontVariantNumeric: "tabular-nums",
                                  flexShrink: 0,
                                }}
                              >
                                {item.date.length > 4 ? item.date.slice(0, 7) : item.date}
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
            {/*
              Shortcut footer — each hint wraps its key glyph in a <kbd> so
              all three tokens carry equal visual weight. Previously `↑↓`
              and `↵` read as symbols while `esc` read as a word; the eye
              couldn't parse them as a set. The <kbd> treatment unifies
              them into "key + label" pairs. Semantic + visual fix in one.
            */}
            <div
              style={{
                padding: "0.5rem 1rem",
                borderTop: "1px solid var(--color-border-subtle)",
                display: "flex",
                gap: "1rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--color-text-faint)",
                alignItems: "center",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                <kbd className="palette-kbd">↑↓</kbd> navigate
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                <kbd className="palette-kbd">↵</kbd> open
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                <kbd className="palette-kbd">esc</kbd> close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
