// Shows a number as a Roman numeral, as you type, plus a few years for comparison.
// main.ts is the only file that touches the page; the conversion is in roman.ts, and tested.

import { canBeRoman, fromRoman, toRoman } from "./roman.ts"; // CHALLENGE 4: fromRoman

const EXAMPLE_YEARS: number[] = [1066, 1776, 1916, 1999, 2000, 2026];

const numberBox = document.querySelector<HTMLInputElement>("#number");
const numeral = document.querySelector<HTMLElement>("#numeral");
const examples = document.querySelector<HTMLElement>("#examples");
const numeralBox = document.querySelector<HTMLInputElement>("#numeral-box"); // CHALLENGE 4
const number = document.querySelector<HTMLElement>("#number-out"); // CHALLENGE 4

const render = (): void => {
  if (numberBox === null || numeral === null) {
    return;
  }
  const n = Number(numberBox.value);
  // toRoman only promises to work for numbers that canBeRoman accepts, so the page checks first.
  if (canBeRoman(n)) {
    numeral.textContent = toRoman(n);
    numeral.classList.remove("bad");
  } else {
    numeral.textContent = "Roman numerals go from 1 to 3999";
    numeral.classList.add("bad");
  }
};

if (examples !== null) {
  examples.innerHTML = EXAMPLE_YEARS
    .map((year) => `<tr><td>${year}</td><td>${toRoman(year)}</td></tr>`)
    .join("");
}

// CHALLENGE 4: the other direction. Capitals are what fromRoman expects, so the box's text is made upper case.
const renderNumber = (): void => {
  if (numeralBox === null || number === null) {
    return;
  }
  number.textContent = `${fromRoman(numeralBox.value.toUpperCase())}`;
};

numberBox?.addEventListener("input", () => render());
numeralBox?.addEventListener("input", () => renderNumber()); // CHALLENGE 4
render();
renderNumber(); // CHALLENGE 4
