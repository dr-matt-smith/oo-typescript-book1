// Tests for src/Student.ts: what the constructor stores, its default and optional parameters,
// and toString.

import { assertEquals } from "@std/assert";
import { Student } from "../src/Student.ts";

Deno.test("a new student has the full name it was given", () => {
  const student = new Student(101, "Ada", "Lovelace", "Computing");

  assertEquals(student.getFullName(), "Ada Lovelace");
});

Deno.test("a new student keeps the id and course it was given", () => {
  const student = new Student(101, "Ada", "Lovelace", "Computing");

  assertEquals(student.getId(), 101);
  assertEquals(student.getCourse(), "Computing");
});

Deno.test("a student with no course given is Undecided", () => {
  const student = new Student(102, "Alan", "Turing");

  assertEquals(student.getCourse(), "Undecided");
});

Deno.test("passing undefined for the course also gives the default", () => {
  const student = new Student(105, "Margaret", "Hamilton", undefined, "Maggie");

  assertEquals(student.getCourse(), "Undecided");
});

Deno.test("a student with a nickname is greeted by it", () => {
  const student = new Student(101, "Ada", "Lovelace", "Computing", "Countess");

  assertEquals(student.getGreetingName(), "Countess");
});

Deno.test("a student with no nickname is greeted by their first name", () => {
  const student = new Student(102, "Alan", "Turing", "Mathematics");

  assertEquals(student.getGreetingName(), "Alan");
});

Deno.test("toString gives the id, full name and course", () => {
  const student = new Student(101, "Ada", "Lovelace", "Computing");

  assertEquals(student.toString(), "(Student) 101 Ada Lovelace, Computing");
});

Deno.test("a template literal uses toString", () => {
  const student = new Student(102, "Alan", "Turing");

  assertEquals(`${student}`, "(Student) 102 Alan Turing, Undecided");
});

// CHALLENGE 1
Deno.test("initials are the first letters of the first name and surname", () => {
  const student = new Student(101, "Ada", "Lovelace", "Computing");

  assertEquals(student.getInitials(), "AL");
});

// CHALLENGE 1
Deno.test("a hyphenated surname still gives one initial for the surname", () => {
  const student = new Student(104, "Tim", "Berners-Lee", "Physics");

  assertEquals(student.getInitials(), "TB");
});
