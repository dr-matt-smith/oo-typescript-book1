// Tests for Song, Planet and Mountain: their labels, and the order each one chooses.

import { assertEquals } from "@std/assert";
import { Mountain } from "../src/Mountain.ts";
import { Planet } from "../src/Planet.ts";
import { Song } from "../src/Song.ts";
import { labels, sortAll } from "../src/sorting.ts";

Deno.test("a song's label shows minutes and two-digit seconds", () => {
  assertEquals(new Song("Song 2", "Blur", 122).label(), "Song 2 - Blur (2:02)");
});

Deno.test("songs sort shortest first", () => {
  const songs = [new Song("Long", "A", 300), new Song("Short", "B", 100)];
  assertEquals(sortAll(songs)[0].label(), "Short - B (1:40)");
});

Deno.test("planets sort nearest the Sun first", () => {
  const planets = [new Planet("Mars", 228), new Planet("Earth", 150)];
  assertEquals(labels(sortAll(planets)), ["Earth (150 million km)", "Mars (228 million km)"]);
});

Deno.test("mountains sort tallest first", () => {
  const mountains = [new Mountain("Ben Nevis", 1345), new Mountain("Everest", 8849)];
  assertEquals(labels(sortAll(mountains)), ["Everest (8849 m)", "Ben Nevis (1345 m)"]);
});
