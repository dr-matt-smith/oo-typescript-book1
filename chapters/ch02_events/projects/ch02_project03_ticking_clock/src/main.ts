// A clock that shows the time, and updates itself every second, until it is paused.
//
// setInterval asks the browser to call a function again and again, every so many milliseconds.
// It gives back an id number, which clearInterval needs to stop it.

import { formatTime } from "./time_format.ts";

const ONE_SECOND_MS = 1000;

const clock = document.querySelector<HTMLElement>("#clock");
const pauseButton = document.querySelector<HTMLButtonElement>("#pause");
const status = document.querySelector<HTMLElement>("#status");

// The id of the running interval, or null when the clock is paused. let, because it changes.
let timerId: number | null = null;

/** Shows the time now. Called once a second by the timer. */
function showTime(): void {
  const now = new Date();
  if (clock !== null) {
    clock.textContent = formatTime(now.getHours(), now.getMinutes(), now.getSeconds());
  }
}

function start(): void {
  showTime(); // straight away, rather than waiting a second
  timerId = setInterval(showTime, ONE_SECOND_MS);
  if (pauseButton !== null) pauseButton.textContent = "Pause";
  if (status !== null) status.textContent = "Ticking";
}

function pause(): void {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  if (pauseButton !== null) pauseButton.textContent = "Resume";
  if (status !== null) status.textContent = "Paused";
}

/** The button pauses a ticking clock, and resumes a paused one. */
function handlePause(): void {
  if (timerId === null) {
    start();
  } else {
    pause();
  }
}

if (pauseButton !== null) {
  pauseButton.addEventListener("click", handlePause);
}

start();
