// CHALLENGE 5: a cup of dice, all with the same number of sides, rolled together and added up.
// It is made of Die objects, so the rolling itself is Die's job, already tested.

import { Die } from "./Die.ts";

/** The ordinary die has six sides. */
const DEFAULT_SIDES = 6;

export class DiceCup {
  private dice: Die[] = [];

  constructor(count: number, private sides: number = DEFAULT_SIDES) {
    // count is a plain parameter, not a field: once the dice are made, the array's length says it.
    for (let i = 0; i < count; i++) {
      this.dice.push(new Die(sides));
    }
  }

  /**
   * Rolls every die and returns the total. `random` is a function such as Math.random: each die calls
   * it once, so each die gets its own random number. Tests pass a fake that returns chosen numbers.
   */
  public roll(random: () => number): number {
    return this.dice.reduce((total, die) => total + die.roll(random()), 0);
  }

  /** For example "2d6: 3 + 5 = 8", or "2d6 (not rolled yet)". */
  public toString(): string {
    const name = `${this.dice.length}d${this.sides}`;
    const values: number[] = [];
    for (const die of this.dice) {
      const value = die.getValue();
      if (value === null) {
        return `${name} (not rolled yet)`;
      }
      values.push(value);
    }
    const total = values.reduce((sum, value) => sum + value, 0);
    return `${name}: ${values.join(" + ")} = ${total}`;
  }
}
