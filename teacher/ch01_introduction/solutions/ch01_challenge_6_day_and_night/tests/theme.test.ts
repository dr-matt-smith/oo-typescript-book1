// CHALLENGE 6: tests for src/theme.ts

import { assertEquals } from "@std/assert";
import { themeFor } from "../src/theme.ts";

Deno.test("midday is day", () => {
  assertEquals(themeFor(12), "day");
});

Deno.test("midnight is night", () => {
  assertEquals(themeFor(0), "night");
});

Deno.test("6 o'clock is still night", () => {
  assertEquals(themeFor(6), "night");
});

Deno.test("7 o'clock is day", () => {
  assertEquals(themeFor(7), "day");
});

Deno.test("hour 18 is still day", () => {
  assertEquals(themeFor(18), "day");
});

Deno.test("hour 19 is night", () => {
  assertEquals(themeFor(19), "night");
});
