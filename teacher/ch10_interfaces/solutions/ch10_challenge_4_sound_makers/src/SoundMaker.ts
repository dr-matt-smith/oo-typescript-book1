// CHALLENGE 4: anything that makes a sound - an instrument, a doorbell, a cat. Like the Java
// course's SoundMaker: things from quite different families can all keep this one promise.

export interface SoundMaker {
  readonly name: string;
  /** The sound it makes, as text: "Ding dong!" */
  play(): string;
}
