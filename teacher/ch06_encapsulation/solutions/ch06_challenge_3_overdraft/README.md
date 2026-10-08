# Chapter 6, challenge 3 - An overdraft (teacher's solution)

An optional, checked overdraftLimit constructor parameter; withdrawals may go down to minus the limit, and overdrawn balances show as -€5.00.

Made from `ch06_project02_bank_account`. Every change is marked with a `CHALLENGE 3` comment - search for `CHALLENGE` to find them.

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

- `src/BankAccount.ts` - a `#private` balance, a `get balance()` accessor with no setter, `public
  readonly` parameter properties, and the rule "check first, change after"
- `src/money.ts` - money kept in whole cents, and turned into euros only for the page
- `src/main.ts` - one `attempt` helper runs a deposit or withdrawal and shows either the result or
  the account's refusal
- `tests/BankAccount.test.ts` - refused withdrawals, the balance after a refusal, and `t.step` for a
  list of bad amounts
