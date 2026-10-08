// Tests for src/Pet.ts. They use only the pet's public methods - exactly what main.ts can use.
// The private fields are never touched: if the inside of Pet changes, these tests should not need to.

import { assertEquals, assertThrows } from "@std/assert";
import { Pet } from "../src/Pet.ts";

// --- making a pet ---

Deno.test("a new pet keeps its name, species and age", () => {
  const pet = new Pet("Rex", "dog", 3);

  assertEquals(pet.getName(), "Rex");
  assertEquals(pet.getSpecies(), "dog");
  assertEquals(pet.getAge(), 3);
});

Deno.test("a pet is 5 years old if no age is given", () => {
  const pet = new Pet("Tom", "cat");

  assertEquals(pet.getAge(), 5);
});

Deno.test("a pet cannot be made with a blank name", () => {
  assertThrows(() => new Pet("  ", "dog"), Error, "A pet needs a name");
});

Deno.test("a pet cannot be made with a negative age", () => {
  assertThrows(() => new Pet("Rex", "dog", -1), Error, "Age must be");
});

// --- names ---

Deno.test("a pet can be renamed", () => {
  const pet = new Pet("Rex", "dog");

  pet.setName("Max");

  assertEquals(pet.getName(), "Max");
});

Deno.test("renaming to a blank name is refused, and the old name is kept", () => {
  const pet = new Pet("Rex", "dog");

  assertThrows(() => pet.setName(""), Error, "A pet needs a name");
  assertEquals(pet.getName(), "Rex");
});

// --- ages ---

Deno.test("setAge accepts 0, a newborn pet", () => {
  const pet = new Pet("Rex", "dog");

  pet.setAge(0);

  assertEquals(pet.getAge(), 0);
});

Deno.test("setAge refuses a negative age", () => {
  const pet = new Pet("Rex", "dog", 3);

  assertThrows(() => pet.setAge(-1), Error, "Age must be a whole number");
  assertEquals(pet.getAge(), 3);
});

Deno.test("setAge refuses an age that is not a whole number", () => {
  const pet = new Pet("Rex", "dog", 3);

  assertThrows(() => pet.setAge(2.5), Error, "Age must be a whole number");
});

Deno.test("a birthday adds one year", () => {
  const pet = new Pet("Rex", "dog", 3);

  pet.haveBirthday();

  assertEquals(pet.getAge(), 4);
});

// --- hunger: a boolean, so its getter is called isHungry ---

Deno.test("a new pet is not hungry", () => {
  assertEquals(new Pet("Rex", "dog").isHungry(), false);
});

Deno.test("playing makes a pet hungry, and feeding it fixes that", () => {
  const pet = new Pet("Rex", "dog");

  pet.play();
  assertEquals(pet.isHungry(), true);

  pet.feed();
  assertEquals(pet.isHungry(), false);
});

// --- toString ---

Deno.test("toString describes the pet", () => {
  const pet = new Pet("Rex", "dog", 3);

  assertEquals(pet.toString(), "(PET) Rex is a dog, and is 3 years old.");
});

Deno.test("toString says 'year', not 'years', for a one-year-old", () => {
  const pet = new Pet("Tom", "cat", 1);

  assertEquals(pet.toString(), "(PET) Tom is a cat, and is 1 year old.");
});

// CHALLENGE 1: tidy names

Deno.test("spaces at either end of a name are removed", () => {
  const pet = new Pet("Rex", "dog");

  pet.setName("  Max  ");

  assertEquals(pet.getName(), "Max");
});

Deno.test("the constructor tidies the name too", () => {
  assertEquals(new Pet(" Tom ", "cat").getName(), "Tom");
});

Deno.test("a name of exactly 20 characters is allowed", () => {
  const pet = new Pet("Rex", "dog");
  const twenty = "a".repeat(20);

  pet.setName(twenty);

  assertEquals(pet.getName(), twenty);
});

Deno.test("a name of 21 characters is refused, and the old name kept", () => {
  const pet = new Pet("Rex", "dog");

  assertThrows(() => pet.setName("a".repeat(21)), Error, "A name can have at most 20 characters");
  assertEquals(pet.getName(), "Rex");
});

Deno.test("spaces do not count towards the 20 characters", () => {
  const pet = new Pet("Rex", "dog");

  pet.setName(`  ${"a".repeat(20)}  `);

  assertEquals(pet.getName().length, 20);
});

Deno.test("the constructor refuses a name that is too long", () => {
  assertThrows(() => new Pet("a".repeat(21), "dog"), Error, "at most 20");
});
