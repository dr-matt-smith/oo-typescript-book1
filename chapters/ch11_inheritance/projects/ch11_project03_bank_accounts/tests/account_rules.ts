// The rules EVERY kind of bank account must keep, written once.
//
// This file is not a test file itself (its name does not end in .test.ts). It exports a function
// that registers the tests; each subclass's test file calls it with a way to make that kind of
// account. A new kind of account gets all these tests with one line.

import { assertEquals, assertThrows } from "@std/assert";
import type { BankAccount } from "../src/BankAccount.ts";

/** Something that makes a new, empty account for an owner. */
export type MakeAccount = (owner: string) => BankAccount;

export const testAccountRules = (kind: string, makeAccount: MakeAccount): void => {
  Deno.test(`${kind}: a new account is empty`, () => {
    assertEquals(makeAccount("Ann").getBalance(), 0);
  });

  Deno.test(`${kind}: keeps its owner`, () => {
    assertEquals(makeAccount("Ann").getOwner(), "Ann");
  });

  Deno.test(`${kind}: a deposit adds to the balance`, () => {
    const account = makeAccount("Ann");
    account.deposit(50);
    account.deposit(25);
    assertEquals(account.getBalance(), 75);
  });

  Deno.test(`${kind}: a deposit of zero or less is rejected`, () => {
    const account = makeAccount("Ann");
    assertThrows(() => account.deposit(0), Error, "more than zero");
    assertThrows(() => account.deposit(-5), Error, "more than zero");
    assertEquals(account.getBalance(), 0);
  });

  Deno.test(`${kind}: a withdrawal takes from the balance`, () => {
    const account = makeAccount("Ann");
    account.deposit(100);
    account.withdraw(30);
    assertEquals(account.getBalance(), 70);
  });

  Deno.test(`${kind}: a withdrawal of zero or less is rejected`, () => {
    const account = makeAccount("Ann");
    account.deposit(100);
    assertThrows(() => account.withdraw(-5), Error, "more than zero");
    assertEquals(account.getBalance(), 100);
  });

  Deno.test(`${kind}: everything available can be withdrawn`, () => {
    const account = makeAccount("Ann");
    account.deposit(100);
    account.withdraw(account.available());
    assertEquals(account.available(), 0);
  });

  Deno.test(`${kind}: no more than what is available can be withdrawn`, () => {
    const account = makeAccount("Ann");
    account.deposit(100);
    const before = account.getBalance();
    assertThrows(() => account.withdraw(account.available() + 1), Error, "Not enough money");
    assertEquals(account.getBalance(), before);
  });

  Deno.test(`${kind}: toString names the owner and the balance`, () => {
    const account = makeAccount("Ann");
    account.deposit(12.5);
    assertEquals(`${account}`, `${account.getKind()} for Ann: €12.50`);
  });
};
