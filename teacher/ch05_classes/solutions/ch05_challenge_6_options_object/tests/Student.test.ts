// Tests for src/Student.ts: what the constructor stores, its defaults and optional values,
// and toString.
// CHALLENGE 6: every student is made from one object, so each value is named in the test.

import { assertEquals } from "@std/assert";
import { Student } from "../src/Student.ts";

Deno.test("a new student has the full name it was given", () => {
  const student = new Student({ id: 101, firstName: "Ada", surname: "Lovelace", course: "Computing" });

  assertEquals(student.getFullName(), "Ada Lovelace");
});

Deno.test("a new student keeps the id and course it was given", () => {
  const student = new Student({ id: 101, firstName: "Ada", surname: "Lovelace", course: "Computing" });

  assertEquals(student.getId(), 101);
  assertEquals(student.getCourse(), "Computing");
});

Deno.test("a student with no course given is Undecided", () => {
  const student = new Student({ id: 102, firstName: "Alan", surname: "Turing" });

  assertEquals(student.getCourse(), "Undecided");
});

// CHALLENGE 6: this test needed an awkward undefined before; now the course is simply left out
Deno.test("a nickname can be given without a course", () => {
  const student = new Student({ id: 105, firstName: "Margaret", surname: "Hamilton", nickname: "Maggie" });

  assertEquals(student.getCourse(), "Undecided");
  assertEquals(student.getGreetingName(), "Maggie");
});

Deno.test("a student with no nickname is greeted by their first name", () => {
  const student = new Student({ id: 102, firstName: "Alan", surname: "Turing", course: "Mathematics" });

  assertEquals(student.getGreetingName(), "Alan");
});

// CHALLENGE 6
Deno.test("a student is in year 1 unless you say otherwise", () => {
  const student = new Student({ id: 102, firstName: "Alan", surname: "Turing" });

  assertEquals(student.getYear(), 1);
});

// CHALLENGE 6
Deno.test("a year can be given without giving anything else optional", () => {
  const student = new Student({ id: 105, firstName: "Margaret", surname: "Hamilton", year: 2 });

  assertEquals(student.getYear(), 2);
  assertEquals(student.getCourse(), "Undecided");
});

// CHALLENGE 6
Deno.test("an email address is kept if given, and undefined if not", () => {
  const withEmail = new Student({ id: 1, firstName: "Ada", surname: "Lovelace", email: "ada@example.ie" });
  const without = new Student({ id: 2, firstName: "Alan", surname: "Turing" });

  assertEquals(withEmail.getEmail(), "ada@example.ie");
  assertEquals(without.getEmail(), undefined);
});

Deno.test("toString gives the id, full name, course and year", () => {
  const student = new Student({ id: 101, firstName: "Ada", surname: "Lovelace", course: "Computing", year: 2 });

  assertEquals(student.toString(), "(Student) 101 Ada Lovelace, Computing, year 2");
});

Deno.test("a template literal uses toString", () => {
  const student = new Student({ id: 102, firstName: "Alan", surname: "Turing" });

  assertEquals(`${student}`, "(Student) 102 Alan Turing, Undecided, year 1");
});
