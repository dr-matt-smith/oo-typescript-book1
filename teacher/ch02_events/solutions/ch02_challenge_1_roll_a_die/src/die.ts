// CHALLENGE 1: which face a rolled six-sided die lands on. As with the coin, the random number is
// passed in, so the tests can choose it.

const SIDES = 6;

/** 1 to 6, from a random number from 0 up to (not including) 1. */
export function dieFace(random: number): number {
  // Math.floor rounds down: 0 to 0.999... times 6 is 0 to 5.99..., which rounds down to 0 to 5.
  return Math.floor(random * SIDES) + 1;
}
