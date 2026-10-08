// CHALLENGE 5
// Tests for src/report/csv.ts, imported through the report folder's index.ts.

import { assertEquals } from "@std/assert";
import { Course } from "../src/model/index.ts";
import { courseToCsv } from "../src/report/index.ts";
import { makeCourse } from "./fixtures.ts";

Deno.test("the CSV starts with a header line", () => {
  assertEquals(courseToCsv(new Course("Empty")), "module,id,name");
});

Deno.test("the CSV has one line per enrolment, module by module", () => {
  const course = makeCourse();
  course.enrol("MATH", "S2");
  course.enrol("MATH", "S3");
  assertEquals(courseToCsv(course), "module,id,name\nMATH,S2,Bob\nMATH,S3,Cat\nPROG,S1,Ann");
});
