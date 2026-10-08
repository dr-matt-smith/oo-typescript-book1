// A violin: four strings, and Tunable, like the guitar.

import type { Instrument } from "./Instrument.ts";
import type { Tunable } from "./Tunable.ts";

const VIOLIN_STRINGS = 4;

export class Violin implements Instrument, Tunable {
  public readonly name: string = "Violin";
  public readonly strings: number = VIOLIN_STRINGS;

  constructor(private inTune: boolean = false) {}

  public play(): string {
    return this.inTune ? "Eeee!" : "Screech! (out of tune)";
  }

  public isInTune(): boolean {
    return this.inTune;
  }

  public tune(): void {
    this.inTune = true;
  }
}
