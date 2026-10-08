# Shopping List

A shopping list you type into: a ShoppingList model that refuses blank and duplicate items, and a view that builds each item with textContent, so whatever the user types is shown as text and never run as HTML.

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

- `src/ShoppingList.ts` - the model: refuses blank and duplicate items (`problemWith` says why),
  and `all` gives back a copy of the items
- `src/ShoppingListView.ts` - builds each item with `createElement` and `textContent`, so a name
  such as `<b>cheese</b>` is shown as typed and never run as HTML; it calls `onRemove(index)` when a
  Remove button is clicked
- `src/main.ts` - asks the model before adding, shows the problem if there is one
- `tests/ShoppingList.test.ts` - the model's rules, with a small `listOf` helper
