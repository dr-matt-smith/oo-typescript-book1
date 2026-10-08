# Teacher materials

Everything a teacher needs to run each chapter as a class - and nothing a student should see before
attempting the challenges. The chapter folders in `chapters/` contain no answers, so they can be
handed out on their own; keep this folder back.

Each chapter has a folder here, named like the chapter:

| File | What it is |
|---|---|
| `teacher_notes.md` | overview, prerequisites, learning outcomes, a timed session plan, key points, common errors (with the messages students will actually see), discussion questions, extension and assessment ideas |
| `solutions.md` | a worked solution to each of the chapter's six challenges: the approach, the key code, and what to look for when marking |
| `slides/` | the chapter's slides, as a small **Celbridge project**: open the folder in Celbridge and `slides.story` opens in the Story Builder editor, ready to present. It also holds `slides.pdf` (one slide per page) and the pictures the slides use |
| `solutions/` | one complete, runnable Celbridge project per challenge (written exercises have none). Every change from the chapter project is marked with a `CHALLENGE n` comment - search for `CHALLENGE` to find them. Every solution builds with all tests passing, no type errors and no lint warnings |

## Using the slides

Each chapter's `slides/` folder is a Celbridge project with everything it needs: the deck
(`slides.story`), its pictures (`images/`), its PDF (`slides.pdf`), and the Story Builder tool itself
(`tools/story-builder/`). Open the folder in Celbridge and the deck opens in the Story editor:

- **Play** presents the slides, with previous / next arrows and slide numbers
- the list and graph buttons show every slide; select one to see or edit its Markdown
- **Download PDF** makes a new PDF after editing

To rebuild every chapter's PDF at once, from the `book1` folder (needs a network connection the
first time, to load the slide renderer):

```bash
deno run -A tools/story_pdf.ts teacher
```

## Chapters

| Chapter | Notes | Solutions | Slides |
|---|---|---|---|
| 1 - Introduction | [notes](ch01_introduction/teacher_notes.md) | [solutions](ch01_introduction/solutions.md) | [slides/](ch01_introduction/slides/) · [PDF](ch01_introduction/slides/slides.pdf) |
| 2 - Events | [notes](ch02_events/teacher_notes.md) | [solutions](ch02_events/solutions.md) | [slides/](ch02_events/slides/) · [PDF](ch02_events/slides/slides.pdf) |
| 3 - Arrow functions | [notes](ch03_arrow_functions/teacher_notes.md) | [solutions](ch03_arrow_functions/solutions.md) | [slides/](ch03_arrow_functions/slides/) · [PDF](ch03_arrow_functions/slides/slides.pdf) |
| 4 - Test first, properly | [notes](ch04_test_first/teacher_notes.md) | [solutions](ch04_test_first/solutions.md) | [slides/](ch04_test_first/slides/) · [PDF](ch04_test_first/slides/slides.pdf) |
| 5 - Classes, objects and constructors | [notes](ch05_classes/teacher_notes.md) | [solutions](ch05_classes/solutions.md) | [slides/](ch05_classes/slides/) · [PDF](ch05_classes/slides/slides.pdf) |
| 6 - Encapsulation | [notes](ch06_encapsulation/teacher_notes.md) | [solutions](ch06_encapsulation/solutions.md) | [slides/](ch06_encapsulation/slides/) · [PDF](ch06_encapsulation/slides/slides.pdf) |
| 7 - Model and view | [notes](ch07_model_and_view/teacher_notes.md) | [solutions](ch07_model_and_view/solutions.md) | [slides/](ch07_model_and_view/slides/) · [PDF](ch07_model_and_view/slides/slides.pdf) |
| 8 - Constants, static and enums | [notes](ch08_constants_static_enums/teacher_notes.md) | [solutions](ch08_constants_static_enums/solutions.md) | [slides/](ch08_constants_static_enums/slides/) · [PDF](ch08_constants_static_enums/slides/slides.pdf) |
| 9 - References, composition and modules | [notes](ch09_references_composition_modules/teacher_notes.md) | [solutions](ch09_references_composition_modules/solutions.md) | [slides/](ch09_references_composition_modules/slides/) · [PDF](ch09_references_composition_modules/slides/slides.pdf) |
| 10 - Interfaces and structural typing | [notes](ch10_interfaces/teacher_notes.md) | [solutions](ch10_interfaces/solutions.md) | [slides/](ch10_interfaces/slides/) · [PDF](ch10_interfaces/slides/slides.pdf) |
| 11 - Inheritance | [notes](ch11_inheritance/teacher_notes.md) | [solutions](ch11_inheritance/solutions.md) | [slides/](ch11_inheritance/slides/) · [PDF](ch11_inheritance/slides/slides.pdf) |
