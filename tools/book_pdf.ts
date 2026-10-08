// Builds a PDF of each chapter's README.md, and one PDF of the whole book (title page, contents, then
// every chapter, and the cheat sheet as an appendix), into pdf/. The Markdown is turned into styled HTML
// and printed by Google Chrome, headless.
//
//   deno run -A tools/book_pdf.ts            (writes pdf/ch01_introduction.pdf ... and pdf/book1_complete.pdf)
//
// Paths are relative to book1/. Needs Google Chrome in /Applications, and a network connection the first
// time (for the npm packages and the highlight.js stylesheet).
import { Marked } from "npm:marked@15.0.12";
import { markedHighlight } from "npm:marked-highlight@2.2.1";
import hljs from "npm:highlight.js@11.11.1";
import puppeteer from "npm:puppeteer-core@23.11.1";
import { join, toFileUrl } from "jsr:@std/path@^1";
import { BOOK } from "./project_files.ts";

const OUT = join(BOOK, "pdf");
const CHAPTERS = join(BOOK, "chapters");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
await Deno.mkdir(OUT, { recursive: true });

const dirs = [...Deno.readDirSync(CHAPTERS)].filter((e) => e.isDirectory && /^ch\d\d_/.test(e.name))
  .map((e) => e.name).sort();

const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// mode "chapter": links to other chapters become plain text; "book": they become internal anchors.
// folder is where the Markdown file lives, so its relative image paths resolve.
function render(dir: string, md: string, mode: "chapter" | "book", folder = join(CHAPTERS, dir)): string {
  const prefix = mode === "book" ? `${dir}--` : "";
  const base = toFileUrl(folder).href + "/";
  const marked = new Marked(
    markedHighlight({
      emptyLangClass: "hljs",
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = depth === 1 && mode === "book" ? dir : prefix + slugify(text);
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      image({ href, text }) {
        const src = /^[a-z]+:/i.test(href) ? href : base + href;
        return `<figure><img src="${src}" alt="${escapeHtml(text)}"><figcaption>${escapeHtml(text)}</figcaption></figure>`;
      },
      link({ href, tokens }) {
        const text = this.parser.parseInline(tokens);
        if (/^(https?|mailto):/.test(href)) return `<a href="${href}">${text}</a>`;
        if (href.startsWith("#")) return `<a href="#${prefix}${href.slice(1)}">${text}</a>`;
        const other = href.match(/^\.\.\/(ch\d\d_[^/]+)\/README\.md(?:#(.*))?$/);
        if (other && mode === "book") {
          return `<a href="#${other[2] ? `${other[1]}--${other[2]}` : other[1]}">${text}</a>`;
        }
        return `<span class="local-link">${text}</span>`;
      },
    },
  });
  return `<section class="chapter">${marked.parse(md) as string}</section>`;
}

const hljsCss = await (await fetch("https://cdn.jsdelivr.net/npm/highlight.js@11.11.1/styles/github.min.css")).text();
const CSS = `
${hljsCss}
@page { size: A4; margin: 18mm 16mm 20mm 16mm; }
html { font-size: 10.5pt; }
body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; line-height: 1.5; color: #1f2328; margin: 0; }
h1, h2, h3, h4 { line-height: 1.25; break-after: avoid; color: #111; }
h1 { font-size: 2em; border-bottom: 2px solid #3178c6; padding-bottom: .3em; margin-top: 0; }
h2 { font-size: 1.45em; border-bottom: 1px solid #d0d7de; padding-bottom: .2em; margin-top: 1.6em; }
h3 { font-size: 1.15em; margin-top: 1.3em; }
.chapter { break-before: page; }
code { font-family: Menlo, Consolas, monospace; font-size: .88em; background: #eff1f3; padding: .1em .3em; border-radius: 4px; }
pre { background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 8px 10px; white-space: pre-wrap;
      word-break: break-word; break-inside: avoid; font-size: .78em; line-height: 1.4; }
pre code { background: none; padding: 0; font-size: inherit; }
pre code.hljs { padding: 0; background: none; }
table { border-collapse: collapse; margin: 1em 0; width: 100%; break-inside: avoid; font-size: .95em; }
th, td { border: 1px solid #d0d7de; padding: 4px 8px; vertical-align: top; text-align: left; }
th { background: #f6f8fa; }
blockquote { margin: 1em 0; padding: .5em 1em; border-left: 4px solid #3178c6; background: #f3f8fd; color: #333; break-inside: avoid; }
blockquote p { margin: .3em 0; }
figure { margin: 1em 0; text-align: center; break-inside: avoid; }
figure img { max-width: 100%; max-height: 120mm; border: 1px solid #e1e4e8; }
figcaption { font-size: .85em; color: #57606a; margin-top: .3em; font-style: italic; }
a { color: #0b5cad; text-decoration: none; }
.local-link { font-family: Menlo, Consolas, monospace; font-size: .88em; }
li { margin: .15em 0; }
.title-page { height: 250mm; display: flex; flex-direction: column; justify-content: center; text-align: center; }
.title-page h1 { border: none; font-size: 2.6em; margin-bottom: .4em; }
.title-page p { font-size: 1.25em; color: #444; }
.toc { break-before: page; }
.toc ol { font-size: 1.1em; line-height: 2; }
.toc .appendix { font-size: 1.1em; margin-left: 2.5em; }
.appendix-section table { break-inside: auto; }
.appendix-section tr { break-inside: avoid; }
`;

const page = (title: string, body: string) =>
  `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>${CSS}</style></head><body>${body}</body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files"] });

async function print(html: string, name: string, title: string) {
  const htmlPath = join(OUT, ".tmp_" + name + ".html");
  await Deno.writeTextFile(htmlPath, html);
  const tab = await browser.newPage();
  await tab.goto(toFileUrl(htmlPath).href, { waitUntil: "networkidle0" });
  await tab.pdf({
    path: join(OUT, name + ".pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="font-size:8pt;color:#777;width:100%;padding:0 16mm;display:flex;justify-content:space-between;font-family:Helvetica,Arial,sans-serif">
      <span>${escapeHtml(title)}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    outline: true,
    tagged: true,
  });
  await tab.close();
  await Deno.remove(htmlPath);
  console.log("wrote", name + ".pdf");
}

const bookReadme = await Deno.readTextFile(join(BOOK, "README.md"));
const bookTitle = bookReadme.match(/^# (.+)$/m)![1];
const subtitle = (bookReadme.match(/^\*\*(.+)\*\*$/m)?.[1] ?? "");

const chapterTitles: string[] = [];
const bookSections: string[] = [];
for (const dir of dirs) {
  const md = await Deno.readTextFile(join(CHAPTERS, dir, "README.md"));
  const title = md.match(/^# (.+)$/m)![1];
  chapterTitles.push(title);
  await print(page(title, render(dir, md, "chapter")), dir, title);
  bookSections.push(render(dir, md, "book"));
}

// The Java to TypeScript cheat sheet goes at the end of the book, as an appendix
const cheatSheet = await Deno.readTextFile(join(BOOK, "cheat_sheet.md"));
const cheatTitle = cheatSheet.match(/^# (.+)$/m)![1];
bookSections.push(
  render("appendix", cheatSheet.replace(/^# (.+)$/m, "# Appendix - $1"), "book", BOOK)
    .replace('class="chapter"', 'class="chapter appendix-section"'),
);

const titlePage = `<div class="title-page"><h1>${escapeHtml(bookTitle)}</h1><p>${escapeHtml(subtitle)}</p></div>`;
const toc = `<div class="toc"><h2>Contents</h2><ol>${
  dirs.map((d, i) => `<li><a href="#${d}">${escapeHtml(chapterTitles[i].replace(/^Chapter \d+ - /, ""))}</a></li>`).join("")
}</ol><p class="appendix">Appendix: <a href="#appendix">${escapeHtml(cheatTitle)}</a></p></div>`;
await print(page(bookTitle, titlePage + toc + bookSections.join("\n")), "book1_complete", bookTitle);

await browser.close();
