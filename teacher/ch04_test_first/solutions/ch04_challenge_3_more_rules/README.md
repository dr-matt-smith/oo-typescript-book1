# Chapter 4, challenge 3 - More password rules (teacher's solution)

Two new rules, NO_SPACES and notContaining(word), test first, with notContaining("") throwing.

Made from `ch04_project03_password_rules`. Every change is marked with a `CHALLENGE 3` comment - search for `CHALLENGE` to find them.

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

- `src/rules.ts` - `NO_SPACES`, `notContaining` (which throws for an empty word), and the longer `STANDARD_RULES`
- `tests/rules.test.ts` - the new rules' tests, including case and `assertThrows`
