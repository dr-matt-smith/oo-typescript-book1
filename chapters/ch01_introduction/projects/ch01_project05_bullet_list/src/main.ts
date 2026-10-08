// Shows an array of strings as a bulleted list: one <li> element for each string.

// An array of strings. The type string[] means "array of string" - like Java's String[], but it
// can grow and shrink, like an ArrayList.
const PLANETS: string[] = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const list = document.querySelector("#planets");
if (list !== null) {
  // for ... of goes through the array's values in order - Java's for (String planet : planets)
  for (const planet of PLANETS) {
    const item = document.createElement("li");
    item.textContent = planet;
    list.appendChild(item);
  }
}

const count = document.querySelector("#count");
if (count !== null) {
  count.textContent = `${PLANETS.length} planets`;
}
