// Works out what to say to someone, given the hour of the day.
// There is no DOM (page) code in here, so Deno can test it without a browser - see tests/.

// Named constants instead of "magic numbers" scattered through the code.
const MORNING_STARTS = 5;
const AFTERNOON_STARTS = 12;
const EVENING_STARTS = 18;
const NIGHT_STARTS = 22; // CHALLENGE 2

/**
 * The part of the day for an hour from 0 to 23: "morning", "afternoon", "evening" or "night".
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(partOfDay(9), "morning");
 * assertEquals(partOfDay(2), "night"); // CHALLENGE 2
 * ```
 */
export function partOfDay(hour: number): string {
  if (hour >= MORNING_STARTS && hour < AFTERNOON_STARTS) {
    return "morning";
  }
  if (hour >= AFTERNOON_STARTS && hour < EVENING_STARTS) {
    return "afternoon";
  }
  // CHALLENGE 2: evening now stops at NIGHT_STARTS; everything else (22-23 and 0-4) is night
  if (hour >= EVENING_STARTS && hour < NIGHT_STARTS) {
    return "evening";
  }
  return "night";
}

/**
 * A greeting for `name` at `hour`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(greeting("Ada", 9), "Good morning, Ada!");
 * ```
 */
export function greeting(name: string, hour: number): string {
  return `Good ${partOfDay(hour)}, ${name}!`;
}
