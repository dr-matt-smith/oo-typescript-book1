// A room thermostat. The target temperature uses get and set accessors: other code reads and writes
// `thermostat.target` as if it were a field, but every write goes through the setter, which refuses
// anything the thermostat cannot do. The invariant:
//
//   the target is always between 5 and 30 °C, in steps of half a degree.

const MIN_TARGET = 5;
const MAX_TARGET = 30;
const STEP = 0.5;
const START_TARGET = 20;

export class Thermostat {
  #target: number = START_TARGET;

  // `room` is the temperature the sensor reads. Any number is possible, so there is nothing to
  // check and nothing to hide: a public field is fine. If a rule turns up later, it can become a
  // get/set pair, and no code that uses it has to change.
  constructor(public room: number) {}

  /** The temperature the heating aims for. */
  public get target(): number {
    return this.#target;
  }

  /** Runs on every `thermostat.target = ...`. Throws an Error, and changes nothing, if the value is not allowed. */
  public set target(celsius: number) {
    if (celsius < MIN_TARGET || celsius > MAX_TARGET) {
      throw new Error(`The target must be from ${MIN_TARGET} to ${MAX_TARGET} °C (not ${celsius})`);
    }
    if (!Number.isInteger(celsius / STEP)) {
      throw new Error(`The target must be a whole or half degree (not ${celsius})`);
    }
    this.#target = celsius;
  }

  /** Half a degree warmer - but never above the maximum, so pressing + too often is harmless. */
  public up(): void {
    // Goes through the setter, so the rules are checked in one place only.
    this.target = Math.min(this.#target + STEP, MAX_TARGET);
  }

  /** Half a degree cooler - but never below the minimum. */
  public down(): void {
    this.target = Math.max(this.#target - STEP, MIN_TARGET);
  }

  /** A get accessor with no field behind it: worked out fresh every time it is read. */
  public get heating(): boolean {
    return this.room < this.#target;
  }
}
