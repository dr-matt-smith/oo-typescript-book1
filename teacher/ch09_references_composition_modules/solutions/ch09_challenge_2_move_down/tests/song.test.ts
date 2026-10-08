// Tests for src/Song.ts, src/time_format.ts and src/library.ts.

import { assertEquals, assertThrows } from "@std/assert";
import { LIBRARY, songsFrom } from "../src/library.ts";
import { Song } from "../src/Song.ts";
import { formatTime } from "../src/time_format.ts";

Deno.test("times are shown as minutes and two-digit seconds", () => {
  assertEquals(formatTime(225), "3:45");
  assertEquals(formatTime(65), "1:05");
  assertEquals(formatTime(0), "0:00");
  assertEquals(formatTime(3600), "60:00");
});

Deno.test("a song describes itself with toString", () => {
  const song = new Song("Lantern", "Mira Quinn", 241);
  assertEquals(`${song}`, "Lantern - Mira Quinn (4:01)");
});

Deno.test("a song must last a whole number of seconds above 0", () => {
  assertThrows(() => new Song("Silence", "Nobody", 0), Error, "not 0");
  assertThrows(() => new Song("Half", "Nobody", 10.5), Error, "not 10.5");
});

Deno.test("songsFrom makes one Song object per piece of data", () => {
  const songs = songsFrom([{ title: "A", artist: "B", seconds: 60 }]);
  assertEquals(songs[0] instanceof Song, true);
  assertEquals(songs[0].toString(), "A - B (1:00)");
});

Deno.test("the library has eight songs", () => {
  assertEquals(LIBRARY.length, 8);
});
