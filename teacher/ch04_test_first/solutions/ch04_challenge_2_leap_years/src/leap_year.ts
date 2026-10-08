// Leap years - the "start red" kata, made green. (CHALLENGE 2: the whole of isLeapYear is new.)
//
// The rules (the Gregorian calendar, used since 1582):
//   - a year divisible by 4 is a leap year,
//   - except a year divisible by 100, which is not,
//   - except a year divisible by 400, which is.
// Years before 1583 are not covered by these rules, so asking about one is a mistake: throw an Error.

// CHALLENGE 2: named constants instead of magic numbers
const FIRST_COVERED_YEAR = 1583;
const LEAP_CYCLE = 4;
const CENTURY = 100;
const LEAP_CENTURY_CYCLE = 400;

// CHALLENGE 2
const isDivisibleBy = (year: number, divisor: number): boolean => year % divisor === 0;

/**
 * True if `year` is a leap year. Throws an Error for years before 1583.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(isLeapYear(2024), true);
 * assertEquals(isLeapYear(2023), false);
 * ```
 */
// CHALLENGE 2: the order of the checks follows the rules - the exceptions first, most special first
export const isLeapYear = (year: number): boolean => {
  if (year < FIRST_COVERED_YEAR) {
    throw new Error(`the leap year rules start in ${FIRST_COVERED_YEAR}, so ${year} is not covered`);
  }
  if (isDivisibleBy(year, LEAP_CENTURY_CYCLE)) {
    return true;
  }
  if (isDivisibleBy(year, CENTURY)) {
    return false;
  }
  return isDivisibleBy(year, LEAP_CYCLE);
};
