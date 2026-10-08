// Leap years - a "start red" kata. The tests in tests/leap_year.test.ts are already written, and
// most of them fail. Your job: make them pass, one at a time, in small steps (see Chapter 4).
//
// The rules (the Gregorian calendar, used since 1582):
//   - a year divisible by 4 is a leap year,
//   - except a year divisible by 100, which is not,
//   - except a year divisible by 400, which is.
// Years before 1583 are not covered by these rules, so asking about one is a mistake: throw an Error.

/** True if `year` is a leap year. */
// The parameter starts with _ only so the linter does not complain that it is unused.
// Rename it to `year` when your code starts to use it.
export const isLeapYear = (_year: number): boolean => {
  return false;
};
