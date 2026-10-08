// Tests for src/basket.ts. Every test makes its own fresh basket with makeBasket(), so no test can
// change the data another test uses.

import { assertEquals, assertNotStrictEquals, assertStrictEquals } from "@std/assert";
import { addItem, copyBasket, copyCode, describeBasket, type Item, oneMore, sharing, withItem, withoutItem } from "../src/basket.ts";

/** A new basket every time it is called - new array, new item objects. */
const makeBasket = (): Item[] => [
  { name: "bread", quantity: 1 },
  { name: "milk", quantity: 2 },
];

const EGGS: Item = { name: "eggs", quantity: 6 };

Deno.test("same array: B is A, so adding to B adds to A", () => {
  const a = makeBasket();
  const b = copyBasket(a, "same array");
  addItem(b, EGGS);
  assertStrictEquals(b, a);
  assertEquals(a.length, 3);
});

Deno.test("spread copy: adding to B leaves A as it was", () => {
  const a = makeBasket();
  const b = copyBasket(a, "spread copy");
  addItem(b, EGGS);
  assertNotStrictEquals(b, a);
  assertEquals(a.length, 2);
});

Deno.test("spread copy: the items are still shared, so one more milk in B is one more in A", () => {
  const a = makeBasket();
  const b = copyBasket(a, "spread copy");
  oneMore(b, 1);
  assertStrictEquals(b[1], a[1]);
  assertEquals(a[1].quantity, 3);
});

Deno.test("structuredClone: changing B's items leaves A's alone", () => {
  const a = makeBasket();
  const b = copyBasket(a, "structuredClone");
  oneMore(b, 1);
  assertEquals(a[1].quantity, 2);
  assertEquals(b[1].quantity, 3);
});

Deno.test("structuredClone: B is equal to A, but not the same objects", () => {
  const a = makeBasket();
  const b = copyBasket(a, "structuredClone");
  assertEquals(b, a);
  assertNotStrictEquals(b, a);
  assertNotStrictEquals(b[0], a[0]);
});

Deno.test("oneMore with no item at that index does nothing", () => {
  const basket = makeBasket();
  oneMore(basket, 5);
  assertEquals(basket, makeBasket());
});

Deno.test("withItem gives a basket with the new item at the end", () => {
  const basket = withItem(makeBasket(), EGGS);
  assertEquals(describeBasket(basket), "bread × 1, milk × 2, eggs × 6");
});

Deno.test("withItem leaves the original basket as it was", () => {
  const original = makeBasket();
  withItem(original, EGGS);
  assertEquals(original.length, 2);
});

Deno.test("sharing tells the three kinds of copy apart", () => {
  const a = makeBasket();
  assertEquals(sharing(a, copyBasket(a, "same array")), "A and B are the same array");
  assertEquals(sharing(a, copyBasket(a, "spread copy")), "A and B are different arrays, but share 2 item objects");
  assertEquals(sharing(a, copyBasket(a, "structuredClone")), "A and B share nothing");
});

Deno.test("an empty basket is described as empty", () => {
  assertEquals(describeBasket([]), "empty");
});

Deno.test("each way of copying has its line of code", () => {
  assertEquals(copyCode("same array"), "const b = a;");
  assertEquals(copyCode("spread copy"), "const b = [...a];");
  assertEquals(copyCode("structuredClone"), "const b = structuredClone(a);");
});

// CHALLENGE 1
Deno.test("withoutItem gives a basket without that item", () => {
  assertEquals(describeBasket(withoutItem(makeBasket(), "bread")), "milk × 2");
});

// CHALLENGE 1
Deno.test("withoutItem leaves the original basket as it was", () => {
  const original = makeBasket();
  withoutItem(original, "bread");
  assertEquals(original, makeBasket());
});

// CHALLENGE 1
Deno.test("withoutItem with a name that is not there gives an equal (but new) basket", () => {
  const original = makeBasket();
  const result = withoutItem(original, "cake");
  assertEquals(result, original);
  assertNotStrictEquals(result, original);
});
