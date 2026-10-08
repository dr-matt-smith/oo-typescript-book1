// One team on the scoreboard: a name and a score.
//
// CHALLENGE 2: the team keeps a list of its baskets, so the last one can be undone. The score is no
// longer stored: it is worked out from the baskets, with reduce.

export class Team {
  private name: string;
  private baskets: number[] = []; // CHALLENGE 2

  // A constructor, as in Java - but always called "constructor". Chapter 5 has more.
  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  // CHALLENGE 2: the total of the baskets
  public getScore(): number {
    return this.baskets.reduce((total, points) => total + points, 0);
  }

  /** Adds a basket: 1, 2 or 3 points. */
  public addPoints(points: number): void {
    this.baskets.push(points); // CHALLENGE 2
  }

  // CHALLENGE 2
  /** Takes away the last basket scored. Does nothing if there are none. */
  public undo(): void {
    this.baskets.pop();
  }

  public reset(): void {
    this.baskets = []; // CHALLENGE 2
  }
}
