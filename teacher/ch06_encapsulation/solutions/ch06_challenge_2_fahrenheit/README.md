# Chapter 6, challenge 2 - Fahrenheit too (teacher's solution)

A read-only, computed targetFahrenheit property, shown under the target.

Made from `ch06_project03_thermostat`. Every change is marked with a `CHALLENGE 2` comment - search for `CHALLENGE` to find them.

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

- `src/Thermostat.ts` - a `get`/`set` pair for `target` whose setter checks every value, `up()` and
  `down()` that go through the setter, a computed `get heating()`, and a plain public field `room`
- `src/main.ts` - `thermostat.target = ...` looks like an assignment but runs the setter, so it sits
  inside `try`/`catch`
- `tests/Thermostat.test.ts` - the edges (5 and 30 °C), values just outside them, and `assertThrows`
  around an assignment
