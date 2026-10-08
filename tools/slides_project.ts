// Makes (or refreshes) the slides project for each chapter's teacher materials:
//
//   teacher/chNN_name/slides/
//     chNN_slides.celbridge      opens slides.story in the Story editor when the project is opened
//     slides.story               the deck
//     slides.pdf                 the deck as a PDF (built by story_pdf.ts)
//     images/                    the pictures the deck uses
//     tools/story-builder/       the Story Builder tool, so the deck opens in Celbridge
//
// A teacher opens the slides folder in Celbridge to view, present or edit the slides.
//
//   deno run -A tools/slides_project.ts                 every chapter in teacher/
//   deno run -A tools/slides_project.ts ch02_events     one chapter
//
// Safe to run again: it moves slides.story, slides.pdf and images/ into slides/ if they are still at
// the chapter level, and replaces slides/tools/story-builder with a fresh copy of tools/story-builder
// (so a newer version of the tool reaches every chapter).

import { join } from "jsr:@std/path@^1";
import { copy } from "jsr:@std/fs@^1/copy";
import { BOOK, exists } from "./project_files.ts";

const TEACHER = join(BOOK, "teacher");
const TOOL = join(BOOK, "tools/story-builder");

const chapters: string[] = [];
if (Deno.args.length > 0) {
  chapters.push(...Deno.args);
} else {
  for await (const entry of Deno.readDir(TEACHER)) {
    if (entry.isDirectory && /^ch\d\d_/.test(entry.name)) {
      chapters.push(entry.name);
    }
  }
}

function celbridgeFile(chapter: string): string {
  return `[celbridge]
celbridge-version = "1.2.0"
project-version = "0.1.0"

# The teacher's slides for ${chapter}. slides.story opens in the Story Builder editor (in
# tools/story-builder/): Play presents the slides; the graph or list view shows them all.
[celbridge.resources]
hide = [".gitignore", ".DS_Store", "Thumbs.db", "desktop.ini"]
search-exclude = ["tools"]

[[shortcut]]
resource = "slides.story"
icon = "bs-easel"
area = "main"
open-on-load = true

[[shortcut]]
resource = "slides.pdf"
icon = "bs-file-earmark-pdf"
area = "side"
`;
}

const README = `# Slides

Open this folder in Celbridge. \`slides.story\` opens in the Story Builder editor:

- **Play** (the green button) presents the slides, with previous / next arrows and slide numbers
- the **list** and **graph** buttons show every slide; select one to see or edit its Markdown
- **Download PDF** makes a new PDF after editing

\`slides.pdf\` is the same deck as a PDF, one slide per page. The pictures the slides use are in
\`images/\`. The Story Builder tool itself is in \`tools/story-builder/\` - do not move it, or the
deck will open as plain text.
`;

for (const chapter of chapters.sort()) {
  const dir = join(TEACHER, chapter);
  const slides = join(dir, "slides");
  await Deno.mkdir(slides, { recursive: true });

  // Move the deck, its PDF and its pictures in, if they are still beside the notes.
  for (const name of ["slides.story", "slides.pdf", "images"]) {
    if (await exists(join(dir, name))) {
      if (await exists(join(slides, name))) {
        await Deno.remove(join(slides, name), { recursive: true });
      }
      await Deno.rename(join(dir, name), join(slides, name));
    }
  }
  if (!await exists(join(slides, "slides.story"))) {
    console.log(`skipped ${chapter} - no slides.story yet`);
    continue;
  }

  await Deno.remove(join(slides, "tools"), { recursive: true }).catch(() => {});
  await copy(TOOL, join(slides, "tools/story-builder"));
  for (const old of await Array.fromAsync(Deno.readDir(slides))) {
    if (old.isFile && old.name.endsWith(".celbridge")) {
      await Deno.remove(join(slides, old.name));
    }
  }
  const name = chapter.slice(0, 4); // "ch01"
  await Deno.writeTextFile(
    join(slides, `${name}_slides.celbridge`),
    celbridgeFile(chapter),
  );
  await Deno.writeTextFile(join(slides, "README.md"), README);
  await Deno.writeTextFile(
    join(slides, ".gitignore"),
    ".celbridge/\n.DS_Store\n",
  );
  console.log(`made teacher/${chapter}/slides/`);
}
