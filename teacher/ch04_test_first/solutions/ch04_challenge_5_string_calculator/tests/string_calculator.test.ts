// CHALLENGE 5 (the whole file is new): tests for src/string_calculator.ts, one per rule of the
// kata, in the order they were written.

import { assertEquals, assertThrows } from "@std/assert";
import { add } from "../src/string_calculator.ts";

Deno.test("an empty string adds up to 0", () => {
  assertEquals(add(""), 0);
});

Deno.test("one number adds up to itself", () => {
  assertEquals(add("4"), 4);
});

Deno.test("two numbers separated by a comma are added", () => {
  assertEquals(add("1,2"), 3);
});

Deno.test("any amount of numbers are added", () => {
  assertEquals(add("1,2,3,4"), 10);
});

Deno.test("new lines separate numbers too", () => {
  assertEquals(add("1\n2,3"), 6);
});

Deno.test("a negative number throws", () => {
  assertThrows(() => add("1,-2"), Error, "negatives not allowed: -2");
});

Deno.test("the error lists every negative number", () => {
  assertThrows(() => add("1,-2,-3"), Error, "negatives not allowed: -2, -3");
});
