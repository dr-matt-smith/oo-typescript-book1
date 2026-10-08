# Chapter 9, challenge 1 - Take it out again (teacher's solution)

A tested withoutItem function that returns a new basket, and a Remove eggs from B button.

Made from `ch09_project01_aliasing`. Every change is marked with a `CHALLENGE 1` comment - search for `CHALLENGE` to find them.

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

- `src/basket.ts` - `copyBasket` makes B from A three ways (the same array, `[...a]`,
  `structuredClone(a)`); `withItem` returns a new array instead of changing the one it is given;
  `sharing` uses `===` to ask "the same object?"
- `tests/values.test.ts` - small runnable facts: numbers are copied, arrays are shared, `const` does
  not freeze an array, a function can change the caller's array
- `tests/basket.test.ts` - `assertStrictEquals` (the same object) against `assertEquals` (the same
  contents); `makeBasket()` gives every test its own fresh data
- `src/main.ts` - try each copy button, then change B and watch A
