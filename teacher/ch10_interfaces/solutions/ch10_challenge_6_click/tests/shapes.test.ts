// Tests for src/shapes.ts. The shapes here are object literals - quick fakes with exactly the
// numbers each test needs. TypeScript accepts them as Shapes because they have the right shape.

import { assertEquals } from "@std/assert";
import { describe, oneDecimal, shapeAt, totalArea } from "../src/shapes.ts"; // CHALLENGE 6
import type { Shape } from "../src/Shape.ts";

/** A fake shape with a given area. It cannot draw, and does not need to. */
// CHALLENGE 6: a name, and whether it contains every point or none
const fakeShape = (area: number, name: string = "fake", containsAll: boolean = false): Shape => ({
  name,
  colour: "black",
  area: () => area,
  perimeter: () => 0,
  draw: () => {},
  contains: () => containsAll,
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

// CHALLENGE 6
Deno.test("there is no shape at a point when no shape contains it", () => {
  assertEquals(shapeAt([fakeShape(1, "a"), fakeShape(1, "b")], 5, 5), undefined);
});

Deno.test("the shape at a point is the one that contains it", () => {
  const shapes = [fakeShape(1, "miss"), fakeShape(1, "hit", true), fakeShape(1, "miss too")];
  assertEquals(shapeAt(shapes, 5, 5)?.name, "hit");
});

Deno.test("when shapes overlap, the one drawn last (on top) wins", () => {
  const shapes = [fakeShape(1, "underneath", true), fakeShape(1, "on top", true)];
  assertEquals(shapeAt(shapes, 5, 5)?.name, "on top");
});

Deno.test("describe gives a shape's name, area and perimeter", () => {
  assertEquals(describe(fakeShape(78.54, "Blob")), "Blob: area 78.5, perimeter 0.0");
});
