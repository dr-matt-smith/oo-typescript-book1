// Tests for src/light_colour.ts. A union has only a few values, so the tests can check every one.

import { assertEquals } from "@std/assert";
import { colourName, instruction, LIGHT_COLOURS, nextColour } from "../src/light_colour.ts";

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

// CHALLENGE 1
Deno.test("at red, drivers stop", () => {
  assertEquals(instruction("red"), "Stop");
});

Deno.test("at red and amber, drivers stop and get ready", () => {
  assertEquals(instruction("red-amber"), "Stop - get ready to go");
});

Deno.test("at green, drivers go if the way is clear", () => {
  assertEquals(instruction("green"), "Go if the way is clear");
});

Deno.test("at amber, drivers stop unless it is unsafe", () => {
  assertEquals(instruction("amber"), "Stop unless it is unsafe to do so");
});

Deno.test("every colour has an instruction", () => {
  for (const colour of LIGHT_COLOURS) {
    assertEquals(instruction(colour).length > 0, true);
  }
});
