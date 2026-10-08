// The entry point: the model (a TodoList and the chosen filter), the view, and the listeners.
// However many kinds of event there are, each one takes the same path:
// change the model, then render.

import { requireElement } from "./dom.ts";
import type { Filter } from "./filter.ts";
import { TodoList } from "./TodoList.ts";
import { TodoView } from "./TodoView.ts";

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
  // CHALLENGE 5: the filter is passed on, so a to-do moves past the ones that are hidden
  onMoveUp: (id) => {
    list.moveUp(id, filter);
    render();
  },
  onMoveDown: (id) => {
    list.moveDown(id, filter);
    render();
  },
});

const input = requireElement<HTMLInputElement>("#new-todo");

const render = (): void => view.render(list.visible(filter), list.remaining, filter);

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
