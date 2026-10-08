// A password box with a live checklist: each rule is ticked as soon as the password meets it.
// main.ts is the only file that touches the page; the rules and the checker are tested.

import { PasswordChecker } from "./PasswordChecker.ts";
import { STANDARD_RULES } from "./rules.ts";

const checker = new PasswordChecker(STANDARD_RULES);

const passwordBox = document.querySelector<HTMLInputElement>("#password");
const showBox = document.querySelector<HTMLInputElement>("#show");
const checklist = document.querySelector<HTMLElement>("#checklist");
const verdict = document.querySelector<HTMLElement>("#verdict");

const render = (): void => {
  if (passwordBox === null || checklist === null || verdict === null) {
    return;
  }
  const password = passwordBox.value;
  checklist.innerHTML = "";
  for (const rule of STANDARD_RULES) {
    const item = document.createElement("li");
    const met = rule.isMetBy(password);
    item.textContent = `${met ? "✓" : "✗"} ${rule.description}`;
    item.classList.add(met ? "good" : "bad");
    checklist.appendChild(item);
  }
  const acceptable = checker.isAcceptable(password);
  verdict.textContent = acceptable ? "Good password" : "Not yet";
  verdict.className = acceptable ? "verdict good" : "verdict bad";
};

passwordBox?.addEventListener("input", () => render());
// The password is hidden by default; the checkbox swaps the box between "password" and "text".
showBox?.addEventListener("change", () => {
  if (passwordBox !== null) {
    passwordBox.type = showBox.checked ? "text" : "password";
  }
});
render();
