# Chapter 8, challenge 1 - What should drivers do? (teacher's solution)

A tested instruction function, a switch with a case for every colour, shown under the colour name.

Made from `ch08_project01_traffic_light`. Every change is marked with a `CHALLENGE 1` comment - search for `CHALLENGE` to find them.

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

- `src/light_colour.ts` - `type LightColour`, a string-literal union, and `nextColour`, a `switch`
  that covers every colour (leave a case out and it will not compile)
- `src/TrafficLight.ts` - all three kinds of "never changes": `static readonly STARTING_COLOUR` and
  `SECONDS` (one per class), `readonly name` (one per object); and `Record<LightColour, number>`
- `src/main.ts` - a module-level `const`, and a timer that waits `TrafficLight.SECONDS` for each colour
- `tests/` - loops over `LIGHT_COLOURS` and `LAMPS`, so every value is tested
