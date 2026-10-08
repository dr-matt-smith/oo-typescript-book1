// The song library: plain data from library.json, turned into Song objects once, when the page loads.

import data from "./library.json" with { type: "json" };
import { Song } from "./Song.ts";

/** The shape of one song in library.json. */
export type SongData = { title: string; artist: string; seconds: number };

/** Makes a Song object from each piece of plain data. */
export const songsFrom = (songs: SongData[]): Song[] => songs.map((d) => new Song(d.title, d.artist, d.seconds));

export const LIBRARY: Song[] = songsFrom(data);
