/**
 * Format a date string (YYYY-MM-DD) for display.
 * Appends T12:00:00 to prevent UTC midnight → previous-day shift.
 */
export function formatDate(
  dateStr: string,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", opts);
}

/** Long format: "April 8, 2026" */
export function formatDateLong(dateStr: string): string {
  return formatDate(dateStr, { year: "numeric", month: "long", day: "numeric" });
}
