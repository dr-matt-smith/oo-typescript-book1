// CHALLENGE 1: tests for src/Square.ts, written before the class.

import { assertEquals } from "@std/assert";
import type { Shape } from "../src/Shape.ts";
import { Square } from "../src/Square.ts";
import { recordingPen } from "./recording_pen.ts";

Deno.test("a square of side 5 has an area of 25", () => {
  assertEquals(new Square(0, 0, 5, "red").area(), 25);
});

Deno.test("a square of side 5 has a perimeter of 20", () => {
  assertEquals(new Square(0, 0, 5, "red").perimeter(), 20);
});

Deno.test("a square is a Shape called Square", () => {
  const shape: Shape = new Square(0, 0, 5, "red");
  assertEquals(shape.name, "Square");
});

Deno.test("a square is drawn from its top-left corner", () => {
  const recorder = recordingPen();
  new Square(100, 50, 40, "red").draw(recorder.pen);
  assertEquals(recorder.calls, ["beginPath", "rect 80 30 40 40", "fill"]);
});
