// The three ways of looking at the list, and which to-dos each one shows.

import type { Todo } from "./Todo.ts";

/**
 * A union of three strings: a Filter can only be one of these words. "al" or "Done" is a type
 * error, which a plain `string` would let through. (Chapter 8 says more about types like this.)
 */
export type Filter = "all" | "active" | "done";

/** Every filter, in the order the buttons appear. */
export const FILTERS: Filter[] = ["all", "active", "done"];

/** True if `todo` should be shown when `filter` is chosen. */
export const matchesFilter = (todo: Todo, filter: Filter): boolean => {
  if (filter === "active") {
    return !todo.done;
  }
  if (filter === "done") {
    return todo.done;
  }
  return true;
};
