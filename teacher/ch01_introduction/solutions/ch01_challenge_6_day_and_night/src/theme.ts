// CHALLENGE 6: which colour theme the page should use at a given hour.

const DAY_STARTS = 7;
const NIGHT_STARTS = 19;

/**
 * "day" from 7:00 to 18:59, and "night" otherwise.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(themeFor(12), "day");
 * assertEquals(themeFor(23), "night");
 * ```
 */
export function themeFor(hour: number): string {
  if (hour >= DAY_STARTS && hour < NIGHT_STARTS) {
    return "day";
  }
  return "night";
}
