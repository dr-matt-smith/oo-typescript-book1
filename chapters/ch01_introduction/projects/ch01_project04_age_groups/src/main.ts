// Shows the age group of some example ages, in a table. The deciding is done by ageGroup().

import { ageGroup } from "./age_group.ts";

const EXAMPLE_AGES: number[] = [5, 12, 13, 19, 20, 64, 150, -1, 200];

const rows = document.querySelector("#rows");
if (rows !== null) {
  for (const age of EXAMPLE_AGES) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${age}</td><td>${ageGroup(age)}</td>`;
    rows.appendChild(row);
  }
}
