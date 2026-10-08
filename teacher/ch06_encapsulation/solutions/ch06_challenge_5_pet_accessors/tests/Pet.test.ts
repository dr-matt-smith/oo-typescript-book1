// Tests for src/Pet.ts. CHALLENGE 5: rewritten for accessors - pet.age instead of pet.age, and
// assignments (inside braces) instead of setX() calls.
// They use only the pet's public methods - exactly what main.ts can use.
// The private fields are never touched: if the inside of Pet changes, these tests should not need to.

import { assertEquals, assertThrows } from "@std/assert";
import { Pet } from "../src/Pet.ts";

// --- making a pet ---

Deno.test("a new pet keeps its name, species and age", () => {
  const pet = new Pet("Rex", "dog", 3);

  assertEquals(pet.name, "Rex");
  assertEquals(pet.species, "dog");
  assertEquals(pet.age, 3);
});

Deno.test("a pet is 5 years old if no age is given", () => {
  const pet = new Pet("Tom", "cat");

  assertEquals(pet.age, 5);
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

  pet.name = "Max";

  assertEquals(pet.name, "Max");
});

Deno.test("renaming to a blank name is refused, and the old name is kept", () => {
  const pet = new Pet("Rex", "dog");

  assertThrows(() => {
    pet.name = "";
  }, Error, "A pet needs a name");
  assertEquals(pet.name, "Rex");
});

// --- ages ---

Deno.test("the age can be set to 0, a newborn pet", () => {
  const pet = new Pet("Rex", "dog");

  pet.age = 0;

  assertEquals(pet.age, 0);
});

Deno.test("setting the age refuses a negative age", () => {
  const pet = new Pet("Rex", "dog", 3);

  assertThrows(() => {
    pet.age = -1;
  }, Error, "Age must be a whole number");
  assertEquals(pet.age, 3);
});

Deno.test("setting the age refuses an age that is not a whole number", () => {
  const pet = new Pet("Rex", "dog", 3);

  assertThrows(() => {
    pet.age = 2.5;
  }, Error, "Age must be a whole number");
});

Deno.test("a birthday adds one year", () => {
  const pet = new Pet("Rex", "dog", 3);

  pet.haveBirthday();

  assertEquals(pet.age, 4);
});

// --- hunger: a read-only boolean property ---

Deno.test("a new pet is not hungry", () => {
  assertEquals(new Pet("Rex", "dog").hungry, false);
});

Deno.test("playing makes a pet hungry, and feeding it fixes that", () => {
  const pet = new Pet("Rex", "dog");

  pet.play();
  assertEquals(pet.hungry, true);

  pet.feed();
  assertEquals(pet.hungry, false);
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
