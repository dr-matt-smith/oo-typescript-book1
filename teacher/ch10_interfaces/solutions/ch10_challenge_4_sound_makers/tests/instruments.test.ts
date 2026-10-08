// Tests for the other instruments.

import { assertEquals } from "@std/assert";
import { Drum } from "../src/Drum.ts";
import { Flute } from "../src/Flute.ts";
import type { Instrument } from "../src/Instrument.ts";
import { Violin } from "../src/Violin.ts";

Deno.test("a violin has four strings and starts out of tune", () => {
  const violin = new Violin();
  assertEquals(violin.strings, 4);
  assertEquals(violin.isInTune(), false);
});

Deno.test("a tuned violin plays a clean note", () => {
  const violin = new Violin(true);
  assertEquals(violin.play(), "Eeee!");
});

Deno.test("a drum, seen as an Instrument, has no strings", () => {
  // Drum itself has no `strings` at all; through the Instrument interface it is optional, so we may ask
  const drum: Instrument = new Drum();
  assertEquals(drum.strings, undefined);
  assertEquals(drum.play(), "Boom!");
});

Deno.test("a flute toots", () => {
  assertEquals(new Flute().play(), "Toot!");
});
