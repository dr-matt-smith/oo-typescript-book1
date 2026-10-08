// Tests for src/greeting.ts: does greeting() give the right message at different times of day?

import { assertEquals } from "@std/assert";
import { greeting } from "../src/greeting.ts";

Deno.test("9 o'clock is morning", () => {
  assertEquals(greeting(9), "Good morning");
});

Deno.test("3 in the afternoon (hour 15) is day", () => {
  assertEquals(greeting(15), "Good day");
});

// The edges - the hours either side of the change - are where mistakes hide.

Deno.test("11 o'clock is still morning", () => {
  assertEquals(greeting(11), "Good morning");
});

Deno.test("midday (hour 12) is day", () => {
  assertEquals(greeting(12), "Good day");
});

Deno.test("midnight (hour 0) is morning", () => {
  assertEquals(greeting(0), "Good morning");
});
