// Tests for src/converters.ts

import { assertAlmostEquals, assertEquals } from "@std/assert";
import { CONVERTERS, convertAll, describeConversion, findConverter } from "../src/converters.ts";

Deno.test("there is a converter for each conversion", () => {
  assertEquals(CONVERTERS.length, 4);
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
