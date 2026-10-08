// Tests for src/temperature.ts. Notice that each test's code is itself an arrow function: () => { ... }

import { assertAlmostEquals, assertEquals } from "@std/assert";
import { describe, roundToTenth, toCelsius, toFahrenheit, toKelvin } from "../src/temperature.ts";

Deno.test("water freezes at 32 °F", () => {
  assertEquals(toFahrenheit(0), 32);
});

Deno.test("water boils at 212 °F", () => {
  assertEquals(toFahrenheit(100), 212);
});

// Numbers with decimal places are not always exact in a computer, so compare them "almost":
// assertAlmostEquals passes if the two numbers are very close.
Deno.test("36.6 °C is about 97.88 °F", () => {
  assertAlmostEquals(toFahrenheit(36.6), 97.88);
});

Deno.test("-40 is the same in both scales", () => {
  assertEquals(toFahrenheit(-40), -40);
  assertEquals(toCelsius(-40), -40);
});

Deno.test("converting there and back gives the starting value", () => {
  assertAlmostEquals(toCelsius(toFahrenheit(21)), 21);
});

Deno.test("rounding to a tenth", () => {
  assertEquals(roundToTenth(97.88000000000001), 97.9);
  assertEquals(roundToTenth(14.04), 14);
});

Deno.test("below zero is freezing, zero is cold", () => {
  assertEquals(describe(-1), "freezing");
  assertEquals(describe(0), "cold");
});

Deno.test("each band starts where the last one ends", () => {
  assertEquals(describe(9), "cold");
  assertEquals(describe(10), "mild");
  assertEquals(describe(20), "warm");
  assertEquals(describe(30), "hot");
});

// CHALLENGE 1

Deno.test("water freezes at 273.15 K", () => {
  assertAlmostEquals(toKelvin(0), 273.15);
});

Deno.test("water boils at 373.15 K", () => {
  assertAlmostEquals(toKelvin(100), 373.15);
});

Deno.test("absolute zero is 0 K", () => {
  assertAlmostEquals(toKelvin(-273.15), 0);
});
