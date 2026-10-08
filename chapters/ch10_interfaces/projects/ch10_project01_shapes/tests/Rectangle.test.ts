// Tests for src/Rectangle.ts - the class developed test first in the chapter.

import { assertEquals } from "@std/assert";
import { Rectangle } from "../src/Rectangle.ts";
import { recordingPen } from "./recording_pen.ts";

Deno.test("a 3 by 4 rectangle has an area of 12", () => {
  const rectangle = new Rectangle(0, 0, 3, 4, "blue");
  assertEquals(rectangle.area(), 12);
});

Deno.test("a 3 by 4 rectangle has a perimeter of 14", () => {
  const rectangle = new Rectangle(0, 0, 3, 4, "blue");
  assertEquals(rectangle.perimeter(), 14);
});

Deno.test("a rectangle is drawn from its top-left corner", () => {
  const recorder = recordingPen();
  new Rectangle(100, 50, 40, 20, "blue").draw(recorder.pen);
  assertEquals(recorder.calls, ["beginPath", "rect 80 40 40 20", "fill"]);
});
