// The page: a savings account and a current account, each with Deposit and Withdraw buttons.
// main.ts is the only file that touches the page.

import type { BankAccount } from "./BankAccount.ts";
import { CurrentAccount } from "./CurrentAccount.ts";
import { formatEuro } from "./money.ts";
import { SavingsAccount } from "./SavingsAccount.ts";

/** Finds an element, or stops with an error that names the missing selector (Chapter 7). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches ${selector}`);
  }
  return element;
};

const savings = new SavingsAccount("Aoife");
const current = new CurrentAccount("Aoife");
savings.deposit(200);
current.deposit(50);

const message = requireElement<HTMLParagraphElement>("#message");

/** Runs an action on an account; if a rule is broken, shows the error's message instead. */
const attempt = (action: () => void, done: string): void => {
  try {
    action();
    message.textContent = done;
    message.className = "good";
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : "Something went wrong";
    message.className = "bad";
  }
  render();
};

/**
 * Wires up one account's card. It takes a BankAccount, so it works for either kind:
 * deposit and withdraw are written once, in BankAccount.
 */
const wireCard = (prefix: string, account: BankAccount): void => {
  const amountBox = requireElement<HTMLInputElement>(`#${prefix}-amount`);
  requireElement<HTMLButtonElement>(`#${prefix}-deposit`).addEventListener("click", () => {
    const amount = Number(amountBox.value);
    attempt(() => account.deposit(amount), `Deposited ${formatEuro(amount)}`);
  });
  requireElement<HTMLButtonElement>(`#${prefix}-withdraw`).addEventListener("click", () => {
    const amount = Number(amountBox.value);
    attempt(() => account.withdraw(amount), `Withdrew ${formatEuro(amount)}`);
  });
};

const showAccount = (prefix: string, account: BankAccount): void => {
  requireElement<HTMLElement>(`#${prefix}-title`).textContent = `${account}`;
  requireElement<HTMLElement>(`#${prefix}-available`).textContent = `Available: ${formatEuro(account.available())}`;
};

const render = (): void => {
  showAccount("savings", savings);
  showAccount("current", current);
  requireElement<HTMLElement>("#current-card").classList.toggle("overdrawn", current.isOverdrawn());
};

wireCard("savings", savings);
wireCard("current", current);
// Only a SavingsAccount has addInterest, so this button is wired to the `savings` variable.
requireElement<HTMLButtonElement>("#savings-interest").addEventListener("click", () => {
  attempt(() => savings.addInterest(), `Added ${savings.getInterestRate()}% interest`);
});

render();
message.textContent = "Type an amount and press a button.";
