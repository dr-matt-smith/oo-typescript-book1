# TypeScript workflow with Node

These steps are for computers where **Node** is installed (e.g. the college lab PCs).
If you have Deno instead, see [README_deno_TS_workflow.md](README_deno_TS_workflow.md).

All commands are typed in the console, in the project folder - the folder containing `package.json`.
In Celbridge, the console's Node buttons type them for you.


## What you need

Node **version 26 or later**, which can run TypeScript files like `build.ts` directly. Check your version with:

```bash
node --version
```

Node comes with `npm` (the Node Package Manager), which we use to install tools and run the project's commands.


## Step 1: Install the build tools (first time only)

```bash
npm install
```

This reads `package.json` and downloads three tools into a `node_modules/` folder:
- `typescript` - checks your code for type errors
- `esbuild` - bundles your TypeScript into a single JavaScript file
- `@std/assert` - the `assertEquals` the tests use (from JSR, the registry Deno uses - `.npmrc` tells
  npm where to find it)

You only need to do this **once per project** (and again if you delete `node_modules/`). It needs an
internet connection.

> **Note** - npm may warn that it did not run esbuild's install script. That is fine: esbuild works
> without it.


## Step 2: Build and test, and keep doing it

```bash
npm run dev
```

This:
1. type checks everything in `src/` and `tests/`, and reports any errors
2. bundles `src/main.ts` (and every file it imports) into `dist/app.js`
3. copies everything in `public/` (HTML, CSS, images) into `dist/`
4. runs the tests - the files in `tests/`, and the examples in `src/`'s doc comments - and writes the
   report to `test_output/index.html`

and then does it all again every time you save a file in `src/`, `public/` or `tests/`.
Press **Ctrl+C** to stop it.

To see the page, open `dist/index.html` - in Celbridge's preview (press its refresh button after each
rebuild), or in any web browser. No server is needed.

The tests are written for Deno (`Deno.test(...)`), and the book explains them that way. With Node they
run unchanged: `tools/deno_test_for_node.ts` hands each one to Node's own test runner. Each test file
is compiled to JavaScript by esbuild first (into `test_output/node_tests/`), because Node can only run
TypeScript whose types can simply be deleted - not, for example, a parameter property like
`constructor(private name: string)`.


## The other commands

| Command | What it does |
|---|---|
| `npm install` | Install the build tools into `node_modules/` (first time only) |
| `npm run dev` | Build and test, then again every time you save (Ctrl+C to stop) |
| `npm run build` | Build and test, once |
| `npm test` | Only run the tests (and write the report) |
| `npm run check` | Only type check |

Each `npm run ...` command runs the matching entry in the `"scripts"` section of `package.json`.
There is no lint command: the linter is part of Deno.


## Troubleshooting

| Problem | Fix |
|---|---|
| `npm error Missing script: "dev"` | You're not in the project folder - `cd` into the folder containing `package.json` |
| `Cannot find package 'esbuild'`, or the report says the TypeScript compiler is not installed | Run `npm install` first |
| `SyntaxError` or `Unknown file extension ".ts"` | Your Node is too old to run TypeScript directly - check `node --version` is 26 or later |
| A console button "does nothing" | `npm run dev` is still running, and took the typed command - press Ctrl+C first |
| The page shows an old version | Did it rebuild? Then press refresh on the preview |
