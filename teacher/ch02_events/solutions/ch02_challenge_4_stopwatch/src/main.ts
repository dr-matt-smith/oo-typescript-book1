// CHALLENGE 4: a stopwatch, made from the ticking clock. A timer ticks every tenth of a second and
// adds 0.1 s to the elapsed time; Start, Stop and Reset control it.

import { formatElapsed } from "./elapsed.ts";

const TICK_MS = 100;

const display = document.querySelector<HTMLElement>("#clock");
const startButton = document.querySelector<HTMLButtonElement>("#start");
const stopButton = document.querySelector<HTMLButtonElement>("#stop");
const resetButton = document.querySelector<HTMLButtonElement>("#reset");

let elapsedMs = 0;
let timerId: number | null = null;

function render(): void {
  if (display !== null) {
    display.textContent = formatElapsed(elapsedMs);
  }
}

function tick(): void {
  elapsedMs += TICK_MS;
  render();
}

function handleStart(): void {
  if (timerId === null) { // already running? then do nothing - a second timer would double the speed
    timerId = setInterval(tick, TICK_MS);
  }
}

function handleStop(): void {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function handleReset(): void {
  handleStop();
  elapsedMs = 0;
  render();
}

if (startButton !== null) startButton.addEventListener("click", handleStart);
if (stopButton !== null) stopButton.addEventListener("click", handleStop);
if (resetButton !== null) resetButton.addEventListener("click", handleReset);

render();
