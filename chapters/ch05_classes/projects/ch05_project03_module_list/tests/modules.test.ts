// Tests for src/modules.ts, with a small made-up course.

import { assertEquals } from "@std/assert";
import { type ModuleData, modulesFrom, modulesIn, totalCredits } from "../src/modules.ts";

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
