// Tests for src/Triangle.ts. A base of 6 and a height of 4 makes sloping sides of exactly 5 (3-4-5).

import { assertEquals } from "@std/assert";
import { Triangle } from "../src/Triangle.ts";
import { recordingPen } from "./recording_pen.ts";

Deno.test("a triangle's area is half its base times its height", () => {
  const triangle = new Triangle(0, 0, 6, 4, "green");
  assertEquals(triangle.area(), 12);
});

Deno.test("a triangle with base 6 and height 4 has a perimeter of 16", () => {
  const triangle = new Triangle(0, 0, 6, 4, "green");
  assertEquals(triangle.perimeter(), 16);
});

Deno.test("a triangle is drawn base first, then up to its point", () => {
  const recorder = recordingPen();
  new Triangle(10, 10, 6, 4, "green").draw(recorder.pen);
  assertEquals(recorder.calls, ["beginPath", "moveTo 7 12", "lineTo 13 12", "lineTo 10 8", "closePath", "fill"]);
});
