// The page: the college directory, with buttons to show everybody, students or lecturers.
// main.ts is the only file that touches the page.

import { byName, peopleFrom, withRole } from "./directory.ts";
import data from "./people.json" with { type: "json" };
import type { Person, Role } from "./Person.ts";

/** Finds an element, or stops with an error that names the missing selector (Chapter 7). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches ${selector}`);
  }
  return element;
};

const people: Person[] = peopleFrom(data);
let shownRole: Role | null = null; // null means "everybody"

const list = requireElement<HTMLUListElement>("#people");
const count = requireElement<HTMLParagraphElement>("#count");

const render = (): void => {
  const chosen = shownRole === null ? people : withRole(people, shownRole);
  list.innerHTML = "";
  for (const person of byName(chosen)) {
    const item = document.createElement("li");
    item.className = "card";
    const badge = document.createElement("span");
    badge.className = `badge ${person.getRole().toLowerCase()}`;
    badge.textContent = person.getRole();
    const text = document.createElement("span");
    // textContent, not innerHTML: the names come from data (Chapter 7).
    // `${person}` runs the Student or Lecturer toString - each one adds to Person's.
    text.textContent = `${person}`;
    item.append(badge, text);
    list.appendChild(item);
  }
  count.textContent = `Showing ${chosen.length} of ${people.length} people`;
};

const show = (role: Role | null): void => {
  shownRole = role;
  render();
};

requireElement<HTMLButtonElement>("#show-all").addEventListener("click", () => show(null));
requireElement<HTMLButtonElement>("#show-students").addEventListener("click", () => show("Student"));
requireElement<HTMLButtonElement>("#show-lecturers").addEventListener("click", () => show("Lecturer"));

render();
