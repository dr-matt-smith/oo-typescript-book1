// Tests for src/Ticket.ts.
// CHALLENGE 5: tickets are now given their prefix and number, so there is no static state and no
// test needs to reset anything.

import { assertEquals } from "@std/assert";
import { Ticket } from "../src/Ticket.ts";

Deno.test("a ticket keeps the prefix and number it was given", () => {
  const ticket = new Ticket("P", 4);
  assertEquals(ticket.prefix, "P");
  assertEquals(ticket.number, 4);
});

Deno.test("a ticket is printed with its prefix and three digits", () => {
  assertEquals(new Ticket("A", 1).toString(), "A001");
});

Deno.test("format pads short numbers, and leaves long ones alone", () => {
  assertEquals(Ticket.format("A", 7), "A007");
  assertEquals(Ticket.format("A", 42), "A042");
  assertEquals(Ticket.format("A", 999), "A999");
  assertEquals(Ticket.format("A", 1000), "A1000");
});
