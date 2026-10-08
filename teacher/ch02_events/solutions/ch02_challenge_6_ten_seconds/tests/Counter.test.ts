// Tests for src/Counter.ts. Chapter 3 explains how to write tests - for now, read them, and try
// breaking Counter.ts on purpose to see what a failing test looks like.

import { assertEquals } from "@std/assert";
import { Counter } from "../src/Counter.ts";

Deno.test("a new counter starts at zero", () => {
  const counter = new Counter();
  assertEquals(counter.getCount(), 0);
});

Deno.test("increment adds one", () => {
  const counter = new Counter();
  counter.increment();
  assertEquals(counter.getCount(), 1);
});

Deno.test("three increments make three", () => {
  const counter = new Counter();
  counter.increment();
  counter.increment();
  counter.increment();
  assertEquals(counter.getCount(), 3);
});

Deno.test("reset goes back to zero", () => {
  const counter = new Counter();
  counter.increment();
  counter.increment();
  counter.reset();
  assertEquals(counter.getCount(), 0);
});

// CHALLENGE 6

Deno.test("the best score starts at zero", () => {
  const counter = new Counter();
  assertEquals(counter.getBest(), 0);
});

Deno.test("finishing a round with a higher score sets a new best", () => {
  const counter = new Counter();
  counter.increment();
  counter.increment();
  counter.finishRound();
  assertEquals(counter.getBest(), 2);
});

Deno.test("a lower score does not change the best", () => {
  const counter = new Counter();
  counter.increment();
  counter.increment();
  counter.finishRound();
  counter.reset();
  counter.increment();
  counter.finishRound();
  assertEquals(counter.getBest(), 2);
});

Deno.test("reset keeps the best score", () => {
  const counter = new Counter();
  counter.increment();
  counter.finishRound();
  counter.reset();
  assertEquals(counter.getBest(), 1);
});
