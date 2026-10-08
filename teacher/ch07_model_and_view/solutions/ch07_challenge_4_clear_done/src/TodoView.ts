// The view: shows the to-dos, the count and the chosen filter. When the user clicks something,
// it calls one of the handlers it was given - it never changes the model itself.

import { requireElement } from "./dom.ts";
import { type Filter, FILTERS } from "./filter.ts";
import { emptyText, remainingText } from "./messages.ts";
import type { Todo } from "./Todo.ts";

/** What main.ts wants to happen for each kind of click. One function type per event. */
export type TodoHandlers = {
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onFilter: (filter: Filter) => void;
  onClearDone: () => void; // CHALLENGE 4
};

export class TodoView {
  private readonly listElement = requireElement<HTMLUListElement>("#todos");
  private readonly emptyMessage = requireElement<HTMLElement>("#empty");
  private readonly remainingLabel = requireElement<HTMLElement>("#remaining");
  private readonly clearDoneButton = requireElement<HTMLButtonElement>("#clear-done"); // CHALLENGE 4
  private readonly noticeText = requireElement<HTMLElement>("#notice"); // CHALLENGE 4

  constructor(private readonly handlers: TodoHandlers) {
    // The filter buttons never change, so their listeners are added once, here.
    for (const filter of FILTERS) {
      this.filterButton(filter).addEventListener("click", () => this.handlers.onFilter(filter));
    }
    this.clearDoneButton.addEventListener("click", () => this.handlers.onClearDone()); // CHALLENGE 4
  }

  // CHALLENGE 4
  /** Shows a short message next to the Clear done button ("" hides it). */
  public showNotice(text: string): void {
    this.noticeText.textContent = text;
  }

  /** Makes the page show these to-dos, this count, and which filter is chosen. */
  // CHALLENGE 4: canClear says whether anything is done
  public render(todos: Todo[], remaining: number, filter: Filter, canClear: boolean): void {
    this.listElement.replaceChildren();
    for (const todo of todos) {
      this.listElement.appendChild(this.todoElement(todo));
    }
    this.emptyMessage.textContent = todos.length === 0 ? emptyText(filter) : "";
    this.remainingLabel.textContent = remainingText(remaining);
    this.clearDoneButton.disabled = !canClear; // CHALLENGE 4
    for (const name of FILTERS) {
      this.filterButton(name).classList.toggle("chosen", name === filter);
    }
  }

  /** The button for one filter: its id is "filter-" and the filter's name. */
  private filterButton(filter: Filter): HTMLButtonElement {
    return requireElement<HTMLButtonElement>(`#filter-${filter}`);
  }

  /** One <li>: a checkbox, the text (as text, never HTML) and a delete button. */
  private todoElement(todo: Todo): HTMLLIElement {
    const item = document.createElement("li");
    item.classList.toggle("done", todo.done);

    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = todo.done;
    box.setAttribute("aria-label", `Done: ${todo.text}`);
    box.addEventListener("change", () => this.handlers.onToggle(todo.id));

    const label = document.createElement("span");
    label.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "secondary";
    deleteButton.addEventListener("click", () => this.handlers.onRemove(todo.id));

    item.append(box, label, deleteButton);
    return item;
  }
}
