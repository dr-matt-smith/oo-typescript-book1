// Tests for src/shapes.ts. The shapes here are object literals - quick fakes with exactly the
// numbers each test needs. TypeScript accepts them as Shapes because they have the right shape.

import { assertEquals } from "@std/assert";
import { oneDecimal, totalArea } from "../src/shapes.ts";
import type { Shape } from "../src/Shape.ts";

/** A fake shape with a given area. It cannot draw, and does not need to. */
const fakeShape = (area: number): Shape => ({
  name: "fake",
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
