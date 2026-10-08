// CHALLENGE 3: tests for legs, written before Animal had a legs parameter.
// The tests in animals.test.ts did not need to change: `new Cat("Tom")` still works.

import { assertEquals } from "@std/assert";
import { Bird } from "../src/Bird.ts";
import { Cat } from "../src/Cat.ts";
import { Dog } from "../src/Dog.ts";

Deno.test("a cat has four legs", () => {
  assertEquals(new Cat("Tom").getLegs(), 4);
});

Deno.test("a dog has four legs", () => {
  assertEquals(new Dog("Rex").getLegs(), 4);
});

Deno.test("a bird has two legs", () => {
  assertEquals(new Bird("Tweety").getLegs(), 2);
});

Deno.test("a bird says Tweet, and still uses Animal's speak", () => {
  assertEquals(new Bird("Tweety").speak(), "Tweety says Tweet");
});

Deno.test("a bird's toString says it is a bird", () => {
  assertEquals(`${new Bird("Tweety")}`, "Tweety, a bird");
});
