// The entry point: the model (a TodoList and the chosen filter), the view, and the listeners.
// However many kinds of event there are, each one takes the same path:
// change the model, then render.

import { requireElement } from "./dom.ts";
import type { Filter } from "./filter.ts";
import { type TodoData, TodoList } from "./TodoList.ts"; // CHALLENGE 6
import { TodoView } from "./TodoView.ts";

// CHALLENGE 6: the to-dos are saved in the browser under this key
const STORAGE_KEY = "ch07-todos";

// CHALLENGE 6
/** The saved to-dos, or null the first time the page is opened. */
const loadSaved = (): TodoData[] | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  // JSON.parse cannot know what shape the data has; we trust it because only this page writes it.
  return saved === null ? null : JSON.parse(saved);
};

const saved = loadSaved(); // CHALLENGE 6
const list = new TodoList(saved === null ? [] : saved); // CHALLENGE 6
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
});

const input = requireElement<HTMLInputElement>("#new-todo");

const render = (): void => {
  // CHALLENGE 6: every change comes through render, so this is the one place to save
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.toData()));
  view.render(list.visible(filter), list.remaining, filter);
};

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

// A few to-dos to start with, so there is something to filter - only the first time (CHALLENGE 6)
if (saved === null) {
  list.add("Read Chapter 7");
  list.add("Do the challenges");
  list.toggle(list.add("Install Deno").id);
}

render();
