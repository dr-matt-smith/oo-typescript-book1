# Chapter 2, challenge 6 - Ten-second challenge (teacher's solution)

A timed round; `Counter` keeps the best score, and the scoring is tested.

Made from `ch02_project02_click_counter`. Every change is marked with a `CHALLENGE 6` comment - search for `CHALLENGE` to find them.

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

- `src/Counter.ts` - a first class: a private field, three public methods, and `this.`
- `src/messages.ts` - a plain function (not every piece of code needs to be in a class)
- `src/main.ts` - `new Counter()`, `render()`, and `addEventListener("click", handleAdd)` - the
  function itself is passed, without brackets
- `tests/` - tests for the class and the function. Try breaking `Counter.ts` to see them fail
