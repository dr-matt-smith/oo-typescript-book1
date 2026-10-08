// CHALLENGE 4: a doorbell makes a sound, but it is not an instrument.

import type { SoundMaker } from "./SoundMaker.ts";

export class Doorbell implements SoundMaker {
  public readonly name: string = "Doorbell";

  public play(): string {
    return "Ding dong!";
  }
}
