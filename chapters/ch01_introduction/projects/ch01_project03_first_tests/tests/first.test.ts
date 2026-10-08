// The simplest possible test, to see what a test looks like and what a passing test prints.

import { assertEquals } from "@std/assert";

Deno.test("one plus one is two", () => {
  assertEquals(1 + 1, 2);
});
