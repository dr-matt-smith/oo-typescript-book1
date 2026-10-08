// Tests for the TodoList model: adding, ticking off, removing and filtering - all without a page.

import { assertEquals, assertThrows } from "@std/assert";
import type { Todo } from "../src/Todo.ts";
import { type TodoData, TodoList } from "../src/TodoList.ts"; // CHALLENGE 6

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

// CHALLENGE 6
Deno.test("toData gives the to-dos as plain data", () => {
  assertEquals(sampleList().toData(), [
    { id: 1, text: "Buy milk", done: false },
    { id: 2, text: "Post letter", done: true },
    { id: 3, text: "Ring Gran", done: false },
  ]);
});

// CHALLENGE 6
Deno.test("a list survives the round trip through data", () => {
  const copy = new TodoList(sampleList().toData());
  assertEquals(copy.toData(), sampleList().toData());
  assertEquals(textsOf(copy.visible("done")), ["Post letter"]);
});

// CHALLENGE 6
Deno.test("a list built from data hands out the next id after the largest", () => {
  const data: TodoData[] = [{ id: 7, text: "Old", done: false }, { id: 3, text: "Older", done: true }];
  assertEquals(new TodoList(data).add("New").id, 8);
});

// CHALLENGE 6
Deno.test("the round trip works through a JSON string too", () => {
  const saved = JSON.stringify(sampleList().toData());
  assertEquals(new TodoList(JSON.parse(saved)).remaining, 2);
});
