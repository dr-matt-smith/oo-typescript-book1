// Shows one bank account, with a box for an amount and Deposit and Withdraw buttons.
// The page never changes the balance itself - it cannot. It asks the account, and shows the
// account's answer: the new balance, or the reason it said no.

import { BankAccount } from "./BankAccount.ts";
import { formatEuro, toCents } from "./money.ts";

const account = new BankAccount("Aoife Byrne", "IE-0001");

const owner = document.querySelector<HTMLElement>("#owner");
const balance = document.querySelector<HTMLElement>("#balance");
const message = document.querySelector<HTMLElement>("#message");
const amountBox = document.querySelector<HTMLInputElement>("#amount");

const render = (): void => {
  if (owner !== null) {
    owner.textContent = `${account.owner} · account ${account.accountNumber}`;
  }
  if (balance !== null) {
    balance.textContent = formatEuro(account.balance);
  }
};

/** Runs one change to the account; if the account refuses it, shows the refusal's message. */
const attempt = (change: () => void, done: string): void => {
  if (message === null) {
    return;
  }
  try {
    change();
    message.textContent = done;
    message.className = "good";
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : String(error);
    message.className = "bad";
  }
  render();
};

/** The amount in the box, in cents. An empty or silly box gives 0 or NaN, which the account refuses. */
const amountInCents = (): number => toCents(Number(amountBox?.value));

document.querySelector("#deposit")?.addEventListener("click", () => {
  const cents = amountInCents();
  attempt(() => account.deposit(cents), `Deposited ${formatEuro(cents)}`);
});
document.querySelector("#withdraw")?.addEventListener("click", () => {
  const cents = amountInCents();
  attempt(() => account.withdraw(cents), `Withdrew ${formatEuro(cents)}`);
});

render();
