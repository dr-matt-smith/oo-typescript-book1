# Chapter 7, challenge 3 - Two rooms (teacher's solution)

Two Tally models and two TallyView objects on one page, each view finding its elements inside its own part of the page.

Made from `ch07_project01_tally_counter`. Every change is marked with a `CHALLENGE 3` comment - search for `CHALLENGE` to find them.

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

- `src/Tally.ts` - the model: the count and the capacity, with the rules (never below zero, never
  above the capacity). No DOM
- `src/TallyView.ts` - a small view class: finds its elements once, and `render(tally)` copies the
  model onto the page, switching off the buttons that would do nothing
- `src/dom.ts` - `requireElement(selector)`, which throws an error naming a missing element
- `src/main.ts` - makes the model and the view; every listener changes the model, then renders
- `tests/Tally.test.ts` - the model's tests, including both edges. The view has no tests: it has no
  rules of its own
