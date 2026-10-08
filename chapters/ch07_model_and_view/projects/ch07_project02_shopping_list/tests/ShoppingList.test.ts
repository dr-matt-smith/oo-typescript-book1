// Tests for the ShoppingList model: its rules, tested without a page.

import { assertEquals, assertThrows } from "@std/assert";
import { ShoppingList } from "../src/ShoppingList.ts";

/** A list with these items already on it - a helper instead of repeating the same lines. */
const listOf = (names: string[]): ShoppingList => {
  const list = new ShoppingList();
  for (const name of names) {
    list.add(name);
  }
  return list;
};

Deno.test("a new list is empty", () => {
  assertEquals(new ShoppingList().size, 0);
  assertEquals(new ShoppingList().all, []);
});

Deno.test("items are kept in the order they were added", () => {
  assertEquals(listOf(["milk", "bread", "eggs"]).all, ["milk", "bread", "eggs"]);
});

Deno.test("spaces round an item are removed", () => {
  assertEquals(listOf(["  milk "]).all, ["milk"]);
});

Deno.test("a blank item is a problem", () => {
  assertEquals(new ShoppingList().problemWith("   "), "Type an item first");
});

Deno.test("an item already on the list is a problem, whatever its case", () => {
  assertEquals(listOf(["Milk"]).problemWith("milk"), "milk is already on the list");
});

Deno.test("a new item is not a problem", () => {
  assertEquals(listOf(["milk"]).problemWith("bread"), null);
});

Deno.test("adding a problem item throws, and leaves the list alone", () => {
  const list = listOf(["milk"]);
  assertThrows(() => list.add("MILK"), Error, "already on the list");
  assertEquals(list.all, ["milk"]);
});

Deno.test("remove takes out the item at that index", () => {
  const list = listOf(["milk", "bread", "eggs"]);
  list.remove(1);
  assertEquals(list.all, ["milk", "eggs"]);
});

Deno.test("removing an index that is not there throws", () => {
  const list = listOf(["milk"]);
  assertThrows(() => list.remove(1), Error, "no item 1");
  assertThrows(() => list.remove(-1), Error, "no item -1");
});

Deno.test("changing the copy from all does not change the list", () => {
  const list = listOf(["milk"]);
  list.all.push("cake");
  assertEquals(list.size, 1);
});
