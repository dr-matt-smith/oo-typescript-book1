// The model for the whole list. It hands out ids, and finds to-dos by id - not by their position,
// which changes as the list is filtered.

import { type Filter, matchesFilter } from "./filter.ts";
import { Todo } from "./Todo.ts";

export class TodoList {
  private todos: Todo[] = [];
  private nextId: number = 1;

  /** Adds a to-do (without the spaces round it) and gives it back. Throws for blank text. */
  public add(text: string): Todo {
    const trimmed = text.trim();
    if (trimmed === "") {
      throw new Error("A to-do needs some text");
    }
    const todo = new Todo(this.nextId, trimmed);
    this.nextId++;
    this.todos.push(todo);
    return todo;
  }

  /** Ticks off (or un-ticks) the to-do with this id. */
  public toggle(id: number): void {
    this.get(id).toggle();
  }

  /** Removes the to-do with this id. */
  public remove(id: number): void {
    this.get(id); // throws if there is no such to-do
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  // CHALLENGE 5
  /** Moves the to-do above the one before it - among the to-dos `filter` shows. */
  public moveUp(id: number, filter: Filter = "all"): void {
    this.move(id, filter, -1);
  }

  // CHALLENGE 5
  /** Moves the to-do below the one after it - among the to-dos `filter` shows. */
  public moveDown(id: number, filter: Filter = "all"): void {
    this.move(id, filter, 1);
  }

  /** The to-dos that `filter` shows, oldest first. */
  public visible(filter: Filter): Todo[] {
    return this.todos.filter((todo) => matchesFilter(todo, filter));
  }

  /** How many to-dos are not done yet. */
  public get remaining(): number {
    return this.visible("active").length;
  }

  // CHALLENGE 5
  /**
   * Swaps the to-do with its neighbour `step` places away (-1 is up, 1 is down) in the list as
   * `filter` shows it, so it never swaps with a to-do the user cannot see. At either end,
   * nothing happens.
   */
  private move(id: number, filter: Filter, step: number): void {
    const todo = this.get(id); // throws if there is no such to-do
    const shown = this.visible(filter);
    const from = shown.indexOf(todo);
    const to = from + step;
    if (from === -1 || to < 0 || to >= shown.length) {
      return;
    }
    const i = this.todos.indexOf(todo);
    const j = this.todos.indexOf(shown[to]);
    // Swap two elements in one line: the right-hand side makes [b, a], which is unpacked into a and b.
    [this.todos[i], this.todos[j]] = [this.todos[j], this.todos[i]];
  }

  /** The to-do with this id - or an error, because asking for one that is not there is a bug. */
  private get(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo === undefined) {
      throw new Error(`There is no to-do with id ${id}`);
    }
    return todo;
  }
}
