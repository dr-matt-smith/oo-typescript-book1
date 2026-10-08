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

  // CHALLENGE 4
  /** Removes every done to-do, and says how many were removed. */
  public clearDone(): number {
    const before = this.todos.length;
    this.todos = this.todos.filter((todo) => !todo.done);
    return before - this.todos.length;
  }

  // CHALLENGE 4
  /** True if at least one to-do is done - so there is something to clear. */
  public get hasDone(): boolean {
    return this.visible("done").length > 0;
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
