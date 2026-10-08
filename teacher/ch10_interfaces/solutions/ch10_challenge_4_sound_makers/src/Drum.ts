// A drum: an Instrument with no strings, and nothing to tune. It leaves out the optional
// `strings`, and does not implement Tunable.

import type { Instrument } from "./Instrument.ts";

export class Drum implements Instrument {
  public readonly name: string = "Drum";

  public play(): string {
    return "Boom!";
  }
}
