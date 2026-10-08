// Tests for src/diet.ts. Each union has only three values, so the tests check every one.

import { assertEquals, assertThrows } from "@std/assert";
import { COURSES, DIETS, dietLabel, suits, toCourse, toDiet } from "../src/diet.ts";

Deno.test("every diet turns back into itself", () => {
  for (const diet of DIETS) {
    assertEquals(toDiet(diet), diet);
  }
});

Deno.test("a string that is not a diet is rejected", () => {
  // CHALLENGE 2: pescatarian is a diet now, so test with something that is not
  assertThrows(() => toDiet("fruitarian"), Error, `"fruitarian" is not a diet`);
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
  assertEquals(labels, ["Vegan", "Vegetarian", "Pescatarian", "Contains meat"]); // CHALLENGE 2
});

Deno.test("a vegan eats only vegan dishes", () => {
  assertEquals(DIETS.map((dish) => suits(dish, "vegan")), [true, false, false, false]); // CHALLENGE 2
});

Deno.test("a vegetarian eats vegan and vegetarian dishes", () => {
  assertEquals(DIETS.map((dish) => suits(dish, "vegetarian")), [true, true, false, false]); // CHALLENGE 2
});

Deno.test("a meat eater eats every dish", () => {
  assertEquals(DIETS.map((dish) => suits(dish, "meat")), [true, true, true, true]); // CHALLENGE 2
});

// CHALLENGE 2
Deno.test("a pescatarian eats vegan, vegetarian and fish dishes, but not meat", () => {
  assertEquals(DIETS.map((dish) => suits(dish, "pescatarian")), [true, true, true, false]);
});

Deno.test("a vegetarian does not eat fish", () => {
  assertEquals(suits("pescatarian", "vegetarian"), false);
});
