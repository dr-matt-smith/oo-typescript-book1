// One song. Every field is readonly, so a Song can never change once it is made - which is why it
// is safe for the library and any number of playlists to share the same Song object.

import { formatTime } from "./time_format.ts";

export class Song {
  constructor(
    public readonly title: string,
    public readonly artist: string,
    public readonly seconds: number,
  ) {
    if (!Number.isInteger(seconds) || seconds <= 0) {
      throw new Error(`A song must last a whole number of seconds above 0, not ${seconds}`);
    }
  }

  public toString(): string {
    return `${this.title} - ${this.artist} (${formatTime(this.seconds)})`;
  }
}
