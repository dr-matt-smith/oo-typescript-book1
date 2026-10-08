// The view: shows a Tally on the page. It finds its elements once, in the constructor,
// and render() copies the model's state onto them. It makes no decisions of its own.
// CHALLENGE 3: a view is given the selector of its own part of the page (e.g. "#lab"), and finds
// its elements inside that part by class - so the same class can show any number of rooms.

import { requireElement } from "./dom.ts";
import type { Tally } from "./Tally.ts";

export class TallyView {
  // CHALLENGE 3: the fields are set in the constructor now, because they depend on `root`
  private readonly countText: HTMLElement;
  private readonly statusText: HTMLElement;
  private readonly addButton: HTMLButtonElement;
  private readonly removeButton: HTMLButtonElement;
  private readonly resetButton: HTMLButtonElement;

  // CHALLENGE 3
  constructor(root: string) {
    // "#lab .count" means: the element with class "count" inside the element with id "lab".
    this.countText = requireElement<HTMLElement>(`${root} .count`);
    this.statusText = requireElement<HTMLElement>(`${root} .status`);
    this.addButton = requireElement<HTMLButtonElement>(`${root} .add`);
    this.removeButton = requireElement<HTMLButtonElement>(`${root} .remove`);
    this.resetButton = requireElement<HTMLButtonElement>(`${root} .reset`);
  }

  // CHALLENGE 3: main.ts needs this room's buttons, not the first ones on the page
  /** Calls the functions when this room's +, − and Reset buttons are clicked. */
  public onClicks(add: () => void, remove: () => void, reset: () => void): void {
    this.addButton.addEventListener("click", () => add());
    this.removeButton.addEventListener("click", () => remove());
    this.resetButton.addEventListener("click", () => reset());
  }

  /** Makes the page match the tally. Safe to call as often as you like. */
  public render(tally: Tally): void {
    this.countText.textContent = `${tally.count}`;
    this.statusText.textContent = tally.isFull ? "Full - nobody else may come in" : `${tally.spacesLeft} spaces left`;
    this.statusText.classList.toggle("bad", tally.isFull);
    // The buttons that would do nothing are switched off, so the page shows the model's rules.
    this.addButton.disabled = tally.isFull;
    this.removeButton.disabled = tally.isEmpty;
  }
}
