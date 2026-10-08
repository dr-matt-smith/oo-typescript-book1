// A counter that goes up one at a time, and can be reset to zero.
// A first TypeScript class - compare it with the Java version in the chapter.

export class Counter {
  // A field, with its type. It starts at zero for every new Counter.
  private count: number = 0;

  // CHALLENGE 3: a default parameter - increment() still adds one
  /** Adds `step` to the count (one, if no step is given). */
  public increment(step: number = 1): void {
    this.count += step;
  }

  /** Sets the count back to zero. */
  public reset(): void {
    this.count = 0;
  }

  /** The current count. */
  public getCount(): number {
    return this.count;
  }
}
