// Tests for src/TicketQueue.ts.
// CHALLENGE 5: each queue has its own machine, so a fresh queue needs no reset.

import { assertEquals } from "@std/assert";
import { type Ticket } from "../src/Ticket.ts";
import { TicketMachine } from "../src/TicketMachine.ts";
import { TicketQueue } from "../src/TicketQueue.ts";

/** A fresh queue with its own machine - every test's starting point. */
const freshQueue = (): TicketQueue => new TicketQueue(new TicketMachine("A"));

const printed = (tickets: Ticket[]): string[] => tickets.map((ticket) => ticket.toString());

Deno.test("a new queue has nobody waiting and nobody being served", () => {
  const queue = freshQueue();
  assertEquals(queue.getWaiting(), []);
  assertEquals(queue.nowServing(), undefined);
});

Deno.test("taking tickets puts them in the queue, in order", () => {
  const queue = freshQueue();
  queue.take();
  queue.take();
  assertEquals(printed(queue.getWaiting()), ["A001", "A002"]);
});

Deno.test("serving takes the first ticket out of the queue", () => {
  const queue = freshQueue();
  queue.take();
  queue.take();
  queue.serveNext();
  assertEquals(queue.nowServing()?.toString(), "A001");
  assertEquals(printed(queue.getWaiting()), ["A002"]);
});

Deno.test("serving an empty queue means nobody is being served", () => {
  const queue = freshQueue();
  queue.take();
  queue.serveNext();
  queue.serveNext();
  assertEquals(queue.nowServing(), undefined);
});

// CHALLENGE 5: this test used to show two queues sharing one counter. Now each has its own.
Deno.test("two queues with their own machines number independently", () => {
  const parcels = new TicketQueue(new TicketMachine("P"));
  const payments = new TicketQueue(new TicketMachine("M"));
  assertEquals(parcels.take().toString(), "P001");
  assertEquals(payments.take().toString(), "M001");
  assertEquals(parcels.take().toString(), "P002");
});
