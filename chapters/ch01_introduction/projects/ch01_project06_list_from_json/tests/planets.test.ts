// Tests for the data, and a first look at JSON.parse - the function that turns JSON text into values.

import { assertEquals } from "@std/assert";
import planets from "../src/planets.json" with { type: "json" };

Deno.test("JSON.parse turns JSON text into an array", () => {
  const text = '["Mercury", "Venus"]';
  const values: string[] = JSON.parse(text);
  assertEquals(values.length, 2);
  assertEquals(values[1], "Venus");
});

Deno.test("planets.json holds eight planets", () => {
  assertEquals(planets.length, 8);
});

Deno.test("the planets are in order from the Sun", () => {
  assertEquals(planets[0], "Mercury");
  assertEquals(planets[7], "Neptune");
});
