// Tests for Person, Student and Lecturer.

import { assert, assertEquals, assertThrows } from "@std/assert";
import { Lecturer } from "../src/Lecturer.ts";
import { Person } from "../src/Person.ts";
import { Student } from "../src/Student.ts";

const makeStudent = (): Student => new Student("Ann", "ann@college.ie", "S1", "Computing");
const makeLecturer = (): Lecturer => new Lecturer("Bob", "bob@college.ie", "Maths", "B105");

Deno.test("a visitor is just a Person", () => {
  const visitor = new Person("Val", "val@example.com");
  assertEquals(visitor.getRole(), "Visitor");
  assertEquals(`${visitor}`, "Val <val@example.com>");
});

Deno.test("a student passes name and email on to Person's constructor", () => {
  const ann = makeStudent();
  assertEquals(ann.getName(), "Ann");
  assertEquals(ann.getEmail(), "ann@college.ie");
});

Deno.test("a student keeps their own id and course", () => {
  assertEquals(makeStudent().getStudentId(), "S1");
  assertEquals(makeStudent().getCourse(), "Computing");
});

Deno.test("a student's toString adds to Person's", () => {
  assertEquals(`${makeStudent()}`, "Ann <ann@college.ie>, student S1, Computing");
});

Deno.test("a lecturer's toString adds to Person's", () => {
  assertEquals(`${makeLecturer()}`, "Bob <bob@college.ie>, lecturer in Maths, room B105");
});

Deno.test("each kind of person says what role it has", () => {
  assertEquals(makeStudent().getRole(), "Student");
  assertEquals(makeLecturer().getRole(), "Lecturer");
});

Deno.test("a lecturer signs with their name and department", () => {
  assertEquals(makeLecturer().signature(), "Bob, Department of Maths");
});

Deno.test("Person's email check protects every subclass too", () => {
  assertThrows(() => new Person("Val", "nope"), Error, "Not an email address: nope");
  assertThrows(() => new Student("Ann", "ann.college.ie", "S1", "Computing"), Error, "Not an email address");
  assertThrows(() => new Lecturer("Bob", "bob", "Maths", "B105"), Error, "Not an email address");
});

Deno.test("students and lecturers are both Persons", () => {
  assert(makeStudent() instanceof Person);
  assert(makeLecturer() instanceof Person);
});
