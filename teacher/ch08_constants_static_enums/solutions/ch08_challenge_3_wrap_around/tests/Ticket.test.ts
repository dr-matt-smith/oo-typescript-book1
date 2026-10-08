// Tests for src/Ticket.ts. The counter is static - shared by every test in this file - so each
// test starts by resetting it. Without that, each test would depend on the ones before it.

import { assertEquals } from "@std/assert";
import { Ticket } from "../src/Ticket.ts";

Deno.test("the first ticket is number 1", () => {
  Ticket.resetNumbering();
  const ticket = new Ticket();
  assertEquals(ticket.number, 1);
});

Deno.test("each new ticket gets the next number", () => {
  Ticket.resetNumbering();
  const first = new Ticket();
  const second = new Ticket();
  assertEquals(first.number, 1);
  assertEquals(second.number, 2);
});

Deno.test("a ticket is printed with the prefix and three digits", () => {
  Ticket.resetNumbering();
  assertEquals(new Ticket().toString(), "A001");
});

Deno.test("format pads short numbers, and leaves long ones alone", () => {
  assertEquals(Ticket.format(7), "A007");
  assertEquals(Ticket.format(42), "A042");
  assertEquals(Ticket.format(999), "A999");
  assertEquals(Ticket.format(1000), "A1000");
});

Deno.test("issuedCount counts the tickets made since the reset", () => {
  Ticket.resetNumbering();
  assertEquals(Ticket.issuedCount(), 0);
  new Ticket();
  new Ticket();
  new Ticket();
  assertEquals(Ticket.issuedCount(), 3);
});

Deno.test("after a reset, numbering starts at 1 again", () => {
  Ticket.resetNumbering();
  new Ticket();
  new Ticket();
  Ticket.resetNumbering();
  assertEquals(new Ticket().number, 1);
});

// CHALLENGE 3
/** Makes `count` tickets and gives back the last one. */
const makeTickets = (count: number): Ticket => {
  let last = new Ticket();
  for (let made = 1; made < count; made++) {
    last = new Ticket();
  }
  return last;
};

Deno.test("ticket 999 is the last before the numbers go round again", () => {
  Ticket.resetNumbering();
  assertEquals(makeTickets(999).toString(), "A999");
});

Deno.test("after A999 the next ticket is A001", () => {
  Ticket.resetNumbering();
  makeTickets(999);
  assertEquals(new Ticket().toString(), "A001");
});

Deno.test("issuedCount keeps counting after the numbers go round", () => {
  Ticket.resetNumbering();
  makeTickets(1000);
  assertEquals(Ticket.issuedCount(), 1000);
});
