// Tests for CurrentAccount: first every account's rules, then the overdraft.

import { assertEquals, assertThrows } from "@std/assert";
import { CurrentAccount } from "../src/CurrentAccount.ts";
import { testAccountRules } from "./account_rules.ts";

testAccountRules("CurrentAccount", (owner) => new CurrentAccount(owner));

Deno.test("a current account can withdraw into its overdraft", () => {
  const account = new CurrentAccount("Ann", 100);
  account.deposit(50);
  account.withdraw(120);
  assertEquals(account.getBalance(), -70);
});

Deno.test("a current account cannot go past its overdraft limit", () => {
  const account = new CurrentAccount("Ann", 100);
  account.deposit(50);
  assertThrows(() => account.withdraw(151), Error, "Not enough money: €150.00 available");
});

Deno.test("a current account knows when it is overdrawn", () => {
  const account = new CurrentAccount("Ann", 100);
  account.withdraw(1);
  assertEquals(account.isOverdrawn(), true);
});

Deno.test("an empty current account is not overdrawn", () => {
  assertEquals(new CurrentAccount("Ann").isOverdrawn(), false);
});
