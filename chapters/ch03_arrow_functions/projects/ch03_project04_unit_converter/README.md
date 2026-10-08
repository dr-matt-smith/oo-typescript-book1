# Unit Converter

Converts a value between units, using whichever conversion function is chosen from a drop-down list. Shows functions stored in objects, function types, and choosing a function at run time.

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

- `src/converters.ts` - `type ConvertFunction = (value: number) => number`; each converter object
  holds its own function; `convertAll` takes any function
- `src/main.ts` - the drop-down list chooses which function is called
- `tests/converters.test.ts` - a test that hands `convertAll` a function of its own
