# Pet

A pet whose name, species and age are private: the page can only change them through public methods that check every value, so a pet can never have a blank name or a negative age.

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

- `src/Pet.ts` - private fields, a `readonly` field, `getX()`/`isX()`/`setX()` methods, and two
  private helper methods that check names and ages for both the constructor and the setters
- `src/main.ts` - can only use Pet's public methods; `try`/`catch` shows the message when a rename
  is refused
- `tests/Pet.test.ts` - `assertThrows` for every value the pet refuses, and a check that a refused
  change leaves the old value in place
