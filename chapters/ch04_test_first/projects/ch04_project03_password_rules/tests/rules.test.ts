// Tests for the rules in src/rules.ts, one rule at a time.

import { assertEquals, assertThrows } from "@std/assert";
import { containsAny, HAS_DIGIT, HAS_LOWER_CASE, HAS_SYMBOL, HAS_UPPER_CASE, minLength } from "../src/rules.ts";

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
