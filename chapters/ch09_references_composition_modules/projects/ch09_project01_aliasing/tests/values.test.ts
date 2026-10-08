// Not tests of the project's code, but of the language itself: small, runnable facts about values
// and references. If one of these surprised you, change it and watch it fail.

import { assertEquals, assertStrictEquals } from "@std/assert";

Deno.test("numbers are copied: changing b leaves a alone", () => {
  const a = 10;
  let b = a;
  b += 1;
  assertEquals(a, 10);
  assertEquals(b, 11);
});

Deno.test("strings are copied too (and can never be changed anyway)", () => {
  const a = "milk";
  let b = a;
  b += "shake";
  assertEquals(a, "milk");
});

Deno.test("arrays are shared: b is a second name for the same array", () => {
  const a = ["bread"];
  const b = a;
  b.push("milk");
  assertEquals(a, ["bread", "milk"]);
  assertStrictEquals(b, a);
});

Deno.test("const stops you changing the variable, not the array it refers to", () => {
  const shopping = ["bread"];
  shopping.push("milk"); // allowed: the variable still refers to the same array
  assertEquals(shopping.length, 2);
});

Deno.test("a function can change the caller's array through its parameter", () => {
  const addMilk = (list: string[]): void => {
    list.push("milk");
  };
  const shopping = ["bread"];
  addMilk(shopping);
  assertEquals(shopping, ["bread", "milk"]);
});

Deno.test("but giving the parameter a new array does not change the caller's variable", () => {
  const replace = (list: string[]): void => {
    list = ["cake"]; // only the parameter now refers to a new array
    list.push("cream");
  };
  const shopping = ["bread"];
  replace(shopping);
  assertEquals(shopping, ["bread"]);
});

Deno.test("two objects with the same contents are equal, but not the same object", () => {
  const a = { name: "milk", quantity: 2 };
  const b = { name: "milk", quantity: 2 };
  assertEquals(a, b); // deep equality: same contents
  assertEquals(a === b, false); // identity: two different objects
});
