// CHALLENGE 4: tests for StudentAccount. The shared rules came first - one line - and passed
// as soon as the class existed; then the tests for what is special about it.

import { assertEquals, assertThrows } from "@std/assert";
import { StudentAccount } from "../src/StudentAccount.ts";
import { testAccountRules } from "./account_rules.ts";

testAccountRules("StudentAccount", (owner) => new StudentAccount(owner));

Deno.test("a student account has a €50 overdraft", () => {
  const account = new StudentAccount("Ann");
  account.withdraw(50);
  assertEquals(account.getBalance(), -50);
});

Deno.test("a student account cannot go past €50 overdrawn", () => {
  const account = new StudentAccount("Ann");
  assertThrows(() => account.withdraw(51), Error, "Not enough money: €50.00 available");
});

Deno.test("a student account refuses a single withdrawal over €200", () => {
  const account = new StudentAccount("Ann");
  account.deposit(500);
  assertThrows(() => account.withdraw(201), Error, "at most €200.00 at a time");
  assertEquals(account.getBalance(), 500);
});

Deno.test("a student account allows exactly €200", () => {
  const account = new StudentAccount("Ann");
  account.deposit(500);
  account.withdraw(200);
  assertEquals(account.getBalance(), 300);
});

Deno.test("a student account is still a current account that can be overdrawn", () => {
  const account = new StudentAccount("Ann");
  account.withdraw(10);
  assertEquals(account.isOverdrawn(), true);
});
