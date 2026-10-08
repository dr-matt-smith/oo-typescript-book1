# Chapter 7, challenge 6 - Remember the list (teacher's solution)

The to-dos saved in localStorage after every change, with a model that turns itself into plain data and back - tested as a round trip.

Made from `ch07_project03_todo_filters`. Every change is marked with a `CHALLENGE 6` comment - search for `CHALLENGE` to find them.

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

- `src/Todo.ts` and `src/TodoList.ts` - the model: to-dos with ids that never change, found by id
- `src/filter.ts` - `type Filter = "all" | "active" | "done"` and `matchesFilter`
- `src/messages.ts` - the words on the page ("2 items left"), kept out of the view so they can be
  tested
- `src/TodoView.ts` - given an object of handlers (`onToggle`, `onRemove`, `onFilter`); it calls
  them and never changes the model itself
- `src/main.ts` - the state is a `TodoList` and the chosen filter; every handler changes one of
  them, then calls `render()`
- `tests/` - the model, the filter and the messages, all tested without a page
