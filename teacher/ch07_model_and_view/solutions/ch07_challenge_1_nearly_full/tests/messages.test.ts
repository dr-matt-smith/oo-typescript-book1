// CHALLENGE 1: tests for the status line.

import { assertEquals } from "@std/assert";
import { statusMessage } from "../src/messages.ts";
import { Tally } from "../src/Tally.ts";

const roomOf10With = (people: number): Tally => {
  const tally = new Tally(10);
  for (let i = 0; i < people; i++) {
    tally.increment();
  }
  return tally;
};

Deno.test("the status of a room with plenty of space", () => {
  assertEquals(statusMessage(roomOf10With(5)), "5 spaces left");
});

Deno.test("the status of a nearly full room", () => {
  assertEquals(statusMessage(roomOf10With(8)), "Nearly full - 2 spaces left");
});

Deno.test("the status of a full room", () => {
  assertEquals(statusMessage(roomOf10With(10)), "Full - nobody else may come in");
});
