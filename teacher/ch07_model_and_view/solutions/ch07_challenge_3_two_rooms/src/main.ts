// The entry point: makes the models and the views, and joins them with listeners.
// Every listener does the same two things: change the model, then render.
// CHALLENGE 3: two rooms, each with its own Tally and its own TallyView.

import { Tally } from "./Tally.ts";
import { TallyView } from "./TallyView.ts";

const LAB_CAPACITY = 12; // CHALLENGE 3
const LIBRARY_CAPACITY = 30; // CHALLENGE 3

// CHALLENGE 3: one function sets up one room, so the two rooms cannot get their wiring crossed
/** Makes a tally and a view for the room whose part of the page is `root`, and joins them. */
const setUpRoom = (root: string, capacity: number): void => {
  const tally = new Tally(capacity);
  const view = new TallyView(root);
  const render = (): void => view.render(tally);
  view.onClicks(
    () => {
      tally.increment();
      render();
    },
    () => {
      tally.decrement();
      render();
    },
    () => {
      tally.reset();
      render();
    },
  );
  render();
};

setUpRoom("#lab", LAB_CAPACITY);
setUpRoom("#library", LIBRARY_CAPACITY);
