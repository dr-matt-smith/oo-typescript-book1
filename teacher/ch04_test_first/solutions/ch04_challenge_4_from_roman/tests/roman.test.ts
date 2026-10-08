// Tests for src/roman.ts. Each Deno.test is a group of related cases, and each case is a step
// (t.step), so the report shows exactly which number went wrong.

import { assertEquals } from "@std/assert";
import { canBeRoman, fromRoman, toRoman } from "../src/roman.ts"; // CHALLENGE 4: fromRoman

/** One example: a number and the numeral it should become. */
type Example = { n: number; numeral: string };

/** Runs one step per example, each named like "4 is IV". A helper keeps every group short. */
const checkExamples = async (t: Deno.TestContext, examples: Example[]): Promise<void> => {
  for (const example of examples) {
    await t.step(`${example.n} is ${example.numeral}`, () => {
      assertEquals(toRoman(example.n), example.numeral);
    });
  }
};

Deno.test("each symbol on its own", async (t) => {
  await checkExamples(t, [
    { n: 1, numeral: "I" },
    { n: 5, numeral: "V" },
    { n: 10, numeral: "X" },
    { n: 50, numeral: "L" },
    { n: 100, numeral: "C" },
    { n: 500, numeral: "D" },
    { n: 1000, numeral: "M" },
  ]);
});

Deno.test("symbols written together are added up", async (t) => {
  await checkExamples(t, [
    { n: 2, numeral: "II" },
    { n: 3, numeral: "III" },
    { n: 6, numeral: "VI" },
    { n: 8, numeral: "VIII" },
    { n: 27, numeral: "XXVII" },
    { n: 3000, numeral: "MMM" },
  ]);
});

Deno.test("a smaller symbol in front of a bigger one is taken away", async (t) => {
  await checkExamples(t, [
    { n: 4, numeral: "IV" },
    { n: 9, numeral: "IX" },
    { n: 40, numeral: "XL" },
    { n: 90, numeral: "XC" },
    { n: 400, numeral: "CD" },
    { n: 900, numeral: "CM" },
  ]);
});

Deno.test("bigger numbers use all the rules together", async (t) => {
  await checkExamples(t, [
    { n: 14, numeral: "XIV" },
    { n: 49, numeral: "XLIX" },
    { n: 1994, numeral: "MCMXCIV" },
    { n: 2026, numeral: "MMXXVI" },
    { n: 3999, numeral: "MMMCMXCIX" },
  ]);
});

Deno.test("whole numbers from 1 to 3999 can be Roman", () => {
  assertEquals(canBeRoman(1), true);
  assertEquals(canBeRoman(3999), true);
});

Deno.test("0, negative numbers, numbers over 3999 and fractions cannot be Roman", () => {
  assertEquals(canBeRoman(0), false);
  assertEquals(canBeRoman(-5), false);
  assertEquals(canBeRoman(4000), false);
  assertEquals(canBeRoman(2.5), false);
});

// CHALLENGE 4: the same examples, the other way round
const checkReading = async (t: Deno.TestContext, examples: Example[]): Promise<void> => {
  for (const example of examples) {
    await t.step(`${example.numeral} is ${example.n}`, () => {
      assertEquals(fromRoman(example.numeral), example.n);
    });
  }
};

// CHALLENGE 4
Deno.test("reading each symbol on its own", async (t) => {
  await checkReading(t, [
    { n: 1, numeral: "I" },
    { n: 5, numeral: "V" },
    { n: 10, numeral: "X" },
    { n: 50, numeral: "L" },
    { n: 100, numeral: "C" },
    { n: 500, numeral: "D" },
    { n: 1000, numeral: "M" },
  ]);
});

// CHALLENGE 4
Deno.test("reading symbols written together adds them up", async (t) => {
  await checkReading(t, [
    { n: 3, numeral: "III" },
    { n: 8, numeral: "VIII" },
    { n: 27, numeral: "XXVII" },
    { n: 3000, numeral: "MMM" },
  ]);
});

// CHALLENGE 4
Deno.test("reading a smaller symbol in front takes it away", async (t) => {
  await checkReading(t, [
    { n: 4, numeral: "IV" },
    { n: 9, numeral: "IX" },
    { n: 40, numeral: "XL" },
    { n: 90, numeral: "XC" },
    { n: 400, numeral: "CD" },
    { n: 900, numeral: "CM" },
  ]);
});

// CHALLENGE 4
Deno.test("reading bigger numbers", async (t) => {
  await checkReading(t, [
    { n: 49, numeral: "XLIX" },
    { n: 1994, numeral: "MCMXCIV" },
    { n: 3999, numeral: "MMMCMXCIX" },
  ]);
});

// CHALLENGE 4: one test, 3999 checks - steps would make the report 3999 lines long
Deno.test("every number from 1 to 3999 survives the round trip", () => {
  for (let n = 1; n <= 3999; n++) {
    assertEquals(fromRoman(toRoman(n)), n);
  }
});
