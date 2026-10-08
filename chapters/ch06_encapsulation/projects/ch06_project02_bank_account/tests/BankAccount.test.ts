// Tests for src/BankAccount.ts. Amounts are in cents: 2000 is €20.00.
// The tests can read `balance` but never set it - just like main.ts.

import { assertEquals, assertThrows } from "@std/assert";
import { BankAccount } from "../src/BankAccount.ts";

/** A helper instead of a beforeEach (Chapter 4): a fresh account holding `cents`. */
const accountWith = (cents: number): BankAccount => {
  const account = new BankAccount("Aoife", "IE-0001");
  if (cents > 0) {
    account.deposit(cents);
  }
  return account;
};

Deno.test("a new account keeps its owner and number, and holds nothing", () => {
  const account = new BankAccount("Aoife", "IE-0001");

  assertEquals(account.owner, "Aoife");
  assertEquals(account.accountNumber, "IE-0001");
  assertEquals(account.balance, 0);
});

Deno.test("deposits add to the balance", () => {
  const account = accountWith(0);

  account.deposit(2000);
  account.deposit(550);

  assertEquals(account.balance, 2550);
});

Deno.test("a withdrawal takes money out", () => {
  const account = accountWith(2000);

  account.withdraw(500);

  assertEquals(account.balance, 1500);
});

Deno.test("the whole balance can be withdrawn, leaving 0", () => {
  const account = accountWith(2000);

  account.withdraw(2000);

  assertEquals(account.balance, 0);
});

Deno.test("withdrawing more than the balance is refused", () => {
  const account = accountWith(2000);

  assertThrows(() => account.withdraw(2001), Error, "Not enough money: the balance is €20.00");
});

Deno.test("a refused withdrawal leaves the balance as it was", () => {
  const account = accountWith(2000);

  assertThrows(() => account.withdraw(3000));

  assertEquals(account.balance, 2000);
});

Deno.test("bad amounts are refused, for deposits and withdrawals alike", async (t) => {
  const account = accountWith(2000);
  const badAmounts = [0, -500, 12.5, NaN];

  for (const amount of badAmounts) {
    await t.step(`deposit(${amount}) is refused`, () => {
      assertThrows(() => account.deposit(amount), Error, "An amount must be");
    });
    await t.step(`withdraw(${amount}) is refused`, () => {
      assertThrows(() => account.withdraw(amount), Error, "An amount must be");
    });
  }
  assertEquals(account.balance, 2000);
});
