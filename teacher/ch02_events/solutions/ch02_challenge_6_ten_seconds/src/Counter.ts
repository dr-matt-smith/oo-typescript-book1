// A counter that goes up one at a time, and can be reset to zero.
// A first TypeScript class - compare it with the Java version in the chapter.
//
// CHALLENGE 6: it also remembers the best count of any finished round.

export class Counter {
  // A field, with its type. It starts at zero for every new Counter.
  private count: number = 0;
  private best: number = 0; // CHALLENGE 6

  /** Adds one to the count. */
  public increment(): void {
    this.count++;
  }

  /** Sets the count back to zero. */
  public reset(): void {
    this.count = 0;
  }

  /** The current count. */
  public getCount(): number {
    return this.count;
  }

  // CHALLENGE 6
  /** Ends a round: the count becomes the new best, if it beats it. The count itself is kept. */
  public finishRound(): void {
    if (this.count > this.best) {
      this.best = this.count;
    }
  }

  // CHALLENGE 6
  /** The best count of any finished round (zero until a round has finished). */
  public getBest(): number {
    return this.best;
  }
}
