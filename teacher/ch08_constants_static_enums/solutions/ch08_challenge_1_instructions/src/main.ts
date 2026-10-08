// Shows one traffic light on the page. The Next button moves it on; the checkbox makes it change by
// itself, staying on each colour for TrafficLight.SECONDS of that colour.
// main.ts is the only file that touches the page.

import { colourName, instruction } from "./light_colour.ts"; // CHALLENGE 1
import { LAMPS, TrafficLight } from "./TrafficLight.ts";

// A module-level const: a plain value that is never reassigned. No class needed.
const MILLISECONDS_PER_SECOND = 1000;

const light = new TrafficLight("Main Street");

// The timer for "change by itself", or null when it is off.
let timer: number | null = null;

const nameText = document.querySelector<HTMLElement>("#light-name");
const colourText = document.querySelector<HTMLElement>("#colour");
const secondsText = document.querySelector<HTMLElement>("#seconds");
const instructionText = document.querySelector<HTMLElement>("#instruction"); // CHALLENGE 1
const nextButton = document.querySelector<HTMLButtonElement>("#next");
const autoBox = document.querySelector<HTMLInputElement>("#auto");

const render = (): void => {
  for (const lamp of LAMPS) {
    // The lamps' ids are made from the Lamp values: #lamp-red, #lamp-amber, #lamp-green.
    document.querySelector(`#lamp-${lamp}`)?.classList.toggle("lit", light.isLit(lamp));
  }
  if (nameText !== null) {
    nameText.textContent = light.name;
  }
  if (colourText !== null) {
    colourText.textContent = colourName(light.getColour());
  }
  // CHALLENGE 1
  if (instructionText !== null) {
    instructionText.textContent = instruction(light.getColour());
  }
  if (secondsText !== null) {
    secondsText.textContent = `This colour stays on for ${light.secondsShowing()} seconds.`;
  }
};

/** Moves the light on, and - if it is changing by itself - sets a timer for the next change. */
const step = (): void => {
  light.next();
  render();
  if (timer !== null) {
    scheduleNext();
  }
};

const scheduleNext = (): void => {
  // Clear any timer already waiting, so pressing Next while it changes by itself never sets two.
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(step, light.secondsShowing() * MILLISECONDS_PER_SECOND);
};

nextButton?.addEventListener("click", () => step());

autoBox?.addEventListener("change", () => {
  if (autoBox.checked) {
    scheduleNext();
  } else if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
});

render();
