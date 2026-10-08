// SavingsAccount: you can only take out what is in it, and it earns interest.

import { BankAccount } from "./BankAccount.ts";
import { roundToCent } from "./money.ts";

const DEFAULT_INTEREST_RATE = 2; // per cent
const MONTHS_PER_YEAR = 12; // CHALLENGE 6

export class SavingsAccount extends BankAccount {
  constructor(owner: string, private readonly interestRate: number = DEFAULT_INTEREST_RATE) {
    super(owner);
  }

  public override available(): number {
    return this.balance;
  }

  public override getKind(): string {
    return "Savings account";
  }

  public getInterestRate(): number {
    return this.interestRate;
  }

  // CHALLENGE 6
  /** At the end of a month: a twelfth of a year's interest. */
  public override monthEnd(): void {
    this.balance = roundToCent(this.balance * (1 + this.interestRate / 100 / MONTHS_PER_YEAR));
  }

  /** Adds one year's interest. Uses the protected balance directly - no need for a deposit. */
  public addInterest(): void {
    this.balance = roundToCent(this.balance * (1 + this.interestRate / 100));
  }
}
