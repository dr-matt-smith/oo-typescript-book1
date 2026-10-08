// CHALLENGE 4
// StudentAccount: a current account with a smaller overdraft, which also refuses any single
// withdrawal over a limit.

import { CurrentAccount } from "./CurrentAccount.ts";
import { formatEuro } from "./money.ts";

const STUDENT_OVERDRAFT_LIMIT = 50;
const MAX_SINGLE_WITHDRAWAL = 200;

export class StudentAccount extends CurrentAccount {
  constructor(owner: string) {
    super(owner, STUDENT_OVERDRAFT_LIMIT);
  }

  public override getKind(): string {
    return "Student account";
  }

  /**
   * The €200 limit is about one withdrawal, not about how much is available, so it cannot go in
   * available(). This override adds the check, then calls super.withdraw so the shared rules
   * (positive amount, no more than available) still run.
   */
  public override withdraw(amount: number): void {
    if (amount > MAX_SINGLE_WITHDRAWAL) {
      throw new Error(`A student account allows at most ${formatEuro(MAX_SINGLE_WITHDRAWAL)} at a time`);
    }
    super.withdraw(amount);
  }
}
