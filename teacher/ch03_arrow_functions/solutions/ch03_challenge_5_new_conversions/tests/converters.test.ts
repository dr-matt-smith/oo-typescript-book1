// Tests for src/converters.ts

import { assertAlmostEquals, assertEquals } from "@std/assert";
import { CONVERTERS, convertAll, describeConversion, findConverter } from "../src/converters.ts";

// CHALLENGE 5: counting the converters broke every time one was added. What matters is that each
// one can be found by its own name - so names must be unique - and that each one works (tested below).
Deno.test("every converter has a different name", () => {
  const names = CONVERTERS.map((converter) => converter.name);
  assertEquals(new Set(names).size, names.length);
});

Deno.test("Celsius to Fahrenheit: 100 °C is 212 °F", () => {
  assertEquals(CONVERTERS[0].convert(100), 212);
});

Deno.test("kilometres to miles: 10 km is about 6.21 miles", () => {
  assertAlmostEquals(CONVERTERS[1].convert(10), 6.21371);
});

Deno.test("a converter can be found by its name", () => {
  assertEquals(findConverter("Metres to feet")?.to, "ft");
});

Deno.test("an unknown converter is undefined", () => {
  assertEquals(findConverter("Furlongs to fathoms"), undefined);
});

// convertAll takes ANY function - so a test can hand it a simple one of its own.
Deno.test("convertAll applies the function to every value", () => {
  assertEquals(convertAll([1, 2, 3], (x) => x * 10), [10, 20, 30]);
});

Deno.test("describing a conversion, rounded to 2 places", () => {
  const kmToMiles = CONVERTERS[1];
  assertEquals(describeConversion(10, kmToMiles), "10 km = 6.21 miles");
});

// CHALLENGE 5

/** Converts `value` with the converter called `name` - failing the test if there is no such converter. */
const convert = (name: string, value: number): number => {
  const converter = findConverter(name);
  if (converter === undefined) {
    throw new Error(`There is no converter called "${name}"`);
  }
  return converter.convert(value);
};

Deno.test("miles to kilometres: a marathon is about 42.2 km", () => {
  assertAlmostEquals(convert("Miles to kilometres", 26.2188), 42.195, 0.001);
});

Deno.test("pounds to kilograms: 10 lb is about 4.54 kg", () => {
  assertAlmostEquals(convert("Pounds to kilograms", 10), 4.53592);
});

Deno.test("litres to pints: 1 litre is 1.75975 pints", () => {
  assertAlmostEquals(convert("Litres to pints", 1), 1.75975);
});

Deno.test("converting there and back gives the starting value", () => {
  const there = convert("Kilometres to miles", 10);
  assertAlmostEquals(convert("Miles to kilometres", there), 10, 0.001);
});
