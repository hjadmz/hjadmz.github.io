/**
 * Brand-kit hardcoded spring physics.
 * Critically overdamped. Zero bounce, zero overshoot.
 * Do NOT tune per-element — this is the system constant.
 *
 * Source: brand-kit/tokens/design-tokens.css
 * Curve: overdamped (ζ > 1)
 */
export const SPRING = {
  type: "spring" as const,
  mass: 2,
  stiffness: 300,
  damping: 49,
};
