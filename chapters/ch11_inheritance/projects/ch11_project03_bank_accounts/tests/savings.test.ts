// Tests for SavingsAccount: first every account's rules, then what is special about savings.

import { assertEquals, assertThrows } from "@std/assert";
import { SavingsAccount } from "../src/SavingsAccount.ts";
import { testAccountRules } from "./account_rules.ts";

testAccountRules("SavingsAccount", (owner) => new SavingsAccount(owner));

Deno.test("a savings account cannot be overdrawn", () => {
  const account = new SavingsAccount("Ann");
  account.deposit(50);
  assertThrows(() => account.withdraw(51), Error, "Not enough money: €50.00 available");
});

Deno.test("interest is added at the account's rate", () => {
  const account = new SavingsAccount("Ann", 5);
  account.deposit(200);
  account.addInterest();
  assertEquals(account.getBalance(), 210);
});

Deno.test("interest is rounded to the nearest cent", () => {
  const account = new SavingsAccount("Ann", 2);
  account.deposit(33.33);
  account.addInterest(); // 33.9966
  assertEquals(account.getBalance(), 34);
});

Deno.test("the interest rate is 2% unless another is given", () => {
  assertEquals(new SavingsAccount("Ann").getInterestRate(), 2);
});
