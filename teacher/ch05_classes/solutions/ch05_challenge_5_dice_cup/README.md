# Chapter 5, challenge 5 - A cup of dice (teacher's solution)

A DiceCup class made of Die objects, rolled with a random function passed in, and a choice of 1, 2 or 3 dice.

Made from `ch05_project02_die`. Every change is marked with a `CHALLENGE 5` comment - search for `CHALLENGE` to find them.

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

- `src/Die.ts` - `constructor(private sides: number = DEFAULT_SIDES)`, a field that starts as `null`,
  and `roll(random)`, which is given its random number instead of calling `Math.random()`
- `tests/Die.test.ts` - every roll is tested with a chosen "random" number: 0, just below 1, the middle
- `src/main.ts` - choosing a number of sides makes a `new Die(...)`; `Math.random()` is called only here
