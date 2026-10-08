// The entry point: makes the model and the view, and joins them with listeners.
// Every listener does the same two things: change the model, then render.

import { requireElement } from "./dom.ts";
import { Tally } from "./Tally.ts";
import { TallyView } from "./TallyView.ts";

const ROOM_CAPACITY = 12;

const tally = new Tally(ROOM_CAPACITY);
const view = new TallyView();

const render = (): void => view.render(tally);

requireElement<HTMLButtonElement>("#add").addEventListener("click", () => {
  tally.increment();
  render();
});
requireElement<HTMLButtonElement>("#remove").addEventListener("click", () => {
  tally.decrement();
  render();
});
requireElement<HTMLButtonElement>("#reset").addEventListener("click", () => {
  tally.reset();
  render();
});

render();
