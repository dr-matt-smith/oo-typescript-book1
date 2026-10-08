// Tests for src/marks.ts. A small, made-up class keeps the expected answers easy to work out.

import { assertEquals } from "@std/assert";
import {
  average,
  byMark,
  byName,
  findStudent,
  gradeFor,
  marksOf,
  passed,
  searchByName,
  type Student,
  topStudent,
} from "../src/marks.ts";

const CLASS: Student[] = [
  { name: "Cara", mark: 55 },
  { name: "Adam", mark: 72 },
  { name: "Bea", mark: 30 },
];

Deno.test("grades at the edges of each band", () => {
  assertEquals(gradeFor(70), "A");
  assertEquals(gradeFor(69), "B");
  assertEquals(gradeFor(60), "B");
  assertEquals(gradeFor(59), "C");
  assertEquals(gradeFor(50), "C");
  assertEquals(gradeFor(40), "D");
  assertEquals(gradeFor(39), "F");
});

Deno.test("map: just the marks, in the same order", () => {
  assertEquals(marksOf(CLASS), [55, 72, 30]);
});

Deno.test("filter: only the students who passed", () => {
  assertEquals(passed(CLASS).map((s) => s.name), ["Cara", "Adam"]);
});

Deno.test("reduce: the average of some marks", () => {
  assertEquals(average([50, 60, 70]), 60);
});

Deno.test("the average of no marks is 0, not NaN", () => {
  assertEquals(average([]), 0);
});

Deno.test("find: a student by name", () => {
  assertEquals(findStudent(CLASS, "Bea"), { name: "Bea", mark: 30 });
});

Deno.test("find: undefined when there is no such student", () => {
  assertEquals(findStudent(CLASS, "Zed"), undefined);
});

Deno.test("sorted by mark, highest first", () => {
  assertEquals(byMark(CLASS).map((s) => s.name), ["Adam", "Cara", "Bea"]);
});

Deno.test("sorted by name", () => {
  assertEquals(byName(CLASS).map((s) => s.name), ["Adam", "Bea", "Cara"]);
});

Deno.test("sorting leaves the original array as it was", () => {
  byMark(CLASS);
  assertEquals(CLASS[0].name, "Cara");
});

Deno.test("the top student", () => {
  assertEquals(topStudent(CLASS)?.name, "Adam");
});

Deno.test("no top student in an empty class", () => {
  assertEquals(topStudent([]), undefined);
});

// CHALLENGE 6

Deno.test("search finds names containing the text", () => {
  assertEquals(searchByName(CLASS, "ea").map((s) => s.name), ["Bea"]);
});

Deno.test("search ignores upper and lower case", () => {
  assertEquals(searchByName(CLASS, "ADA").map((s) => s.name), ["Adam"]);
});

Deno.test("an empty search matches everybody", () => {
  assertEquals(searchByName(CLASS, "").length, 3);
});

Deno.test("a search that matches nobody", () => {
  assertEquals(searchByName(CLASS, "zz"), []);
});
