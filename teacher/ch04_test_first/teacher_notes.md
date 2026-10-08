# Chapter 4 - Test first, properly: teacher notes

## Overview

Chapter 1 showed TDD once (`ageGroup`). This chapter turns it into the habit the rest of the book
relies on: from Chapter 5 on, every chapter shows at least one feature built red-green-refactor, and
every challenge is phrased test first. There is very little new *language* here; the new material is
a way of working, plus the testing tools that later chapters assume: `assertThrows` (with a first,
brief `throw new Error(...)`), `assertStrictEquals`, steps with `t.step`, and helper functions in
place of `beforeEach`.

Three katas carry the chapter. **FizzBuzz** is walked through cycle by cycle, with the real red
output at every step, then refactored. **Roman numerals** is the refactoring exercise: a pile of `if`s
and `while`s that becomes a data table and one loop, with the tests green throughout; its tests are
grouped into steps. **Password rules** brings in errors, `assertThrows`, identity versus equality,
and a fresh object per test. A fourth project, **leap years**, starts red: the tests are written and
four fail; making them pass is Challenge 2.

The hardest thing to teach is not any of the syntax: it is getting students who can already
program to take *small* steps and to *watch the test fail*. Expect resistance ("I know the answer,
why write `return "1"`?"). The live-coded FizzBuzz is where you win or lose that argument.

## Prerequisites

- Chapters 1-3: `Deno.test`, `assertEquals`, `assertAlmostEquals`, reading the TAP diff and the
  report, Chapter 1's `ageGroup` walkthrough, arrow functions, functions in data (Chapter 3's
  converters), `filter`/`map`, a first class with a constructor
- Java: JUnit, exceptions (`throw`, `try`/`catch`) - students will map these straight across

## Learning outcomes

Students can:

1. develop a small function red-green-refactor in genuinely small steps, starting from a test list
2. explain why a new test must be seen to fail, and what to do when one passes straight away
3. name tests as sentences and lay them out as arrange / act / assert
4. refactor working code - including replacing repeated blocks with a data table - while the tests
   stay green, and use a failing test to find a refactoring slip
5. throw an `Error` for invalid input and test it with `assertThrows`, including the message
6. choose between `assertEquals` and `assertStrictEquals`, and explain the difference
7. group related cases with `async (t)` and `await t.step(...)`, and build steps from a table with a helper
8. replace a shared `beforeEach` fixture with a helper function that makes a fresh object
9. work a "start red" exercise without changing the tests

## Suggested session plan (2 x 2 hour labs)

**Session 1 - the cycle, properly (projects 1-2)**

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Slides 1-3: the cycle again; *one* test, *least* code; why watch it fail |
| 0:10 - 0:45 | **Live-code FizzBuzz** from an empty project (slides 4-11 as a backup). Students call out the next test from the list; you refuse to write more code than the test needs |
| 0:45 - 1:00 | Slides 12-15: sentence names, arrange / act / assert; doc comment examples versus tests (swap the `if`s live and compare what the tests and the example say). Exercise 4.1 (`fizzBuzz(0)`) |
| 1:00 - 1:12 | Slides 16-19: Roman numerals; the pile of `if`s; **live refactor** to the table; make the IV/V slip on purpose |
| 1:12 - 1:25 | Slides 20-22: steps, `async`/`await`, the `checkExamples` helper. Exercise 4.2 |
| 1:25 - 1:55 | Challenge 1 (Whizz), then start Challenge 4 (`fromRoman`) |
| 1:55 - 2:00 | Recap: "what was your smallest step today?" |

**Session 2 - errors, identity, fixtures, start red (projects 3-4)**

| Time | Activity |
|---|---|
| 0:00 - 0:20 | Slides 23-25: `throw new Error`; `assertThrows` red first; the missing `() =>` demo (below) |
| 0:20 - 0:35 | Slide 26: `makeChecker()` instead of `@BeforeEach`. Ask who has been bitten by shared state in JUnit |
| 0:35 - 0:50 | Slides 27-28: `assertEquals` vs `assertStrictEquals`; the `minLength(8)` surprise. Exercise 4.3 |
| 0:50 - 1:00 | Slides 29-31: start red, katas, the habit list, JUnit comparison |
| 1:00 - 1:55 | Challenge 2 (make it green) in pairs - one types, one picks the next test, swap every test - then Challenges 3, 5 |
| 1:55 - 2:00 | Recap; set Challenge 6 as homework |

### Live-coding FizzBuzz

Start from a project made with `new_project.ts` (or delete the files from `ch04_project01_fizzbuzz`),
with `deno task dev` running so every save rebuilds and re-tests. Write the test list on the board
first. Then, for each line: write the test, save, **point at the red** and read the diff aloud
(`-` actual, `+` expected), write the least code, save, point at the green. Keep a tally of cycles
on the board. Two moments to milk:

- cycle 1, `return "1"`: let the room object, then add "2 is said as 2" and show that the second
  example is what forces `${n}` (triangulation)
- "6 and 99 are Fizz" passes at once: ask "is this test worth keeping?" (yes - it pins down "multiples",
  and would catch `n === 3`)

In the refactor, swap the two `if`s on purpose and show `- BuzzFizz` / `+ FizzBuzz`.

### The missing `() =>` demo

In `ch04_project03_password_rules`, change one test to `assertThrows(minLength(0));` and save. The
test fails with the very error it expected (`Error: a minimum length must be a whole number of at
least 1, not 0`), and the report's type errors section shows `Argument of type 'Rule' is not
assignable to parameter of type '() => unknown'.` Ask why the error "escaped". Link it to Chapter 3:
`addEventListener("click", handleToss())` calls too early in exactly the same way.

## Key points to stress

- **One test at a time.** Writing five tests then all the code is not TDD; it is "tests first", and
  loses the feedback of each step
- **See it fail, for the right reason.** "Module not found" is a fine first red; a red caused by a
  typo in the test is not the red you wanted
- **Least code** includes "fake it": `return "1"`. It feels silly; it keeps every step tiny
- **Refactor only on green**, in small steps, saving each time. Refactor the tests too
  (`checkExamples` is a refactor of thirty copy-pasted steps)
- **When blocks differ only by data, put the data in a table.** The same idea as Chapter 3's
  converters, and later the Strategy pattern
- **Tests drive; examples show.** The doc comment example (Chapter 1) is added *after* the refactor,
  once the function has settled: a few typical calls for someone who wants to use it. The rules and
  edges stay in the test file, where each has a name and one failure does not hide the others. Do
  not let students replace tests with examples, or write the example first and call it TDD
- **An example can go out of date - and Deno says so.** In Challenge 1, adding Whizz makes
  `fizzBuzz(7)` "Whizz", and the example's `assertEquals(fizzBuzz(7), "7")` goes red while every test
  passes. That is the point of checked documentation: a Javadoc comment would have quietly lied
- **`assertThrows` takes a function**: always `() => ...`
- **Check part of the message**, not all of it
- **`assertEquals` for contents, `assertStrictEquals` for identity.** Same as `equals` vs `==` in Java
- **JUnit's argument order is the other way round**: `assertEquals(expected, actual)` in Java,
  `assertEquals(actual, expected)` in Deno. Swapping them gives no error - just a diff with the
  `-` and `+` lines the wrong way round, which misleads
- **`async (t)` and `await t.step(...)`** - every time. `async`/`await` are only explained properly
  in Book 2; treat them as a rule for now
- **A helper, not a shared fixture**: each test calls `makeChecker()`; nothing leaks between tests
- **Throw for programmer mistakes** (a minimum length of 0, a checker with no rules), not for an
  ordinary bad password - that is a normal answer (`isAcceptable` gives `false`). Chapter 6 returns to
  this when validating object state

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `error: Module not found "src/fizz_buzz.ts".` and "the tests could not run" | the first red - no source file yet | create the file and export the function |
| ``error[no-unused-vars]: `n` is never used`` (a lint warning) | the "fake it" step `(n: number): string => "1"` | expected; the next test uses `n` |
| `Error: a minimum length must be ... not 0` as a test failure | `assertThrows(minLength(0))` - no arrow; also a type error: `Argument of type 'Rule' is not assignable to parameter of type '() => unknown'.` | `assertThrows(() => minLength(0))` |
| `AssertionError: Expected function to throw.` | the code does not throw yet (correct red), or the condition is wrong | add or fix the `if ... throw` |
| `Expected error message to include "...", but got "..."` | the third argument is not part of the real message | match a stable part of the message |
| `Didn't complete before parent. Await step with `await t.step(...)`.` | a `t.step` without `await` | `await t.step(...)` |
| `TS1308 [ERROR]: 'await' expressions are only allowed within async functions and at the top levels of modules.` | `await` used but the test function is not `async` | `async (t) => { ... }` |
| `AssertionError: Values have the same structure but are not reference-equal.` | `assertStrictEquals` on two lookalike objects or arrays | use `assertEquals` unless identity is the point |
| `assertEquals(minLength(8), minLength(8))` fails, showing `isMetBy: [Function: isMetBy]` | each call makes a new function; functions are only equal to themselves | compare `description`, or call `isMetBy` |
| The diff's `-` line shows the expected value | JUnit habit: `assertEquals(expected, actual)` | `assertEquals(actual, expected)` |
| Many Roman tests fail with odd numerals like `IVI` | table rows out of order (IV before V) | biggest value first |
| A start-red test "fixed" by editing the test | misunderstanding the exercise | the tests are the specification - revert, change the code |

## Discussion questions

1. `return "1"` passes the first test. Is that cheating? What would go wrong if you wrote the full
   FizzBuzz straight away and then wrote the tests?
2. A test passed the first time you ran it. List three possible reasons, good and bad.
3. Roman numerals: the table version is shorter, but is it *clearer* than the pile of `if`s? For whom?
4. When should code throw an error, and when should it return an answer like `false` or `[]`? Why
   does `minLength(0)` throw but `isAcceptable("")` return `false`?
5. JUnit has `@BeforeEach`. Why might a helper function that each test calls be better? When might a
   shared setup be worth it?
6. In a start-red exercise you are sure one test is wrong. What do you do?
7. Why is the doc comment example written after the tests and the refactor, not first? What would it
   cost to put every FizzBuzz check in the example instead of the test file?

## Extension ideas

- `assertRejects` (the `async` cousin of `assertThrows`) - just mention it; Book 2 needs it
- `deno test --filter "FizzBuzz"` to run only matching tests
- Mutation testing by hand: change a `>=` to `>` in `toRoman`, or a `3` to `4` in FizzBuzz, and see
  which tests catch it. Any change that no test catches shows a missing test
- The bowling game kata, or Gilded Rose for refactoring practice
- Time-boxed katas: FizzBuzz from empty in 10 minutes; repeat next week and compare commit-by-commit
  (if students use git, one commit per green)

## Assessment ideas

- A short kata done live, with the screen recorded: assess the size of the steps and that each test
  was seen to fail, not just the final code
- Given five badly named tests (`test1`, `works`, ...), rename them as sentences and split any that
  test two things
- Spot the bug: three `assertThrows` calls, one without `() =>`; two `assertStrictEquals` calls, one
  that should be `assertEquals`
- Lab check: Challenge 2 (leap years) with the order of the steps written down, and Challenge 5
  (string calculator) with one test per rule
