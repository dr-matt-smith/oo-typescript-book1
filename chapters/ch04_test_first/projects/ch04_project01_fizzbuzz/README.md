# FizzBuzz

The FizzBuzz kata, built test first one red-green-refactor cycle at a time: a fizzBuzz function for one number, a list for 1 to n, and a page that shows the list for any n.

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

- `tests/fizz_buzz.test.ts` - the tests in the order they were written, one red-green-refactor
  cycle each; names that read as sentences; arrange / act / assert spelled out in one test
- `src/fizz_buzz.ts` - the code after refactoring: named constants, a small `isDivisibleBy` helper,
  and an answer built up from "Fizz" and "Buzz"; a doc comment example on each exported function,
  added once the code had settled
- `src/main.ts` - redraws the list whenever the number in the box changes
