// Tests for src/model/Course.ts. Every test starts from its own makeCourse().

import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";
import { makeCourse, moduleOf } from "./fixtures.ts";

Deno.test("the course makes its own modules and students", () => {
  const course = makeCourse();
  assertEquals(course.getModules().map((m) => m.code), ["MATH", "PROG"]);
  assertEquals(course.getStudents().map((s) => s.name), ["Ann", "Bob", "Cat"]);
});

Deno.test("getModule gives the course's own module object, not a copy", () => {
  const course = makeCourse();
  assertStrictEquals(course.getModule("MATH"), course.getModule("MATH"));
});

Deno.test("getModule gives undefined for an unknown code", () => {
  assertEquals(makeCourse().getModule("ART"), undefined);
});

Deno.test("two modules with the same code are not allowed", () => {
  assertThrows(() => makeCourse().addModule("MATH", "More maths", 5), Error, "already has a module MATH");
});

Deno.test("enrol puts the course's own Student object on the module", () => {
  const course = makeCourse();
  course.enrol("MATH", "S1");
  // The same object on both modules: one Ann, shared - not two copies of her.
  assertStrictEquals(moduleOf(course, "MATH").getStudents()[0], moduleOf(course, "PROG").getStudents()[0]);
});

Deno.test("enrol throws for an unknown module or student", () => {
  const course = makeCourse();
  assertThrows(() => course.enrol("ART", "S1"), Error, "has no module ART");
  assertThrows(() => course.enrol("MATH", "S9"), Error, "has no student S9");
});

Deno.test("studentsNotOn lists the students who could still enrol", () => {
  const course = makeCourse();
  assertEquals(course.studentsNotOn(moduleOf(course, "PROG")).map((s) => s.name), ["Bob", "Cat"]);
});

Deno.test("total credits add up every module", () => {
  assertEquals(makeCourse().totalCredits(), 15);
});

Deno.test("the array from getModules is a copy", () => {
  const course = makeCourse();
  const modules = course.getModules();
  course.addModule("ART", "Art", 5);
  assertEquals(modules.length, 2);
  assertEquals(course.getModules().length, 3);
});

// CHALLENGE 4
Deno.test("modulesFor lists the modules a student is on", () => {
  const course = makeCourse();
  course.enrol("MATH", "S1");
  assertEquals(course.modulesFor("S1").map((m) => m.code), ["MATH", "PROG"]);
});

// CHALLENGE 4
Deno.test("modulesFor gives no modules for a student on none", () => {
  assertEquals(makeCourse().modulesFor("S2"), []);
});

// CHALLENGE 4
Deno.test("modulesFor gives no modules for an id that is not on the course", () => {
  assertEquals(makeCourse().modulesFor("S9"), []);
});

// CHALLENGE 4
Deno.test("modulesFor gives the course's own Module objects", () => {
  const course = makeCourse();
  assertStrictEquals(course.modulesFor("S1")[0], moduleOf(course, "PROG"));
});
