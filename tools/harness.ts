// Drives a built project's page in headless Chromium: clicks, typing, JavaScript, and screenshots.
// An authoring tool - used to check that projects really do what the chapters say, and to take the
// screenshots in the chapters. No server needed: the page is opened straight from dist/.
//
//   deno run -A tools/harness.ts <project folder> '<json actions>' [--width 760] [--dark] [--page test_output/index.html]
//
//   e.g. deno run -A tools/harness.ts chapters/ch01_introduction/projects/ch01_click_counter \
//          '[{"click":"#add"},{"click":"#add"},{"eval":"document.querySelector(\"#message\").textContent"},
//            {"shot":"chapters/ch01_introduction/images/click_counter.png"}]'
//
// Actions (run in order):
//   {"wait": ms}                          wait
//   {"click": "css selector"}             click the middle of an element (a real mouse click)
//   {"type": ["css selector", "text"]}    focus an element, clear it, and type into it
//   {"key": "Enter"}                      press a key (Enter, Escape, Tab, arrows, Space, "a", "7" ...)
//   {"eval": "js expression"}             evaluate in the page and print the result
//   {"shot": "file.png"}                  screenshot of the page, down to the end of <main> (path relative to book1/)
//   {"shot": "file.png", "of": "css"}     screenshot of one element

import { resolve, toFileUrl } from "jsr:@std/path@^1";
import { BOOK } from "./project_files.ts";

const args = [...Deno.args];
function option(name: string, fallback: string): string {
  const at = args.indexOf(name);
  if (at < 0) return fallback;
  const value = args[at + 1];
  args.splice(at, 2);
  return value;
}
const width = Number(option("--width", "760"));
const page = option("--page", "dist/index.html");
const dark = args.includes("--dark");
if (dark) args.splice(args.indexOf("--dark"), 1);
const [projectArg, actionsJson] = args;
if (!projectArg) {
  console.error(
    "usage: deno run -A tools/harness.ts <project folder> '<json actions>' [--width 760] [--dark]",
  );
  Deno.exit(1);
}
const url = toFileUrl(resolve(BOOK, projectArg, page)).href;
const actions = JSON.parse(actionsJson ?? "[]");

const CHROME = `${
  Deno.env.get("HOME")
}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const port = 9300 + Math.floor(Math.random() * 600);
const profile = await Deno.makeTempDir();
const proc = new Deno.Command(CHROME, {
  args: [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--allow-file-access-from-files",
    // WebGL in a headless browser, for Phaser games and <canvas> pages
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "about:blank",
  ],
  stdout: "null",
  stderr: "null",
}).spawn();

let wsUrl = "";
for (let i = 0; i < 80 && !wsUrl; i++) {
  await new Promise((r) => setTimeout(r, 100));
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    wsUrl = list.find((t: { type: string }) =>
      t.type === "page"
    )?.webSocketDebuggerUrl ?? "";
  } catch { /* not up yet */ }
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.onopen = r);

interface CdpReply {
  result?: Record<string, unknown> & {
    result?: { value?: unknown };
    data?: string;
  };
}
let id = 0;
const pending = new Map<number, (v: CdpReply) => void>();
function send(
  method: string,
  params: Record<string, unknown> = {},
): Promise<CdpReply> {
  const i = ++id;
  ws.send(JSON.stringify({ id: i, method, params }));
  return new Promise((r) => pending.set(i, r));
}
let errors = 0;
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)!(m);
    pending.delete(m.id);
  } else if (m.method === "Runtime.consoleAPICalled") {
    const text = m.params.args.map((
      a: { value?: unknown; description?: string },
    ) => a.value ?? a.description).join(" ");
    console.log(`[console.${m.params.type}]`, text);
  } else if (m.method === "Runtime.exceptionThrown") {
    const d = m.params.exceptionDetails;
    console.log("[EXCEPTION]", d.exception?.description ?? d.text);
    errors++;
  }
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function evaluate(expression: string): Promise<unknown> {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return r.result?.result?.value;
}
async function rect(
  selector: string,
): Promise<{ x: number; y: number; w: number; h: number }> {
  const json = await evaluate(
    `(() => { const e = document.querySelector(${JSON.stringify(selector)});
    if (!e) return "null"; e.scrollIntoView({block: "center"}); const b = e.getBoundingClientRect();
    return JSON.stringify({ x: b.x, y: b.y, w: b.width, h: b.height }); })()`,
  );
  const r = JSON.parse(String(json));
  if (!r) throw new Error(`no element matches ${selector}`);
  return r;
}
async function mouseClick(x: number, y: number): Promise<void> {
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    x,
    y,
    button: "left",
    clickCount: 1,
  });
  await send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    x,
    y,
    button: "left",
    clickCount: 1,
  });
}
async function key(name: string): Promise<void> {
  // Named keys, and single letters, digits and Space ("a", "7", "Space") - as KeyboardEvent.key/code.
  const codes: Record<string, number> = {
    Enter: 13,
    Escape: 27,
    Tab: 9,
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    Backspace: 8,
    Space: 32,
  };
  let keyValue = name;
  let code = name;
  let vk = codes[name];
  let text: string | undefined = name === "Enter" ? "\r" : undefined;
  if (name === "Space") {
    keyValue = " ";
    text = " ";
  } else if (/^[a-zA-Z]$/.test(name)) {
    code = `Key${name.toUpperCase()}`;
    vk = name.toUpperCase().charCodeAt(0);
    text = name;
  } else if (/^[0-9]$/.test(name)) {
    code = `Digit${name}`;
    vk = name.charCodeAt(0);
    text = name;
  }
  for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", {
      type,
      key: keyValue,
      code,
      windowsVirtualKeyCode: vk,
      nativeVirtualKeyCode: vk,
      text: type === "keyDown" ? text : undefined,
    });
  }
}

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height: 600,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-color-scheme", value: dark ? "dark" : "light" }],
});
await send("Page.navigate", { url });
await sleep(500);

for (const a of actions) {
  if (a.wait) await sleep(a.wait);
  if (a.click) {
    const b = await rect(a.click);
    await mouseClick(b.x + b.w / 2, b.y + b.h / 2);
    await sleep(50);
  }
  if (a.type) {
    const [selector, text] = a.type as [string, string];
    await evaluate(
      `(() => { const e = document.querySelector(${
        JSON.stringify(selector)
      }); e.focus(); e.value = ""; })()`,
    );
    await send("Input.insertText", { text });
    await sleep(50);
  }
  if (a.key) await key(a.key);
  if (a.eval) console.log("[eval]", JSON.stringify(await evaluate(a.eval)));
  if (a.shot) {
    let clip;
    if (a.of) {
      const b = await rect(a.of);
      const sx = Number(await evaluate("scrollX")),
        sy = Number(await evaluate("scrollY"));
      clip = {
        x: b.x + sx - 8,
        y: b.y + sy - 8,
        width: b.w + 16,
        height: b.h + 16,
        scale: 1,
      };
    } else {
      // Down to the bottom of <main> (plus a margin), so there is no empty space under the content.
      const h = Number(
        await evaluate(
          "Math.ceil((document.querySelector('main') ?? document.body).getBoundingClientRect().bottom + scrollY + 16)",
        ),
      );
      clip = { x: 0, y: 0, width, height: h, scale: 1 };
    }
    const r = await send("Page.captureScreenshot", {
      format: "png",
      clip,
      captureBeyondViewport: true,
    });
    const file = resolve(BOOK, a.shot);
    await Deno.mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
    await Deno.writeFile(
      file,
      Uint8Array.from(atob(r.result!.data!), (c) => c.charCodeAt(0)),
    );
    console.log("[shot]", a.shot);
  }
}

ws.close();
proc.kill();
await Deno.remove(profile, { recursive: true }).catch(() => {});
Deno.exit(errors > 0 ? 1 : 0);
