---
title: "One Spring, Zero Bounce"
description: "Why every motion on this site settles on a single critically-overdamped curve."
date: "2026-04-12"
tags: ["motion", "systems", "engineering"]
---

There is exactly one motion curve on this site. Mass: 2. Stiffness: 300. Damping: 49. Every transition — the palette opening, the card hovering, the hero fading in — rides that same spring.

## The problem with "nice" easings

Design systems accumulate motion the way closets accumulate coats. A cubic-bezier for buttons, a different one for modals, an overshoot for "delightful" interactions. The result is an interface that feels like it was built by four different people on four different days.

## Critically overdamped is the answer

A critically-overdamped spring is the mathematical edge between bounce and laziness — the fastest possible settling with zero overshoot. The motion feels *decided*: it arrives and it stops. No wobble. No "boinggg." No interpretive dance.

For neurodivergent users (me included), that matters. Bouncy motion in peripheral vision reads as motion-to-track. The nervous system doesn't get to opt out. A zero-bounce curve lets motion be information — here, done — without demanding attention.

## The handshake

Function side: one curve means the system is provably consistent. You can't accidentally ship inconsistent motion because there's nothing else to pick.

User side: the eye learns a single tempo and stops flinching at every transition.

## `prefers-reduced-motion`

Even the best spring is noise to someone who doesn't want motion. Every animation on this site respects `prefers-reduced-motion: reduce`. Opacity jumps to final state. No fade. No rise. The system gets out of the way.
