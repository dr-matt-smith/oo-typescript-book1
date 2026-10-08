// Tests for src/light_colour.ts. A union has only a few values, so the tests can check every one.

import { assertEquals } from "@std/assert";
import { colourName, LIGHT_COLOURS, nextColour } from "../src/light_colour.ts";

Deno.test("after red comes red and amber", () => {
  assertEquals(nextColour("red"), "red-amber");
});

Deno.test("after red and amber comes green", () => {
  assertEquals(nextColour("red-amber"), "green");
});

Deno.test("after green comes amber", () => {
  assertEquals(nextColour("green"), "amber");
});

Deno.test("after amber comes red", () => {
  assertEquals(nextColour("amber"), "red");
});

Deno.test("every colour comes back to itself after four steps", () => {
  for (const colour of LIGHT_COLOURS) {
    const afterFour = nextColour(nextColour(nextColour(nextColour(colour))));
    assertEquals(afterFour, colour);
  }
});

Deno.test("the four steps visit every colour exactly once", () => {
  const visited: string[] = [];
  let colour = LIGHT_COLOURS[0];
  for (let step = 0; step < LIGHT_COLOURS.length; step++) {
    visited.push(colour);
    colour = nextColour(colour);
  }
  assertEquals(visited, LIGHT_COLOURS);
});

Deno.test("every colour has a name to show", () => {
  for (const colour of LIGHT_COLOURS) {
    assertEquals(colourName(colour).length > 0, true);
  }
});

Deno.test("red and amber is named in words", () => {
  assertEquals(colourName("red-amber"), "Red and amber");
});
