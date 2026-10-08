// Tests for src/data/build_course.ts and src/report.ts, using the real course.json.

import { assertEquals, assertStrictEquals } from "@std/assert";
import data from "../src/data/course.json" with { type: "json" };
import { buildCourse } from "../src/data/build_course.ts";
import { courseSummary, moduleSummary, studentModules } from "../src/report.ts";
import { makeCourse, moduleOf } from "./fixtures.ts";

Deno.test("the course from course.json has 4 modules and 7 students", () => {
  assertEquals(courseSummary(buildCourse(data)), "BSc in Computing, Year 2 · 4 modules · 25 credits · 7 students");
});

Deno.test("a student on two modules is one shared object", () => {
  const course = buildCourse(data);
  const onOop = moduleOf(course, "OOP2").getStudents()[0];
  const onWeb = moduleOf(course, "WEB2").getStudents()[0];
  assertEquals(onOop.name, "Aoife Byrne");
  assertStrictEquals(onOop, onWeb);
});

Deno.test("building twice gives two separate courses", () => {
  const first = buildCourse(data);
  const second = buildCourse(data);
  moduleOf(first, "OOP2").withdraw("C001");
  assertEquals(moduleOf(second, "OOP2").count(), 4);
});

Deno.test("moduleSummary says how many students, with the right word", () => {
  const course = makeCourse();
  assertEquals(moduleSummary(moduleOf(course, "PROG")), "PROG Programming (10 credits) · 1 student");
  assertEquals(moduleSummary(moduleOf(course, "MATH")), "MATH Maths (5 credits) · 0 students");
});

// CHALLENGE 4
Deno.test("studentModules lists the codes, or says there are none", () => {
  const course = buildCourse(data);
  assertEquals(studentModules("Aoife Byrne", course.modulesFor("C001")), "Aoife Byrne is on: OOP2, WEB2");
  assertEquals(studentModules("Nobody", []), "Nobody is not on any module");
});
