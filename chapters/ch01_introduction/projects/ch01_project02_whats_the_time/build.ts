// Builds the project, then tests it:
//   1. type checks src/ and tests/
//   2. bundles src/main.ts + everything it imports -> dist/app.js   (ONE plain script, no server needed)
//   3. copies public/**/*                           -> dist/**/*    (HTML, CSS, images, as-is)
//   4. removes anything in dist/ that no longer comes from public/
//   5. runs every test in tests/ and writes a readable report to test_output/
//
// Works with both Deno and Node:
//   Run once:                         deno task build   OR   npm run build
//   Rebuild and retest on every save: deno task dev     OR   npm run dev    (terminal.console starts deno task dev)
//
// You never need to edit this file.

import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import process from "node:process";
import * as esbuild from "esbuild";
import { runTests, typeCheck } from "./tools/test_report.ts";

const ROOT_DIR = new URL("./", import.meta.url);
const PUBLIC_DIR = new URL("./public/", ROOT_DIR);
const DIST_DIR = new URL("./dist/", ROOT_DIR);

const started = performance.now();
console.log(`\n=== Build started at ${new Date().toLocaleTimeString()} ===`);

// dist/ is updated in place (not deleted and recreated), so a preview that has dist/index.html open
// keeps working across rebuilds. Old files are cleaned up at the end instead (step 4).
await mkdir(DIST_DIR, { recursive: true });

// 1. Type check (bundling only strips the types, it doesn't check them).
//    Errors are reported, but the page is still built so you can keep experimenting.
const checked = await typeCheck(ROOT_DIR);
if (!checked.ok) {
  console.log(checked.text);
  console.log("TypeScript found errors (see above) - the page was still built, but may not work");
}

// 2. Bundle src/main.ts, and every file it imports, into dist/app.js.
//    format "iife" makes a plain <script>, so dist/index.html works opened straight from the disk.
try {
  await esbuild.build({
    absWorkingDir: fileURLToPath(ROOT_DIR),
    entryPoints: ["src/main.ts"],
    bundle: true,
    platform: "browser",
    format: "iife",
    outfile: "dist/app.js",
    logLevel: "error",
  });
  console.log("Built dist/app.js from src/main.ts (and the files it imports)");
} catch {
  console.log("The page could not be built (see above)");
}
await esbuild.stop(); // esbuild runs as a helper program: stop it, so this script can finish

// 3. Copy every file under public/ (HTML, CSS, images, ...) as-is.
let copied = 0;
async function copyFolder(from: URL, to: URL): Promise<void> {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      await copyFolder(new URL(entry.name + "/", from), new URL(entry.name + "/", to));
    } else if (entry.name !== ".DS_Store" && !entry.name.endsWith(".cel")) { // .cel = Celbridge editor settings
      await copyFile(new URL(entry.name, from), new URL(entry.name, to));
      copied++;
    }
  }
}
await copyFolder(PUBLIC_DIR, DIST_DIR);
console.log(`Copied ${copied} file(s) from public/ to dist/`);

// 4. Remove anything in dist/ that no longer comes from public/ (e.g. a deleted image).
async function removeOldFiles(dist: URL, from: URL, prefix = ""): Promise<void> {
  for (const entry of await readdir(dist, { withFileTypes: true })) {
    if (prefix + entry.name === "app.js" || entry.name === ".DS_Store") continue;
    const name = entry.name + (entry.isDirectory() ? "/" : "");
    const inPublic = await stat(new URL(name, from)).then(() => true, () => false);
    if (!inPublic) {
      await rm(new URL(name, dist), { recursive: true, force: true });
      console.log(`Removed dist/${prefix}${name} (no longer in public/)`);
    } else if (entry.isDirectory()) {
      await removeOldFiles(new URL(name, dist), new URL(name, from), prefix + name);
    }
  }
}
await removeOldFiles(DIST_DIR, PUBLIC_DIR);

const builtIn = ((performance.now() - started) / 1000).toFixed(1);
console.log(`dist/ is up to date (${builtIn}s) - press refresh on the dist/index.html preview`);

// 5. Test, and write test_output/index.html + test_output/summary.md.
await runTests(ROOT_DIR, checked);

// "deno task dev" and "npm run dev" pass --watching (they restart this script whenever a watched file changes).
if (process.argv.includes("--watching")) {
  console.log("\nWatching src/, public/ and tests/ - save a file to rebuild and retest (Ctrl+C to stop)");
}
