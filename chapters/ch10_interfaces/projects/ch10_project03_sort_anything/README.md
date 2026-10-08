# Sort Anything

Songs, planets and mountains, three unrelated classes, all sorted by the same function. Each class implements a small Sortable interface - like Java's Comparable, each one decides its own order.

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

- `src/Sortable.ts` - a small interface, like Java's `Comparable`: each class decides its own order
- `src/Song.ts`, `src/Planet.ts`, `src/Mountain.ts` - three unrelated classes, all `Sortable`
  (mountains sort tallest first, by giving minus their height)
- `src/sorting.ts` - `sortAll`, one function that sorts anything `Sortable`
- `src/main.ts` - a `Song[]` passed where a `Sortable[]` is wanted
- `tests/sorting.test.ts` - `sortAll` developed test first, with fake items made from object literals
