// CHALLENGE 2: tests for src/City.ts, written before the class.

import { assertEquals } from "@std/assert";
import { City } from "../src/City.ts";
import { labels, sortAll } from "../src/sorting.ts";

Deno.test("a city's label shows its population with commas", () => {
  assertEquals(new City("Dublin", 592713).label(), "Dublin (592,713)");
});

Deno.test("a small city's label has no comma", () => {
  assertEquals(new City("Tiny", 950).label(), "Tiny (950)");
});

Deno.test("cities sort biggest first", () => {
  const cities = [new City("Galway", 85910), new City("Dublin", 592713), new City("Cork", 224004)];
  assertEquals(labels(sortAll(cities)), ["Dublin (592,713)", "Cork (224,004)", "Galway (85,910)"]);
});
