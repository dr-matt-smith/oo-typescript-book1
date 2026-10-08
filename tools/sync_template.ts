// Copies the template's shared machinery into every project under a folder, so a fix made in the
// template reaches every project: build.ts, tools/test_report.ts, terminal.console, the "tasks",
// "compilerOptions", "fmt" and "lint" parts of deno.json, and the [celbridge] settings and
// [[shortcut]] entries of the .celbridge file. Code, tests, HTML and README files are left alone.
//
//   deno run -A tools/sync_template.ts chapters/ch04_classes     (or teacher/..., or . for everything)

import { join } from "jsr:@std/path@^1";
import { BOOK, findProjects } from "./project_files.ts";

const root = join(BOOK, Deno.args[0] ?? ".");
const template = join(BOOK, "template");
const templateDeno = JSON.parse(
  await Deno.readTextFile(join(template, "deno.json")),
);
const templateCelbridge = await Deno.readTextFile(
  join(template, "template.celbridge"),
);

for (const project of await findProjects(root)) {
  if (project === template) continue;
  await Deno.mkdir(join(project, "tools"), { recursive: true });
  for (const file of ["build.ts", "tools/test_report.ts", "terminal.console"]) {
    await Deno.copyFile(join(template, file), join(project, file));
  }

  const denoPath = join(project, "deno.json");
  const deno = JSON.parse(await Deno.readTextFile(denoPath));
  for (const key of ["tasks", "compilerOptions", "fmt", "lint"]) {
    deno[key] = templateDeno[key];
  }
  deno.imports = { ...templateDeno.imports, ...deno.imports };
  await Deno.writeTextFile(denoPath, JSON.stringify(deno, null, 2) + "\n");

  for await (const entry of Deno.readDir(project)) {
    if (entry.isFile && entry.name.endsWith(".celbridge")) {
      await Deno.writeTextFile(join(project, entry.name), templateCelbridge);
    }
  }
  console.log(`synced ${project.slice(BOOK.length + 1)}`);
}
