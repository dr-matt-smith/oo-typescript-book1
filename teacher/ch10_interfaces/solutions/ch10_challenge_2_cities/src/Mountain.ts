// A mountain. Mountains are sorted TALLEST first - the class decides its own order, so it
// sorts by minus its height: the tallest has the smallest key.

import type { Sortable } from "./Sortable.ts";

export class Mountain implements Sortable {
  constructor(
    public readonly name: string,
    public readonly metres: number,
  ) {}

  /** "Everest (8849 m)" */
  public label(): string {
    return `${this.name} (${this.metres} m)`;
  }

  public sortKey(): number {
    return -this.metres;
  }
}
