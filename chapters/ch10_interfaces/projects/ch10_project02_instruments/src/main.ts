// A band you can play and tune. Each instrument gets a card with a Play button; "Play all" and
// "Tune all" work on the whole band. The guitar and violin are in two arrays at once: the band
// (as Instruments) and the tunables (as Tunables) - the same objects, seen through two interfaces.
// This is the only file that touches the page.

import { describeInstrument, outOfTune, playAll, totalStrings, tuneAll } from "./band.ts";
import { Drum } from "./Drum.ts";
import { Flute } from "./Flute.ts";
import { Guitar } from "./Guitar.ts";
import type { Instrument } from "./Instrument.ts";
import type { Tunable } from "./Tunable.ts";
import { Violin } from "./Violin.ts";

/** Finds an element, or throws an error naming the one that is missing (Chapter 7's helper). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`index.html has no element matching "${selector}"`);
  }
  return element;
};

const cards = requireElement<HTMLElement>("#cards");
const output = requireElement<HTMLElement>("#output");
const tuning = requireElement<HTMLElement>("#tuning");
const summary = requireElement<HTMLElement>("#summary");

const guitar = new Guitar();
const violin = new Violin();
const band: Instrument[] = [guitar, violin, new Drum(), new Flute()];
const tunables: Tunable[] = [guitar, violin];

const render = (): void => {
  const notInTune = outOfTune(tunables);
  tuning.textContent = notInTune.length === 0 ? "Everything is in tune" : `Out of tune: ${notInTune.join(", ")}`;
  tuning.className = notInTune.length === 0 ? "good" : "bad";
  summary.textContent = `${band.length} instruments · ${totalStrings(band)} strings in all`;
};

// One card per instrument, made in a loop; each Play button remembers its own instrument.
for (const instrument of band) {
  const card = document.createElement("div");
  card.className = "card instrument";
  const label = document.createElement("span");
  label.textContent = describeInstrument(instrument);
  const button = document.createElement("button");
  button.textContent = "Play";
  button.addEventListener("click", () => {
    output.textContent = instrument.play();
  });
  card.appendChild(label);
  card.appendChild(button);
  cards.appendChild(card);
}

requireElement<HTMLButtonElement>("#play-all").addEventListener("click", () => {
  output.textContent = playAll(band).join("  ");
});
requireElement<HTMLButtonElement>("#tune-all").addEventListener("click", () => {
  tuneAll(tunables);
  output.textContent = "Tuned.";
  render();
});

render();
