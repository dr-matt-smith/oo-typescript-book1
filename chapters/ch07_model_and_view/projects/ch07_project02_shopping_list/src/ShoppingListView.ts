// The view: shows the shopping list and any message. It builds each item with createElement and
// textContent, never innerHTML, because the item names were typed by the user.

import { requireElement } from "./dom.ts";

/** What the view calls when a Remove button is clicked: main.ts decides what that means. */
export type RemoveHandler = (index: number) => void;

export class ShoppingListView {
  private readonly listElement = requireElement<HTMLUListElement>("#items");
  private readonly messageText = requireElement<HTMLElement>("#message");
  private readonly summaryText = requireElement<HTMLElement>("#summary");

  constructor(private readonly onRemove: RemoveHandler) {}

  /** Makes the page show these items. */
  public render(items: string[]): void {
    // Empty the list first. replaceChildren() with nothing in the brackets removes every child.
    this.listElement.replaceChildren();
    items.forEach((name, index) => this.listElement.appendChild(this.itemElement(name, index)));
    this.summaryText.textContent = items.length === 0 ? "Nothing on the list yet" : `${items.length} to buy`;
  }

  /** Shows a message under the input box ("" hides it). */
  public showMessage(text: string): void {
    this.messageText.textContent = text;
  }

  /** One <li>: the item's name, as text, and a Remove button. */
  private itemElement(name: string, index: number): HTMLLIElement {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = name; // text, never HTML: "<b>milk</b>" is shown just as it was typed
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "secondary";
    // An arrow function, so `this` is still the view (Chapter 3's this trap), and `index` is remembered.
    removeButton.addEventListener("click", () => this.onRemove(index));
    item.append(label, removeButton);
    return item;
  }
}
