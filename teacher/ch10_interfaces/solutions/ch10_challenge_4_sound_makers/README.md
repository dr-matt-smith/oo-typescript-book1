# Chapter 10, challenge 4 - Things that make a sound (teacher's solution)

A SoundMaker interface that Instrument extends, a Doorbell that is only a SoundMaker, and a tested soundCheck function.

Made from `ch10_project02_instruments`. Every change is marked with a `CHALLENGE 4` comment - search for `CHALLENGE` to find them.

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

- `src/Instrument.ts` - an interface with a `readonly` member and an optional member (`strings?`)
- `src/Tunable.ts` - a second interface; `Guitar` and `Violin` implement both
- `src/Drum.ts` - an instrument that leaves out the optional `strings`
- `src/band.ts` - functions that only use what the interfaces promise; `describeInstrument` checks
  for `undefined` before using `strings`
- `src/main.ts` - the guitar and violin are in two arrays at once, as `Instrument` and as `Tunable`
- `tests/band.test.ts` - instruments and tunables faked with object literals
