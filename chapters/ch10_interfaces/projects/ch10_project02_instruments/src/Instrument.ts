// What every instrument in the band can do. `strings` is optional (the ?): a drum has none,
// so a drum simply leaves it out. Code that reads `strings` must be ready for it to be missing.

export interface Instrument {
  readonly name: string;
  /** How many strings it has - left out by instruments without strings. */
  readonly strings?: number;
  /** The sound it makes, as text: "Strum!" */
  play(): string;
}
