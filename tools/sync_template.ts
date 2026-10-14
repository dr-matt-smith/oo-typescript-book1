// Copies the template's shared machinery into every project under a folder, so a fix made in the
// template reaches every project: build.ts, the tools/ files, terminal.console, the Node files
// (tsconfig.json, .npmrc, package.json - named after the project), .gitignore, the "tasks", "imports",
// "nodeModulesDir", "compilerOptions", "fmt" and "lint" parts of deno.json, and the [celbridge] settings
// and [[shortcut]] entries of the .celbridge file. Code, tests, HTML and README files are left alone.
//
//   deno run -A tools/sync_template.ts chapters/ch04_classes     (or teacher/..., or . for everything)

import { basename, join } from "jsr:@std/path@^1";
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
  for (
    const file of [
      "build.ts",
      "tools/test_report.ts",
      "tools/node_tests.ts",
      "tools/deno_test_for_node.ts",
      "tools/deno_test.d.ts",
      "terminal.console",
      "tsconfig.json",
      ".npmrc",
      ".gitignore",
      "README_deno_TS_workflow.md",
      "README_node_TS_workflow.md",
    ]
  ) {
    await Deno.copyFile(join(template, file), join(project, file));
  }

  // package.json: the template's, named after the project (npm names are lower case, with no underscores).
  const npm = JSON.parse(await Deno.readTextFile(join(template, "package.json")));
  npm.name = basename(project).toLowerCase().replaceAll("_", "-");
  await Deno.writeTextFile(join(project, "package.json"), JSON.stringify(npm, null, 2) + "\n");

  const denoPath = join(project, "deno.json");
  const deno = JSON.parse(await Deno.readTextFile(denoPath));
  for (const key of ["tasks", "nodeModulesDir", "compilerOptions", "fmt", "lint"]) {
    deno[key] = templateDeno[key];
  }
  deno.imports = { ...deno.imports, ...templateDeno.imports };
  await Deno.writeTextFile(denoPath, JSON.stringify(deno, null, 2) + "\n");

  for await (const entry of Deno.readDir(project)) {
    if (entry.isFile && entry.name.endsWith(".celbridge")) {
      await Deno.writeTextFile(join(project, entry.name), templateCelbridge);
    }
  }
  console.log(`synced ${project.slice(BOOK.length + 1)}`);
}
