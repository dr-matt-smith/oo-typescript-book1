# Bullet List

main.ts loops through an array of strings, and shows each one as a bullet point on the page.

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

### No Deno? Use Node

The project works with **Node** (version 26 or later) too - for example on the college lab PCs. If the
console says it cannot find `deno`, use its Node buttons instead:

1. **`npm install`** - once, the first time: downloads the build tools into `node_modules/` (this needs
   an internet connection)
2. **`npm run dev`** - the same as `deno task dev`: build, test, and watch

Everything else is the same: the same `dist/`, the same tests and the same test report. Only Deno has a
linter, so with Node the report shows "lint (Deno only)".

Every command, for each: [README_deno_TS_workflow.md](README_deno_TS_workflow.md) and
[README_node_TS_workflow.md](README_node_TS_workflow.md).

## What to look at

- `src/main.ts` - an array (`string[]`), a `for ... of` loop, `createElement` and `appendChild`, and
  `.length`

Exercises 1.4 and 1.5 in the chapter start here.
