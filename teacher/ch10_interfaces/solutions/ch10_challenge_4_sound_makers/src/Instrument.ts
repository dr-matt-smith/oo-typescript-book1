// What every instrument in the band can do. `strings` is optional (the ?): a drum has none,
// so a drum simply leaves it out. Code that reads `strings` must be ready for it to be missing.

import type { SoundMaker } from "./SoundMaker.ts"; // CHALLENGE 4

// CHALLENGE 4: an Instrument is a SoundMaker with (perhaps) some strings. name and play() now
// come from SoundMaker, so they are not repeated here.
export interface Instrument extends SoundMaker {
  /** How many strings it has - left out by instruments without strings. */
  readonly strings?: number;
}
