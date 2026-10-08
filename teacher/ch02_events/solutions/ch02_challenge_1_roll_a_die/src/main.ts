// Tosses a coin whenever the button is clicked.
//
// main.ts runs once, when the page loads: it finds the elements and tells the button what to do
// when it is clicked. After that, handleToss runs every time the button is clicked.

import { coinFace } from "./coin.ts";
import { dieFace } from "./die.ts"; // CHALLENGE 1

const tossButton = document.querySelector<HTMLButtonElement>("#toss");
const result = document.querySelector<HTMLElement>("#result");
const rollButton = document.querySelector<HTMLButtonElement>("#roll"); // CHALLENGE 1

/** Called by the browser each time the button is clicked. */
function handleToss(): void {
  // Math.random() gives a different number from 0 up to (but not including) 1 every time.
  const face = coinFace(Math.random());
  if (result !== null) {
    result.textContent = face;
  }
}

// "When this button is clicked, call handleToss." Note: handleToss, not handleToss() -
// we hand over the function itself, for the button to call later.
if (tossButton !== null) {
  tossButton.addEventListener("click", handleToss);
}

// CHALLENGE 1: a second button, with a listener of its own
function handleRoll(): void {
  if (result !== null) {
    result.textContent = `${dieFace(Math.random())}`;
  }
}

if (rollButton !== null) {
  rollButton.addEventListener("click", handleRoll);
}
