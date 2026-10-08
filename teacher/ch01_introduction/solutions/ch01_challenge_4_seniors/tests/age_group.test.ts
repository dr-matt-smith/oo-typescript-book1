// Tests for src/age_group.ts. These were written FIRST - before ageGroup() existed - one group at a
// time: write a test, watch it fail (red), write just enough code to pass (green), then the next.

import { assertEquals } from "@std/assert";
import { ageGroup } from "../src/age_group.ts";

Deno.test("a 5 year old is a child", () => {
  assertEquals(ageGroup(5), "child");
});

Deno.test("a 15 year old is a teenager", () => {
  assertEquals(ageGroup(15), "teenager");
});

Deno.test("a 40 year old is an adult", () => {
  assertEquals(ageGroup(40), "adult");
});

Deno.test("a negative age is invalid", () => {
  assertEquals(ageGroup(-1), "invalid");
});

Deno.test("an age over 150 is invalid", () => {
  assertEquals(ageGroup(151), "invalid");
});

// The edges of each group.

Deno.test("0 is a child", () => {
  assertEquals(ageGroup(0), "child");
});

Deno.test("12 is still a child", () => {
  assertEquals(ageGroup(12), "child");
});

Deno.test("13 is a teenager", () => {
  assertEquals(ageGroup(13), "teenager");
});

Deno.test("19 is still a teenager", () => {
  assertEquals(ageGroup(19), "teenager");
});

Deno.test("20 is an adult", () => {
  assertEquals(ageGroup(20), "adult");
});

// CHALLENGE 4: this test used to say "150 is still an adult". It was really checking the top edge
// of the valid ages, so it now checks that 150 is still valid - a senior.
Deno.test("150 is still a senior", () => {
  assertEquals(ageGroup(150), "senior");
});

// CHALLENGE 4

Deno.test("a 70 year old is a senior", () => {
  assertEquals(ageGroup(70), "senior");
});

Deno.test("64 is still an adult", () => {
  assertEquals(ageGroup(64), "adult");
});

Deno.test("65 is a senior", () => {
  assertEquals(ageGroup(65), "senior");
});
