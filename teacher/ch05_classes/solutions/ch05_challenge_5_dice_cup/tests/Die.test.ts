// Tests for src/Die.ts. Each roll is given a chosen "random" number, so every result is known.

import { assertEquals } from "@std/assert";
import { Die } from "../src/Die.ts";

/** Just below 1: the largest number Math.random() can give is a tiny bit less than 1. */
const ALMOST_ONE = 0.999999;

Deno.test("a die has six sides unless you say otherwise", () => {
  assertEquals(new Die().getSides(), 6);
});

Deno.test("a die can have any number of sides", () => {
  assertEquals(new Die(20).getSides(), 20);
});

Deno.test("a new die has not been rolled", () => {
  assertEquals(new Die().getValue(), null);
});

Deno.test("the lowest random number rolls a 1", () => {
  const die = new Die();

  assertEquals(die.roll(0), 1);
});

Deno.test("a random number just below 1 rolls a 6", () => {
  const die = new Die();

  assertEquals(die.roll(ALMOST_ONE), 6);
});

Deno.test("a random number in the middle rolls a middle number", () => {
  const die = new Die();

  assertEquals(die.roll(0.5), 4);
});

Deno.test("a twenty-sided die can roll a 20", () => {
  const die = new Die(20);

  assertEquals(die.roll(ALMOST_ONE), 20);
});

Deno.test("a die remembers what it rolled", () => {
  const die = new Die();

  die.roll(0.5);

  assertEquals(die.getValue(), 4);
});

Deno.test("toString says when a die has not been rolled", () => {
  assertEquals(new Die(20).toString(), "d20 (not rolled yet)");
});

Deno.test("toString says what a rolled die shows", () => {
  const die = new Die();

  die.roll(0);

  assertEquals(`${die}`, "d6 showing 1");
});
