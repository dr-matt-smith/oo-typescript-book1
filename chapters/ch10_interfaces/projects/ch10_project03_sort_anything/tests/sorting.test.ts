// Tests for src/sorting.ts - developed test first in the chapter. The items are object literals:
// quick fakes with just a label and a key, which is all a Sortable needs.

import { assertEquals } from "@std/assert";
import type { Sortable } from "../src/Sortable.ts";
import { labels, sortAll } from "../src/sorting.ts";

/** A fake Sortable with a label and a key. */
const item = (label: string, key: number): Sortable => ({
  label: () => label,
  sortKey: () => key,
});

Deno.test("sortAll puts the smallest key first", () => {
  const items = [item("c", 3), item("a", 1), item("b", 2)];
  assertEquals(labels(sortAll(items)), ["a", "b", "c"]);
});

Deno.test("sortAll works with negative keys", () => {
  const items = [item("small", -10), item("big", -500)];
  assertEquals(labels(sortAll(items)), ["big", "small"]);
});

Deno.test("sortAll leaves the original array as it was", () => {
  const items = [item("c", 3), item("a", 1)];
  sortAll(items);
  assertEquals(labels(items), ["c", "a"]);
});

Deno.test("sorting no items gives no items", () => {
  assertEquals(sortAll([]), []);
});
