# Chapter 4 - Test first, properly: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the project the challenge
starts from. Every change is marked with a `CHALLENGE n` comment, so a search for `CHALLENGE` finds
them all. Every solution builds with all tests passing, 0 type errors and 0 lint warnings.

In this chapter the *process* matters as much as the result. Where you can, ask students to show
the order of their tests (or one git commit per green), not just the finished code.

Each new exported function also has a doc comment example (one or two typical calls), as the
chapter's "Examples and tests" section asks: `fromRoman("MCMXCIV")` is 1994, `add("1,2,3")` is 6,
`isLeapYear(2024)` is `true`, and so on. Strict Roman's example shows `assertThrows` too. Accept
solutions without them, but ask for one - it is a quick check that the student can say what their
function is for.

---

## 1. Fizz, Buzz, Whizz

**Project:** [solutions/ch04_challenge_1_whizz](solutions/ch04_challenge_1_whizz/)
(from `ch04_project01_fizzbuzz`)

`src/fizz_buzz.ts`
```ts
const WHIZZ_DIVISOR = 7; // CHALLENGE 1

  // CHALLENGE 1: one more word, one more if - no combinations to list, thanks to building up the answer
  if (isDivisibleBy(n, WHIZZ_DIVISOR)) {
    answer += "Whizz";
  }
```

Tests: 7 is Whizz, 21 is FizzWhizz, 35 is BuzzWhizz, 105 is FizzBuzzWhizz, and the first fourteen
answers (14 is now "Whizz"). `main.ts` gives answers containing "Whizz" their own colour. The doc
comment example's last line becomes `assertEquals(fizzBuzz(7), "Whizz"); // CHALLENGE 1`.

**Look for:** the test list written first, and "7 is Whizz" as the first red. Students who kept the
`n % 15` version have to add checks for 21, 35 and 105 - in the right order - which is the point of
the question in the challenge: the refactor made the change easy. A test that still expects
`fizzBuzzUpTo(14)` to end in "14" should have gone red and been updated - ask whether they noticed.
So should the doc comment example: with Whizz added, it fails (`-   Whizz` / `+   7`, at
`src/fizz_buzz.ts (example at lines 14-22)`) while all ten original tests still pass. A student who
"fixed" it by deleting the example has missed that the documentation was out of date.

---

## 2. Make it green

**Project:** [solutions/ch04_challenge_2_leap_years](solutions/ch04_challenge_2_leap_years/)
(from `ch04_project04_leap_years_start_red`)

`src/leap_year.ts`
```ts
const FIRST_COVERED_YEAR = 1583;
const LEAP_CYCLE = 4;
const CENTURY = 100;
const LEAP_CENTURY_CYCLE = 400;

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
```

The tests are unchanged, and `.book-check.json` (which said "4 failing") has been removed. The page
lists 2020, 2024, ... 2060.

**Look for:** the tests untouched (diff the test file against the original). A typical order: 2024
first - `return year % 4 === 0` makes 2024, 1996 and 2000 green, but turns 1900 and 2100 **red**. They
were only green because the stub always said `false`: a passing test can pass for the wrong reason,
and a good moment to say so. Then the century rule (1900, 2100 green, 2000 red again), then the
400 rule, then the guard. The error message must include "1583" (the test checks it).
Accept the one-expression version
`year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)` if it has named constants and the guard;
ask which is easier to check against the rules as written.

---

## 3. More password rules

**Project:** [solutions/ch04_challenge_3_more_rules](solutions/ch04_challenge_3_more_rules/)
(from `ch04_project03_password_rules`)

`src/rules.ts`
```ts
// CHALLENGE 3
export const NO_SPACES: Rule = {
  description: "no spaces",
  isMetBy: (password) => !password.includes(" "),
};

// CHALLENGE 3
export const notContaining = (word: string): Rule => {
  if (word === "") {
    throw new Error("notContaining needs a word to look for, not an empty string");
  }
  return {
    description: `not the word "${word}"`,
    isMetBy: (password) => !password.toLowerCase().includes(word.toLowerCase()),
  };
};
```

Both are added to `STANDARD_RULES`, so the page shows seven rules.

Tests: no spaces accepts "Elephant42!" and rejects a space in the middle and at the end;
`notContaining("password")` rejects "MyPassword1!" and "PASSWORD", accepts "Elephant42!";
`notContaining("PASS")` rejects "bypass" (the *word* is lowered too); the description;
`assertThrows(() => notContaining(""), Error, "empty")`.

**Look for:** both sides lowered - `notContaining("PASS")` is the test that catches lowering only
the password. `assertThrows` with an arrow and part of the message. No change to `PasswordChecker`
was needed: the checker takes any list of rules. A trailing-space test (spaces at the ends are the
ones people cannot see).

---

## 4. Back from Roman

**Project:** [solutions/ch04_challenge_4_from_roman](solutions/ch04_challenge_4_from_roman/)
(from `ch04_project02_roman_numerals`)

`src/roman.ts`
```ts
// CHALLENGE 4
export const fromRoman = (numeral: string): number => {
  let total = 0;
  let position = 0;
  for (const entry of NUMERALS) {
    while (numeral.startsWith(entry.symbol, position)) {
      total += entry.value;
      position += entry.symbol.length;
    }
  }
  return total;
};
```

`tests/roman.test.ts` adds `checkReading` (the same helper, the other way round) and four groups of
steps, then:

```ts
// CHALLENGE 4: one test, 3999 checks - steps would make the report 3999 lines long
Deno.test("every number from 1 to 3999 survives the round trip", () => {
  for (let n = 1; n <= 3999; n++) {
    assertEquals(fromRoman(toRoman(n)), n);
  }
});
```

The page has a second box: type a numeral, see its number (the input is upper-cased first).

**Look for:** the table reused, not copied. The classic alternative - walk the string, subtract a
symbol if the next one is bigger - is fine too, but needs its own value lookup. The round-trip test
as one test, not 3999 steps. A first red with "I is 1" and `return 1`, as in FizzBuzz.

---

## 5. The string calculator kata

**Project:** [solutions/ch04_challenge_5_string_calculator](solutions/ch04_challenge_5_string_calculator/)
(from a copy of `ch04_project04_leap_years_start_red`, with its source, tests and `.book-check.json`
removed)

`src/string_calculator.ts`
```ts
const parseNumbers = (numbers: string): number[] =>
  numbers.replaceAll("\n", SEPARATOR).split(SEPARATOR).map((part) => Number(part));

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
```

Seven tests, one per rule, in the order of the challenge (rule 6 has two: one negative, and two
negatives listed). The page uses `try`/`catch` to show the error's message instead of a total.

**Look for:** one test per rule, each seen red; rules 3 and 4 are where "fake it" gives way to
`split` and `reduce`. The empty-string check: `Number("")` is 0, so `"".split(",")` gives `[""]`
and the sum would be 0 anyway - a student who notices this and removes the guard (still green) has
refactored well. The error test checks the whole list, `-2, -3`, not just "negatives". `try`/`catch`
in `main.ts` only - the tested code throws, the page decides what to show.

---

## 6. Strict Roman

**Project:** [solutions/ch04_challenge_6_strict_roman](solutions/ch04_challenge_6_strict_roman/)
(from `ch04_challenge_4_from_roman`; Challenge 4's changes are still marked `CHALLENGE 4`)

`src/roman.ts`
```ts
// CHALLENGE 6: renamed from fromRoman, and no longer exported - it reads anything, even "IIII"
const addUpSymbols = (numeral: string): number => { /* the Challenge 4 loop */ };

// CHALLENGE 6
export const fromRoman = (numeral: string): number => {
  const total = addUpSymbols(numeral);
  if (!canBeRoman(total) || toRoman(total) !== numeral) {
    throw new Error(`"${numeral}" is not a proper Roman numeral`);
  }
  return total;
};
```

Tests: a group of steps, one per refused numeral - `""`, `"iv"`, `"HELLO"`, `"IIII"`, `"VV"`,
`"VX"`, `"IIX"`, `"IC"`, `"MMMM"`, `"XM"` - each with
`assertThrows(() => fromRoman(numeral), Error, "not a proper Roman numeral")`; a test that the
message names the numeral; and all of Challenge 4's tests, including the 3999 round trips, still
green. The page catches the error and shows its message in red.

**Look for:** the round-trip idea rather than a growing list of special cases ("no more than three
of a symbol", "V never repeats", "I only before V and X" ...). Students who go the rules route usually
miss one - `"IC"` or `"XM"` catch most. `canBeRoman(total)` is needed as well as the comparison:
`""` and `"HELLO"` add up to 0, and `toRoman(0)` is `""` - so `""` would otherwise be accepted as 0.
Steps built in a loop from an array of strings, named from the data. `try`/`catch` only in `main.ts`.
