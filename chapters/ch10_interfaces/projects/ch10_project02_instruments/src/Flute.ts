// A flute: no strings, and (in this band) nothing to tune.

import type { Instrument } from "./Instrument.ts";

export class Flute implements Instrument {
  public readonly name: string = "Flute";

  public play(): string {
    return "Toot!";
  }
}
