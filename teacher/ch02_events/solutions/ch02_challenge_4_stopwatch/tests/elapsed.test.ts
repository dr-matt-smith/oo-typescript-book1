// CHALLENGE 4: tests for src/elapsed.ts

import { assertEquals } from "@std/assert";
import { formatElapsed } from "../src/elapsed.ts";

Deno.test("zero", () => {
  assertEquals(formatElapsed(0), "0:00.0");
});

Deno.test("seconds and tenths", () => {
  assertEquals(formatElapsed(7300), "0:07.3");
});

Deno.test("a minute and two seconds", () => {
  assertEquals(formatElapsed(62000), "1:02.0");
});

Deno.test("just under a minute", () => {
  assertEquals(formatElapsed(59900), "0:59.9");
});

Deno.test("parts of a tenth are dropped", () => {
  assertEquals(formatElapsed(150), "0:00.1");
});
