// CHALLENGE 1: tests for Cow, written before src/Cow.ts.

import { assert, assertEquals } from "@std/assert";
import { Animal } from "../src/Animal.ts";
import { Cat } from "../src/Cat.ts";
import { Cow } from "../src/Cow.ts";
import { chorus } from "../src/farm.ts";

Deno.test("a cow says Moo", () => {
  assertEquals(new Cow("Daisy").getSound(), "Moo");
});

Deno.test("a cow speaks with Animal's speak", () => {
  assertEquals(new Cow("Daisy").speak(), "Daisy says Moo");
});

Deno.test("toString says it is a cow", () => {
  assertEquals(`${new Cow("Daisy")}`, "Daisy, a cow");
});

Deno.test("a cow is an Animal", () => {
  assert(new Cow("Daisy") instanceof Animal);
});

Deno.test("a cow joins the chorus", () => {
  assertEquals(chorus([new Cat("Tom"), new Cow("Daisy")]), ["Tom says Meow", "Daisy says Moo"]);
});
