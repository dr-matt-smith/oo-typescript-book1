// A die with any number of sides - six unless you say otherwise.
// It does not call Math.random() itself: the random number is passed in to roll(), so the
// tests can choose it and know exactly what the die will show.

/** The ordinary die has six sides. */
const DEFAULT_SIDES = 6;

export class Die {
  // What the die shows: null until it has been rolled for the first time.
  private value: number | null = null;

  constructor(private sides: number = DEFAULT_SIDES) {}

  public getSides(): number {
    return this.sides;
  }

  /** What the die shows, or null if it has not been rolled yet. */
  public getValue(): number | null {
    return this.value;
  }

  /**
   * Rolls the die and returns what it shows. `random` is a number from 0 up to (but not including) 1,
   * like the ones Math.random() gives: 0 rolls a 1, and anything just below 1 rolls the highest number.
   */
  public roll(random: number): number {
    this.value = Math.floor(random * this.sides) + 1;
    return this.value;
  }

  // CHALLENGE 2
  /** True when the die shows its highest number - a 20 on a d20. False if it has not been rolled. */
  public isMaximum(): boolean {
    return this.value === this.sides;
  }

  /** For example "d6 showing 4", or "d20 (not rolled yet)". */
  public toString(): string {
    if (this.value === null) {
      return `d${this.sides} (not rolled yet)`;
    }
    return `d${this.sides} showing ${this.value}`;
  }
}
