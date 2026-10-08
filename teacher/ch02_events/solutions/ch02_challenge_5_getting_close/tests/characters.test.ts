// Tests for src/characters.ts.

import { assertEquals } from "@std/assert";
import { charactersLeft, describeLeft, status } from "../src/characters.ts";

Deno.test("an empty box has the whole limit left", () => {
  assertEquals(charactersLeft("", 140), 140);
});

Deno.test("each character uses one up", () => {
  assertEquals(charactersLeft("hello", 140), 135);
});

Deno.test("too much text leaves a negative number", () => {
  assertEquals(charactersLeft("hello", 3), -2);
});

Deno.test("several characters left", () => {
  assertEquals(describeLeft(12), "12 characters left");
});

Deno.test("one character left is singular", () => {
  assertEquals(describeLeft(1), "1 character left");
});

Deno.test("none left", () => {
  assertEquals(describeLeft(0), "0 characters left");
});

Deno.test("too many characters", () => {
  assertEquals(describeLeft(-3), "3 too many");
});

// CHALLENGE 5

Deno.test("plenty left is ok", () => {
  assertEquals(status(100), "ok");
});

Deno.test("20 left is still ok", () => {
  assertEquals(status(20), "ok");
});

Deno.test("19 left is a warning", () => {
  assertEquals(status(19), "warning");
});

Deno.test("none left is still a warning", () => {
  assertEquals(status(0), "warning");
});

Deno.test("one too many is over", () => {
  assertEquals(status(-1), "over");
});
