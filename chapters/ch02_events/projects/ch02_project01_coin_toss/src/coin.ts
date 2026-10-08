// Decides which way up a tossed coin lands.
//
// The random number is passed in, rather than made in here, so that the tests can choose it - a test
// cannot check an answer it cannot predict.

const HALF = 0.5;

/** "Heads" for a random number below 0.5, and "Tails" for 0.5 and above (Math.random() gives 0 to 1). */
export function coinFace(random: number): string {
  if (random < HALF) {
    return "Heads";
  }
  return "Tails";
}
