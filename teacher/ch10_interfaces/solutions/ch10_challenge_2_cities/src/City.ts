// CHALLENGE 2: a city. Cities are sorted BIGGEST first, so the key is minus the population.

import type { Sortable } from "./Sortable.ts";

export class City implements Sortable {
  constructor(
    public readonly name: string,
    public readonly population: number,
  ) {}

  /** "Dublin (592,713)" - en-GB, so the thousands separator is always a comma. */
  public label(): string {
    return `${this.name} (${this.population.toLocaleString("en-GB")})`;
  }

  public sortKey(): number {
    return -this.population;
  }
}
