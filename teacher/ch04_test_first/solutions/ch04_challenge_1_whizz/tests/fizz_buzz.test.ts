// Tests for src/fizz_buzz.ts, in the order they were written: each one was red before the code
// that makes it pass existed. The names are sentences, so the list of tests reads as the rules.

import { assertEquals } from "@std/assert";
import { fizzBuzz, fizzBuzzUpTo } from "../src/fizz_buzz.ts";

Deno.test("1 is said as 1", () => {
  assertEquals(fizzBuzz(1), "1");
});

Deno.test("2 is said as 2", () => {
  assertEquals(fizzBuzz(2), "2");
});

Deno.test("3 is Fizz", () => {
  assertEquals(fizzBuzz(3), "Fizz");
});

Deno.test("5 is Buzz", () => {
  assertEquals(fizzBuzz(5), "Buzz");
});

Deno.test("other multiples of 3 are Fizz", () => {
  assertEquals(fizzBuzz(6), "Fizz");
  assertEquals(fizzBuzz(99), "Fizz");
});

Deno.test("other multiples of 5 are Buzz", () => {
  assertEquals(fizzBuzz(10), "Buzz");
  assertEquals(fizzBuzz(100), "Buzz");
});

Deno.test("15 is FizzBuzz", () => {
  assertEquals(fizzBuzz(15), "FizzBuzz");
});

Deno.test("other multiples of 15 are FizzBuzz", () => {
  assertEquals(fizzBuzz(30), "FizzBuzz");
  assertEquals(fizzBuzz(45), "FizzBuzz");
});

Deno.test("the first five answers, in order", () => {
  // Arrange: how many answers we want
  const count = 5;

  // Act: get them
  const answers = fizzBuzzUpTo(count);

  // Assert: check them
  assertEquals(answers, ["1", "2", "Fizz", "4", "Buzz"]);
});

Deno.test("no answers up to 0", () => {
  assertEquals(fizzBuzzUpTo(0), []);
});

// CHALLENGE 1
Deno.test("7 is Whizz", () => {
  assertEquals(fizzBuzz(7), "Whizz");
});

// CHALLENGE 1
Deno.test("21 is FizzWhizz", () => {
  assertEquals(fizzBuzz(21), "FizzWhizz");
});

// CHALLENGE 1
Deno.test("35 is BuzzWhizz", () => {
  assertEquals(fizzBuzz(35), "BuzzWhizz");
});

// CHALLENGE 1
Deno.test("105 is FizzBuzzWhizz", () => {
  assertEquals(fizzBuzz(105), "FizzBuzzWhizz");
});

// CHALLENGE 1: 14 was "14" before; it is a multiple of 7 now
Deno.test("the first fourteen answers, with Whizz", () => {
  assertEquals(fizzBuzzUpTo(14), ["1", "2", "Fizz", "4", "Buzz", "Fizz", "Whizz", "8", "Fizz", "Buzz", "11", "Fizz", "13", "Whizz"]);
});
