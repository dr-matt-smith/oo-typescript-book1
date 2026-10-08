# Chapter 1 - Introduction: teacher notes

## Overview

The first contact with TypeScript, Deno, Celbridge, and testing. The chapter is deliberately slow:
seven small projects, each one idea bigger than the last, with short in-chapter **exercises**
(1.1-1.5) whose answers follow immediately and become the next project. Weaker students should be
able to finish it feeling confident; stronger ones will move quickly to the challenges.

The sequence: one line on the page → the time → an `if` → a function in its own file → *why we
test* (testing time-dependent code by hand is slow) → a first check as an `@example` in the
function's doc comment → why examples are not enough → a `1 + 1` test → tests for the function →
**TDD** with `ageGroup` → arrays and a loop → data in a module → data in JSON → everything together.

There are **no classes** in this chapter; the first class is in Chapter 2 (`Counter`). Event
handling is also left to Chapter 2: every page here does its work once, on load. Arrow functions
appear only inside `Deno.test(...)`; students are told to read `() => { ... }` as "the test's code"
until Chapter 3.

## Prerequisites

- the Java OOP book, Parts A and B (variables, methods, `if`, loops, arrays, `final`)
- Deno 2.4 or later installed (`deno --version`); Celbridge installed, or any editor plus a terminal
  and a browser
- a network connection for the **first** build (Deno downloads `@std/assert` once)

## Learning outcomes

Students can:

1. open a project in Celbridge, and explain what `deno task dev` does on every save
2. say which folders they edit (`src/`, `public/`, `tests/`) and which are generated (`dist/`,
   `test_output/`)
3. use `const`/`let`, type annotations and inference, `number`/`string`/`boolean`/`string[]`,
   template literals, `if`, `===`, functions with typed parameters and return types,
   `export`/`import`, and `for ... of`
4. find an element with `querySelector`, null-check it, and set its `textContent`
5. explain why a function that takes the hour as a parameter is easier to test than code that reads
   the clock itself
6. add a checked `@example` to a function's doc comment, and say what belongs in an example and
   what belongs in a test file
7. write a `Deno.test` with `assertEquals(actual, expected)`, including tests at the edges, and read
   the TAP output and the HTML report
8. carry out a red-green-refactor cycle for a small function
9. keep data in a JSON file and import it

## Suggested session plan (2 x 2 hour labs, or 3 x 1 hour + homework)

**Session 1 - TypeScript and the page (projects 1-2, exercises 1.1-1.3)**

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Slides 1-7: what TypeScript is; the tools; what happens on save |
| 0:10 - 0:25 | **Live demo**: open `ch01_project01_hello_world`. Point out the console starting by itself, the preview, the refresh button. Change the message, save, refresh. Open `dist/app.js` |
| 0:25 - 0:45 | Students do the same, then Exercise 1.1. Circulate - tooling problems surface here |
| 0:45 - 1:05 | Slides 8-12: types, `let`/`===`, functions, `export`/`import`. Students do Exercises 1.2 and 1.3 in project 2 |
| 1:05 - 1:50 | Challenge 1 (in project 7), and catch-up |
| 1:50 - 2:00 | Recap: edit `src/`, look at `dist/`; `null` checks; types after names |

**Session 2 - testing, TDD and data (projects 3-7)**

| Time | Activity |
|---|---|
| 0:00 - 0:20 | Slides 14-22: why test; a first check as a doc comment example; a failing check; why examples are not enough; test files and the edges; the report |
| 0:20 - 0:30 | **Live demo**: in project 3, change `MIDDAY` to 8 (the example fails), then to 13 (only the edge test fails), save, read the TAP and the report together; put it back |
| 0:30 - 0:55 | Slides 23-27: TDD. **Live-code** `ageGroup` from an empty project, test by test, narrating red and green. Ask the class "what about 12?" before writing any code |
| 0:55 - 1:10 | Slides 28-30: arrays, JSON. Students do Exercises 1.4 and 1.5 |
| 1:10 - 1:55 | Challenges 2-5 (6 as a stretch or homework) |
| 1:55 - 2:00 | Recap: red, green, refactor; test the edges |

## Key points to stress

- **Edit `src/`, `public/`, `tests/`; never edit `dist/`.** Changes in `dist/` vanish on the next
  save. Ask "which folder are you in?" whenever something "doesn't update"
- **Press refresh.** The preview does not reload by itself; the button lights up when `dist/` changed
- **Types come after names**, and `number` is the only number type
- **`===`, always.** Mention `0 == ""` being `true` once, then ban `==`
- **`null` checks are a feature**, not noise. Java lets you forget and crash later
- **Why tests need parameters.** The whole of `greeting(hour)` exists so a test can choose the hour.
  This idea returns in Chapter 2 (passing in a random number) and Book 2, Chapter 3 (dependency injection)
- **Examples first, then tests.** The first check students meet is an `@example` in a doc
  comment: it sits next to the code, needs no new file, no test name and no arrow function, and is
  also documentation (hover over `greeting` in `main.ts`). Then show its limits - no name, stops at
  the first failure, and crowded if it tries to cover the edges - which is why test files exist.
  The rule of thumb: one or two typical calls in the example; the edges and odd cases in `tests/`
- **A comment is not a check.** `greeting(9); // "Good evening"` in an example passes. Only an
  `assertEquals` checks anything. Worth demonstrating: students who write examples as comments
  believe they are tested
- **Test the edges.** Ask: "which test would catch `<=` instead of `<`?"
- **In TDD, red first.** A test that has never been seen failing has not been shown to test anything
- **`assertEquals(actual, expected)`** - students who know JUnit (`expected, actual`) will swap them;
  the diff's labels then look backwards
- **Small steps.** The step-2 `return "child";` is always controversial; it is the point. Discuss:
  "what test would force us to write more?"

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| The console does not start building on open | `deno` not on the PATH for Celbridge's shell, or not installed | `deno --version` in the console; install Deno, restart Celbridge |
| `JSR package manifest for '@std/assert' failed to load` on the first build | no network on the first build | connect once; it is cached afterwards |
| Page shows "(if you can read this, dist/app.js has not run - build the project)" | the bundle failed (scroll up in the console), or no build yet | read the console; press the build button |
| "My change doesn't show" | no refresh; edited `dist/`; watcher stopped | refresh; edit `src/`; restart with the rebuild-and-watch button |
| A console button "does nothing" | the watcher is running and swallowed the typed command | Ctrl+C first |
| `'output' is possibly 'null'` | used a `querySelector` result without the `if` | wrap in `if (output !== null) { ... }` |
| `Type 'string' is not assignable to type 'number'` | e.g. `const hour: number = "nine";` | match the declared type |
| `Cannot find name 'assertEquals'.` and `ReferenceError: assertEquals is not defined`, at `src/greeting.ts (example at lines 11-16)` | the example's `import { assertEquals } from "@std/assert";` line left out (the function itself is imported automatically; `assertEquals` is not) | add the import line at the top of the example |
| The example is never run: the count of passed tests does not go up | the example's code is not between ```` ```ts ```` and ```` ``` ```` lines, so Deno sees plain text | put the code in a fenced block, as in project 3 |
| `Module not found "src/age_group.ts"` | TDD step 1: the test imports a file not written yet | expected - that is red. Create the file |
| `` `age` is never used `` (no-unused-vars) | TDD step 2: `return "child";` ignores `age` | expected; the next test uses it. (Or name it `_age` for now) |
| `Cannot find module` / the import fails | missing `.ts` on the import path, or wrong `./` / `../` | imports end `.ts`; tests import `../src/...` |
| The page shows the list twice | `appendChild` in a loop that was copied | look for two loops |
| `` `x` is never reassigned (prefer-const) `` | `let` where `const` would do | use `const` |

## Discussion questions

1. Java keeps some type information at run time; TypeScript keeps none. What might Java be able to
   do at run time that TypeScript cannot? (Preview of Chapter 10.)
2. Why is `greeting` in its own file, with no page code in it? What would be harder to test if it
   wrote straight to the heading?
3. A Javadoc comment can say anything, true or not. What makes a doc comment example different? Why
   not put every check in the example, and do without test files?
4. "Under 12 is a child, 13-19 is a teenager." What else in real specifications is vague like this,
   and who should decide?
5. In TDD, step 2 returned `"child"` for every age. Is that cheating? What stops the final code being
   wrong?
6. Why read the planets from JSON rather than keep them in TypeScript? Who might edit the JSON?

## Extension ideas

- `deno task lint` and `deno task check` on their own; `deno fmt` to format code
- Open `dist/app.js` after project 6 and find the planets array - the JSON has become code
- Ask students to write a test that **should** fail, and check that it does (testing the tests)

## Assessment ideas

- Short quiz: five lines of Java to rewrite in TypeScript (types after names, `const`, `===`,
  template literal, `for ... of`)
- Lab check: Challenge 4 with all tests passing; ask the student to show the red state they saw first
- Written: "Explain, with an example, why tests at the edges of a range matter"
