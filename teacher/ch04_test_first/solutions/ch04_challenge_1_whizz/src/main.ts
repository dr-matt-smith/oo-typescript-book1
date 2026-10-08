// Shows the FizzBuzz answers from 1 up to the number in the box, redrawn as the number changes.
// main.ts is the only file that touches the page; the rules are in fizz_buzz.ts, and tested.

import { fizzBuzzUpTo } from "./fizz_buzz.ts";

// Big enough to see the pattern, small enough not to fill the page by accident.
const LARGEST_COUNT = 100;

const countBox = document.querySelector<HTMLInputElement>("#count");
const answersList = document.querySelector<HTMLElement>("#answers");

/** The CSS class for one answer, so Fizz, Buzz and FizzBuzz get their own colours. */
const classFor = (answer: string): string => {
  if (answer === "FizzBuzz" || answer === "Fizz" || answer === "Buzz") {
    return answer.toLowerCase();
  }
  // CHALLENGE 1: anything else with a word in it contains Whizz
  if (answer.includes("Whizz")) {
    return "whizz";
  }
  return "number";
};

const render = (): void => {
  if (countBox === null || answersList === null) {
    return;
  }
  const count = Math.min(Number(countBox.value), LARGEST_COUNT);
  answersList.innerHTML = "";
  for (const answer of fizzBuzzUpTo(count)) {
    const item = document.createElement("li");
    item.textContent = answer;
    item.classList.add(classFor(answer));
    answersList.appendChild(item);
  }
};

countBox?.addEventListener("input", () => render());
render();
