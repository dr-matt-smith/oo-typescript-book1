// Checks passwords against a list of rules. Which rules is up to whoever makes the checker,
// so the same class works for a strict admin password and a relaxed PIN-like one.

import { type Rule } from "./rules.ts";

/**
 * Checks passwords against the rules it was made with.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 * import { HAS_DIGIT, minLength } from "./rules.ts";
 *
 * const checker = new PasswordChecker([minLength(8), HAS_DIGIT]);
 * assertEquals(checker.isAcceptable("open sesame 2"), true);
 * assertEquals(checker.problems("sesame"), [
 *   "needs at least 8 characters",
 *   "needs a digit (0-9)",
 * ]);
 * ```
 */
export class PasswordChecker {
  private rules: Rule[];

  // A checker with no rules would accept anything, which is never what was meant: fail loudly.
  constructor(rules: Rule[]) {
    if (rules.length === 0) {
      throw new Error("a password checker needs at least one rule");
    }
    this.rules = rules;
  }

  /** The rules this password does not meet - the very same rule objects the checker was given. */
  public failedRules(password: string): Rule[] {
    return this.rules.filter((rule) => !rule.isMetBy(password));
  }

  /** What is missing, in words, ready to show on the page. */
  public problems(password: string): string[] {
    return this.failedRules(password).map((rule) => `needs ${rule.description}`);
  }

  /** True if the password meets every rule. */
  public isAcceptable(password: string): boolean {
    return this.failedRules(password).length === 0;
  }
}
