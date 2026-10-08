// Tests for src/students.ts: plain data in, Student objects out.
// CHALLENGE 6: the expected toString texts now end with the year.

import { assertEquals } from "@std/assert";
import { type StudentData } from "../src/Student.ts"; // CHALLENGE 6: StudentData moved
import { studentsFrom } from "../src/students.ts";

const DATA: StudentData[] = [
  { id: 1, firstName: "Ada", surname: "Lovelace", course: "Computing", nickname: "Countess" },
  { id: 2, firstName: "Alan", surname: "Turing", year: 3 }, // CHALLENGE 6
];

// CHALLENGE 6
Deno.test("a year in the data reaches the student", () => {
  assertEquals(studentsFrom(DATA)[1].getYear(), 3);
});

Deno.test("one Student for each piece of data, in the same order", () => {
  const students = studentsFrom(DATA);

  assertEquals(students.map((s) => s.getFullName()), ["Ada Lovelace", "Alan Turing"]);
});

Deno.test("data with no course makes an Undecided student", () => {
  const students = studentsFrom(DATA);

  assertEquals(students[1].getCourse(), "Undecided");
});

Deno.test("the objects made have the class's methods - plain data does not", () => {
  const students = studentsFrom(DATA);

  assertEquals(students[0].toString(), "(Student) 1 Ada Lovelace, Computing, year 1");
  assertEquals(`${DATA[0]}`, "[object Object]");
});

Deno.test("data parsed from JSON text works too", () => {
  const data: StudentData[] = JSON.parse('[{ "id": 7, "firstName": "Grace", "surname": "Hopper" }]');

  assertEquals(studentsFrom(data)[0].toString(), "(Student) 7 Grace Hopper, Undecided, year 1");
});

Deno.test("no data gives no students", () => {
  assertEquals(studentsFrom([]), []);
});
