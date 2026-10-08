// Tests for src/messages.ts.

import { assertEquals } from "@std/assert";
import { describeCount } from "../src/messages.ts";

Deno.test("no clicks", () => {
  assertEquals(describeCount(0), "No clicks yet");
});

Deno.test("one click is singular", () => {
  assertEquals(describeCount(1), "1 click");
});

Deno.test("more than one click is plural", () => {
  assertEquals(describeCount(5), "5 clicks");
});
