// Makes a new project from template/.
//
//   deno run -A tools/new_project.ts <folder> "<Title>" ["<one-paragraph summary>"]
//
//   e.g. deno run -A tools/new_project.ts chapters/ch04_classes/projects/ch04_student_cards "Student Cards"
//
// Paths are relative to book1/. The folder must not exist yet. The project is built once, so dist/
// and test_output/ exist when it is first opened.

import { basename, join, resolve } from "jsr:@std/path@^1";
import { BOOK, build, copyProject } from "./project_files.ts";

const [folderArg, title, summary = "PROJECT_SUMMARY"] = Deno.args;
if (!folderArg || !title) {
  console.error(
    'usage: deno run -A tools/new_project.ts <folder> "<Title>" ["<summary>"]',
  );
  Deno.exit(1);
}
const folder = resolve(BOOK, folderArg);
await copyProject(join(BOOK, "template"), folder);

for (const file of ["README.md", "public/index.html"]) {
  const path = join(folder, file);
  const text = await Deno.readTextFile(path);
  await Deno.writeTextFile(
    path,
    text.replaceAll("PROJECT_TITLE", title).replaceAll(
      "PROJECT_SUMMARY",
      summary,
    ),
  );
}
// npm needs each project to have a name of its own: lower case, with no underscores.
const npmPath = join(folder, "package.json");
const npm = JSON.parse(await Deno.readTextFile(npmPath));
npm.name = basename(folder).toLowerCase().replaceAll("_", "-");
await Deno.writeTextFile(npmPath, JSON.stringify(npm, null, 2) + "\n");

await build(folder);
console.log(`Made ${folderArg}`);
