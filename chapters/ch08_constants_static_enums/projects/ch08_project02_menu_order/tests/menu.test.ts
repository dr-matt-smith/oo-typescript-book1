// Tests for src/menu.ts, with a small made-up menu: one dish of each diet, all mains.

import { assertEquals } from "@std/assert";
import { Dish } from "../src/Dish.ts";
import { dishesFor } from "../src/menu.ts";

const MENU: Dish[] = [
  new Dish("Curry", "main", "vegan", 1450),
  new Dish("Pie", "main", "vegetarian", 1550),
  new Dish("Burger", "main", "meat", 1695),
  new Dish("Soup", "starter", "vegan", 650),
];

const names = (dishes: Dish[]): string[] => dishes.map((dish) => dish.name);

Deno.test("with no diet chosen, every dish of the course is shown", () => {
  assertEquals(names(dishesFor(MENU, "main", null)), ["Curry", "Pie", "Burger"]);
});

Deno.test("a vegetarian sees vegan and vegetarian mains", () => {
  assertEquals(names(dishesFor(MENU, "main", "vegetarian")), ["Curry", "Pie"]);
});

Deno.test("a vegan sees only vegan mains", () => {
  assertEquals(names(dishesFor(MENU, "main", "vegan")), ["Curry"]);
});

Deno.test("a course with nothing suitable gives an empty list", () => {
  assertEquals(dishesFor(MENU, "dessert", null), []);
});
