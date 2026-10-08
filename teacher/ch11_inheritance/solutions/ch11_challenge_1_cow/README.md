# Chapter 11, challenge 1 - A cow (teacher's solution)

A Cow subclass that says Moo, with tests and an Add a cow button.

Made from `ch11_project01_animals`. Every change is marked with a `CHALLENGE 1` comment - search for `CHALLENGE` to find them.

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

- `src/Animal.ts` - an `abstract` class: a `protected` name, an `abstract getSound()`, and `speak()`,
  written once, which calls whichever `getSound()` the subclass supplies
- `src/Cat.ts` and `src/Dog.ts` - `extends Animal`, no constructors of their own, `override` on every
  replaced method; `Dog` adds `wagTail()`
- `src/main.ts` - one `Animal[]` array holds cats and dogs; `${animal}` runs each one's `toString()`
- `tests/animals.test.ts` - tests for each subclass, `instanceof`, and `chorus` over a mixed array
