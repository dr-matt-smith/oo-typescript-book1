// CHALLENGE 2: tests for Technician, written before src/Technician.ts.

import { assert, assertEquals, assertThrows } from "@std/assert";
import { Person } from "../src/Person.ts";
import { Technician } from "../src/Technician.ts";

const makeTechnician = (): Technician => new Technician("Sam", "sam@college.ie", "C12");

Deno.test("a technician's role is Technician", () => {
  assertEquals(makeTechnician().getRole(), "Technician");
});

Deno.test("a technician keeps their lab", () => {
  assertEquals(makeTechnician().getLab(), "C12");
});

Deno.test("a technician's toString adds to Person's", () => {
  assertEquals(`${makeTechnician()}`, "Sam <sam@college.ie>, technician, lab C12");
});

Deno.test("a technician's email is checked by Person", () => {
  assertThrows(() => new Technician("Sam", "sam", "C12"), Error, "Not an email address");
});

Deno.test("a technician is a Person", () => {
  assert(makeTechnician() instanceof Person);
});
