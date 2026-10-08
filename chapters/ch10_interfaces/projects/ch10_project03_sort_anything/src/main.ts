// Three lists of three unrelated classes - songs, planets and mountains - all sorted by the same
// sortAll function, because they all implement Sortable. The checkbox switches between the order
// in the data file and the sorted order. This is the only file that touches the page.

import data from "./data.json" with { type: "json" };
import { Mountain } from "./Mountain.ts";
import { Planet } from "./Planet.ts";
import { Song } from "./Song.ts";
import type { Sortable } from "./Sortable.ts";
import { labels, sortAll } from "./sorting.ts";

/** Finds an element, or throws an error naming the one that is missing (Chapter 7's helper). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`index.html has no element matching "${selector}"`);
  }
  return element;
};

const songs: Song[] = data.songs.map((song) => new Song(song.title, song.artist, song.seconds));
const planets: Planet[] = data.planets.map((planet) => new Planet(planet.name, planet.millionKm));
const mountains: Mountain[] = data.mountains.map((mountain) => new Mountain(mountain.name, mountain.metres));

const sortedBox = requireElement<HTMLInputElement>("#sorted");
let sorted = false;

/** Puts the labels of `items` into the list `selector`, sorted or not. */
const showList = (selector: string, items: Sortable[]): void => {
  const shown = sorted ? sortAll(items) : items;
  const list = requireElement<HTMLElement>(selector);
  list.replaceChildren(); // with no arguments, this empties the list
  for (const label of labels(shown)) {
    const li = document.createElement("li");
    li.textContent = label;
    list.appendChild(li);
  }
};

const render = (): void => {
  // A Song[] can be passed where a Sortable[] is wanted: every Song is a Sortable.
  showList("#songs", songs);
  showList("#planets", planets);
  showList("#mountains", mountains);
};

sortedBox.addEventListener("change", () => {
  sorted = sortedBox.checked;
  render();
});

render();
