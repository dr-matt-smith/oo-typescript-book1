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

// CHALLENGE 3

Deno.test("increment(5) adds five", () => {
  const counter = new Counter();
  counter.increment(5);
  assertEquals(counter.getCount(), 5);
});

Deno.test("increment() with no step still adds one", () => {
  const counter = new Counter();
  counter.increment(10);
  counter.increment();
  assertEquals(counter.getCount(), 11);
});
