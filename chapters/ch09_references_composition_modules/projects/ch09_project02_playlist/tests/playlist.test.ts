// Tests for src/Playlist.ts. Songs never change, so they can be shared by every test; each test
// makes its own Playlist, because playlists do change.

import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";
import { MAX_SONGS, Playlist } from "../src/Playlist.ts";
import { Song } from "../src/Song.ts";

const HARBOUR = new Song("Harbour Lights", "The Tidewaters", 214);
const PLANES = new Song("Paper Planes at Noon", "Mira Quinn", 187);
const TRAIN = new Song("Slow Train North", "Old Atlas", 263);

/** A new playlist of the three songs above, in order. */
const makePlaylist = (): Playlist => new Playlist("Road trip", [HARBOUR, PLANES, TRAIN]);

const titles = (playlist: Playlist): string[] => playlist.getSongs().map((song) => song.title);

Deno.test("a new playlist is empty unless it is given songs", () => {
  assertEquals(new Playlist("Empty").count(), 0);
  assertEquals(makePlaylist().count(), 3);
});

Deno.test("add puts a song at the end", () => {
  const playlist = new Playlist("Mix");
  playlist.add(PLANES);
  playlist.add(HARBOUR);
  assertEquals(titles(playlist), ["Paper Planes at Noon", "Harbour Lights"]);
});

Deno.test("the playlist holds the very same Song objects, not copies of them", () => {
  const playlist = makePlaylist();
  assertStrictEquals(playlist.getSongs()[0], HARBOUR);
  assertEquals(playlist.contains(PLANES), true);
});

Deno.test("an equal but different Song object is not 'contained'", () => {
  const lookalike = new Song("Harbour Lights", "The Tidewaters", 214);
  assertEquals(makePlaylist().contains(lookalike), false);
});

Deno.test("removeAt takes out the song at that position", () => {
  const playlist = makePlaylist();
  playlist.removeAt(1);
  assertEquals(titles(playlist), ["Harbour Lights", "Slow Train North"]);
});

Deno.test("removeAt throws for a position with no song", () => {
  const playlist = makePlaylist();
  assertThrows(() => playlist.removeAt(3), Error, "No song at position 3");
  assertThrows(() => playlist.removeAt(-1), Error, "No song at position -1");
});

Deno.test("moveUp swaps a song with the one before it", () => {
  const playlist = makePlaylist();
  playlist.moveUp(2);
  assertEquals(titles(playlist), ["Harbour Lights", "Slow Train North", "Paper Planes at Noon"]);
});

Deno.test("moveUp leaves the first song where it is", () => {
  const playlist = makePlaylist();
  playlist.moveUp(0);
  assertEquals(titles(playlist), ["Harbour Lights", "Paper Planes at Noon", "Slow Train North"]);
});

Deno.test("total time is the sum of the songs", () => {
  assertEquals(makePlaylist().totalSeconds(), 214 + 187 + 263);
  assertEquals(new Playlist("Empty").totalSeconds(), 0);
});

Deno.test("a full playlist refuses another song", () => {
  const playlist = new Playlist("Long", Array(MAX_SONGS).fill(HARBOUR));
  assertEquals(playlist.isFull(), true);
  assertThrows(() => playlist.add(PLANES), Error, "Long is full");
});

Deno.test("changing the array from getSongs does not change the playlist", () => {
  const playlist = makePlaylist();
  // getSongs returns readonly Song[], so TypeScript stops honest code changing it. `as Song[]` plays
  // careless code that ignores that - and the copy must protect the playlist even then.
  const songs = playlist.getSongs() as Song[];
  songs.push(HARBOUR);
  assertEquals(playlist.count(), 3);
});

Deno.test("changing the array given to the constructor does not change the playlist", () => {
  const songs = [HARBOUR, PLANES];
  const playlist = new Playlist("Mine", songs);
  songs.push(TRAIN);
  assertEquals(playlist.count(), 2);
});

Deno.test("two playlists made from one array do not affect each other", () => {
  const songs = [HARBOUR, PLANES];
  const first = new Playlist("First", songs);
  const second = new Playlist("Second", songs);
  first.moveUp(1);
  assertEquals(titles(second), ["Harbour Lights", "Paper Planes at Noon"]);
});
