// FizzBuzz, the classic kata: count from 1, but say "Fizz" for multiples of 3, "Buzz" for
// multiples of 5, and "FizzBuzz" for multiples of both. Built test first - see Chapter 4.

const FIZZ_DIVISOR = 3;
const BUZZ_DIVISOR = 5;

/** True if `n` divides exactly by `divisor` (nothing left over). */
const isDivisibleBy = (n: number, divisor: number): boolean => n % divisor === 0;

/**
 * What to say for one number: "Fizz", "Buzz", "FizzBuzz", or the number itself.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(fizzBuzz(3), "Fizz");
 * assertEquals(fizzBuzz(5), "Buzz");
 * assertEquals(fizzBuzz(15), "FizzBuzz");
 * assertEquals(fizzBuzz(7), "7");
 * ```
 */
export const fizzBuzz = (n: number): string => {
  // Build the answer up: a multiple of 15 collects both words, so it needs no check of its own.
  let answer = "";
  if (isDivisibleBy(n, FIZZ_DIVISOR)) {
    answer += "Fizz";
  }
  if (isDivisibleBy(n, BUZZ_DIVISOR)) {
    answer += "Buzz";
  }
  return answer === "" ? `${n}` : answer;
};

/**
 * The answers for 1, 2, 3 ... up to `count`. No answers at all if `count` is 0 or less.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(fizzBuzzUpTo(5), ["1", "2", "Fizz", "4", "Buzz"]);
 * ```
 */
export const fizzBuzzUpTo = (count: number): string[] => {
  const answers: string[] = [];
  for (let n = 1; n <= count; n++) {
    answers.push(fizzBuzz(n));
  }
  return answers;
};
