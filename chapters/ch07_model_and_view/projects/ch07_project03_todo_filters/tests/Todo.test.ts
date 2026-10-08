// Tests for one Todo.

import { assertEquals } from "@std/assert";
import { Todo } from "../src/Todo.ts";

Deno.test("a new to-do is not done", () => {
  assertEquals(new Todo(1, "Buy milk").done, false);
});

Deno.test("toggle ticks a to-do off", () => {
  const todo = new Todo(1, "Buy milk");
  todo.toggle();
  assertEquals(todo.done, true);
});

Deno.test("toggling twice makes it not done again", () => {
  const todo = new Todo(1, "Buy milk");
  todo.toggle();
  todo.toggle();
  assertEquals(todo.done, false);
});
