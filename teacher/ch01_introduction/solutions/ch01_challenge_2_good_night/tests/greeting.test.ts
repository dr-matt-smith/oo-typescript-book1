// Tests for src/greeting.ts. They run every time you save, and the results appear in the console
// and in test_output/index.html. Chapter 3 explains how to write them - for now, read them.

import { assertEquals } from "@std/assert";
import { greeting, partOfDay } from "../src/greeting.ts";

Deno.test("9 o'clock is in the morning", () => {
  assertEquals(partOfDay(9), "morning");
});

Deno.test("2 o'clock in the afternoon (hour 14) is in the afternoon", () => {
  assertEquals(partOfDay(14), "afternoon");
});

Deno.test("8 o'clock in the evening (hour 20) is in the evening", () => {
  assertEquals(partOfDay(20), "evening");
});

Deno.test("the greeting includes the part of the day and the name", () => {
  assertEquals(greeting("Ada", 9), "Good morning, Ada!");
});

// CHALLENGE 2: night, and the edges either side of it

Deno.test("2 o'clock in the morning is night", () => {
  assertEquals(partOfDay(2), "night");
});

Deno.test("hour 22 is night", () => {
  assertEquals(partOfDay(22), "night");
});

Deno.test("hour 21 is still evening", () => {
  assertEquals(partOfDay(21), "evening");
});

Deno.test("hour 4 is still night", () => {
  assertEquals(partOfDay(4), "night");
});

Deno.test("hour 5 is morning", () => {
  assertEquals(partOfDay(5), "morning");
});

Deno.test("the greeting at night says good night", () => {
  assertEquals(greeting("Ada", 23), "Good night, Ada!");
});
