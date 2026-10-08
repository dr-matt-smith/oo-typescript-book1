// The view: shows a Tally on the page. It finds its elements once, in the constructor,
// and render() copies the model's state onto them. It makes no decisions of its own.

import { requireElement } from "./dom.ts";
import { statusMessage } from "./messages.ts"; // CHALLENGE 1
import type { Tally } from "./Tally.ts";

export class TallyView {
  private readonly countText = requireElement<HTMLElement>("#count");
  private readonly statusText = requireElement<HTMLElement>("#status");
  private readonly addButton = requireElement<HTMLButtonElement>("#add");
  private readonly removeButton = requireElement<HTMLButtonElement>("#remove");

  /** Makes the page match the tally. Safe to call as often as you like. */
  public render(tally: Tally): void {
    this.countText.textContent = `${tally.count}`;
    this.statusText.textContent = statusMessage(tally); // CHALLENGE 1
    this.statusText.classList.toggle("bad", tally.isFull);
    this.statusText.classList.toggle("warning", tally.isNearlyFull); // CHALLENGE 1
    // The buttons that would do nothing are switched off, so the page shows the model's rules.
    this.addButton.disabled = tally.isFull;
    this.removeButton.disabled = tally.isEmpty;
  }
}
