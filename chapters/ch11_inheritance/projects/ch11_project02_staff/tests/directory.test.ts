// Tests for src/directory.ts, with a small made-up directory.

import { assertEquals } from "@std/assert";
import { byName, type DirectoryData, peopleFrom, withRole } from "../src/directory.ts";

const DATA: DirectoryData = {
  students: [
    { name: "Cara", email: "cara@s.ie", studentId: "S1", course: "Computing" },
    { name: "Adam", email: "adam@s.ie", studentId: "S2", course: "Games" },
  ],
  lecturers: [{ name: "Bea", email: "bea@c.ie", department: "Maths", office: "B1" }],
};

Deno.test("peopleFrom makes one object for every entry", () => {
  assertEquals(peopleFrom(DATA).length, 3);
});

Deno.test("peopleFrom makes students and lecturers", () => {
  assertEquals(peopleFrom(DATA).map((p) => p.getRole()), ["Student", "Student", "Lecturer"]);
});

Deno.test("withRole keeps only the people with that role", () => {
  assertEquals(withRole(peopleFrom(DATA), "Lecturer").map((p) => p.getName()), ["Bea"]);
});

Deno.test("withRole gives an empty list when nobody has the role", () => {
  assertEquals(withRole(peopleFrom(DATA), "Visitor"), []);
});

Deno.test("byName sorts students and lecturers together", () => {
  assertEquals(byName(peopleFrom(DATA)).map((p) => p.getName()), ["Adam", "Bea", "Cara"]);
});
