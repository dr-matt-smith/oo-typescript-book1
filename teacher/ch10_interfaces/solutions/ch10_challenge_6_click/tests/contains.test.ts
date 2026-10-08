// CHALLENGE 6: tests for contains(x, y) in each shape - inside, on the edge, and just outside.

import { assertEquals } from "@std/assert";
import { Circle } from "../src/Circle.ts";
import { Rectangle } from "../src/Rectangle.ts";
import { Triangle } from "../src/Triangle.ts";

Deno.test("a circle contains its centre and points on its edge", () => {
  const circle = new Circle(0, 0, 10, "red");
  assertEquals(circle.contains(0, 0), true);
  assertEquals(circle.contains(10, 0), true);
  assertEquals(circle.contains(7, 7), true);
});

Deno.test("a circle does not contain points just outside it", () => {
  const circle = new Circle(0, 0, 10, "red");
  assertEquals(circle.contains(10.1, 0), false);
  assertEquals(circle.contains(8, 8), false); // inside the square round it, outside the circle
});

Deno.test("a rectangle contains its centre and its corners", () => {
  const rectangle = new Rectangle(100, 50, 40, 20, "blue");
  assertEquals(rectangle.contains(100, 50), true);
  assertEquals(rectangle.contains(80, 40), true);
  assertEquals(rectangle.contains(120, 60), true);
});

Deno.test("a rectangle does not contain points just outside each edge", () => {
  const rectangle = new Rectangle(100, 50, 40, 20, "blue");
  assertEquals(rectangle.contains(79.9, 50), false);
  assertEquals(rectangle.contains(120.1, 50), false);
  assertEquals(rectangle.contains(100, 39.9), false);
  assertEquals(rectangle.contains(100, 60.1), false);
});

Deno.test("a triangle contains its centre and the ends of its base", () => {
  const triangle = new Triangle(10, 10, 6, 4, "green");
  assertEquals(triangle.contains(10, 10), true);
  assertEquals(triangle.contains(7, 12), true);
  assertEquals(triangle.contains(13, 12), true);
});

Deno.test("a triangle does not contain points beside its sloping sides", () => {
  // half way up, the triangle is 3 wide: from 8.5 to 11.5
  const triangle = new Triangle(10, 10, 6, 4, "green");
  assertEquals(triangle.contains(11.5, 10), true);
  assertEquals(triangle.contains(11.6, 10), false);
  assertEquals(triangle.contains(8.4, 10), false);
});

Deno.test("a triangle does not contain points above or below it", () => {
  const triangle = new Triangle(10, 10, 6, 4, "green");
  assertEquals(triangle.contains(10, 7.9), false);
  assertEquals(triangle.contains(10, 12.1), false);
});
