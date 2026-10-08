// Tests for src/Guitar.ts: one object, used as an Instrument and as a Tunable.

import { assertEquals } from "@std/assert";
import { Guitar } from "../src/Guitar.ts";
import type { Instrument } from "../src/Instrument.ts";
import type { Tunable } from "../src/Tunable.ts";

Deno.test("a new guitar is out of tune", () => {
  const guitar = new Guitar();
  assertEquals(guitar.isInTune(), false);
  assertEquals(guitar.play(), "Strum! (out of tune)");
});

Deno.test("tuning a guitar puts it in tune", () => {
  const guitar = new Guitar();
  guitar.tune();
  assertEquals(guitar.isInTune(), true);
  assertEquals(guitar.play(), "Strum!");
});

Deno.test("a guitar has six strings", () => {
  assertEquals(new Guitar().strings, 6);
});

Deno.test("the same guitar can be used as an Instrument and as a Tunable", () => {
  const guitar = new Guitar();
  const instrument: Instrument = guitar;
  const tunable: Tunable = guitar;

  tunable.tune();

  // one object, two views of it: tuning through one is seen through the other
  assertEquals(instrument.play(), "Strum!");
});
