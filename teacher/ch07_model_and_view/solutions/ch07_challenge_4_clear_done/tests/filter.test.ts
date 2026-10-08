// Tests for matchesFilter: every filter, with a done and a not-done to-do.

import { assertEquals } from "@std/assert";
import { matchesFilter } from "../src/filter.ts";
import { Todo } from "../src/Todo.ts";

const notDone = (): Todo => new Todo(1, "not done");
const done = (): Todo => {
  const todo = new Todo(2, "done");
  todo.toggle();
  return todo;
};

Deno.test("all matches every to-do", () => {
  assertEquals(matchesFilter(notDone(), "all"), true);
  assertEquals(matchesFilter(done(), "all"), true);
});

Deno.test("active matches only to-dos not done", () => {
  assertEquals(matchesFilter(notDone(), "active"), true);
  assertEquals(matchesFilter(done(), "active"), false);
});

Deno.test("done matches only done to-dos", () => {
  assertEquals(matchesFilter(notDone(), "done"), false);
  assertEquals(matchesFilter(done(), "done"), true);
});
