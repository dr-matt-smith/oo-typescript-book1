// Shows a table of temperatures: Celsius, Fahrenheit, and how each one feels.

import { describe, roundToTenth, toFahrenheit, toKelvin } from "./temperature.ts"; // CHALLENGE 1: toKelvin

const TEMPERATURES: number[] = [-10, 0, 15, 22, 37, 100];

const rows = document.querySelector("#rows");
if (rows !== null) {
  for (const celsius of TEMPERATURES) {
    const row = document.createElement("tr");
    // CHALLENGE 1: a Kelvin column
    row.innerHTML = `<td>${celsius} °C</td><td>${roundToTenth(toFahrenheit(celsius))} °F</td><td>${roundToTenth(toKelvin(celsius))} K</td><td>${describe(celsius)}</td>`;
    rows.appendChild(row);
  }
}
