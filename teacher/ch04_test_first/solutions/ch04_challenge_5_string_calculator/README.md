# Chapter 4, challenge 5 - The string calculator kata (teacher's solution)

The string calculator kata, one rule per test, with negative numbers refused by an Error that lists them.

Made from `ch04_project04_leap_years_start_red`. Every change is marked with a `CHALLENGE 5` comment - search for `CHALLENGE` to find them.

## Running it

Open the project in Celbridge. The console at the bottom starts by itself, and runs `deno task dev`:

1. **builds** `src/` (TypeScript) and `public/` (HTML, CSS, images) into `dist/`
2. **tests** everything in `tests/`, printing the results in the console (in TAP format) and writing a
   readable report to `test_output/index.html` (and `test_output/summary.md`)
3. **watches** - every time you save a file in `src/`, `public/` or `tests/`, it does it all again

`dist/index.html` opens beside the console. After a rebuild, its preview's **refresh** button lights
up - press it to see your changes. The clipboard icon opens the test report.

The console's buttons: rebuild-and-watch, build once, test once, and lint. To use them while the
watcher is running, press **Ctrl+C** first to stop it.

No server is needed: `dist/` is a plain web page, so you can also open `dist/index.html` in any browser.

## What to look at

- `src/string_calculator.ts` - `add`, built up one rule at a time
- `tests/string_calculator.test.ts` - one test per rule, in the order they were written
- `src/main.ts` - `try`/`catch` shows the error's message on the page
