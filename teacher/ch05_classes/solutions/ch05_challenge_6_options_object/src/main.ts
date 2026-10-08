// Shows a card for every student in students.json.
// The data is turned into Student objects first; the cards are built from the objects' methods.

import data from "./students.json" with { type: "json" };
import { studentsFrom } from "./students.ts";

const STUDENTS = studentsFrom(data);

const cards = document.querySelector<HTMLElement>("#cards");
const summary = document.querySelector<HTMLElement>("#summary");

if (cards !== null) {
  for (const student of STUDENTS) {
    const card = document.createElement("article");
    card.className = "card student";

    const name = document.createElement("h2");
    name.textContent = student.getFullName();

    const details = document.createElement("p");
    details.className = "muted";
    details.textContent = `${student.getId()} · ${student.getCourse()} · Year ${student.getYear()}`; // CHALLENGE 6

    const greeting = document.createElement("p");
    greeting.textContent = `Hello, ${student.getGreetingName()}!`;

    card.appendChild(name);
    card.appendChild(details);
    card.appendChild(greeting);
    cards.appendChild(card);

    // toString is for logging: open the browser's console to see one line per student.
    console.log(`${student}`);
  }
}

if (summary !== null) {
  summary.textContent = `${STUDENTS.length} students`;
}
