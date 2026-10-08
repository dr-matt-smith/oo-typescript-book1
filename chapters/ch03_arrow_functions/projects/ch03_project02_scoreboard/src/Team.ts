// One team on the scoreboard: a name and a score.

export class Team {
  private name: string;
  private score: number = 0;

  // A constructor, as in Java - but always called "constructor". Chapter 5 has more.
  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getScore(): number {
    return this.score;
  }

  /** Adds a basket: 1, 2 or 3 points. */
  public addPoints(points: number): void {
    this.score += points;
  }

  public reset(): void {
    this.score = 0;
  }
}
