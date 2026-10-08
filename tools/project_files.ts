// Shared helpers for the authoring tools: copying a project, and giving it a fresh Celbridge identity.

import { basename, dirname, fromFileUrl, join } from "jsr:@std/path@^1";
import { copy } from "jsr:@std/fs@^1/copy";

export const BOOK = join(dirname(fromFileUrl(import.meta.url)), "..");

// Never copied between projects: build output, reports, and Celbridge's per-user workspace state.
const SKIP = new Set([
  "dist",
  "test_output",
  ".celbridge",
  ".DS_Store",
  "node_modules",
]);

export async function exists(path: string): Promise<boolean> {
  return await Deno.stat(path).then(() => true, () => false);
}

/** Copies project `from` to a new folder `to`, and renames its .celbridge file to match. */
export async function copyProject(from: string, to: string): Promise<void> {
  if (await exists(to)) throw new Error(`${to} already exists`);
  await Deno.mkdir(to, { recursive: true });
  for await (const entry of Deno.readDir(from)) {
    if (SKIP.has(entry.name)) continue;
    const target = entry.isFile && entry.name.endsWith(".celbridge")
      ? `${basename(to)}.celbridge`
      : entry.name;
    await copy(join(from, entry.name), join(to, target));
  }
  // Seed Celbridge's settings so dist/index.html, the test report and README.md open as previews.
  await Deno.mkdir(join(to, ".celbridge/settings"), { recursive: true });
  await Deno.copyFile(
    join(BOOK, "tools/celbridge_settings.json"),
    join(to, ".celbridge/settings/workspace_settings.json"),
  );
}

/** Builds (and tests) a project once. Returns true if the build command succeeded. */
export async function build(project: string, quiet = true): Promise<boolean> {
  const result = await new Deno.Command(Deno.execPath(), {
    args: ["task", "build"],
    cwd: project,
    stdout: quiet ? "null" : "inherit",
    stderr: quiet ? "null" : "inherit",
  }).output();
  return result.success;
}

/** Every project folder (one with build.ts and deno.json) under `root`. */
export async function findProjects(root: string): Promise<string[]> {
  if (
    await exists(join(root, "build.ts")) &&
    await exists(join(root, "deno.json"))
  ) return [root];
  const found: string[] = [];
  for await (const entry of Deno.readDir(root)) {
    if (
      entry.isDirectory && !SKIP.has(entry.name) && !entry.name.startsWith(".")
    ) {
      found.push(...await findProjects(join(root, entry.name)));
    }
  }
  return found.sort();
}
