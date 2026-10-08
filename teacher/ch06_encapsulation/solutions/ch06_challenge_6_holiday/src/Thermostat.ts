// A room thermostat. The target temperature uses get and set accessors: other code reads and writes
// `thermostat.target` as if it were a field, but every write goes through the setter, which refuses
// anything the thermostat cannot do. The invariant:
//
//   the target is always between 5 and 30 °C, in steps of half a degree.

const MIN_TARGET = 5;
const MAX_TARGET = 30;
const STEP = 0.5;
const START_TARGET = 20;
const FROST_TARGET = 7; // CHALLENGE 6: kept while on holiday, so the pipes do not freeze

export class Thermostat {
  // CHALLENGE 6: #target always holds the user's target, even during a holiday - so when the
  // holiday ends there is nothing to restore. #holiday decides which target is in force.
  #target: number = START_TARGET;
  #holiday: boolean = false;

  // `room` is the temperature the sensor reads. Any number is possible, so there is nothing to
  // check and nothing to hide: a public field is fine. If a rule turns up later, it can become a
  // get/set pair, and no code that uses it has to change.
  constructor(public room: number) {}

  /** The temperature the heating aims for. */
  public get target(): number {
    return this.#holiday ? FROST_TARGET : this.#target; // CHALLENGE 6
  }

  /** Runs on every `thermostat.target = ...`. Throws an Error, and changes nothing, if the value is not allowed. */
  public set target(celsius: number) {
    // CHALLENGE 6: the one place that refuses changes on holiday - up() and down() come through here too
    if (this.#holiday) {
      throw new Error(`The thermostat is on holiday: the target stays at ${FROST_TARGET} °C`);
    }
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

  // CHALLENGE 6
  public isOnHoliday(): boolean {
    return this.#holiday;
  }

  /** CHALLENGE 6: frost protection until endHoliday(). Starting a holiday twice changes nothing. */
  public startHoliday(): void {
    this.#holiday = true;
  }

  /** CHALLENGE 6: back to the user's target, which was kept in #target all along. */
  public endHoliday(): void {
    this.#holiday = false;
  }

  /** A get accessor with no field behind it: worked out fresh every time it is read. */
  public get heating(): boolean {
    return this.room < this.target; // CHALLENGE 6: the target in force, frost or normal
  }
}
