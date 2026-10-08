// The entry point: connects the page's buttons to a Counter object, and shows the count.
// main.ts is the only file that touches the page; the logic is in Counter.ts and messages.ts.
//
// CHALLENGE 6: a ten-second round. The timing lives here (it needs the browser's clock);
// the scoring lives in Counter, where it is tested.

import { Counter } from "./Counter.ts";
import { describeCount } from "./messages.ts";

const ROUND_LENGTH_MS = 10000; // CHALLENGE 6: 10 seconds, in milliseconds

const counter = new Counter();

const addButton = document.querySelector<HTMLButtonElement>("#add");
const startButton = document.querySelector<HTMLButtonElement>("#start"); // CHALLENGE 6
const countDisplay = document.querySelector<HTMLElement>("#count");
const message = document.querySelector<HTMLParagraphElement>("#message");

/** Makes the page show the counter's current state. Called after every change. */
function render(): void {
  if (countDisplay !== null) {
    countDisplay.textContent = `${counter.getCount()}`;
  }
  if (message !== null) {
    message.textContent = describeCount(counter.getCount());
  }
}

function handleAdd(): void {
  counter.increment();
  render();
}

// CHALLENGE 6: start a round - reset the count, enable clicking, and set a timer for the end.
function startRound(): void {
  counter.reset();
  render();
  if (addButton !== null) {
    addButton.disabled = false;
  }
  if (startButton !== null) {
    startButton.disabled = true;
  }
  setTimeout(endRound, ROUND_LENGTH_MS);
}

// CHALLENGE 6: called by the timer, 10 seconds after startRound.
function endRound(): void {
  counter.finishRound();
  if (addButton !== null) {
    addButton.disabled = true;
  }
  if (startButton !== null) {
    startButton.disabled = false;
  }
  if (message !== null) {
    message.textContent = `Time's up! ${describeCount(counter.getCount())}. Best: ${counter.getBest()}`;
  }
}

if (addButton !== null) {
  addButton.addEventListener("click", handleAdd);
  addButton.disabled = true; // CHALLENGE 6: no clicking until a round starts
}
if (startButton !== null) {
  startButton.addEventListener("click", startRound);
}

render();
