// Numbers to Roman numerals. It began as a pile of ifs (see Chapter 4) and was refactored, with
// the tests green the whole time, into one table and one loop.

/** One numeral and its value. */
type Numeral = { value: number; symbol: string };

// Biggest first. The pairs like CM (900) and IV (4) are the "take away" numerals: listing them as
// numerals of their own means the loop below never needs a special case for them.
const NUMERALS: Numeral[] = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

// The Romans had no zero, and with these symbols nothing above 3999 can be written.
const SMALLEST = 1;
const LARGEST = 3999;

/**
 * True if `n` can be written in Roman numerals: a whole number from 1 to 3999.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(canBeRoman(1994), true);
 * assertEquals(canBeRoman(0), false);
 * ```
 */
export const canBeRoman = (n: number): boolean => Number.isInteger(n) && n >= SMALLEST && n <= LARGEST;

/**
 * `n` in Roman numerals. Only for numbers where canBeRoman is true.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(toRoman(4), "IV");
 * assertEquals(toRoman(1994), "MCMXCIV");
 * ```
 */
export const toRoman = (n: number): string => {
  let result = "";
  let rest = n;
  // Take the biggest numeral that fits, as many times as it fits, then move on to the next one.
  for (const numeral of NUMERALS) {
    while (rest >= numeral.value) {
      result += numeral.symbol;
      rest -= numeral.value;
    }
  }
  return result;
};
