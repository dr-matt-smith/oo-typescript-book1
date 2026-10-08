# Password Rules

A password checker built from a list of rules, test first. It shows assertThrows for invalid input, assertStrictEquals for identity, and a helper function that gives every test a fresh checker.

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

- `src/rules.ts` - each rule is an object holding a description and a function; `minLength` throws
  an `Error` when asked for a length that makes no sense
- `src/PasswordChecker.ts` - a class given its rules in the constructor, which throws if there are
  none; a doc comment example for the class, which imports rules from `./rules.ts`
- `tests/PasswordChecker.test.ts` - `makeChecker()` gives every test a fresh checker; `assertThrows`
  with an error message; `assertStrictEquals` to check the very same rule object comes back
- `tests/rules.test.ts` - one rule at a time, including the edges of `minLength`
