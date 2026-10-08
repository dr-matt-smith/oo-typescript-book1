# Chapter 4, challenge 6 - Strict Roman (teacher's solution)

fromRoman refuses anything that is not a proper Roman numeral, by converting back with toRoman and comparing.

Made from `ch04_challenge_4_from_roman` (the solution to Challenge 4, whose changes are marked `CHALLENGE 4`). Every change for this challenge is marked with a `CHALLENGE 6` comment - search for `CHALLENGE` to find them.

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

- `src/roman.ts` - `fromRoman` checks its answer with `toRoman` and throws if they differ
- `tests/roman.test.ts` - a group of steps, one per refused numeral, each using `assertThrows`
- `src/main.ts` - `try`/`catch` shows the error's message on the page
