// Tests for src/modules.ts, with a small made-up course.

import { assertEquals } from "@std/assert";
import { creditCheck, type ModuleData, modulesFrom, modulesIn, totalCredits } from "../src/modules.ts"; // CHALLENGE 4
import { Module } from "../src/Module.ts"; // CHALLENGE 4

const DATA: ModuleData[] = [
  { code: "A1", title: "Alpha", credits: 10, semester: 1 },
  { code: "B2", title: "Beta", semester: 2 },
  { code: "Y0", title: "All Year" },
];

/** The codes of some modules - short to compare in a test. */
const codesOf = (data: ModuleData[], semester: number): string[] =>
  modulesIn(modulesFrom(data), semester).map((module) => module.getCode());

Deno.test("modules made from data have the defaults filled in", () => {
  const modules = modulesFrom(DATA);

  assertEquals(modules.map((module) => module.getCredits()), [10, 5, 5]);
});

Deno.test("semester 1 has its own modules and the year-long ones", () => {
  assertEquals(codesOf(DATA, 1), ["A1", "Y0"]);
});

Deno.test("semester 2 has its own modules and the year-long ones", () => {
  assertEquals(codesOf(DATA, 2), ["B2", "Y0"]);
});

Deno.test("the total credits of the made-up course", () => {
  assertEquals(totalCredits(modulesFrom(DATA)), 20);
});

Deno.test("no modules are worth no credits", () => {
  assertEquals(totalCredits([]), 0);
});

Deno.test("toString makes joining a list of modules easy", () => {
  const modules = modulesFrom(DATA).slice(0, 2);

  assertEquals(modules.join("; "), "A1 Alpha (10 credits); B2 Beta (5 credits)");
});

// CHALLENGE 4: a helper that makes a list of 5-credit modules, to reach any total easily
const fiveCreditModules = (count: number): Module[] => {
  const modules: Module[] = [];
  for (let i = 1; i <= count; i++) {
    modules.push(new Module(`M${i}`, `Module ${i}`));
  }
  return modules;
};

// CHALLENGE 4
Deno.test("60 credits is a complete year", () => {
  assertEquals(creditCheck(fiveCreditModules(12)), "60 credits - complete");
});

// CHALLENGE 4
Deno.test("55 credits is 5 short", () => {
  assertEquals(creditCheck(fiveCreditModules(11)), "55 credits - 5 short");
});

// CHALLENGE 4
Deno.test("65 credits is 5 over", () => {
  assertEquals(creditCheck(fiveCreditModules(13)), "65 credits - 5 over");
});

// CHALLENGE 4
Deno.test("a part-time year has a target of its own", () => {
  assertEquals(creditCheck(fiveCreditModules(6), 30), "30 credits - complete");
  assertEquals(creditCheck(fiveCreditModules(4), 30), "20 credits - 10 short");
});

// CHALLENGE 4
Deno.test("no modules at all are a whole year short", () => {
  assertEquals(creditCheck([]), "0 credits - 60 short");
});
