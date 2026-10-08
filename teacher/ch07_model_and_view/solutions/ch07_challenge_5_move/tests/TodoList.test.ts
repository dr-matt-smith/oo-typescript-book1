// Tests for the TodoList model: adding, ticking off, removing and filtering - all without a page.

import { assertEquals, assertThrows } from "@std/assert";
import type { Todo } from "../src/Todo.ts";
import { TodoList } from "../src/TodoList.ts";

/** The texts of some to-dos - easier to compare than the objects. */
const textsOf = (todos: Todo[]): string[] => todos.map((todo) => todo.text);

/** A list of three, with the middle one ticked off. Ids 1, 2, 3. */
const sampleList = (): TodoList => {
  const list = new TodoList();
  list.add("Buy milk");
  list.add("Post letter");
  list.add("Ring Gran");
  list.toggle(2);
  return list;
};

Deno.test("each new to-do gets the next id", () => {
  const list = new TodoList();
  assertEquals(list.add("one").id, 1);
  assertEquals(list.add("two").id, 2);
});

Deno.test("text is trimmed, and blank text is refused", () => {
  const list = new TodoList();
  assertEquals(list.add("  Buy milk ").text, "Buy milk");
  assertThrows(() => list.add("   "), Error, "needs some text");
});

Deno.test("the all filter shows everything, oldest first", () => {
  assertEquals(textsOf(sampleList().visible("all")), ["Buy milk", "Post letter", "Ring Gran"]);
});

Deno.test("the active filter hides done to-dos", () => {
  assertEquals(textsOf(sampleList().visible("active")), ["Buy milk", "Ring Gran"]);
});

Deno.test("the done filter shows only done to-dos", () => {
  assertEquals(textsOf(sampleList().visible("done")), ["Post letter"]);
});

Deno.test("remaining counts the to-dos not done", () => {
  assertEquals(sampleList().remaining, 2);
});

Deno.test("remove takes out the to-do with that id", () => {
  const list = sampleList();
  list.remove(1);
  assertEquals(textsOf(list.visible("all")), ["Post letter", "Ring Gran"]);
});

Deno.test("ids are never reused after a remove", () => {
  const list = sampleList();
  list.remove(3);
  assertEquals(list.add("Water plants").id, 4);
});

Deno.test("toggling or removing an id that is not there throws", () => {
  const list = sampleList();
  assertThrows(() => list.toggle(99), Error, "no to-do with id 99");
  assertThrows(() => list.remove(99), Error, "no to-do with id 99");
});

// CHALLENGE 5
Deno.test("moveUp swaps a to-do with the one above", () => {
  const list = sampleList();
  list.moveUp(3);
  assertEquals(textsOf(list.visible("all")), ["Buy milk", "Ring Gran", "Post letter"]);
});

// CHALLENGE 5
Deno.test("moveDown swaps a to-do with the one below", () => {
  const list = sampleList();
  list.moveDown(1);
  assertEquals(textsOf(list.visible("all")), ["Post letter", "Buy milk", "Ring Gran"]);
});

// CHALLENGE 5
Deno.test("the first cannot move up and the last cannot move down", () => {
  const list = sampleList();
  list.moveUp(1);
  list.moveDown(3);
  assertEquals(textsOf(list.visible("all")), ["Buy milk", "Post letter", "Ring Gran"]);
});

// CHALLENGE 5
Deno.test("with a filter, a to-do moves past the hidden ones", () => {
  // Post letter (2) is done, so Active shows Buy milk, Ring Gran: moving Ring Gran up passes Post letter.
  const list = sampleList();
  list.moveUp(3, "active");
  assertEquals(textsOf(list.visible("all")), ["Ring Gran", "Post letter", "Buy milk"]);
  assertEquals(textsOf(list.visible("active")), ["Ring Gran", "Buy milk"]);
});

// CHALLENGE 5
Deno.test("moving an id that is not there throws", () => {
  assertThrows(() => sampleList().moveUp(99), Error, "no to-do with id 99");
});
