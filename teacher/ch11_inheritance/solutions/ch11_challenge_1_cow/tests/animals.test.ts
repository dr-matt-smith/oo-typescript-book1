// Tests for Animal, Cat and Dog. Animal is abstract, so the tests make cats and dogs.

import { assert, assertEquals } from "@std/assert";
import { Animal } from "../src/Animal.ts";
import { Cat } from "../src/Cat.ts";
import { Dog } from "../src/Dog.ts";
import { chorus } from "../src/farm.ts";

Deno.test("a cat says Meow", () => {
  assertEquals(new Cat("Tom").getSound(), "Meow");
});

Deno.test("a dog says Woof", () => {
  assertEquals(new Dog("Rex").getSound(), "Woof");
});

Deno.test("a cat uses Animal's constructor and getName", () => {
  assertEquals(new Cat("Tom").getName(), "Tom");
});

Deno.test("speak, written once in Animal, uses the subclass's sound", () => {
  assertEquals(new Cat("Tom").speak(), "Tom says Meow");
  assertEquals(new Dog("Rex").speak(), "Rex says Woof");
});

Deno.test("toString says what kind of animal it is", () => {
  assertEquals(`${new Cat("Tom")}`, "Tom, a cat");
  assertEquals(`${new Dog("Rex")}`, "Rex, a dog");
});

Deno.test("a dog can wag its tail", () => {
  assertEquals(new Dog("Rex").wagTail(), "Rex wags their tail");
});

Deno.test("a cat is an Animal, and instanceof can tell", () => {
  const tom = new Cat("Tom");
  assert(tom instanceof Cat);
  assert(tom instanceof Animal);
  assertEquals(tom instanceof Dog, false);
});

Deno.test("cats and dogs share an Animal[] array, and each uses its own sound", () => {
  const animals: Animal[] = [new Cat("Tom"), new Dog("Rex")];
  assertEquals(chorus(animals), ["Tom says Meow", "Rex says Woof"]);
});

Deno.test("no animals, no chorus", () => {
  assertEquals(chorus([]), []);
});
