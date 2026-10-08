// The entry point: the model (a TodoList and the chosen filter), the view, and the listeners.
// However many kinds of event there are, each one takes the same path:
// change the model, then render.

import { requireElement } from "./dom.ts";
import type { Filter } from "./filter.ts";
import { TodoList } from "./TodoList.ts";
import { TodoView } from "./TodoView.ts";

const NOTICE_MILLISECONDS = 2000; // CHALLENGE 4: how long "Removed 2" stays on the page

const list = new TodoList();
let filter: Filter = "all";

const view = new TodoView({
  onToggle: (id) => {
    list.toggle(id);
    render();
  },
  onRemove: (id) => {
    list.remove(id);
    render();
  },
  onFilter: (chosen) => {
    filter = chosen;
    render();
  },
  // CHALLENGE 4
  onClearDone: () => {
    const removed = list.clearDone();
    view.showNotice(`Removed ${removed}`);
    setTimeout(() => view.showNotice(""), NOTICE_MILLISECONDS);
    render();
  },
});

const input = requireElement<HTMLInputElement>("#new-todo");

const render = (): void => view.render(list.visible(filter), list.remaining, filter, list.hasDone); // CHALLENGE 4

const addTodo = (): void => {
  // A blank to-do is simply ignored: there is nothing useful to say about it.
  if (input.value.trim() === "") {
    return;
  }
  list.add(input.value);
  input.value = "";
  render();
};

requireElement<HTMLButtonElement>("#add").addEventListener("click", () => addTodo());
input.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// A few to-dos to start with, so there is something to filter.
list.add("Read Chapter 7");
list.add("Do the challenges");
list.toggle(list.add("Install Deno").id);

render();
