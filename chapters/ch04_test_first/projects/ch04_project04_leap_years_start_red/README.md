# Leap Years (start red)

A start-red kata: the tests for isLeapYear are already written and most of them fail. Make them pass, one at a time, test by test.

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

- `tests/leap_year.test.ts` - already written; 4 of the 8 tests fail when you start. Make them pass
  one at a time
- `src/leap_year.ts` - the rules are in the comment at the top; `isLeapYear` always says `false`
  until you write it
- `.book-check.json` - tells the book's checker that this project is meant to start with 4 failing tests
