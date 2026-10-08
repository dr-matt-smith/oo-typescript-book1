// Tests for src/money.ts: euros to cents and back to a string.

import { assertEquals } from "@std/assert";
import { formatEuro, toCents } from "../src/money.ts";

Deno.test("toCents turns euros into whole cents", () => {
  assertEquals(toCents(12.5), 1250);
});

Deno.test("toCents rounds away the tiny errors in decimals", () => {
  // 19.99 * 100 is 1998.9999999999998 in binary arithmetic
  assertEquals(toCents(19.99), 1999);
});

Deno.test("formatEuro always shows two decimal places", () => {
  assertEquals(formatEuro(1250), "€12.50");
  assertEquals(formatEuro(5), "€0.05");
  assertEquals(formatEuro(0), "€0.00");
});
