// Tests for src/money.ts.

import { assertEquals } from "@std/assert";
import { formatEuro, roundToCent } from "../src/money.ts";

Deno.test("euros are shown with two decimal places", () => {
  assertEquals(formatEuro(120), "€120.00");
  assertEquals(formatEuro(0.5), "€0.50");
});

Deno.test("a negative amount has its minus sign before the euro sign", () => {
  assertEquals(formatEuro(-70.5), "-€70.50");
});

Deno.test("rounding to the nearest cent", () => {
  assertEquals(roundToCent(33.9966), 34);
  assertEquals(roundToCent(10.004), 10);
});
