// CHALLENGE 6
// Tests for Course.toData and restoring with buildCourse.

import { assertEquals, assertNotStrictEquals } from "@std/assert";
import data from "../src/data/course.json" with { type: "json" };
import { buildCourse } from "../src/data/build_course.ts";
import { makeCourse, moduleOf } from "./fixtures.ts";

Deno.test("toData gives back the data the course was built from", () => {
  assertEquals(buildCourse(data).toData(), data);
});

Deno.test("a course rebuilt from toData has equal data", () => {
  const course = makeCourse();
  assertEquals(buildCourse(course.toData()).toData(), course.toData());
});

Deno.test("changing the course after toData does not change the saved data", () => {
  const course = makeCourse();
  const saved = course.toData();
  course.enrol("MATH", "S2");
  moduleOf(course, "PROG").withdraw("S1");
  assertEquals(saved.modules[0].studentIds, []);
  assertEquals(saved.modules[1].studentIds, ["S1"]);
});

Deno.test("a restored course has new Module and Student objects", () => {
  const course = makeCourse();
  const restored = buildCourse(course.toData());
  assertNotStrictEquals(moduleOf(restored, "PROG"), moduleOf(course, "PROG"));
  assertNotStrictEquals(restored.getStudent("S1"), course.getStudent("S1"));
});
