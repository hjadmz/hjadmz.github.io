---
title: "Monochrome Is the Constraint"
description: "A single-color palette forces hierarchy through structure, not hue."
date: "2026-04-10"
tags: ["design", "accessibility", "craft"]
---

There are two colors on this site. `#020617` and `#F9FAFB`. Everything else is borrowed — the same two values shifted in alpha to form borders, muted text, dividers. No accent. No "brand blue." No semantic green for success states.

## Why this is a feature

Color is cheap hierarchy. Give me a color palette and I'll give you an interface where a heading reads as important because it's red — not because it's structured that way. Remove the color and you can't hide behind hue anymore. You have to earn hierarchy through size, weight, spacing, and sequence.

## The accessibility side

Monochrome with verified 7:1 contrast (WCAG AAA) means the site works:

- For color-blind users, because there's no color-dependent information.
- For screen readers, because structure is carried by semantics, not style.
- In direct sunlight, because every pair clears 7:1.
- In dark mode, because the palette inverts with equal contrast on the other side.

## What about links?

The one concession to color convention would be blue links. This site doesn't use them. Instead: text stays at body color, underlines appear on hover in prose contexts, and focus rings carry a single ring color (`--color-ring`) — the only chromatic signal in the whole system, and only for keyboard focus where it's functionally required.

## The discipline

Every time I'm tempted to add a color, I ask: is this a *function* need (a required affordance that can't be communicated any other way) or an *aesthetic* wish? The answer is almost always the latter, and the answer is almost always no.
