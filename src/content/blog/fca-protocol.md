---
title: "The FCA Protocol"
description: "Function > Convenience > Aesthetics. A governing order for interface decisions."
date: "2026-04-14"
tags: ["systems", "design", "philosophy"]
---

Every interface decision eventually hits a three-way fork. It can optimize for **function** (does it solve the problem correctly?), **convenience** (is it ergonomic to use?), or **aesthetics** (does it look good?). Most teams claim to weigh them equally. In practice, something wins — the question is just whether you chose the winner or let the default win by drift.

## The rule

> Function > Convenience > Aesthetics.

Function is non-negotiable. A button that looks right but doesn't do the right thing is worse than a button that looks ugly and does. Convenience is a multiplier on a correct function — a correctly-modeled action that takes six clicks is still wrong. Aesthetics is the finishing, the outer skin. It should never be allowed to corrupt the order beneath it.

## Why this order, specifically

Research is the hardest thing to put back in once you've shipped. Convenience is tuneable. Aesthetics can be repainted in an afternoon. Put the hardest-to-retrofit layer first; put the easiest-to-swap layer last.

## Where this bites

- "Let's make the error message friendlier" → usually a convenience patch on a function failure. Fix the failure first.
- "Can we round the corners more?" → aesthetic adjustment that's fine, as long as it doesn't reduce hit-target size.
- "Users don't read the label" → either a function problem (the label is wrong) or a convenience problem (the label is in the wrong place). It is never an aesthetic problem.

The discipline isn't saying no to style. It's refusing to let style change the answer.
