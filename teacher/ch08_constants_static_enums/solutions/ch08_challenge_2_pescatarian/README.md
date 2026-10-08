# Chapter 8, challenge 2 - A new diet (teacher's solution)

A fourth diet, pescatarian, added to the as const array - with the compiler finding the switches and the tests finding the logic it could not.

Made from `ch08_project02_menu_order`. Every change is marked with a `CHALLENGE 2` comment - search for `CHALLENGE` to find them.

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

- `src/diet.ts` - `DIETS` and `COURSES` as arrays `as const`, with the union types worked out from
  them; `toDiet` and `toCourse`, which check strings from JSON and throw on a bad one
- `src/Dish.ts` - `static fromData`, a static factory method, and `readonly` parameter properties
- `src/Order.ts` - `static formatPrice`, a static method that needs no object; prices in whole cents
- `src/three_ways.ts` and `tests/three_ways.test.ts` - an `enum`, a union and an `as const` object
  side by side, and how each behaves (not used by the page)
- `src/main.ts` - the menu is built by looping over `COURSES`, which exists at run time
