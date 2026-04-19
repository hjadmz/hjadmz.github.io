---
title: "The Handshake"
description: "The moment an interface confirms it heard you is the whole product."
date: "2026-04-01"
tags: ["craft", "motion", "engineering", "testing", "ui"]
---

The unit of trust in an interface is the handshake — the tiny confirmation that an action landed. A button pressed. A form saved. A link followed. Get the handshake wrong and nothing else matters; the user spends the rest of the session unsure whether anything they did actually happened.

## What a handshake looks like

- A focus ring that appears on the *right element* within one frame.
- A click that confirms with state change, not a loading spinner that could mean anything.
- A form that responds to submission with a visible, non-destructive change — not a URL flash and an unrelated screen.
- A hover that reveals the next step before you've committed.

These are one-frame decisions. 16ms. Miss that window and the interface feels broken even if it eventually works.

## Why spring physics

A handshake has to feel *decided*. A cubic-bezier can do this, but only if tuned so perfectly that it happens once per project and is never touched again. A critically-overdamped spring does it by construction: it moves, it settles, it's done. No bounce to apologize for. No linger to interpret.

## Where teams drop it

The handshake tends to die first in three places:

1. **Forms** — submit returns silence while the network is in flight. The user clicks again. The form double-submits. Nobody knows whose fault it was.
2. **Navigation** — the link works, but the new page flashes a blank frame before rendering. The user wonders if they misclicked.
3. **Focus** — clicking a button moves focus somewhere unintended, or nowhere. Keyboard users get stranded.

## The fix

Model every interaction as a three-beat loop:

1. Acknowledge (optimistic state change — instant).
2. Confirm (the real result, replacing optimistic state).
3. Recover (if confirmation fails, restore and explain — once, visibly).

Every interaction on this site runs that loop. Including the `⌘K` palette. Especially the `⌘K` palette.
