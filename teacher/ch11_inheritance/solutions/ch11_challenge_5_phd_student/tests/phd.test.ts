// CHALLENGE 5: tests for PhdStudent, written before src/PhdStudent.ts.

import { assert, assertEquals, assertThrows } from "@std/assert";
import { Person } from "../src/Person.ts";
import { PhdStudent } from "../src/PhdStudent.ts";
import { Student } from "../src/Student.ts";

const makePhd = (): PhdStudent => new PhdStudent("Lee", "lee@college.ie", "S9", "Computing", "Databases");

Deno.test("a PhD student's toString builds on Student's", () => {
  assertEquals(`${makePhd()}`, "Lee <lee@college.ie>, student S9, Computing, teaches Databases");
});

Deno.test("a PhD student keeps what Student and Person store", () => {
  const lee = makePhd();
  assertEquals(lee.getName(), "Lee");
  assertEquals(lee.getStudentId(), "S9");
  assertEquals(lee.getModule(), "Databases");
});

Deno.test("a PhD student's role is inherited from Student", () => {
  assertEquals(makePhd().getRole(), "Student");
});

Deno.test("a PhD student is a Student and a Person, and the email is still checked", () => {
  assert(makePhd() instanceof Student);
  assert(makePhd() instanceof Person);
  assertThrows(() => new PhdStudent("Lee", "lee", "S9", "Computing", "Databases"), Error, "Not an email address");
});
