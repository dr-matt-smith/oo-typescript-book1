// Functions for a whole band. They only use what the interfaces promise, so they work for any
// instrument - including ones that have not been written yet.

import type { Instrument } from "./Instrument.ts";
import type { SoundMaker } from "./SoundMaker.ts"; // CHALLENGE 4
import type { Tunable } from "./Tunable.ts";

/** "Guitar · 6 strings", or "Drum · no strings" when `strings` was left out. */
export const describeInstrument = (instrument: Instrument): string => {
  // strings is optional, so its type is number | undefined: check before using it
  if (instrument.strings === undefined) {
    return `${instrument.name} · no strings`;
  }
  return `${instrument.name} · ${instrument.strings} strings`;
};

/** How many strings the whole band has. Instruments without strings count as 0. */
export const totalStrings = (band: Instrument[]): number =>
  band.reduce((total, instrument) => total + (instrument.strings === undefined ? 0 : instrument.strings), 0);

/** Every instrument plays once: ["Guitar: Strum!", "Drum: Boom!"]. */
export const playAll = (band: Instrument[]): string[] =>
  band.map((instrument) => `${instrument.name}: ${instrument.play()}`);

/** Tunes everything that can be tuned. */
export const tuneAll = (tunables: Tunable[]): void => {
  for (const tunable of tunables) {
    tunable.tune();
  }
};

/** The names of everything that is out of tune - an empty array if all is well. */
export const outOfTune = (tunables: Tunable[]): string[] =>
  tunables.filter((tunable) => !tunable.isInTune()).map((tunable) => tunable.name);

// CHALLENGE 4
/** Everything makes its sound once: ["Guitar: Strum!", "Doorbell: Ding dong!"]. */
export const soundCheck = (makers: SoundMaker[]): string[] => makers.map((maker) => `${maker.name}: ${maker.play()}`);
