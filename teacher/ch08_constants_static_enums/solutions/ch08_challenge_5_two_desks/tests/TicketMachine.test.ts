// CHALLENGE 5
// Tests for src/TicketMachine.ts. Every machine is a new object with its own counter, so each test
// starts fresh without any reset.

import { assertEquals } from "@std/assert";
import { TicketMachine } from "../src/TicketMachine.ts";

Deno.test("the first ticket from a machine is number 1", () => {
  const machine = new TicketMachine("A");
  assertEquals(machine.take().toString(), "A001");
});

Deno.test("each ticket from a machine gets the next number", () => {
  const machine = new TicketMachine("A");
  machine.take();
  assertEquals(machine.take().toString(), "A002");
});

Deno.test("two desks each number their own tickets from 1", () => {
  const parcels = new TicketMachine("P");
  const payments = new TicketMachine("M");
  const first = parcels.take();
  const second = parcels.take();
  const third = payments.take();
  assertEquals([first.toString(), second.toString(), third.toString()], ["P001", "P002", "M001"]);
});

Deno.test("issuedCount counts one machine's tickets only", () => {
  const parcels = new TicketMachine("P");
  const payments = new TicketMachine("M");
  parcels.take();
  parcels.take();
  payments.take();
  assertEquals(parcels.issuedCount(), 2);
  assertEquals(payments.issuedCount(), 1);
});
