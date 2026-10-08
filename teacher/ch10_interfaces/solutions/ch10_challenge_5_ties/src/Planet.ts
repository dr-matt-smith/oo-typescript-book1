// A planet. Planets are sorted nearest the Sun first.

import type { Sortable } from "./Sortable.ts";

export class Planet implements Sortable {
  constructor(
    public readonly name: string,
    public readonly millionKm: number,
  ) {}

  /** "Mars (228 million km)" */
  public label(): string {
    return `${this.name} (${this.millionKm} million km)`;
  }

  public sortKey(): number {
    return this.millionKm;
  }
}
