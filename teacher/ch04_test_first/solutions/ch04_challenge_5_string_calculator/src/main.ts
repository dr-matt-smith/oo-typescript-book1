// CHALLENGE 5 (the whole file is new): a text box of numbers and their total, updated as you type.
// main.ts is the only file that touches the page; add is in string_calculator.ts, and tested.

import { add } from "./string_calculator.ts";

const numbersBox = document.querySelector<HTMLTextAreaElement>("#numbers");
const total = document.querySelector<HTMLElement>("#total");

const render = (): void => {
  if (numbersBox === null || total === null) {
    return;
  }
  // add throws for negative numbers; the page shows the error's message instead of a total.
  try {
    total.textContent = `Total: ${add(numbersBox.value)}`;
    total.classList.remove("bad");
  } catch (error) {
    total.textContent = error instanceof Error ? error.message : String(error);
    total.classList.add("bad");
  }
};

numbersBox?.addEventListener("input", () => render());
render();
