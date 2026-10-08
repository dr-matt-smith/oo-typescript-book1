# Chapter 5, challenge 6 - Too many arguments (teacher's solution)

Student's constructor takes one StudentData object, with a year (default 1) and an optional email.

Made from `ch05_project01_student_cards`. Every change is marked with a `CHALLENGE 6` comment - search for `CHALLENGE` to find them.

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

- `src/Student.ts` - a class with **parameter properties** (`private id: number` in the constructor's
  brackets), a default parameter (`course`), an optional parameter (`nickname?`) and `toString()`
- `src/students.ts` - `studentsFrom` turns plain JSON data into `Student` objects with
  `map((d) => new Student(...))`
- `src/main.ts` - builds one card per student; open the browser's console to see `toString()` at work
- `tests/Student.test.ts` - testing what a constructor stores, its default and optional parameters,
  and `toString()`
