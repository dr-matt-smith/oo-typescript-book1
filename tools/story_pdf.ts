// Builds the PDF of one or more .story slide decks with the Story Builder tool itself: the real editor
// page (tools/story-builder/) is opened in headless Chromium, and its own "Download PDF" button is pressed.
// So the PDF is exactly what the editor's button makes inside Celbridge - one page per slide, in the
// story's default sequence - written next to the .story file.
//
//   deno run -A tools/story_pdf.ts teacher/ch01_introduction/slides/slides.story [more.story ...]
//   deno run -A tools/story_pdf.ts teacher            (every .story file under a folder)
//
// Paths are relative to book1/, which plays the part of the Celbridge project. Needs a network
// connection: the editor loads Marp, html2canvas and jsPDF from esm.sh, as it does in Celbridge.
//
// The only stand-in is a small fake of the Celbridge client (served as /assets/celbridge-client/...),
// which hands the editor the .story file and saves the PDF it writes.

import { contentType } from "jsr:@std/media-types@^1";
import { extname, join, relative, resolve } from "jsr:@std/path@^1";
import { BOOK, exists } from "./project_files.ts";

const TOOL = join(BOOK, "tools/story-builder");
const CLIENT = "/Applications/Celbridge.app/Contents/Resources/Celbridge.WebHost/Web/celbridge-client";
const CHROME = `${
  Deno.env.get("HOME")
}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

// ---------------------------------------------------------------------------------------------
// Which stories
// ---------------------------------------------------------------------------------------------

async function findStories(path: string): Promise<string[]> {
  const info = await Deno.stat(path);
  if (info.isFile) return path.endsWith(".story") ? [path] : [];
  const found: string[] = [];
  for await (const entry of Deno.readDir(path)) {
    // solutions/ holds projects, and tools/ the Story Builder's own template - neither holds decks
    if (entry.name.startsWith(".") || entry.name === "solutions" || entry.name === "tools") continue;
    found.push(...await findStories(join(path, entry.name)));
  }
  return found.sort();
}

const stories: string[] = [];
for (const arg of Deno.args) stories.push(...await findStories(resolve(BOOK, arg)));
if (stories.length === 0) {
  console.error("usage: deno run -A tools/story_pdf.ts <file.story | folder> ...");
  Deno.exit(1);
}

// ---------------------------------------------------------------------------------------------
// The fake Celbridge client: just what the editor calls while loading a story and exporting a PDF
// ---------------------------------------------------------------------------------------------

const FAKE_CLIENT = `
const params = new URLSearchParams(location.search);
const key = params.get("key");
const noop = () => {};
const celbridge = {
  async initialize() {
    const content = await (await fetch("/project/" + key.slice("project:".length))).text();
    return { content, metadata: { resourceKey: key } };
  },
  document: {
    notifyChanged: noop, async save() {}, async load() { return { content: "" }; },
    notifyContentLoaded() { window.__storyReady = true; },
    onRequestSave: noop, onExternalChange: noop, onRenamed: noop,
  },
  dialog: { async showNotification() {} },
  appState: { onChanged: noop },
  localization: { onLanguageChanged: noop, async loadStrings() {} },
};
window.cel = {
  app: { async log(m) { console.log(m); } },
  file: {
    // Just the folders leading to the story, so the editor's save dialog offers the story's own folder.
    async getTree() {
      const parts = key.slice("project:".length).split("/").slice(0, -1);
      let node = { name: "", type: "folder", children: [] };
      const root = node;
      for (const part of parts) {
        const child = { name: part, type: "folder", children: [] };
        node.children.push(child);
        node = child;
      }
      return root;
    },
    async listContents() { return []; },
    async getInfo() { throw new Error("not found"); },
    async writeBinary(k, base64) {
      await fetch("/write?key=" + encodeURIComponent(k), { method: "POST", body: base64 });
      window.__storyWritten = k;
    },
  },
};
export default celbridge;
`;

let strings: Record<string, string> = {};
try {
  strings = JSON.parse(await Deno.readTextFile(join(TOOL, "localization/en.json")));
} catch { /* labels fall back to their keys */ }
const FAKE_LOCALIZATION = `
const strings = ${JSON.stringify(strings)};
export function t(key, ...args) {
  return (strings[key] ?? key).replace(/\\{(\\d+)\\}/g, (m, i) => args[i] ?? m);
}
`;

async function file(path: string): Promise<Response> {
  try {
    const body = await Deno.readFile(path);
    return new Response(body, { headers: { "content-type": contentType(extname(path)) ?? "application/octet-stream" } });
  } catch {
    return new Response("not found", { status: 404 });
  }
}

const js = (body: string) => new Response(body, { headers: { "content-type": "text/javascript" } });

const server = Deno.serve({ hostname: "127.0.0.1", port: 0, onListen() {} }, async (req) => {
  const url = new URL(req.url);
  const path = decodeURIComponent(url.pathname);
  if (path === "/assets/celbridge-client/celbridge.js") return js(FAKE_CLIENT);
  if (path === "/assets/celbridge-client/localization.js") return js(FAKE_LOCALIZATION);
  if (path === "/assets/celbridge-client/api/document-api.js") {
    return js("export const ContentLoadedReason = { Initial: 'Initial', ExternalReload: 'ExternalReload' };");
  }
  if (path.startsWith("/assets/celbridge-client/")) return file(join(CLIENT, path.slice("/assets/celbridge-client/".length)));
  if (path.startsWith("/tool/")) return file(join(TOOL, path.slice("/tool/".length)));
  if (path.startsWith("/project/")) return file(join(BOOK, path.slice("/project/".length)));
  if (path === "/write" && req.method === "POST") {
    const key = url.searchParams.get("key")!.slice("project:".length);
    const bytes = Uint8Array.from(atob(await req.text()), (c) => c.charCodeAt(0));
    await Deno.writeFile(join(BOOK, key), bytes);
    return new Response("ok");
  }
  return new Response("not found", { status: 404 });
});
const origin = `http://127.0.0.1:${server.addr.port}`;

// ---------------------------------------------------------------------------------------------
// Drive the editor
// ---------------------------------------------------------------------------------------------

const port = 9300 + Math.floor(Math.random() * 600);
const profile = await Deno.makeTempDir();
const chrome = new Deno.Command(CHROME, {
  args: [`--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--window-size=1400,900", "about:blank"],
  stdout: "null",
  stderr: "null",
}).spawn();

let wsUrl = "";
for (let i = 0; i < 80 && !wsUrl; i++) {
  await new Promise((r) => setTimeout(r, 100));
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    wsUrl = list.find((t: { type: string }) => t.type === "page")?.webSocketDebuggerUrl ?? "";
  } catch { /* not up yet */ }
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.onopen = r);

let id = 0;
const pending = new Map<number, (v: { result?: { result?: { value?: unknown } } }) => void>();
function send(method: string, params: Record<string, unknown> = {}) {
  const i = ++id;
  ws.send(JSON.stringify({ id: i, method, params }));
  return new Promise<{ result?: { result?: { value?: unknown } } }>((r) => pending.set(i, r));
}
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)!(m);
    pending.delete(m.id);
  } else if (m.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(m.params.type)) {
    const text = m.params.args.map((a: { value?: unknown; description?: string }) => a.value ?? a.description).join(" ");
    console.log(`  [${m.params.type}]`, text);
  } else if (m.method === "Runtime.exceptionThrown") {
    console.log("  [exception]", m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
  }
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function evaluate(expression: string): Promise<unknown> {
  return (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.result
    ?.value;
}
async function waitFor(expression: string, seconds: number): Promise<boolean> {
  for (let i = 0; i < seconds * 10; i++) {
    if (await evaluate(expression)) return true;
    await sleep(100);
  }
  return false;
}

await send("Runtime.enable");
await send("Page.enable");
let failures = 0;

for (const story of stories) {
  const key = "project:" + relative(BOOK, story);
  const pdf = story.replace(/\.story$/, ".pdf");
  const name = relative(BOOK, pdf);
  await send("Page.navigate", { url: `${origin}/tool/index.html?key=${encodeURIComponent(key)}` });

  const ok = await waitFor("window.__storyReady === true", 20) &&
    await evaluate("document.getElementById('btn-pdf').click(), true") &&
    // the editor's own save dialog: wait until its Save button is ready, then press it
    await waitFor("!document.getElementById('pdf-dialog-save').disabled && document.getElementById('pdf-dialog').open", 20) &&
    await evaluate("document.getElementById('pdf-dialog-save').click(), true") &&
    await waitFor("!!window.__storyWritten", 180);

  const written = await evaluate("window.__storyWritten");
  if (ok && written === "project:" + name && await exists(pdf)) {
    const pages = await evaluate("document.querySelectorAll('.pdf-stage').length === 0");
    console.log(`wrote ${name}${pages ? "" : " (still exporting?)"}`);
  } else {
    failures++;
    console.log(`FAILED ${relative(BOOK, story)} (written to: ${written ?? "nothing"})`);
  }
}

ws.close();
chrome.kill();
await server.shutdown();
await Deno.remove(profile, { recursive: true }).catch(() => {});
Deno.exit(failures > 0 ? 1 : 0);
