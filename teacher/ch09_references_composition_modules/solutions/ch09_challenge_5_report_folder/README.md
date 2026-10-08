# Chapter 9, challenge 5 - A second folder (teacher's solution)

report.ts moved into a src/report/ folder with its own index.ts, and a tested courseToCsv function.

Made from `ch09_project03_course_modules`. Every change is marked with a `CHALLENGE 5` comment - search for `CHALLENGE` to find them.

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

- `src/model/` - a folder of classes: `Course` has `Module`s and `Student`s (composition), a
  `Module` refers to the course's students (aggregation)
- `src/model/index.ts` - the folder's front door: it re-exports the three classes
- `src/report/` - a second folder with its own `index.ts`; `csv.ts` and `summary.ts` import the model with `import type`
- `tests/fixtures.ts` - `makeCourse()` builds a fresh course for every test, so tests cannot affect
  each other; `moduleOf` saves `undefined` checks
