// BankAccount: the rules every kind of account shares. It is abstract - you open a savings account
// or a current account, never "just an account" - and each subclass answers two questions:
// what kind of account am I, and how much may be taken out right now?

import { formatEuro } from "./money.ts";

export abstract class BankAccount {
  // protected: subclasses need the balance (to work out what is available, or to add interest),
  // but code outside must go through deposit and withdraw, which check the rules.
  protected balance: number = 0;

  constructor(private readonly owner: string) {}

  public getOwner(): string {
    return this.owner;
  }

  public getBalance(): number {
    return this.balance;
  }

  public deposit(amount: number): void {
    this.requirePositive(amount);
    this.balance += amount;
  }

  /**
   * The same for every account: the amount must be positive, and no more than available().
   * Subclasses are not meant to override this - TypeScript has no `final` to stop them, so the
   * shared tests in tests/account_rules.ts check that every subclass keeps these rules.
   */
  public withdraw(amount: number): void {
    this.requirePositive(amount);
    if (amount > this.available()) {
      throw new Error(`Not enough money: ${formatEuro(this.available())} available`);
    }
    this.balance -= amount;
  }

  /** How much may be withdrawn now. Each kind of account has its own rule. */
  public abstract available(): number;

  /** "Savings account", "Current account" ... used by toString. */
  public abstract getKind(): string;

  // CHALLENGE 6
  /** What happens to this account at the end of each month. Each kind of account decides. */
  public abstract monthEnd(): void;

  public toString(): string {
    return `${this.getKind()} for ${this.owner}: ${formatEuro(this.balance)}`;
  }

  // private: a helper for this class only. Subclasses cannot call it or override it.
  private requirePositive(amount: number): void {
    if (amount <= 0) {
      throw new Error(`The amount must be more than zero, not ${amount}`);
    }
  }
}
