// CHALLENGE 1: tests for src/die.ts

import { assertEquals } from "@std/assert";
import { dieFace } from "../src/die.ts";

Deno.test("zero gives a 1", () => {
  assertEquals(dieFace(0), 1);
});

Deno.test("almost 1 gives a 6", () => {
  assertEquals(dieFace(0.999), 6);
});

Deno.test("just under a sixth gives a 1", () => {
  assertEquals(dieFace(0.1666), 1);
});

Deno.test("exactly a sixth gives a 2", () => {
  assertEquals(dieFace(1 / 6), 2);
});
