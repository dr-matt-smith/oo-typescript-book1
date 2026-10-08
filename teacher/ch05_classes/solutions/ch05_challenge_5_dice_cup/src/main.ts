// A dice roller: choose how many dice (CHALLENGE 5) and how many sides, press Roll, and see the result and the rolls so far.
// Choosing a different number of sides or dice makes a new DiceCup object with the constructor.

import { DiceCup } from "./DiceCup.ts"; // CHALLENGE 5

/** How many rolls the history shows. */
const HISTORY_LENGTH = 10;

// CHALLENGE 5: a cup of dice instead of one die
let cup = new DiceCup(1);
let history: number[] = [];

const sidesChoice = document.querySelector<HTMLSelectElement>("#sides");
const countChoice = document.querySelector<HTMLSelectElement>("#count"); // CHALLENGE 5
const rollButton = document.querySelector<HTMLButtonElement>("#roll");
const face = document.querySelector<HTMLElement>("#face");
const description = document.querySelector<HTMLElement>("#description");
const historyList = document.querySelector<HTMLElement>("#history");

const render = (): void => {
  // CHALLENGE 5: the big number is the latest total
  const value = history.length === 0 ? null : history[history.length - 1];
  if (face !== null) {
    face.textContent = value === null ? "?" : `${value}`;
  }
  if (description !== null) {
    description.textContent = `${cup}`; // the template literal calls cup.toString()
  }
  if (historyList !== null) {
    // slice(-HISTORY_LENGTH) is a copy of just the last few rolls.
    const recent = history.slice(-HISTORY_LENGTH);
    historyList.textContent = history.length === 0 ? "No rolls yet" : `Last rolls: ${recent.join(", ")}`;
  }
};

// CHALLENGE 5: either choice makes a new cup, from both choices
const newCup = (): void => {
  const count = countChoice === null ? 1 : Number(countChoice.value);
  const sides = sidesChoice === null ? undefined : Number(sidesChoice.value);
  cup = new DiceCup(count, sides);
  history = [];
  render();
};

sidesChoice?.addEventListener("change", newCup);
countChoice?.addEventListener("change", newCup);

rollButton?.addEventListener("click", () => {
  // CHALLENGE 5: Math.random itself (no brackets) is passed, and each die calls it.
  const value = cup.roll(Math.random);
  history.push(value);
  render();
});

render();
