// Tests for src/Dish.ts, and a check of the real menu.json.

import { assertEquals, assertThrows } from "@std/assert";
import { Dish } from "../src/Dish.ts";
import menu from "../src/menu.json" with { type: "json" };

Deno.test("fromData makes a dish from JSON-style data", () => {
  const dish = Dish.fromData({ name: "Tomato soup", course: "starter", diet: "vegan", price: 650 });
  assertEquals(dish.name, "Tomato soup");
  assertEquals(dish.course, "starter");
  assertEquals(dish.diet, "vegan");
  assertEquals(dish.priceInCents, 650);
});

Deno.test("fromData rejects a dish with a misspelt diet", () => {
  assertThrows(
    () => Dish.fromData({ name: "Soup", course: "starter", diet: "vegen", price: 650 }),
    Error,
    `"vegen" is not a diet`,
  );
});

Deno.test("every dish in menu.json has a real course and diet", () => {
  // If anyone mistypes menu.json, this test - not a customer - finds it.
  const dishes = menu.map((data) => Dish.fromData(data));
  assertEquals(dishes.length, menu.length);
});
