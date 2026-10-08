// The Course Modules page: pick a module, see who is on it, enrol and withdraw students.
// Everything comes in through the model folder's index.ts - main.ts does not need to know which
// file each class lives in.

import data from "./data/course.json" with { type: "json" };
import { buildCourse } from "./data/build_course.ts";
import type { Module } from "./model/index.ts";
import { courseSummary, moduleSummary, studentModules } from "./report.ts"; // CHALLENGE 4

/** querySelector that throws, naming the element, if it is missing (Chapter 7's helper). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches ${selector} - check index.html`);
  }
  return element;
};

const course = buildCourse(data);

const summary = requireElement<HTMLElement>("#summary");
const moduleChoice = requireElement<HTMLSelectElement>("#module");
const moduleHeading = requireElement<HTMLElement>("#module-summary");
const studentList = requireElement<HTMLElement>("#students");
const studentChoice = requireElement<HTMLSelectElement>("#student");
const enrolButton = requireElement<HTMLButtonElement>("#enrol");
const studentLine = requireElement<HTMLElement>("#student-modules"); // CHALLENGE 4

/** The module picked in the drop-down list. Throws if the list and the course disagree. */
const chosenModule = (): Module => {
  const module = course.getModule(moduleChoice.value);
  if (module === undefined) {
    throw new Error(`No module ${moduleChoice.value} on the course`);
  }
  return module;
};

/** Makes an <option> with this value and text. */
const option = (value: string, text: string): HTMLOptionElement => {
  const element = document.createElement("option");
  element.value = value;
  element.textContent = text;
  return element;
};

const render = (): void => {
  const module = chosenModule();
  summary.textContent = courseSummary(course);
  moduleHeading.textContent = moduleSummary(module);

  studentList.replaceChildren();
  for (const student of module.getStudents()) {
    const li = document.createElement("li");
    // CHALLENGE 4: the name is a link-like button that shows the student's modules
    const name = document.createElement("button");
    name.textContent = student.toString();
    name.className = "link";
    name.addEventListener("click", () => {
      studentLine.textContent = studentModules(student.name, course.modulesFor(student.id));
    });
    li.appendChild(name);
    const withdraw = document.createElement("button");
    withdraw.textContent = "Withdraw";
    withdraw.className = "small secondary";
    withdraw.addEventListener("click", () => {
      module.withdraw(student.id);
      render();
    });
    li.appendChild(withdraw);
    studentList.appendChild(li);
  }

  const others = course.studentsNotOn(module);
  studentChoice.replaceChildren(...others.map((student) => option(student.id, student.toString())));
  enrolButton.disabled = others.length === 0;
  studentChoice.disabled = others.length === 0;
};

for (const module of course.getModules()) {
  moduleChoice.appendChild(option(module.code, `${module.code} - ${module.title}`));
}

moduleChoice.addEventListener("change", () => render());
enrolButton.addEventListener("click", () => {
  course.enrol(moduleChoice.value, studentChoice.value);
  render();
});

render();
