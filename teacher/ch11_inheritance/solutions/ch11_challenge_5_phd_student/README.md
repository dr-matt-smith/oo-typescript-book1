# Chapter 11, challenge 5 - Three levels deep (teacher's solution)

PhdStudent extends Student extends Person, with a toString built on Student's.

Made from `ch11_project02_staff`. Every change is marked with a `CHALLENGE 5` comment - search for `CHALLENGE` to find them.

## Running it

Open the project in Celbridge. The console at the bottom starts by itself, and runs `deno task dev`:

1. **builds** `src/` (TypeScript) and `public/` (HTML, CSS, images) into `dist/`
2. **tests** everything in `tests/`, printing the results in the console (in TAP format) and writing a
   readable report to `test_output/index.html` (and `test_output/summary.md`)
3. **watches** - every time you save a file in `src/`, `public/` or `tests/`, it does it all again

`dist/index.html` opens beside the console. After a rebuild, its preview's **refresh** button lights
up - press it to see your changes. The clipboard icon opens the test report.

The console's buttons: rebuild-and-watch, build once, test once, and lint. To use them while the
watcher is running, press **Ctrl+C** first to stop it.

No server is needed: `dist/` is a plain web page, so you can also open `dist/index.html` in any browser.

## What to look at

- `src/Person.ts` - an ordinary (not abstract) base class with `protected` parameter properties and
  an email check in its constructor
- `src/Student.ts` and `src/Lecturer.ts` - constructors that call `super(name, email)` first, and
  `toString()` methods that build on `super.toString()`
- `src/directory.ts` - JSON data turned into Students and Lecturers, held together in a `Person[]`
- `tests/people.test.ts` - the email check, inherited by every subclass, tested with `assertThrows`
