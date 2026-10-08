// The model for the whole list. It hands out ids, and finds to-dos by id - not by their position,
// which changes as the list is filtered.

import { type Filter, matchesFilter } from "./filter.ts";
import { Todo } from "./Todo.ts";

// CHALLENGE 6
/** One to-do as plain data: what is saved, and what a list can be built from. */
export type TodoData = { id: number; text: string; done: boolean };

export class TodoList {
  private todos: Todo[];
  private nextId: number;

  // CHALLENGE 6
  /** A list holding these to-dos (none, if not given). The next id is one more than the largest. */
  constructor(data: TodoData[] = []) {
    this.todos = data.map((d) => new Todo(d.id, d.text, d.done));
    this.nextId = data.reduce((largest, d) => Math.max(largest, d.id), 0) + 1;
  }

  // CHALLENGE 6
  /** The list as plain data, ready for JSON.stringify. */
  public toData(): TodoData[] {
    return this.todos.map((todo) => ({ id: todo.id, text: todo.text, done: todo.done }));
  }

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

  /** The to-dos that `filter` shows, oldest first. */
  public visible(filter: Filter): Todo[] {
    return this.todos.filter((todo) => matchesFilter(todo, filter));
  }

  /** How many to-dos are not done yet. */
  public get remaining(): number {
    return this.visible("active").length;
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
