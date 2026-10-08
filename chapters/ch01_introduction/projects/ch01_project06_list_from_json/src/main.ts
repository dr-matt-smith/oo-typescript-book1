// Shows a bulleted list whose items come from a plain data file, planets.json.
//
// The import below reads planets.json and parses it - turns its text into a real array. That happens
// when the project is built: the array ends up inside dist/app.js, so the page needs no server.

import planets from "./planets.json" with { type: "json" };

// TypeScript works out the type of the data from the file itself. Writing the type here makes it
// clear, and checks the file really does hold an array of strings.
const PLANETS: string[] = planets;

const list = document.querySelector("#planets");
if (list !== null) {
  for (const planet of PLANETS) {
    const item = document.createElement("li");
    item.textContent = planet;
    list.appendChild(item);
  }
}

const count = document.querySelector("#count");
if (count !== null) {
  count.textContent = `${PLANETS.length} planets, from planets.json`;
}
