// Tests for src/Circle.ts.

import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Circle } from "../src/Circle.ts";
import type { Shape } from "../src/Shape.ts";
import { recordingPen } from "./recording_pen.ts";

Deno.test("a circle of radius 1 has an area of pi", () => {
  const circle = new Circle(0, 0, 1, "red");
  assertAlmostEquals(circle.area(), Math.PI);
});

Deno.test("a circle of radius 10 has a perimeter of 20 pi", () => {
  const circle = new Circle(0, 0, 10, "red");
  assertAlmostEquals(circle.perimeter(), 20 * Math.PI);
});

Deno.test("a circle is a Shape called Circle", () => {
  const shape: Shape = new Circle(0, 0, 10, "red");
  assertEquals(shape.name, "Circle");
  assertEquals(shape.colour, "red");
});

Deno.test("a circle draws one whole arc round its centre, then fills it", () => {
  const recorder = recordingPen();
  new Circle(60, 50, 40, "red").draw(recorder.pen);
  assertEquals(recorder.calls, ["beginPath", "arc 60 50 40 0 6.28", "fill"]);
});
