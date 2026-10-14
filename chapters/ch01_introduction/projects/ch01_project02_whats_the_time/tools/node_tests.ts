// Runs the project's tests with Node, for tools/test_report.ts - which makes the same report from them as
// it does with Deno. Deno is not needed here at all.
//
//   - the tests in tests/ are written with Deno.test(...): tools/deno_test_for_node.ts lets Node run them
//   - Node cannot run the @example code blocks in doc comments, as Deno does, so each one is written out
//     as a small test file of its own, in test_output/doc_examples/, and run like the others
//   - Node can only run TypeScript that becomes JavaScript by deleting the types. Some TypeScript needs more
//     than that - a parameter property, constructor(private name: string), or an enum - so each test file
//     is first compiled to JavaScript by esbuild (into test_output/node_tests/), with a source map, so that
//     errors still point at the lines of your own files
//
// You never need to edit this file.

import { run } from "node:test";
import * as esbuild from "esbuild";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative as relativePath, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Status, TestResult } from "./test_report.ts";

type Clean = (root: URL, message: string) => string;

/** One test file to run, and how its results are shown in the report. */
interface TestFile {
  path: string; // the file Node runs
  shownAs: string; // the file named in the report: tests/x.test.ts, or src/x.ts for a doc example
  example?: { start: number; end: number }; // for a doc example: its lines in src/x.ts
}

// The same test files Deno looks for: test.ts, x.test.ts or x_test.ts (or .js, .tsx, .jsx).
const TEST_FILE = /(^|[._])test\.[jt]sx?$/;

/** Every file under a folder, as paths relative to the project, in a predictable order. */
async function filesUnder(root: string, folder: string): Promise<string[]> {
  const found: string[] = [];
  const entries = await readdir(join(root, folder), { withFileTypes: true }).catch(() => []);
  // Sorted the way Deno sorts them: by character code, so capital letters come first.
  for (const entry of entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    const path = `${folder}/${entry.name}`;
    if (entry.isDirectory()) found.push(...await filesUnder(root, path));
    else found.push(path);
  }
  return found;
}

// ---------------------------------------------------------------------------------------------
// Doc comment examples as test files
// ---------------------------------------------------------------------------------------------

const EXAMPLE_LANGUAGES = ["", "ts", "typescript", "js", "javascript"];

/** An import path in an example, made to work from the generated file (relative paths only). */
function moveImport(specifier: string, from: string, to: string): string {
  if (!specifier.startsWith(".")) return specifier; // e.g. "@std/assert"
  const moved = relativePath(dirname(to), join(dirname(from), specifier)).split(sep).join("/");
  return moved.startsWith(".") ? moved : `./${moved}`;
}

/** Writes each code example in src/'s doc comments as a test file, and lists them. */
async function writeDocExamples(root: string): Promise<TestFile[]> {
  const outDir = join(root, "test_output", "doc_examples");
  await rm(outDir, { recursive: true, force: true });
  const examples: TestFile[] = [];

  for (const file of await filesUnder(root, "src")) {
    if (!/\.[jt]sx?$/.test(file) || file.endsWith(".d.ts")) continue;
    const source = await readFile(join(root, file), "utf8");
    const lines = source.split("\n");

    // The file's own exports are imported into each example for it, as Deno does.
    const values = [...source.matchAll(
      /^export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|const|let|var|class|abstract\s+class|enum)\s+([\w$]+)/gm,
    )].map((m) => m[1]);
    const types = [...source.matchAll(/^export\s+(?:type|interface)\s+([\w$]+)/gm)].map((m) => m[1]);

    let inComment = false;
    let fence: { start: number; language: string } | undefined;
    let code: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!inComment) {
        if (line.trim().startsWith("/**")) inComment = true;
        else continue;
      }
      const text = line.replace(/^\s*(\/\*\*|\*\/|\*)? ?/, "");
      const fenceMatch = text.match(/^```\s*(\S*)(.*)$/);
      if (fenceMatch && !fence) {
        fence = { start: i + 1, language: fenceMatch[1] + fenceMatch[2] };
        code = [];
      } else if (fenceMatch && fence) {
        const language = fence.language.trim();
        if (EXAMPLE_LANGUAGES.includes(language.split(/\s/)[0]) && !language.includes("ignore")) {
          // Deno names an example by the line of its opening ``` and the line after its closing ```.
          const example = { start: fence.start, end: i + 2 };
          const path = join(outDir, `${file}.${example.start}-${example.end}.test.ts`);
          const sourcePath = join(root, file);
          const imports: string[] = [];
          const body: string[] = [];
          let inImport = false;
          for (const codeLine of code) {
            if (inImport || /^import\s/.test(codeLine)) {
              imports.push(codeLine.replace(/(["'])(\.{1,2}\/[^"']*)\1/, (_m, quote: string, spec: string) =>
                `${quote}${moveImport(spec, sourcePath, path)}${quote}`));
              inImport = !/(from\s+["'][^"']+["']|^import\s+["'][^"']+["']);?\s*$/.test(codeLine);
            } else {
              body.push(codeLine);
            }
          }
          const named = new Set(imports.join(" ").match(/[\w$]+/g) ?? []);
          const own = moveImport(`./${file.split("/").pop()}`, sourcePath, path);
          const ownValues = values.filter((name) => !named.has(name));
          const ownTypes = types.filter((name) => !named.has(name));
          await mkdir(dirname(path), { recursive: true });
          await writeFile(
            path,
            [
              `// Made by tools/node_tests.ts from the example at lines ${example.start}-${example.end} of ${file}.`,
              "// Remade every time the tests run - edit the example in the doc comment instead.",
              ...(ownValues.length ? [`import { ${ownValues.join(", ")} } from "${own}";`] : []),
              ...(ownTypes.length ? [`import type { ${ownTypes.join(", ")} } from "${own}";`] : []),
              ...imports,
              "",
              `Deno.test("example in the doc comment (lines ${example.start}-${example.end})", async () => {`,
              ...body.map((b) => (b ? `  ${b}` : "")),
              "});",
              "",
            ].join("\n"),
          );
          examples.push({ path, shownAs: file, example });
        }
        fence = undefined;
      } else if (fence) {
        code.push(text);
      }
      if (line.includes("*/")) inComment = false;
    }
  }
  return examples;
}

// ---------------------------------------------------------------------------------------------
// Running the tests
// ---------------------------------------------------------------------------------------------

interface NodeError {
  message?: string;
  stack?: string;
  failureType?: string;
  cause?: NodeError | string;
}

/** The places in the stack that are in the project's own files: "src/Pet.ts:17:36", "tests/x.test.ts:9:3". */
function projectFrames(root: string, stack: string): { at: string; line: number }[] {
  const frames: { at: string; line: number }[] = [];
  for (const m of stack.matchAll(/\(?(file:\/\/\S+?|\/\S+?|[A-Za-z]:\\\S+?):(\d+):(\d+)\)?$/gm)) {
    const path = m[1].startsWith("file:") ? fileURLToPath(m[1]) : m[1];
    const file = relativePath(root, path).split(sep).join("/");
    if (file.startsWith("..") || file.startsWith("node_modules/") || file.startsWith("tools/")) continue;
    if (file.startsWith("test_output/")) continue; // a doc example: reported by its lines instead
    frames.push({ at: `${file}:${m[2]}:${m[3]}`, line: Number(m[2]) });
  }
  return frames;
}

/** Compiles a test file (and what it imports from the project) into one JavaScript file Node can run. */
async function compile(root: string, testFile: TestFile, clean: Clean, rootUrl: URL): Promise<string | TestResult> {
  const out = join(root, "test_output", "node_tests", relativePath(root, testFile.path) + ".mjs");
  try {
    await esbuild.build({
      absWorkingDir: root,
      entryPoints: [testFile.path],
      outfile: out,
      bundle: true,
      packages: "external", // @std/assert and the like are loaded from node_modules/ as they are
      platform: "node",
      format: "esm",
      sourcemap: "inline",
      logLevel: "silent",
    });
    return out;
  } catch (error) {
    // It could not be compiled, e.g. it imports a file, or a name, that does not exist yet.
    const errors = (error as { errors?: esbuild.Message[] }).errors ?? [];
    const message = errors.length
      ? errors.map((e) => `${e.text}${e.location ? `\n    at ${e.location.file}:${e.location.line}:${e.location.column + 1}` : ""}`)
        .join("\n")
      : String(error);
    return {
      name: "(this test file could not run)",
      file: testFile.shownAs,
      status: "fail",
      message: clean(rootUrl, message),
      steps: [],
    };
  }
}

/** Runs one test file in Node, and turns what happened into results (tests, and their steps). */
async function runFile(rootUrl: URL, root: string, testFile: TestFile, clean: Clean): Promise<TestResult[]> {
  const shim = pathToFileURL(join(root, "tools", "deno_test_for_node.ts")).href;
  const top: TestResult[] = [];
  const pending: TestResult[][] = [[]]; // results waiting for their parent test, by depth
  let stderr = "";
  // Deno says where a failing test is by the line that declares it: Deno.test("...") or t.step("...").
  const sourceLines = testFile.example ? [] : (await readFile(testFile.path, "utf8")).split("\n");
  const declaredAt = (name: string): number | undefined => {
    const index = sourceLines.findIndex((line) => [`"${name}"`, `'${name}'`, `\`${name}\``].some((q) => line.includes(q)));
    return index < 0 ? undefined : index + 1;
  };

  const compiled = await compile(root, testFile, clean, rootUrl);
  if (typeof compiled !== "string") return [compiled];

  // --enable-source-maps: errors are reported at the lines of the .ts files, not of the compiled file.
  const execArgv = ["--enable-source-maps", "--import", shim];
  for await (const event of run({ files: [compiled], cwd: root, execArgv })) {
    if (event.type === "test:stderr") stderr += event.data.message;
    if (event.type !== "test:pass" && event.type !== "test:fail") continue;

    const data = event.data;
    const depth = data.nesting;
    const status: Status = event.type === "test:fail" ? "fail" : data.skip ? "skip" : "pass";
    const result: TestResult = { name: data.name, file: testFile.shownAs, status, steps: pending[depth + 1] ?? [] };
    pending[depth + 1] = [];

    if (event.type === "test:fail") {
      const error = data.details.error as NodeError;
      const cause = typeof error.cause === "object" ? error.cause : undefined;
      if (data.name === compiled) {
        // The file itself could not run, e.g. it imports something that does not exist yet.
        result.name = "(this test file could not run)";
        const why = stderr.match(/^(\w*Error\b.*?: [\s\S]*?)(?=\n\s+at |\n\n|$)/m)?.[1] ?? stderr;
        const where = stderr.match(/^(file:\/\/\S+):(\d+)\n/m);
        result.message = clean(rootUrl, `${why}${where ? `\n    at ${where[1]}:${where[2]}` : ""}`);
      } else if (error.failureType === "subtestsFailed") {
        // A test whose steps failed: said the way Deno says it.
        const failed = result.steps.filter((step) => step.status === "fail").length;
        result.message = `${failed} test step${failed === 1 ? "" : "s"} failed.`;
        result.line = declaredAt(data.name);
      } else if (cause?.stack) {
        // The error as Deno shows it: the error and its message, then where in your code it happened.
        const frames = projectFrames(root, cause.stack);
        const text = cause.stack.split(/\n\s+at /)[0];
        const at = frames.map((frame) => frame.at);
        if (testFile.example) at.push(`${testFile.shownAs} (example at lines ${testFile.example.start}-${testFile.example.end})`);
        result.message = clean(rootUrl, [text, ...at.map((place) => `    at ${place}`)].join("\n"));
        result.line = testFile.example ? testFile.example.start : declaredAt(data.name) ?? frames.at(-1)?.line;
      } else {
        result.message = clean(rootUrl, String(cause ?? error.message ?? "failed"));
      }
    }
    (pending[depth] ??= []).push(result);
    if (depth === 0) top.push(result);
  }
  return top;
}

/** Runs the tests in tests/ and the examples in src/'s doc comments, with Node. */
export async function runNodeTests(rootUrl: URL, clean: Clean): Promise<{ tests: TestResult[]; runError?: string }> {
  const root = fileURLToPath(rootUrl).replace(/[\\/]$/, "");
  try {
    const testFiles: TestFile[] = (await filesUnder(root, "tests"))
      .filter((file) => TEST_FILE.test(file.split("/").pop() ?? ""))
      .map((file) => ({ path: join(root, file), shownAs: file }));
    await rm(join(root, "test_output", "node_tests"), { recursive: true, force: true });
    const files = [...testFiles, ...await writeDocExamples(root)];
    const results = await Promise.all(files.map((file) => runFile(rootUrl, root, file, clean)));
    return { tests: results.flat() };
  } catch (error) {
    return { tests: [], runError: clean(rootUrl, String(error instanceof Error ? error.stack : error)) };
  } finally {
    await esbuild.stop(); // esbuild runs as a helper program: stop it, so the build can finish
  }
}
