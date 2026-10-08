// The entry point. build.ts bundles this file (and the files it imports) into dist/app.js,
// which dist/index.html loads with a <script> tag.
//
// main.ts is the only file that touches the page. The logic is in greeting.ts, where it can be tested.

import { greeting } from "./greeting.ts";
import { FACTS } from "./facts.ts";

const NAME = "Ada"; // CHALLENGE 1: my own name

// new Date() is "now"; getHours() gives the hour, 0 to 23.
const now = new Date();
const hour: number = now.getHours();

// querySelector finds the first element matching a CSS selector - or gives null if there is none,
// so TypeScript insists we check before using it.
const heading = document.querySelector<HTMLHeadingElement>("#greeting");
if (heading !== null) {
  heading.textContent = greeting(NAME, hour);
}

const time = document.querySelector<HTMLSpanElement>("#time");
if (time !== null) {
  time.textContent = now.toLocaleTimeString();
}

// One <li> for each fact in the array.
const list = document.querySelector<HTMLUListElement>("#facts");
if (list !== null) {
  for (const fact of FACTS) {
    const item = document.createElement("li");
    item.textContent = fact;
    list.appendChild(item);
  }
}

const count = document.querySelector<HTMLSpanElement>("#fact-count");
if (count !== null) {
  count.textContent = `${FACTS.length}`;
}
