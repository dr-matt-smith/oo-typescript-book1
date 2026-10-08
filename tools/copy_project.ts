// Copies a project to a new folder (e.g. to start a challenge solution from a chapter project).
//
//   deno run -A tools/copy_project.ts <from> <to>
//
// Paths are relative to book1/. dist/, test_output/ and Celbridge's workspace state are not copied;
// the copy is built once at the end.

import { resolve } from "jsr:@std/path@^1";
import { BOOK, build, copyProject } from "./project_files.ts";

const [from, to] = Deno.args;
if (!from || !to) {
  console.error("usage: deno run -A tools/copy_project.ts <from> <to>");
  Deno.exit(1);
}
await copyProject(resolve(BOOK, from), resolve(BOOK, to));
await build(resolve(BOOK, to));
console.log(`Copied ${from} -> ${to}`);
