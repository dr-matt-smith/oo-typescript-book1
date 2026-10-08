// A counter that goes up one at a time, and can be reset to zero.
// A first TypeScript class - compare it with the Java version in the chapter.

export class Counter {
  // A field, with its type. It starts at zero for every new Counter.
  private count: number = 0;

  /** Adds one to the count. */
  public increment(): void {
    this.count++;
  }

  // CHALLENGE 2
  /** Takes one away from the count - but never goes below zero. */
  public decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
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
