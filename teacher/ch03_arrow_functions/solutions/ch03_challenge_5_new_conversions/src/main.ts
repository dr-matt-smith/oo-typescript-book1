// A unit converter. The drop-down list chooses which conversion FUNCTION to use; the page then
// calls it on the number typed in, and on a few example values.

import { CONVERTERS, convertAll, describeConversion, findConverter, roundTo2 } from "./converters.ts";

const EXAMPLES: number[] = [1, 5, 10, 100];

const choice = document.querySelector<HTMLSelectElement>("#converter");
const input = document.querySelector<HTMLInputElement>("#value");
const result = document.querySelector<HTMLElement>("#result");
const examples = document.querySelector<HTMLElement>("#examples");

// Fill the drop-down list: one <option> for each converter.
if (choice !== null) {
  choice.innerHTML = CONVERTERS.map((c) => `<option>${c.name}</option>`).join("");
}

const render = (): void => {
  if (choice === null || input === null || result === null || examples === null) {
    return;
  }
  const converter = findConverter(choice.value);
  if (converter === undefined) {
    return;
  }
  result.textContent = describeConversion(Number(input.value), converter);

  const converted = convertAll(EXAMPLES, converter.convert);
  examples.innerHTML = EXAMPLES
    .map((value, i) => `<tr><td>${value} ${converter.from}</td><td>${roundTo2(converted[i])} ${converter.to}</td></tr>`)
    .join("");
};

choice?.addEventListener("change", render);
input?.addEventListener("input", render);

render();
