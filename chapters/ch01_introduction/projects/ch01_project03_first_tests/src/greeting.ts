// The greeting for an hour of the day. A function of its own, in a file of its own, so that it can be
// checked by Deno - see the example in its doc comment, and the tests in tests/greeting.test.ts.

// A named constant, rather than a "magic number" 12 in the middle of the code.
const MIDDAY = 12;

/**
 * "Good morning" before midday (hours 0 to 11), and "Good day" from midday on (hours 12 to 23).
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(greeting(9), "Good morning");
 * assertEquals(greeting(15), "Good day");
 * ```
 */
export function greeting(hour: number): string {
  if (hour < MIDDAY) {
    return "Good morning";
  }
  return "Good day";
}
