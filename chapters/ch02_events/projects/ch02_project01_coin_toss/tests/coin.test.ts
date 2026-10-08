// Tests for src/coin.ts. The tests choose the "random" number, so they know the right answer.

import { assertEquals } from "@std/assert";
import { coinFace } from "../src/coin.ts";

Deno.test("a small random number gives heads", () => {
  assertEquals(coinFace(0.2), "Heads");
});

Deno.test("a large random number gives tails", () => {
  assertEquals(coinFace(0.7), "Tails");
});

Deno.test("zero gives heads", () => {
  assertEquals(coinFace(0), "Heads");
});

Deno.test("exactly a half gives tails", () => {
  assertEquals(coinFace(0.5), "Tails");
});

Deno.test("just under a half gives heads", () => {
  assertEquals(coinFace(0.4999), "Heads");
});
