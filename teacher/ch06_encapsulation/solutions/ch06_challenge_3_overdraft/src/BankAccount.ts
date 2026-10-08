// A bank account. Its balance is a #private field: hidden not just from the compiler's point of
// view (like `private`) but really hidden, even in the running JavaScript. The only ways to change
// it are deposit() and withdraw(), and they refuse anything that would break the account's rule:
//
//   the balance is a whole number of cents, and never below minus the overdraft limit. // CHALLENGE 3
//
// A rule like that, which must be true for every object at every moment, is called an invariant.

import { formatEuro } from "./money.ts";

export class BankAccount {
  // # makes the field private at run time too. No `private` keyword is needed (or allowed) with #.
  #balance: number = 0;

  // CHALLENGE 3: how far below zero the balance may go, in cents. Not a parameter property,
  // because it must be checked before it is stored.
  public readonly overdraftLimit: number;

  // Parameter properties (Chapter 5): public, so anyone can read them; readonly, so nobody can change them.
  // CHALLENGE 3: an optional third parameter, 0 (no overdraft) if not given
  constructor(public readonly owner: string, public readonly accountNumber: string, overdraftLimit: number = 0) {
    if (!Number.isInteger(overdraftLimit) || overdraftLimit < 0) {
      throw new Error(`An overdraft limit must be a whole number of cents, 0 or more (not ${overdraftLimit})`);
    }
    this.overdraftLimit = overdraftLimit;
  }

  /** The balance in cents. A get accessor: read it like a field, `account.balance` - but it cannot be set. */
  public get balance(): number {
    return this.#balance;
  }

  /** Adds money. Throws an Error if the amount is not a whole number of cents above zero. */
  public deposit(cents: number): void {
    this.#checkAmount(cents);
    this.#balance += cents;
  }

  /** Takes money out. Throws an Error, and changes nothing, if the amount is bad or too big. */
  public withdraw(cents: number): void {
    this.#checkAmount(cents);
    // Check first, change after: if the check fails, the balance has not been touched.
    if (cents > this.#balance + this.overdraftLimit) { // CHALLENGE 3
      throw new Error(`Not enough money: the balance is ${formatEuro(this.#balance)}`);
    }
    this.#balance -= cents;
  }

  // A #private method: a helper that only this class can call.
  #checkAmount(cents: number): void {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new Error(`An amount must be a whole number of cents, more than 0 (not ${cents})`);
    }
  }
}
