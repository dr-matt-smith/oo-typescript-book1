// Tests for src/PasswordChecker.ts. Every test makes its own checker with makeChecker(), so no
// test can be affected by what another test did.

import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";
import { PasswordChecker } from "../src/PasswordChecker.ts";
import { HAS_DIGIT, HAS_UPPER_CASE, minLength } from "../src/rules.ts";

/** A fresh checker with three simple rules - the "arrange" step most tests share. */
const makeChecker = (): PasswordChecker => new PasswordChecker([minLength(8), HAS_DIGIT, HAS_UPPER_CASE]);

Deno.test("a password that meets every rule is acceptable", () => {
  // Arrange
  const checker = makeChecker();

  // Act
  const acceptable = checker.isAcceptable("Elephant42");

  // Assert
  assertEquals(acceptable, true);
});

Deno.test("a password that breaks one rule is not acceptable", () => {
  const checker = makeChecker();
  assertEquals(checker.isAcceptable("elephant42"), false);
});

Deno.test("a password that meets every rule has no problems", () => {
  const checker = makeChecker();
  assertEquals(checker.problems("Elephant42"), []);
});

Deno.test("the problems list every rule that is broken, in order", () => {
  const checker = makeChecker();
  assertEquals(checker.problems("cat"), ["needs at least 8 characters", "needs a digit (0-9)", "needs a capital letter"]);
});

Deno.test("an empty password breaks every rule", () => {
  const checker = makeChecker();
  assertEquals(checker.failedRules("").length, 3);
});

Deno.test("the failed rules are the very same objects the checker was given", () => {
  const checker = makeChecker();
  const failed = checker.failedRules("Elephants");
  assertEquals(failed.length, 1);
  // Not just a rule that looks like HAS_DIGIT: HAS_DIGIT itself.
  assertStrictEquals(failed[0], HAS_DIGIT);
});

Deno.test("a checker with no rules is a mistake, and throws", () => {
  assertThrows(() => new PasswordChecker([]), Error, "at least one rule");
});
