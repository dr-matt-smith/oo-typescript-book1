# Chapter 4, challenge 4 - Back from Roman (teacher's solution)

fromRoman, test first with groups of steps and a round-trip test, plus a second box on the page.

Made from `ch04_project02_roman_numerals`. Every change is marked with a `CHALLENGE 4` comment - search for `CHALLENGE` to find them.

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

- `src/roman.ts` - `fromRoman` uses the same `NUMERALS` table the other way round
- `tests/roman.test.ts` - `checkReading` steps, and one test that checks all 3999 round trips
- `src/main.ts` - a second box turns a numeral into a number
