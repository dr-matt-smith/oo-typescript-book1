// Shows a table of temperatures: Celsius, Fahrenheit, and how each one feels.

import { describe, roundToTenth, toFahrenheit } from "./temperature.ts";

const TEMPERATURES: number[] = [-10, 0, 15, 22, 37, 100];

const rows = document.querySelector("#rows");
if (rows !== null) {
  for (const celsius of TEMPERATURES) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${celsius} °C</td><td>${roundToTenth(toFahrenheit(celsius))} °F</td><td>${describe(celsius)}</td>`;
    rows.appendChild(row);
  }
}
