// Builds and tests every project under a folder, and reports anything wrong:
// a failed build, type errors, lint warnings, or failing tests.
//
//   deno run -A tools/check_all.ts chapters/ch03_tdd      (or teacher/..., or . for everything)
//
// Some projects are meant to start "red" (a TDD exercise that begins with a failing test). Such a
// project has a file .book-check.json saying how many failing tests to expect: { "failing": 2 }.
// A project from before tests are introduced says so: { "noTests": true }

import { join } from "jsr:@std/path@^1";
import { BOOK, build, exists, findProjects } from "./project_files.ts";

const root = join(BOOK, Deno.args[0] ?? ".");
let problems = 0;

for (const project of await findProjects(root)) {
  const name = project.slice(BOOK.length + 1);
  const built = await build(project);
  const issues: string[] = [];
  if (!await exists(join(project, "dist/app.js"))) {
    issues.push("no dist/app.js - the build failed");
  }

  const resultsPath = join(project, "test_output/results.json");
  if (!await exists(resultsPath)) {
    issues.push("no test_output/results.json");
  } else {
    const results = JSON.parse(await Deno.readTextFile(resultsPath));
    const expectPath = join(project, ".book-check.json");
    const settings = await exists(expectPath) ? JSON.parse(await Deno.readTextFile(expectPath)) : {};
    const expected = settings.failing ?? 0;
    if (results.runError) {
      issues.push(`tests could not run: ${results.runError.split("\n")[0]}`);
    }
    if (results.counts.failed !== expected) {
      issues.push(
        `${results.counts.failed} failing test(s), expected ${expected}`,
      );
    }
    if (results.counts.passed + results.counts.failed === 0 && !settings.noTests) {
      issues.push("no tests");
    }
    if (results.typeErrors.length) {
      issues.push(`${results.typeErrors.length} type error(s)`);
    }
    if (results.lintWarnings.length) {
      issues.push(`${results.lintWarnings.length} lint warning(s)`);
    }
  }
  if (!built && issues.length === 0) issues.push("deno task build failed");

  if (issues.length === 0) console.log(`ok      ${name}`);
  else {
    problems++;
    console.log(`PROBLEM ${name}\n        ${issues.join("\n        ")}`);
  }
}
console.log(
  problems === 0
    ? "\nAll projects OK"
    : `\n${problems} project(s) with problems`,
);
Deno.exit(problems === 0 ? 0 : 1);
