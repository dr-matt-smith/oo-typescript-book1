# Authoring guide

For anyone adding to, or changing, the book. Chapters 1 and 2 are the worked examples of everything
below - when in doubt, do what they do. The overall plan is in `../../DesignDocs/version01.md`.

## Folder layout

```
book1/
  README.md                         front page: links + a summary of every chapter
  template/                         the starting point for every project
  tools/                            authoring tools (this file, generators, harness, checker, story-builder/)
  chapters/chNN_short_name/
    README.md                       the chapter
    images/                         screenshots (.png) and diagrams (.svg)
    projects/chNN_projectMM_name/   Celbridge projects, numbered in reading order
  teacher/
    README.md
    chNN_short_name/
      teacher_notes.md  solutions.md
      slides/                       a Celbridge project: slides.story, slides.pdf, images/, tools/story-builder/
      solutions/chNN_challenge_K_short/   one runnable project per challenge (K = 1..6)
```

Nothing in `chapters/` may give away a challenge answer. Everything that does lives in `teacher/`.

## Tools

All run from `book1/`, with paths relative to it.

| Command | What it does |
|---|---|
| `deno run -A tools/new_project.ts <folder> "<Title>" ["<summary>"]` | a new project from `template/`, built once |
| `deno run -A tools/copy_project.ts <from> <to>` | copies a project (chapter project -> challenge solution); no `dist/`, `test_output/` or Celbridge state is copied |
| `deno run -A tools/check_all.ts <folder>` | builds and tests every project under the folder; reports build failures, failing tests, type errors and lint warnings |
| `deno run -A tools/sync_template.ts <folder>` | pushes template changes (build.ts, tools/test_report.ts, terminal.console, deno.json settings, .celbridge) into existing projects |
| `deno run -A tools/harness.ts <project> '<json actions>'` | drives a built page in headless Chromium: clicks, typing, keys, `eval`, screenshots (`--page test_output/index.html` for the report) |
| `deno run -A tools/make_story.ts <draft.md> <slides.story> "<name>"` | turns a slide draft (slides separated by `---`) into a `.story` deck: one node per slide, in order |
| `deno run -A tools/slides_project.ts [chNN_name]` | makes or refreshes each chapter's `teacher/.../slides/` Celbridge project (moves the deck in, copies a fresh `tools/story-builder/`, writes its `.celbridge` file) |
| `deno run -A tools/story_pdf.ts <slides.story or folder>` | builds the PDF with the Story Builder tool itself: its editor page runs headless and its own Download PDF button is pressed |
| `deno run -A tools/book_pdf.ts` | builds `pdf/`: a PDF of each chapter's README.md, and `book1_complete.pdf` (title page, contents, every chapter, cheat sheet appendix), printed by headless Google Chrome |

`.book-check.json` in a project declares exceptions for `check_all.ts`:

- `{ "failing": 2 }` - a project meant to start "red" (a TDD exercise that begins with failing tests)
- `{ "noTests": true }` - a project from before tests are introduced (Chapter 1, projects 1, 2 and
  5), which also has a `tests/README.md` saying why the folder is empty

## Every project

- built from `template/` (or copied from a project that was), named `chNN_projectMM_short_name`
- model files (logic: classes and functions) never touch the DOM, and are tested in
  `tests/*.test.ts`; DOM code lives only in `main.ts` and, from Book 1 Chapter 7 on, in view files
  (`*View.ts`) and a small `dom.ts` (e.g. `requireElement`)
- passes `check_all.ts` with no problems (all tests passing, no type errors, no lint warnings),
  except declared exceptions
- `README.md`: one-paragraph summary, "Running it" (from the template), and "What to look at"
- `public/styles.css` keeps the template's shared styles at the top; project styles go under a
  `/* --- this project --- */` line
- data that would be fetched in a served page is a JSON file imported with
  `import data from "./data.json" with { type: "json" };` (read and parsed at build time)

## Code style

- one class per file, file named after the class (`Counter.ts`); plain functions in lower-case
  files (`messages.ts`, `age_group.ts`)
- relative imports end in `.ts`
- `private` / `public` / `protected` written out; `override` on overridden methods (the compiler
  insists); explicit return types on functions and methods
- no `any`; `as` only where unavoidable, with a comment saying why
- magic numbers become named `const`s at the top of the file
- comments explain **why**, in plain English, for a student reading the file on its own; a comment
  at the top of each file says what it is for
- an exported function or method whose use is not obvious gets a doc comment with an `@example`
  (one or two typical calls, checked with `assertEquals`); Deno type-checks and runs these with the
  tests. Edges, failures and anything worth naming go in `tests/*.test.ts`
- tests: one behaviour per test, named as a sentence ("decrement never goes below zero"),
  arrange / act / assert, `assertEquals(actual, expected)`, edges tested
- anything unpredictable (random numbers, the time) is passed into the tested function, not read
  inside it
- challenge solutions mark every change with `// CHALLENGE n` (`<!-- CHALLENGE n -->` in HTML,
  `/* CHALLENGE n */` in CSS)

## Writing a chapter

Voice: direct, friendly, second person, short paragraphs, British spelling. Explain *why* before
*how*. Assume Java; say where TypeScript differs. Go slowly early on: one new idea at a time.

1. `# Chapter N - Title`, a two or three sentence introduction, a screenshot
2. **What you will learn** - 4 to 8 bullets
3. **The projects** - a table: project (linked), what it shows, in the order the chapter uses them
4. teaching sections built around code excerpts (`ts` blocks, file name above each). Excerpts must
   match the real code
5. `> **Note**` / `> **Try it**` boxes, and a **Java and TypeScript** table. In the early chapters,
   small in-chapter **Exercises** (numbered N.1, N.2 ...) ask for one small change; the answer follows
   straight after ("Here is one way"), and is usually the next project
6. **Summary** - bullets
7. **Challenges** - exactly six, simple (1) to advanced (6), each saying which project it starts
   from, phrased test first. Hints for 4-6. Never the answer
8. link to the next chapter

Every error message quoted in a chapter or the teacher notes must be checked by making the mistake.

Length: 3,000-6,000 words. Screenshots taken with `harness.ts` (default width 760, light theme).
Diagrams: hand-written SVG, 800 wide or less, white background, Arial, palette navy `#1d3557`, blue
`#457b9d`, light blue `#a8dadc`, cream `#f1faee`, red `#e63946`, orange `#f4a261`, green `#2a9d8f`,
text `#1b1f2a`.

## Teacher materials

- `teacher_notes.md`: overview, prerequisites, outcomes, timed session plan, key points, common
  errors (with real messages), discussion questions, extension and assessment ideas
- `solutions.md`: per challenge - goal, key code, what to look for
- `slides/`: a Celbridge project holding the deck for the Story Builder tool, 15-30 slides, code on
  slides 15 lines or fewer and **70 characters wide or less** (wider runs off the slide;
  `make_story.ts` warns). Draft in Markdown with `---` between slides; convert it with
  `make_story.ts` to `teacher/chNN_name/slides/slides.story`; copy the pictures it uses into
  `slides/images/` (referenced as `images/x.png`); run `slides_project.ts` to add the tool and the
  `.celbridge` file; then build `slides.pdf` with `story_pdf.ts` and look at the pages. After that,
  the `.story` file is the deck - edit it in the Story editor

The tool's PDF export cannot do Marp split backgrounds (`![bg right:40%](...)` - they cover the
text), and stretches wide images sized by height. Use inline images: `w:` for wide pictures, `h:`
for tall ones.

Diagrams on slides are written as **editable text** where possible, so a teacher can tweak them in
the Story editor: ```` ```nomnoml ```` for class/object diagrams (start with the book's style header -
see `DesignDocs/DIAGRAM_BRIEF.md`) and ```` ```mermaid ```` for flows, state machines and sequences.
Both render in preview, play mode and the PDF export. Keep an SVG image only when a text diagram
cannot show it clearly (charts, side-by-side code, annotated pictures). The chapter READMEs keep
their SVG diagrams.
