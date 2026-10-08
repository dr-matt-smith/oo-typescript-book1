// Shows a greeting that depends on the time of day. The deciding is done by greeting(), in
// greeting.ts; main.ts just puts the answer on the page.

import { greeting } from "./greeting.ts";

const now = new Date();
const hour: number = now.getHours();

const message = document.querySelector("#message");
if (message !== null) {
  message.textContent = `${greeting(hour)}!`;
}

const time = document.querySelector("#time");
if (time !== null) {
  time.textContent = `The time is ${now.toLocaleTimeString()}`;
}
