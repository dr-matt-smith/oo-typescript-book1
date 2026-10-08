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
  onMoveUp: (id: number) => void; // CHALLENGE 5
  onMoveDown: (id: number) => void; // CHALLENGE 5
};

export class TodoView {
  private readonly listElement = requireElement<HTMLUListElement>("#todos");
  private readonly emptyMessage = requireElement<HTMLElement>("#empty");
  private readonly remainingLabel = requireElement<HTMLElement>("#remaining");

  constructor(private readonly handlers: TodoHandlers) {
    // The filter buttons never change, so their listeners are added once, here.
    for (const filter of FILTERS) {
      this.filterButton(filter).addEventListener("click", () => this.handlers.onFilter(filter));
    }
  }

  /** Makes the page show these to-dos, this count, and which filter is chosen. */
  public render(todos: Todo[], remaining: number, filter: Filter): void {
    this.listElement.replaceChildren();
    // CHALLENGE 5: the index says whether a to-do is first or last on the screen
    todos.forEach((todo, index) => {
      this.listElement.appendChild(this.todoElement(todo, index === 0, index === todos.length - 1));
    });
    this.emptyMessage.textContent = todos.length === 0 ? emptyText(filter) : "";
    this.remainingLabel.textContent = remainingText(remaining);
    for (const name of FILTERS) {
      this.filterButton(name).classList.toggle("chosen", name === filter);
    }
  }

  /** The button for one filter: its id is "filter-" and the filter's name. */
  private filterButton(filter: Filter): HTMLButtonElement {
    return requireElement<HTMLButtonElement>(`#filter-${filter}`);
  }

  /** One <li>: a checkbox, the text (as text, never HTML) and a delete button. */
  private todoElement(todo: Todo, isFirst: boolean, isLast: boolean): HTMLLIElement { // CHALLENGE 5
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

    // CHALLENGE 5
    const upButton = this.smallButton("▲", `Move up: ${todo.text}`, () => this.handlers.onMoveUp(todo.id));
    upButton.disabled = isFirst;
    const downButton = this.smallButton("▼", `Move down: ${todo.text}`, () => this.handlers.onMoveDown(todo.id));
    downButton.disabled = isLast;

    item.append(box, label, upButton, downButton, deleteButton); // CHALLENGE 5
    return item;
  }

  // CHALLENGE 5
  /** A small button with a label for screen readers, which calls `onClick` when clicked. */
  private smallButton(text: string, label: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "secondary";
    button.setAttribute("aria-label", label);
    button.addEventListener("click", () => onClick());
    return button;
  }
}
