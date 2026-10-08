// Tests for src/shapes.ts. The shapes here are object literals - quick fakes with exactly the
// numbers each test needs. TypeScript accepts them as Shapes because they have the right shape.

import { assertEquals } from "@std/assert";
import { largestShape, oneDecimal, totalArea } from "../src/shapes.ts"; // CHALLENGE 3
import type { Shape } from "../src/Shape.ts";

/** A fake shape with a given area. It cannot draw, and does not need to. */
const fakeShape = (area: number, name: string = "fake"): Shape => ({ // CHALLENGE 3: a name, to tell them apart
  name,
  colour: "black",
  area: () => area,
  perimeter: () => 0,
  draw: () => {},
});

Deno.test("the total area of no shapes is 0", () => {
  assertEquals(totalArea([]), 0);
});

Deno.test("the total area adds up every shape's area", () => {
  assertEquals(totalArea([fakeShape(10), fakeShape(5), fakeShape(2.5)]), 17.5);
});

Deno.test("numbers are shown with one decimal place", () => {
  assertEquals(oneDecimal(Math.PI), "3.1");
  assertEquals(oneDecimal(12), "12.0");
});

// CHALLENGE 3
Deno.test("there is no largest shape when there are no shapes", () => {
  assertEquals(largestShape([]), undefined);
});

Deno.test("the largest shape is the one with the biggest area", () => {
  const shapes = [fakeShape(10, "small"), fakeShape(50, "big"), fakeShape(20, "middle")];
  assertEquals(largestShape(shapes)?.name, "big");
});

Deno.test("the largest shape can be the last one", () => {
  const shapes = [fakeShape(1, "a"), fakeShape(2, "b")];
  assertEquals(largestShape(shapes)?.name, "b");
});

Deno.test("when two shapes tie for largest, the first one wins", () => {
  const shapes = [fakeShape(5, "first"), fakeShape(5, "second")];
  assertEquals(largestShape(shapes)?.name, "first");
});
