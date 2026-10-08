# Ticket Numbers

A deli-counter ticket machine: every new ticket gets the next number from a static counter that belongs to the class, not to any one ticket - and what static state does to your tests.

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

- `src/Ticket.ts` - `private static nextNumber`, one counter shared by every ticket; `static readonly`
  constants; static methods `format`, `issuedCount` and `resetNumbering`; a `readonly` number per ticket
- `src/TicketQueue.ts` - a queue of tickets, with `shift()` to serve the first
- `tests/` - every test resets the static counter first, so no test depends on another; the last
  queue test shows two queues sharing one counter
