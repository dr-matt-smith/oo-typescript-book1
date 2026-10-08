// Shows the class's marks as a table, with a summary, and buttons to sort and filter.
// The state is two booleans; every change calls render(), which works out what to show.

import marks from "./marks.json" with { type: "json" };
import {
  average,
  bottomStudent,
  byMark,
  byName,
  gradeFor,
  marksOf,
  passed,
  type Student,
  topStudent,
} from "./marks.ts";

const STUDENTS: Student[] = marks;

let sortByMark = false; // false: by name
let passesOnly = false;

const rows = document.querySelector<HTMLElement>("#rows");
const summary = document.querySelector<HTMLElement>("#summary");
const byNameButton = document.querySelector<HTMLButtonElement>("#by-name");
const byMarkButton = document.querySelector<HTMLButtonElement>("#by-mark");
const passesBox = document.querySelector<HTMLInputElement>("#passes-only");

const render = (): void => {
  const chosen = passesOnly ? passed(STUDENTS) : STUDENTS;
  const shown = sortByMark ? byMark(chosen) : byName(chosen);

  if (rows !== null) {
    // map turns each student into a row of HTML; join puts the rows together into one string.
    rows.innerHTML = shown
      .map((student) => `<tr><td>${student.name}</td><td>${student.mark}</td><td>${gradeFor(student.mark)}</td></tr>`)
      .join("");
  }
  if (summary !== null) {
    // CHALLENGE 3: top and bottom, described by one small arrow function
    const describe = (student: Student | undefined): string =>
      student === undefined ? "nobody" : `${student.name} (${student.mark})`;
    summary.textContent = `${shown.length} students · average ${average(marksOf(shown)).toFixed(1)} · top: ${
      describe(topStudent(shown))
    } · bottom: ${describe(bottomStudent(shown))}`;
  }
};

byNameButton?.addEventListener("click", () => {
  sortByMark = false;
  render();
});
byMarkButton?.addEventListener("click", () => {
  sortByMark = true;
  render();
});
passesBox?.addEventListener("change", () => {
  passesOnly = passesBox.checked;
  render();
});

render();
