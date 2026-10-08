# Chapter 8, challenge 5 - Two desks (teacher's solution)

The static counter moved into a TicketMachine object, so two desks can each number their tickets from 1.

Made from `ch08_project03_ticket_numbers`. Every change is marked with a `CHALLENGE 5` comment - search for `CHALLENGE` to find them.

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

- `src/TicketMachine.ts` - the counter that used to be `static` in `Ticket`, now an ordinary field:
  one per machine
- `src/Ticket.ts` - given its prefix and number; only the `static readonly DIGITS` constant and the
  `static format` method are left static
- `tests/` - no test calls a reset any more: every test makes its own machine
- `src/main.ts` - two desks built from one function, each with its own machine and queue
