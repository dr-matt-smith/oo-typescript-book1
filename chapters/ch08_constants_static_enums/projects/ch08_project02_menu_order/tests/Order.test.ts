// Tests for src/Order.ts.

import { assertEquals } from "@std/assert";
import { Dish } from "../src/Dish.ts";
import { Order } from "../src/Order.ts";

const SOUP = new Dish("Tomato soup", "starter", "vegan", 650);
const CURRY = new Dish("Vegetable curry", "main", "vegan", 1450);

Deno.test("a new order is empty and costs nothing", () => {
  const order = new Order();
  assertEquals(order.getDishes(), []);
  assertEquals(order.totalInCents(), 0);
});

Deno.test("the total is the sum of the dishes' prices", () => {
  const order = new Order();
  order.add(SOUP);
  order.add(CURRY);
  assertEquals(order.totalInCents(), 2100);
});

Deno.test("clear empties the order", () => {
  const order = new Order();
  order.add(SOUP);
  order.clear();
  assertEquals(order.getDishes(), []);
});

Deno.test("formatPrice is called on the class, and shows euros and cents", () => {
  assertEquals(Order.formatPrice(2100), "€21.00");
  assertEquals(Order.formatPrice(695), "€6.95");
  assertEquals(Order.formatPrice(0), "€0.00");
});
