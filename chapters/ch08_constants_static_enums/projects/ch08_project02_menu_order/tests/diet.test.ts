// Tests for src/diet.ts. Each union has only three values, so the tests check every one.

import { assertEquals, assertThrows } from "@std/assert";
import { COURSES, DIETS, dietLabel, suits, toCourse, toDiet } from "../src/diet.ts";

Deno.test("every diet turns back into itself", () => {
  for (const diet of DIETS) {
    assertEquals(toDiet(diet), diet);
  }
});

Deno.test("a string that is not a diet is rejected", () => {
  assertThrows(() => toDiet("pescatarian"), Error, `"pescatarian" is not a diet`);
});

Deno.test("diets are case sensitive: Vegan with a capital is rejected", () => {
  assertThrows(() => toDiet("Vegan"), Error);
});

Deno.test("every course turns back into itself", () => {
  for (const course of COURSES) {
    assertEquals(toCourse(course), course);
  }
});

Deno.test("a string that is not a course is rejected", () => {
  assertThrows(() => toCourse("pudding"), Error, `"pudding" is not a course`);
});

Deno.test("every diet has its own label", () => {
  const labels = DIETS.map((diet) => dietLabel(diet));
  assertEquals(labels, ["Vegan", "Vegetarian", "Contains meat"]);
});

Deno.test("a vegan eats only vegan dishes", () => {
  assertEquals(DIETS.map((dish) => suits(dish, "vegan")), [true, false, false]);
});

Deno.test("a vegetarian eats vegan and vegetarian dishes", () => {
  assertEquals(DIETS.map((dish) => suits(dish, "vegetarian")), [true, true, false]);
});

Deno.test("a meat eater eats every dish", () => {
  assertEquals(DIETS.map((dish) => suits(dish, "meat")), [true, true, true]);
});
