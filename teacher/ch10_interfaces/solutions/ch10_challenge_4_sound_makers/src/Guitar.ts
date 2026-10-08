// A guitar: an Instrument with six strings, and Tunable. One class, two interfaces.

import type { Instrument } from "./Instrument.ts";
import type { Tunable } from "./Tunable.ts";

const GUITAR_STRINGS = 6;

export class Guitar implements Instrument, Tunable {
  public readonly name: string = "Guitar";
  public readonly strings: number = GUITAR_STRINGS;

  // A new guitar arrives out of tune unless we say otherwise (a default parameter, Chapter 5).
  constructor(private inTune: boolean = false) {}

  public play(): string {
    return this.inTune ? "Strum!" : "Strum! (out of tune)";
  }

  public isInTune(): boolean {
    return this.inTune;
  }

  public tune(): void {
    this.inTune = true;
  }
}
