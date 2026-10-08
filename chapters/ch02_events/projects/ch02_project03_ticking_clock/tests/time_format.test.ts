// Tests for src/time_format.ts.

import { assertEquals } from "@std/assert";
import { formatTime, twoDigits } from "../src/time_format.ts";

Deno.test("a one-digit number gets a leading zero", () => {
  assertEquals(twoDigits(7), "07");
});

Deno.test("a two-digit number stays as it is", () => {
  assertEquals(twoDigits(42), "42");
});

Deno.test("zero is 00", () => {
  assertEquals(twoDigits(0), "00");
});

Deno.test("a time is hours, minutes and seconds, two digits each", () => {
  assertEquals(formatTime(9, 5, 3), "09:05:03");
});

Deno.test("one second before midnight", () => {
  assertEquals(formatTime(23, 59, 59), "23:59:59");
});
