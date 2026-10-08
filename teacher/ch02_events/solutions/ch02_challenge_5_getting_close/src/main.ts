// Counts characters as you type. Two events:
//   "input"   - the text in the box changed (typing, deleting, pasting ...)
//   "keydown" - a key was pressed; the listener is given an event object saying which key

import { charactersLeft, describeLeft, LIMIT, status } from "./characters.ts";

const box = document.querySelector<HTMLTextAreaElement>("#message");
const counter = document.querySelector<HTMLElement>("#counter");

/** Shows how many characters are left: orange when close to the limit, red when over it. */
function render(): void {
  if (box === null || counter === null) {
    return;
  }
  const left = charactersLeft(box.value, LIMIT);
  counter.textContent = describeLeft(left);
  counter.className = status(left); // CHALLENGE 5: "ok", "warning" or "over" - see styles.css
}

function handleInput(): void {
  render();
}

/** Escape clears the box. Every key press comes here, so check which key it was. */
function handleKey(event: KeyboardEvent): void {
  if (event.key === "Escape" && box !== null) {
    box.value = "";
    render();
  }
}

if (box !== null) {
  box.addEventListener("input", handleInput);
  box.addEventListener("keydown", handleKey);
}

render();
