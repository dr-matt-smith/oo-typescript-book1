// The Playlist page: the library on the left, one playlist on the right. Clicking + puts the
// library's own Song object into the playlist - the same object, shared, not a copy.

import { LIBRARY } from "./library.ts";
import { Playlist } from "./Playlist.ts";
import type { Song } from "./Song.ts";
import { formatTime } from "./time_format.ts";

/** querySelector that throws, naming the element, if it is missing (Chapter 7's helper). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches ${selector} - check index.html`);
  }
  return element;
};

// CHALLENGE 3: `let`, because Duplicate swaps in the new playlist; the old one is kept to show it is unchanged
let playlist = new Playlist("My playlist");
let previous: Playlist | null = null;

const libraryList = requireElement<HTMLElement>("#library");
const playlistList = requireElement<HTMLElement>("#playlist");
const summary = requireElement<HTMLElement>("#summary");
const playlistName = requireElement<HTMLElement>("#playlist-name"); // CHALLENGE 3
const duplicateButton = requireElement<HTMLButtonElement>("#duplicate"); // CHALLENGE 3
const previousLine = requireElement<HTMLElement>("#previous"); // CHALLENGE 3

/** A small button whose listener is the arrow function it is given. */
const makeButton = (text: string, title: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = text;
  button.title = title;
  button.className = "small";
  button.addEventListener("click", onClick);
  return button;
};

/** One <li>: the song as text, then its buttons. */
const songRow = (song: Song, buttons: HTMLButtonElement[]): HTMLLIElement => {
  const li = document.createElement("li");
  const text = document.createElement("span");
  text.textContent = song.toString();
  const box = document.createElement("span");
  box.className = "buttons";
  for (const button of buttons) {
    box.appendChild(button);
  }
  li.append(box, text);
  return li;
};

const render = (): void => {
  libraryList.replaceChildren();
  for (const song of LIBRARY) {
    const add = makeButton("+", "Add to the playlist", () => {
      playlist.add(song);
      render();
    });
    add.disabled = playlist.isFull();
    libraryList.appendChild(songRow(song, [add]));
  }

  playlistList.replaceChildren();
  // forEach is like for ... of, but also hands the arrow function each song's position.
  playlist.getSongs().forEach((song, index) => {
    const up = makeButton("↑", "Move up", () => {
      playlist.moveUp(index);
      render();
    });
    up.disabled = index === 0;
    const remove = makeButton("✕", "Remove", () => {
      playlist.removeAt(index);
      render();
    });
    playlistList.appendChild(songRow(song, [up, remove]));
  });

  const full = playlist.isFull() ? " · full" : "";
  summary.textContent = `${playlist.count()} songs · ${formatTime(playlist.totalSeconds())}${full}`;
  // CHALLENGE 3
  playlistName.textContent = playlist.name;
  previousLine.textContent = previous === null ? "" : `${previous.name}: ${previous.count()} songs (unchanged)`;
};

// CHALLENGE 3: the page now edits the duplicate; the previous playlist is left as it was.
let copies = 0;
duplicateButton.addEventListener("click", () => {
  copies += 1;
  previous = playlist;
  playlist = playlist.duplicate(`My playlist (copy ${copies})`);
  render();
});

render();
