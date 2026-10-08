// CHALLENGE 5 (the whole file is new): the string calculator kata.
// add("1,2,3") is 6. Commas or new lines separate the numbers; negative numbers are refused.

const SEPARATOR = ",";

/** The numbers in the text, as numbers. New lines count as separators, like commas. */
const parseNumbers = (numbers: string): number[] =>
  numbers.replaceAll("\n", SEPARATOR).split(SEPARATOR).map((part) => Number(part));

/**
 * Adds up the numbers in a string: "" is 0, "4" is 4, "1,2" is 3, "1\n2,3" is 6.
 * Throws an Error listing every negative number, if there are any.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(add("1,2,3"), 6);
 * assertEquals(add(""), 0);
 * ```
 */
export const add = (numbers: string): number => {
  if (numbers === "") {
    return 0;
  }
  const values = parseNumbers(numbers);
  const negatives = values.filter((value) => value < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
  }
  return values.reduce((total, value) => total + value, 0);
};
