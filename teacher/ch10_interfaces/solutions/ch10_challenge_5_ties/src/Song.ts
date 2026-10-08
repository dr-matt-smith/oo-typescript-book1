// A song. Songs are sorted shortest first.

import type { Sortable } from "./Sortable.ts";

const SECONDS_PER_MINUTE = 60;

export class Song implements Sortable {
  constructor(
    public readonly title: string,
    public readonly artist: string,
    public readonly seconds: number,
  ) {}

  /** "Yellow - Coldplay (4:29)" */
  public label(): string {
    const minutes = Math.floor(this.seconds / SECONDS_PER_MINUTE);
    const rest = `${this.seconds % SECONDS_PER_MINUTE}`.padStart(2, "0");
    return `${this.title} - ${this.artist} (${minutes}:${rest})`;
  }

  public sortKey(): number {
    return this.seconds;
  }
}
