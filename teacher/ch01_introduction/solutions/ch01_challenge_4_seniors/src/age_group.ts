// Which age group a person is in. Written test first: the tests in tests/age_group.test.ts were
// written before this function, and failed until it was written.

const OLDEST_CHILD = 12;
const OLDEST_TEENAGER = 19;
const YOUNGEST_SENIOR = 65; // CHALLENGE 4
const OLDEST_POSSIBLE = 150;

/**
 * The age group for an age in years: "child" (0 to 12), "teenager" (13 to 19), "adult" (20 to 64),
 * "senior" (65 to 150), or "invalid" for an age that cannot be right (below 0, or above 150).
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(ageGroup(8), "child");
 * assertEquals(ageGroup(40), "adult");
 * assertEquals(ageGroup(70), "senior"); // CHALLENGE 4
 * ```
 */
export function ageGroup(age: number): string {
  if (age < 0 || age > OLDEST_POSSIBLE) {
    return "invalid";
  }
  if (age <= OLDEST_CHILD) {
    return "child";
  }
  if (age <= OLDEST_TEENAGER) {
    return "teenager";
  }
  // CHALLENGE 4
  if (age >= YOUNGEST_SENIOR) {
    return "senior";
  }
  return "adult";
}
