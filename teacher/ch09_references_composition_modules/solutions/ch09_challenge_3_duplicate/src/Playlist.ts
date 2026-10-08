// A playlist HAS songs: it keeps Song objects in a private array. The songs are not owned by the
// playlist - the same Song can be in the library and in other playlists (aggregation).
// The array itself is the playlist's own: it is copied coming in and going out, so no other code
// can change it behind the playlist's back.

import type { Song } from "./Song.ts";

/** The most songs one playlist may hold. */
export const MAX_SONGS = 10;

export class Playlist {
  private songs: Song[];

  constructor(public readonly name: string, songs: Song[] = []) {
    if (songs.length > MAX_SONGS) {
      throw new Error(`A playlist holds at most ${MAX_SONGS} songs, not ${songs.length}`);
    }
    // A copy: if we kept the caller's array, the caller could change our songs later.
    this.songs = [...songs];
  }

  /** Adds a song to the end. */
  public add(song: Song): void {
    if (this.isFull()) {
      throw new Error(`${this.name} is full: at most ${MAX_SONGS} songs`);
    }
    this.songs.push(song);
  }

  /** Removes the song at `index` (0 is the first). */
  public removeAt(index: number): void {
    this.checkIndex(index);
    this.songs.splice(index, 1);
  }

  /** Swaps the song at `index` with the one before it. The first song stays where it is. */
  public moveUp(index: number): void {
    this.checkIndex(index);
    if (index === 0) {
      return;
    }
    const before = this.songs[index - 1];
    this.songs[index - 1] = this.songs[index];
    this.songs[index] = before;
  }

  // CHALLENGE 3
  /**
   * A new playlist with the same songs. The constructor copies the array, so the two playlists can
   * be changed separately. The Song objects themselves are shared, not copied: a Song is readonly,
   * so no change to one playlist can ever reach the other through a song.
   */
  public duplicate(name: string): Playlist {
    return new Playlist(name, this.songs);
  }

  /** A copy of the songs, in order. Changing the copy cannot change the playlist. */
  public getSongs(): readonly Song[] {
    return [...this.songs];
  }

  public count(): number {
    return this.songs.length;
  }

  public isFull(): boolean {
    return this.songs.length >= MAX_SONGS;
  }

  /** Is this very Song object in the playlist? (=== compares objects by identity.) */
  public contains(song: Song): boolean {
    return this.songs.includes(song);
  }

  public totalSeconds(): number {
    return this.songs.reduce((total, song) => total + song.seconds, 0);
  }

  private checkIndex(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this.songs.length) {
      throw new Error(`No song at position ${index} in ${this.name}`);
    }
  }
}
