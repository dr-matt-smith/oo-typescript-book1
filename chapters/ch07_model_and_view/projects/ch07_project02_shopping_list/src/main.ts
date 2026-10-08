// The entry point: makes the model and the view, and joins them with listeners.
// Every event takes the same path: change the model, then render.

import { requireElement } from "./dom.ts";
import { ShoppingList } from "./ShoppingList.ts";
import { ShoppingListView } from "./ShoppingListView.ts";

const list = new ShoppingList();
const input = requireElement<HTMLInputElement>("#new-item");

const render = (): void => view.render(list.all);

// The view is told what to do when a Remove button is clicked: remove from the model, then render.
const view = new ShoppingListView((index) => {
  list.remove(index);
  view.showMessage("");
  render();
});

const addItem = (): void => {
  // Ask the model first: if there is a problem, show it and change nothing.
  const problem = list.problemWith(input.value);
  if (problem !== null) {
    view.showMessage(problem);
    return;
  }
  list.add(input.value);
  view.showMessage("");
  input.value = "";
  render();
};

requireElement<HTMLButtonElement>("#add").addEventListener("click", () => addItem());
input.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    addItem();
  }
});

render();
