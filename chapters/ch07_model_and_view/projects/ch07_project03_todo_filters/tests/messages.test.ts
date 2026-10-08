// Tests for the words on the page.

import { assertEquals } from "@std/assert";
import { emptyText, remainingText } from "../src/messages.ts";

Deno.test("remaining: none, one, and more than one", () => {
  assertEquals(remainingText(0), "Nothing left to do");
  assertEquals(remainingText(1), "1 item left");
  assertEquals(remainingText(2), "2 items left");
});

Deno.test("each filter has its own empty message", () => {
  assertEquals(emptyText("all"), "Nothing to do - add something above");
  assertEquals(emptyText("active"), "Nothing active - well done!");
  assertEquals(emptyText("done"), "Nothing done yet");
});
