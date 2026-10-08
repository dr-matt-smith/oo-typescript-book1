// The entry point: connects the page's buttons to a Counter object, and shows the count.
// main.ts is the only file that touches the page; the logic is in Counter.ts and messages.ts.

import { Counter } from "./Counter.ts";
import { describeCount } from "./messages.ts";

const counter = new Counter();

const addButton = document.querySelector<HTMLButtonElement>("#add");
const resetButton = document.querySelector<HTMLButtonElement>("#reset");
const takeButton = document.querySelector<HTMLButtonElement>("#take"); // CHALLENGE 2
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

// CHALLENGE 2
function handleTake(): void {
  counter.decrement();
  render();
}

function handleReset(): void {
  counter.reset();
  render();
}

// "When this button is clicked, call this function." Note: handleAdd, not handleAdd() -
// we hand over the function itself, for the button to call later.
if (addButton !== null) {
  addButton.addEventListener("click", handleAdd);
}
if (resetButton !== null) {
  resetButton.addEventListener("click", handleReset);
}

// CHALLENGE 2
if (takeButton !== null) {
  takeButton.addEventListener("click", handleTake);
}

render();
