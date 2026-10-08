# Chapter 10, challenge 6 - Click to choose (teacher's solution)

A contains(x, y) method added to the Shape interface and every shape, a tested shapeAt function, and clicking the canvas to choose a shape.

Made from `ch10_project01_shapes`. Every change is marked with a `CHALLENGE 6` comment - search for `CHALLENGE` to find them.

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

- `src/Shape.ts` - the `Shape` interface: the contract every shape keeps
- `src/Circle.ts`, `src/Rectangle.ts`, `src/Triangle.ts` - three classes that each `implements Shape`
- `src/Pen.ts` - an interface we wrote for the drawing methods; the browser's canvas context fits it
  without ever having heard of it (structural typing)
- `src/main.ts` - one `Shape[]` array, drawn and listed without asking which kind each shape is
- `tests/recording_pen.ts` - a fake `Pen` made from an object literal, which writes down every call
- `tests/shapes.test.ts` - fake shapes made from object literals, with exactly the areas a test needs
