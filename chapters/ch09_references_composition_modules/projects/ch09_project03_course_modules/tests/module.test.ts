// Tests for src/model/Module.ts - a module on its own, with students made just for the test.

import { assertEquals, assertThrows } from "@std/assert";
import { Module, Student } from "../src/model/index.ts";

const ANN = new Student("S1", "Ann");
const BOB = new Student("S2", "Bob");

Deno.test("a new module has no students", () => {
  assertEquals(new Module("MATH", "Maths", 5).count(), 0);
});

Deno.test("enrolled students are kept in the order they enrolled", () => {
  const module = new Module("MATH", "Maths", 5);
  module.enrol(BOB);
  module.enrol(ANN);
  assertEquals(module.getStudents().map((s) => s.name), ["Bob", "Ann"]);
});

Deno.test("enrolling the same student twice throws", () => {
  const module = new Module("MATH", "Maths", 5);
  module.enrol(ANN);
  assertThrows(() => module.enrol(ANN), Error, "Ann is already enrolled on MATH");
});

Deno.test("a different object for the same student id counts as the same student", () => {
  const module = new Module("MATH", "Maths", 5);
  module.enrol(ANN);
  assertEquals(module.isEnrolled(new Student("S1", "Ann")), true);
});

Deno.test("withdraw removes the student with that id", () => {
  const module = new Module("MATH", "Maths", 5);
  module.enrol(ANN);
  module.enrol(BOB);
  module.withdraw("S1");
  assertEquals(module.getStudents().map((s) => s.name), ["Bob"]);
});

Deno.test("withdrawing a student who is not enrolled changes nothing", () => {
  const module = new Module("MATH", "Maths", 5);
  module.enrol(ANN);
  module.withdraw("S9");
  assertEquals(module.count(), 1);
});

Deno.test("a module describes itself with toString", () => {
  assertEquals(`${new Module("MATH", "Maths", 5)}`, "MATH Maths (5 credits)");
});
