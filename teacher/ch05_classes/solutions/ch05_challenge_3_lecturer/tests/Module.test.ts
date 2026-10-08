// Tests for src/Module.ts: the constructor's default and optional parameters, and toString.

import { assertEquals } from "@std/assert";
import { Module } from "../src/Module.ts";

Deno.test("a module keeps the code, title, credits and semester it was given", () => {
  const module = new Module("COMP1001", "Programming 1", 10, 1);

  assertEquals(module.getCode(), "COMP1001");
  assertEquals(module.getTitle(), "Programming 1");
  assertEquals(module.getCredits(), 10);
  assertEquals(module.getSemester(), 1);
});

Deno.test("a module is worth 5 credits unless you say otherwise", () => {
  const module = new Module("COMP1005", "Databases");

  assertEquals(module.getCredits(), 5);
});

Deno.test("a module with no semester runs all year", () => {
  const module = new Module("COMP1010", "Team Project", 10);

  assertEquals(module.getSemester(), undefined);
  assertEquals(module.isYearLong(), true);
});

Deno.test("a module with a semester is not year-long", () => {
  const module = new Module("COMP1005", "Databases", 5, 2);

  assertEquals(module.isYearLong(), false);
});

Deno.test("a semester 2 module runs in semester 2 but not semester 1", () => {
  const module = new Module("COMP1005", "Databases", 5, 2);

  assertEquals(module.runsIn(2), true);
  assertEquals(module.runsIn(1), false);
});

Deno.test("a year-long module runs in both semesters", () => {
  const module = new Module("COMP1010", "Team Project", 10);

  assertEquals(module.runsIn(1), true);
  assertEquals(module.runsIn(2), true);
});

Deno.test("toString gives the code, title and credits", () => {
  const module = new Module("COMP1001", "Programming 1", 10, 1);

  assertEquals(`${module}`, "COMP1001 Programming 1 (10 credits)");
});

// CHALLENGE 3
Deno.test("toString names the lecturer when there is one", () => {
  const module = new Module("COMP1005", "Databases", 5, 2, "Dr Byrne");

  assertEquals(`${module}`, "COMP1005 Databases (5 credits) - taught by Dr Byrne");
});

// CHALLENGE 3
Deno.test("toString says nothing about a lecturer when there is none", () => {
  const module = new Module("COMP1005", "Databases", 5, 2);

  assertEquals(`${module}`, "COMP1005 Databases (5 credits)");
});

// CHALLENGE 3
Deno.test("a year-long module can have a lecturer", () => {
  const module = new Module("COMP1010", "Team Project", 10, undefined, "Dr Okafor");

  assertEquals(module.isYearLong(), true);
  assertEquals(`${module}`, "COMP1010 Team Project (10 credits) - taught by Dr Okafor");
});
