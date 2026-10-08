// Tests for the Tally model. The view is not tested here: it has no rules of its own to get wrong.

import { assertEquals, assertThrows } from "@std/assert";
import { Tally } from "../src/Tally.ts";

Deno.test("a new tally starts at zero", () => {
  const tally = new Tally();
  assertEquals(tally.count, 0);
});

Deno.test("a room holds 20 people unless told otherwise", () => {
  assertEquals(new Tally().capacity, 20);
  assertEquals(new Tally(5).capacity, 5);
});

Deno.test("a room must hold at least one person", () => {
  assertThrows(() => new Tally(0), Error, "at least 1 person");
});

Deno.test("increment adds one", () => {
  const tally = new Tally();
  tally.increment();
  tally.increment();
  assertEquals(tally.count, 2);
});

Deno.test("decrement never goes below zero", () => {
  const tally = new Tally();
  tally.decrement();
  assertEquals(tally.count, 0);
});

Deno.test("increment stops at the room's capacity", () => {
  const tally = new Tally(2);
  tally.increment();
  tally.increment();
  tally.increment();
  assertEquals(tally.count, 2);
});

Deno.test("spaces left counts down as people come in", () => {
  const tally = new Tally(5);
  tally.increment();
  tally.increment();
  assertEquals(tally.spacesLeft, 3);
});

Deno.test("isEmpty and isFull at the two edges", () => {
  const tally = new Tally(1);
  assertEquals(tally.isEmpty, true);
  assertEquals(tally.isFull, false);
  tally.increment();
  assertEquals(tally.isEmpty, false);
  assertEquals(tally.isFull, true);
});

Deno.test("reset empties the room", () => {
  const tally = new Tally();
  tally.increment();
  tally.reset();
  assertEquals(tally.count, 0);
});

// CHALLENGE 3
Deno.test("two tallies are independent", () => {
  const lab = new Tally(12);
  const library = new Tally(30);
  lab.increment();
  assertEquals(lab.count, 1);
  assertEquals(library.count, 0);
});

// CHALLENGE 3
Deno.test("each tally has its own capacity", () => {
  const lab = new Tally(1);
  const library = new Tally(30);
  lab.increment();
  library.increment();
  assertEquals(lab.isFull, true);
  assertEquals(library.isFull, false);
});
