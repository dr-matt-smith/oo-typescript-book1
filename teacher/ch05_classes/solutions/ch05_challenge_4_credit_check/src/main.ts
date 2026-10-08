// Lists a course's modules, with buttons to show the whole year or one semester,
// and the total credits of what is shown.

import data from "./modules.json" with { type: "json" };
import { creditCheck, modulesFrom, modulesIn, totalCredits } from "./modules.ts"; // CHALLENGE 4
import { type Module } from "./Module.ts";

const MODULES = modulesFrom(data);

// The state: which semester is shown - or null for the whole year.
let semester: number | null = null;

const list = document.querySelector<HTMLElement>("#modules");
const total = document.querySelector<HTMLElement>("#total");
const check = document.querySelector<HTMLElement>("#check"); // CHALLENGE 4
const allButton = document.querySelector<HTMLButtonElement>("#all");
const semester1Button = document.querySelector<HTMLButtonElement>("#semester-1");
const semester2Button = document.querySelector<HTMLButtonElement>("#semester-2");

/** "Semester 1", "Semester 2" or "All year", for one module. */
const whenText = (module: Module): string => {
  const moduleSemester = module.getSemester();
  return moduleSemester === undefined ? "All year" : `Semester ${moduleSemester}`;
};

const render = (): void => {
  const shown = semester === null ? MODULES : modulesIn(MODULES, semester);

  if (list !== null) {
    list.innerHTML = "";
    for (const module of shown) {
      const item = document.createElement("li");
      item.textContent = `${module}`; // toString: "COMP1001 Programming 1 (10 credits)"
      const when = document.createElement("span");
      when.className = module.isYearLong() ? "tag year" : "tag";
      when.textContent = whenText(module);
      item.appendChild(when);
      list.appendChild(item);
    }
  }
  if (total !== null) {
    const heading = semester === null ? "The whole year" : `Semester ${semester}`;
    total.textContent = `${heading}: ${shown.length} modules, ${totalCredits(shown)} credits`;
  }
  // CHALLENGE 4: the check only makes sense for the whole year
  if (check !== null) {
    check.textContent = semester === null ? creditCheck(MODULES) : "";
  }
};

allButton?.addEventListener("click", () => {
  semester = null;
  render();
});
semester1Button?.addEventListener("click", () => {
  semester = 1;
  render();
});
semester2Button?.addEventListener("click", () => {
  semester = 2;
  render();
});

render();
