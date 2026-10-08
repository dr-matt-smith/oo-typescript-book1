# Hello, Page

A web page that greets you by the time of day, and lists a few TypeScript facts from an array. Shows a project's files, typed variables and functions, importing one file from another, and finding elements on the page.

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

- `src/greeting.ts` - two functions, with typed parameters and return types, named constants, and an
  `@example` in each doc comment
- `src/facts.ts` - an exported array of strings
- `src/main.ts` - importing, `querySelector` with a `null` check, `textContent`, and a `for ... of`
  loop that builds `<li>` elements
- `tests/greeting.test.ts` - four tests for `greeting.ts`
- `dist/app.js` - what the build made from the three files in `src/`: no types, one file
