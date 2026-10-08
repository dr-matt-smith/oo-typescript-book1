// Shows a bulleted list whose items come from a plain data file, planets.json.
//
// The import below reads planets.json and parses it - turns its text into a real array. That happens
// when the project is built: the array ends up inside dist/app.js, so the page needs no server.

import planets from "./planets.json" with { type: "json" };

// CHALLENGE 5: each planet is now an object with a name and a fact, so the type says so.
const PLANETS: { name: string; fact: string }[] = planets;

const list = document.querySelector("#planets");
if (list !== null) {
  for (const planet of PLANETS) {
    const item = document.createElement("li");
    // CHALLENGE 5: innerHTML, so the <b> tags make the name bold
    item.innerHTML = `<b>${planet.name}</b> - ${planet.fact}`;
    list.appendChild(item);
  }
}

const count = document.querySelector("#count");
if (count !== null) {
  count.textContent = `${PLANETS.length} planets, from planets.json`;
}
