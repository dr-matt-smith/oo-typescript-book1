// Tests for the rules in src/rules.ts, one rule at a time.

import { assertEquals, assertThrows } from "@std/assert";
// CHALLENGE 3: NO_SPACES and notContaining imported
import {
  containsAny,
  HAS_DIGIT,
  HAS_LOWER_CASE,
  HAS_SYMBOL,
  HAS_UPPER_CASE,
  minLength,
  NO_SPACES,
  notContaining,
} from "../src/rules.ts";

Deno.test("containsAny finds one of the characters anywhere in the text", () => {
  assertEquals(containsAny("abc3", "0123456789"), true);
  assertEquals(containsAny("abc", "0123456789"), false);
});

Deno.test("a minimum length rule accepts a password of exactly that length", () => {
  const rule = minLength(8);
  assertEquals(rule.isMetBy("abcdefgh"), true);
});

Deno.test("a minimum length rule rejects a password one character short", () => {
  const rule = minLength(8);
  assertEquals(rule.isMetBy("abcdefg"), false);
});

Deno.test("a minimum length rule describes itself", () => {
  assertEquals(minLength(8).description, "at least 8 characters");
});

Deno.test("a minimum length of 0 is a mistake, and throws", () => {
  assertThrows(() => minLength(0));
});

Deno.test("a minimum length that is not a whole number throws, and says why", () => {
  assertThrows(() => minLength(2.5), Error, "must be a whole number");
});

Deno.test("the digit rule needs a digit", () => {
  assertEquals(HAS_DIGIT.isMetBy("abc1"), true);
  assertEquals(HAS_DIGIT.isMetBy("abc"), false);
});

Deno.test("the capital letter rule needs a capital letter", () => {
  assertEquals(HAS_UPPER_CASE.isMetBy("abcD"), true);
  assertEquals(HAS_UPPER_CASE.isMetBy("abcd"), false);
});

Deno.test("the small letter rule needs a small letter", () => {
  assertEquals(HAS_LOWER_CASE.isMetBy("ABCd"), true);
  assertEquals(HAS_LOWER_CASE.isMetBy("ABCD"), false);
});

Deno.test("digits and symbols are neither capital nor small letters", () => {
  assertEquals(HAS_UPPER_CASE.isMetBy("123!"), false);
  assertEquals(HAS_LOWER_CASE.isMetBy("123!"), false);
});

Deno.test("the symbol rule needs a symbol", () => {
  assertEquals(HAS_SYMBOL.isMetBy("abc#"), true);
  assertEquals(HAS_SYMBOL.isMetBy("abc1"), false);
});

// CHALLENGE 3
Deno.test("the no spaces rule accepts a password without a space", () => {
  assertEquals(NO_SPACES.isMetBy("Elephant42!"), true);
});

// CHALLENGE 3
Deno.test("the no spaces rule rejects a space anywhere, even at the end", () => {
  assertEquals(NO_SPACES.isMetBy("Ele phant"), false);
  assertEquals(NO_SPACES.isMetBy("Elephant "), false);
});

// CHALLENGE 3
Deno.test("a not-containing rule rejects the word, whatever its case", () => {
  const rule = notContaining("password");
  assertEquals(rule.isMetBy("MyPassword1!"), false);
  assertEquals(rule.isMetBy("PASSWORD"), false);
});

// CHALLENGE 3
Deno.test("a not-containing rule accepts a password without the word", () => {
  assertEquals(notContaining("password").isMetBy("Elephant42!"), true);
});

// CHALLENGE 3
Deno.test("a not-containing rule given a word in capitals still ignores case", () => {
  assertEquals(notContaining("PASS").isMetBy("bypass"), false);
});

// CHALLENGE 3
Deno.test("a not-containing rule describes itself", () => {
  assertEquals(notContaining("password").description, 'not the word "password"');
});

// CHALLENGE 3
Deno.test("not containing an empty word is a mistake, and throws", () => {
  assertThrows(() => notContaining(""), Error, "empty");
});
