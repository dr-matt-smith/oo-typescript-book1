# Chapter 11, challenge 4 - A student account (teacher's solution)

StudentAccount extends CurrentAccount: a €50 overdraft and a €200 limit per withdrawal, checked by the shared account rules too.

Made from `ch11_project03_bank_accounts`. Every change is marked with a `CHALLENGE 4` comment - search for `CHALLENGE` to find them.

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

- `src/BankAccount.ts` - an abstract class holding the rules (`deposit`, `withdraw`) and two abstract
  methods each subclass must answer: `available()` and `getKind()`
- `src/SavingsAccount.ts` and `src/CurrentAccount.ts` - default parameters passed on with `super(owner)`,
  and the `protected balance` used directly
- `tests/account_rules.ts` - **one test suite, written as a function**, that registers the same nine
  tests for any kind of account; `savings.test.ts` and `current.test.ts` each call it in one line
- `src/main.ts` - `wireCard` takes a `BankAccount`, so the same code wires up both cards
