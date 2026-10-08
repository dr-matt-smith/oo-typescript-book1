// A dice roller: choose how many sides, press Roll, and see the result and the rolls so far.
// Choosing a different number of sides makes a new Die object with the constructor.

import { Die } from "./Die.ts";

/** How many rolls the history shows. */
const HISTORY_LENGTH = 10;

let die = new Die();
let history: number[] = [];

const sidesChoice = document.querySelector<HTMLSelectElement>("#sides");
const rollButton = document.querySelector<HTMLButtonElement>("#roll");
const face = document.querySelector<HTMLElement>("#face");
const description = document.querySelector<HTMLElement>("#description");
const historyList = document.querySelector<HTMLElement>("#history");

const render = (): void => {
  const value = die.getValue();
  if (face !== null) {
    face.textContent = value === null ? "?" : `${value}`;
    face.classList.toggle("maximum", die.isMaximum()); // CHALLENGE 2
  }
  if (description !== null) {
    // CHALLENGE 2: "Maximum!" after the description when the die shows its highest number
    const extra = die.isMaximum() ? " - Maximum!" : "";
    description.textContent = `${die}${extra}`; // the template literal calls die.toString()
  }
  if (historyList !== null) {
    // slice(-HISTORY_LENGTH) is a copy of just the last few rolls.
    const recent = history.slice(-HISTORY_LENGTH);
    historyList.textContent = history.length === 0 ? "No rolls yet" : `Last rolls: ${recent.join(", ")}`;
  }
};

sidesChoice?.addEventListener("change", () => {
  die = new Die(Number(sidesChoice.value));
  history = [];
  render();
});

rollButton?.addEventListener("click", () => {
  // The only place Math.random() is called: the Die is given the number, so it can be tested.
  const value = die.roll(Math.random());
  history.push(value);
  render();
});

render();
