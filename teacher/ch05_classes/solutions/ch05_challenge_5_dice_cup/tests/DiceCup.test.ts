// CHALLENGE 5: tests for src/DiceCup.ts.
// The cup is given a fake random function that hands out chosen numbers, one per call.

import { assertEquals } from "@std/assert";
import { DiceCup } from "../src/DiceCup.ts";

/** A fake for Math.random: each call returns the next number from the list. */
const randomFrom = (numbers: number[]): () => number => {
  let next = 0;
  return () => {
    const value = numbers[next];
    next++;
    return value;
  };
};

Deno.test("the fake random function hands out its numbers in order", () => {
  const random = randomFrom([0.1, 0.2]);

  assertEquals([random(), random()], [0.1, 0.2]);
});

Deno.test("a cup holds six-sided dice unless you say otherwise", () => {
  assertEquals(new DiceCup(2).toString(), "2d6 (not rolled yet)");
});

Deno.test("a cup can hold dice with any number of sides", () => {
  assertEquals(new DiceCup(3, 8).toString(), "3d8 (not rolled yet)");
});

Deno.test("rolling gives the total of every die", () => {
  const cup = new DiceCup(2);

  // 0.4 rolls a 3 and 0.7 rolls a 5 on a six-sided die
  assertEquals(cup.roll(randomFrom([0.4, 0.7])), 8);
});

Deno.test("each die gets its own random number", () => {
  const cup = new DiceCup(3);

  assertEquals(cup.roll(randomFrom([0, 0.5, 0.999999])), 1 + 4 + 6);
});

Deno.test("one die in a cup is just that die", () => {
  const cup = new DiceCup(1, 20);

  assertEquals(cup.roll(randomFrom([0.999999])), 20);
});

Deno.test("toString shows each die and the total", () => {
  const cup = new DiceCup(2);

  cup.roll(randomFrom([0.4, 0.7]));

  assertEquals(`${cup}`, "2d6: 3 + 5 = 8");
});
