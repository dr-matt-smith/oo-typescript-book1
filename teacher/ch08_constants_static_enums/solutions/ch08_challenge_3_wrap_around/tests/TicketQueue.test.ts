// Tests for src/TicketQueue.ts. Tickets use a static counter, so each test resets it first.

import { assertEquals } from "@std/assert";
import { Ticket } from "../src/Ticket.ts";
import { TicketQueue } from "../src/TicketQueue.ts";

/** A fresh queue, with numbering starting at 1 - every test's starting point. */
const freshQueue = (): TicketQueue => {
  Ticket.resetNumbering();
  return new TicketQueue();
};

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

Deno.test("two queues share one counter: the numbers never repeat", () => {
  Ticket.resetNumbering();
  const deli = new TicketQueue();
  const bakery = new TicketQueue();
  assertEquals(deli.take().toString(), "A001");
  assertEquals(bakery.take().toString(), "A002");
  assertEquals(deli.take().toString(), "A003");
});
