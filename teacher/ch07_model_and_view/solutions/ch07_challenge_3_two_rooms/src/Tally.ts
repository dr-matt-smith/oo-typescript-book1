// The model: how many people are in a room, and how many the room can hold.
// No DOM here at all - so every rule can be tested without a browser.

const DEFAULT_CAPACITY = 20;

export class Tally {
  private current: number = 0;

  // A parameter property (Chapter 5): `capacity` is a public, readonly field, set by the constructor.
  constructor(public readonly capacity: number = DEFAULT_CAPACITY) {
    if (capacity < 1) {
      throw new Error(`A room must hold at least 1 person, not ${capacity}`);
    }
  }

  /** How many people are in the room now. */
  public get count(): number {
    return this.current;
  }

  /** True when nobody else may come in. */
  public get isFull(): boolean {
    return this.current === this.capacity;
  }

  /** True when the room is empty, so nobody can leave. */
  public get isEmpty(): boolean {
    return this.current === 0;
  }

  /** How many more people may come in. */
  public get spacesLeft(): number {
    return this.capacity - this.current;
  }

  /** One more person comes in - unless the room is full. */
  public increment(): void {
    if (this.isFull) {
      return;
    }
    this.current++;
  }

  /** One person leaves - unless the room is empty. The count never goes below zero. */
  public decrement(): void {
    if (this.isEmpty) {
      return;
    }
    this.current--;
  }

  /** Everybody leaves. */
  public reset(): void {
    this.current = 0;
  }
}
