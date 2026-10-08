# Chapter 8, challenge 6 - A junction (teacher's solution)

Two traffic lights controlled by a Junction that steps through a union of phases - tested so that, in every phase, at least one light is red.

Made from `ch08_project01_traffic_light`. Every change is marked with a `CHALLENGE 6` comment - search for `CHALLENGE` to find them.

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

- `src/Junction.ts` - `PHASES` as an `as const` array, the `Phase` union worked out from it, and
  `Record<Phase, PhaseColours>` saying what each light shows in each phase
- `src/TrafficLight.ts` - a new `show(colour)` method, so the junction can set its lights
- `tests/Junction.test.ts` - the safety rule (at least one light red) checked for every phase, and a
  check that each light still follows the UK sequence
