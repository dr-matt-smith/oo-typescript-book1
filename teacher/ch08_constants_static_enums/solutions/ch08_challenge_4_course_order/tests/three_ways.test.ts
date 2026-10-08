// How the three ways of writing a fixed set of values behave. These tests document TypeScript
// itself rather than this project's code - read them alongside src/three_ways.ts.

import { assertEquals } from "@std/assert";
import { Diet, DIET_VALUES, type DietUnion, DietEnum, NumberedCourse } from "../src/three_ways.ts";

Deno.test("an enum member with a string value is that string at run time", () => {
  assertEquals(DietEnum.Vegan, "vegan");
});

Deno.test("a string enum is a real object, so its values can be listed", () => {
  assertEquals(Object.values(DietEnum), ["vegan", "vegetarian", "meat"]);
});

Deno.test("enum members without values are numbered from 0", () => {
  assertEquals(NumberedCourse.Starter, 0);
  assertEquals(NumberedCourse.Dessert, 2);
});

Deno.test("a numbered enum also maps the numbers back to the names", () => {
  assertEquals(NumberedCourse[1], "Main");
  // A surprise: listing its keys gives the numbers as well as the names.
  assertEquals(Object.keys(NumberedCourse), ["0", "1", "2", "Starter", "Main", "Dessert"]);
});

Deno.test("a union value is just a string", () => {
  const diet: DietUnion = "vegan";
  assertEquals(diet, "vegan");
});

Deno.test("an as const array keeps its values for run time", () => {
  assertEquals(DIET_VALUES, ["vegan", "vegetarian", "meat"]);
});

Deno.test("an as const object gives enum-style names for plain strings", () => {
  const diet: Diet = Diet.Vegan;
  assertEquals(diet, "vegan");
  assertEquals(Object.values(Diet), ["vegan", "vegetarian", "meat"]);
});
