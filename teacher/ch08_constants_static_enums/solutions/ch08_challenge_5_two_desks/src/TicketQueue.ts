// The queue at the counter: customers take tickets, and the assistant serves them in order.

import { type Ticket } from "./Ticket.ts";
import { type TicketMachine } from "./TicketMachine.ts"; // CHALLENGE 5

export class TicketQueue {
  private waiting: Ticket[] = [];
  private serving: Ticket | undefined = undefined;

  // CHALLENGE 5: each queue is given its own machine
  constructor(private readonly machine: TicketMachine) {}

  /** A customer takes the next ticket and joins the end of the queue. */
  public take(): Ticket {
    const ticket = this.machine.take(); // CHALLENGE 5
    this.waiting.push(ticket);
    return ticket;
  }

  /** Calls the first ticket in the queue. If nobody is waiting, nobody is being served. */
  public serveNext(): void {
    // shift() removes and returns the first element - or undefined if the array is empty.
    this.serving = this.waiting.shift();
  }

  /** The ticket being served now, or undefined if nobody is. */
  public nowServing(): Ticket | undefined {
    return this.serving;
  }

  /** The tickets still waiting, first in the queue first. */
  public getWaiting(): Ticket[] {
    return this.waiting;
  }
}
