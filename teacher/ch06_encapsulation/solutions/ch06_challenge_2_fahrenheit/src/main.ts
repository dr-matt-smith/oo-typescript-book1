// A thermostat on the page: - and + buttons for the target, a box to type a target, and a slider
// that stands in for the room's temperature sensor. render() shows the target, the room and
// whether the heating is on - all read from the Thermostat, never worked out here.

import { Thermostat } from "./Thermostat.ts";

const STARTING_ROOM = 17;

const thermostat = new Thermostat(STARTING_ROOM);

const target = document.querySelector<HTMLElement>("#target");
const fahrenheit = document.querySelector<HTMLElement>("#fahrenheit"); // CHALLENGE 2
const room = document.querySelector<HTMLElement>("#room");
const status = document.querySelector<HTMLElement>("#status");
const message = document.querySelector<HTMLElement>("#message");
const roomSlider = document.querySelector<HTMLInputElement>("#room-slider");
const targetBox = document.querySelector<HTMLInputElement>("#target-box");

const render = (): void => {
  if (target !== null) {
    target.textContent = `${thermostat.target.toFixed(1)} °C`;
  }
  // CHALLENGE 2
  if (fahrenheit !== null) {
    fahrenheit.textContent = `${thermostat.targetFahrenheit.toFixed(1)} °F`;
  }
  if (room !== null) {
    room.textContent = `${thermostat.room.toFixed(1)} °C`;
  }
  if (status !== null) {
    status.textContent = thermostat.heating ? "Heating on" : "Heating off";
    status.className = thermostat.heating ? "status on" : "status off";
  }
};

const showMessage = (text: string): void => {
  if (message !== null) {
    message.textContent = text;
  }
};

document.querySelector("#up")?.addEventListener("click", () => {
  thermostat.up();
  render();
});
document.querySelector("#down")?.addEventListener("click", () => {
  thermostat.down();
  render();
});
document.querySelector("#set")?.addEventListener("click", () => {
  // An assignment - but it runs the setter, which may throw.
  try {
    thermostat.target = Number(targetBox?.value);
    showMessage("");
  } catch (error) {
    showMessage(error instanceof Error ? error.message : String(error));
  }
  render();
});
roomSlider?.addEventListener("input", () => {
  thermostat.room = Number(roomSlider.value);
  render();
});

render();
