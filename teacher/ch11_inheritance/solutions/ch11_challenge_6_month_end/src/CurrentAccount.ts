// CurrentAccount: an everyday account that may go overdrawn, down to its overdraft limit.

import { BankAccount } from "./BankAccount.ts";

const DEFAULT_OVERDRAFT_LIMIT = 100;
const OVERDRAWN_FEE = 5; // CHALLENGE 6

export class CurrentAccount extends BankAccount {
  constructor(owner: string, private readonly overdraftLimit: number = DEFAULT_OVERDRAFT_LIMIT) {
    super(owner);
  }

  /** The balance plus the overdraft: with €50 and a €100 overdraft, €150 may be taken out. */
  public override available(): number {
    return this.balance + this.overdraftLimit;
  }

  public override getKind(): string {
    return "Current account";
  }

  // CHALLENGE 6
  /**
   * At the end of a month, an overdrawn account is charged a fee. The fee is not a withdrawal - it
   * must not be refused - so it changes the protected balance directly, even past the overdraft.
   */
  public override monthEnd(): void {
    if (this.isOverdrawn()) {
      this.balance -= OVERDRAWN_FEE;
    }
  }

  public isOverdrawn(): boolean {
    return this.balance < 0;
  }
}
