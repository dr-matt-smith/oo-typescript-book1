// Tests for src/leap_year.ts. This project starts red: 4 of these tests fail until you write
// isLeapYear. Make them pass one at a time - and run the tests after every small change.

import { assertEquals, assertThrows } from "@std/assert";
import { isLeapYear } from "../src/leap_year.ts";

Deno.test("2023 is not a leap year: it does not divide by 4", () => {
  assertEquals(isLeapYear(2023), false);
});

Deno.test("2024 is a leap year: it divides by 4", () => {
  assertEquals(isLeapYear(2024), true);
});

Deno.test("1996 is a leap year: it divides by 4", () => {
  assertEquals(isLeapYear(1996), true);
});

Deno.test("1900 is not a leap year: it divides by 100", () => {
  assertEquals(isLeapYear(1900), false);
});

Deno.test("2100 is not a leap year: it divides by 100", () => {
  assertEquals(isLeapYear(2100), false);
});

Deno.test("2000 is a leap year: it divides by 400", () => {
  assertEquals(isLeapYear(2000), true);
});

Deno.test("1583 is the first year the rules cover", () => {
  assertEquals(isLeapYear(1583), false);
});

Deno.test("a year before 1583 throws an error", () => {
  assertThrows(() => isLeapYear(1582), Error, "1583");
});
