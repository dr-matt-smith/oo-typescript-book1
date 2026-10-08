// Shows a junction of two traffic lights on the page. The Next button moves the junction on; the
// checkbox makes it change by itself, each phase lasting as long as its changing light's colour.
// main.ts is the only file that touches the page.
// CHALLENGE 6: rewritten for a Junction of two lights.

import { Junction } from "./Junction.ts";
import { colourName } from "./light_colour.ts";
import { LAMPS, type TrafficLight } from "./TrafficLight.ts";

// A module-level const: a plain value that is never reassigned. No class needed.
const MILLISECONDS_PER_SECOND = 1000;

const junction = new Junction();

// The timer for "change by itself", or null when it is off.
let timer: number | null = null;

const phaseText = document.querySelector<HTMLElement>("#phase");
const nextButton = document.querySelector<HTMLButtonElement>("#next");
const autoBox = document.querySelector<HTMLInputElement>("#auto");

/** Shows one light. `id` is the start of its elements' ids: "ns" or "ew". */
const renderLight = (light: TrafficLight, id: string): void => {
  for (const lamp of LAMPS) {
    document.querySelector(`#${id}-lamp-${lamp}`)?.classList.toggle("lit", light.isLit(lamp));
  }
  const name = document.querySelector<HTMLElement>(`#${id}-name`);
  if (name !== null) {
    name.textContent = light.name;
  }
  const colour = document.querySelector<HTMLElement>(`#${id}-colour`);
  if (colour !== null) {
    colour.textContent = colourName(light.getColour());
  }
};

/** How long the current phase lasts: as long as whichever light is not simply red. */
const secondsShowing = (): number =>
  junction.northSouth.getColour() === "red" ? junction.eastWest.secondsShowing() : junction.northSouth.secondsShowing();

const render = (): void => {
  renderLight(junction.northSouth, "ns");
  renderLight(junction.eastWest, "ew");
  if (phaseText !== null) {
    phaseText.textContent = `Phase: ${junction.getPhase()}`;
  }
};

/** Moves the junction on, and - if it is changing by itself - sets a timer for the next change. */
const step = (): void => {
  junction.next();
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
  timer = setTimeout(step, secondsShowing() * MILLISECONDS_PER_SECOND);
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
