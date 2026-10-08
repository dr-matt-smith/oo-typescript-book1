# Dice Roller

A Die class with any number of sides (six unless you say otherwise), rolled with a random number passed in, so every roll can be tested.

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
