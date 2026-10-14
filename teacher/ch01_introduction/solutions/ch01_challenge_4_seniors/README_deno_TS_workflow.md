# TypeScript workflow with Deno

These steps are for computers where **Deno** is installed.
If you have Node instead (e.g. the college lab PCs), see [README_node_TS_workflow.md](README_node_TS_workflow.md).

All commands are typed in the console, in the project folder - the folder containing `deno.json`.
In Celbridge, the console's buttons type them for you.


## What you need

Deno **version 2 or later**. Check your version with:

```bash
deno --version
```


## Step 1: Install the build tools (not needed!)

Unlike Node, there is **no install step** with Deno. The first time you build, Deno downloads what the
project needs by itself:
- `esbuild` (listed under `imports` in `deno.json`) into a `node_modules/` folder - it bundles your
  TypeScript into a single JavaScript file
- `@std/assert` - the `assertEquals` the tests use

Deno has its own type checker, test runner and linter built in, so it needs nothing else.

The first build needs an internet connection; after that everything works offline.


## Step 2: Build and test, and keep doing it

```bash
deno task dev
```

Celbridge's console runs this for you when the project opens. It:
1. type checks everything in `src/` and `tests/`, and reports any errors
2. bundles `src/main.ts` (and every file it imports) into `dist/app.js`
3. copies everything in `public/` (HTML, CSS, images) into `dist/`
4. runs the tests - the files in `tests/`, and the examples in `src/`'s doc comments - and writes the
   report to `test_output/index.html`

and then does it all again every time you save a file in `src/`, `public/` or `tests/`.
Press **Ctrl+C** to stop it.

To see the page, open `dist/index.html` - in Celbridge's preview (press its refresh button after each
rebuild), or in any web browser. No server is needed.


## The other commands

| Command | What it does |
|---|---|
| `deno task dev` | Build and test, then again every time you save (Ctrl+C to stop) |
| `deno task build` | Build and test, once |
| `deno task test` | Only run the tests (and write the report) |
| `deno task check` | Only type check |
| `deno task lint` | Look for likely mistakes and bad habits |

Each `deno task ...` command runs the matching entry in the `"tasks"` section of `deno.json`.


## Troubleshooting

| Problem | Fix |
|---|---|
| `deno: command not found` | Deno is not installed (or not on the PATH) - install it, or use Node: [README_node_TS_workflow.md](README_node_TS_workflow.md) |
| `Task not found: dev` | You're not in the project folder - `cd` into the folder containing `deno.json` |
| A console button "does nothing" | `deno task dev` is still running, and took the typed command - press Ctrl+C first |
| The page shows an old version | Did it rebuild? Then press refresh on the preview |
