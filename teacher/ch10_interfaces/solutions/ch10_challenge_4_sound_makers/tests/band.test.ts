// Tests for src/band.ts. Most instruments here are object literals - quick fakes. A kazoo needs
// only a name and play(); it leaves out the optional strings, just as a Drum does.

import { assertEquals } from "@std/assert";
import { describeInstrument, outOfTune, playAll, soundCheck, totalStrings, tuneAll } from "../src/band.ts"; // CHALLENGE 4
import { Doorbell } from "../src/Doorbell.ts"; // CHALLENGE 4
import type { SoundMaker } from "../src/SoundMaker.ts"; // CHALLENGE 4
import type { Instrument } from "../src/Instrument.ts";
import type { Tunable } from "../src/Tunable.ts";

const kazoo: Instrument = { name: "Kazoo", play: () => "Bzzz!" };
const harp: Instrument = { name: "Harp", strings: 47, play: () => "Twinkle!" };

/** A fake Tunable that starts in or out of tune. */
const fakeTunable = (name: string, inTune: boolean): Tunable => {
  let tuned = inTune;
  return {
    name,
    isInTune: () => tuned,
    tune: () => {
      tuned = true;
    },
  };
};

Deno.test("an instrument with strings says how many", () => {
  assertEquals(describeInstrument(harp), "Harp · 47 strings");
});

Deno.test("an instrument that leaves out strings has no strings", () => {
  assertEquals(describeInstrument(kazoo), "Kazoo · no strings");
});

Deno.test("instruments without strings count as zero strings", () => {
  assertEquals(totalStrings([harp, kazoo, harp]), 94);
});

Deno.test("a band with no instruments has no strings", () => {
  assertEquals(totalStrings([]), 0);
});

Deno.test("play all plays every instrument once, in order", () => {
  assertEquals(playAll([kazoo, harp]), ["Kazoo: Bzzz!", "Harp: Twinkle!"]);
});

Deno.test("out of tune lists only the instruments that are out of tune", () => {
  const tunables = [fakeTunable("Cello", false), fakeTunable("Lute", true)];
  assertEquals(outOfTune(tunables), ["Cello"]);
});

Deno.test("after tune all, nothing is out of tune", () => {
  const tunables = [fakeTunable("Cello", false), fakeTunable("Lute", false)];
  tuneAll(tunables);
  assertEquals(outOfTune(tunables), []);
});

// CHALLENGE 4
Deno.test("a doorbell is a SoundMaker", () => {
  const maker: SoundMaker = new Doorbell();
  assertEquals(maker.play(), "Ding dong!");
});

Deno.test("sound check plays instruments and other sound makers alike", () => {
  const cat: SoundMaker = { name: "Cat", play: () => "Miaow!" };
  assertEquals(soundCheck([kazoo, cat, new Doorbell()]), ["Kazoo: Bzzz!", "Cat: Miaow!", "Doorbell: Ding dong!"]);
});

Deno.test("a whole band can be sound-checked", () => {
  const band: Instrument[] = [kazoo, harp];
  // an Instrument[] is accepted where a SoundMaker[] is wanted: every Instrument is a SoundMaker
  assertEquals(soundCheck(band), ["Kazoo: Bzzz!", "Harp: Twinkle!"]);
});
