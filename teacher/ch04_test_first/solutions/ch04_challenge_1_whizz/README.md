# Chapter 4, challenge 1 - Fizz, Buzz, Whizz (teacher's solution)

Multiples of 7 say Whizz, combined with Fizz and Buzz, test first.

Made from `ch04_project01_fizzbuzz`. Every change is marked with a `CHALLENGE 1` comment - search for `CHALLENGE` to find them.

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

- `src/fizz_buzz.ts` - one more constant and one more `if`; no combinations to list
- `tests/fizz_buzz.test.ts` - 7, 21, 35, 105, and the first fourteen answers
