# Chapter 1, challenge 2 - Good night (teacher's solution)

Hours 22 to 4 are "night", with tests for every edge.

Made from `ch01_project07_hello_page`. Every change is marked with a `CHALLENGE 2` comment - search for `CHALLENGE` to find them.

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

- `src/greeting.ts` - two functions, with typed parameters and return types, and named constants
- `src/facts.ts` - an exported array of strings
- `src/main.ts` - importing, `querySelector` with a `null` check, `textContent`, and a `for ... of`
  loop that builds `<li>` elements
- `tests/greeting.test.ts` - four tests for `greeting.ts`
- `dist/app.js` - what the build made from the three files in `src/`: no types, one file
