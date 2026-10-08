// CHALLENGE 5
// A ticket machine for one desk. The counter that used to be static in Ticket lives here now, as an
// ordinary field - so every machine has its own, and two desks can each start at 1.

import { Ticket } from "./Ticket.ts";

export class TicketMachine {
  private nextNumber = 1;

  constructor(private readonly prefix: string) {}

  /** Prints the next ticket. */
  public take(): Ticket {
    const ticket = new Ticket(this.prefix, this.nextNumber);
    this.nextNumber++;
    return ticket;
  }

  /** How many tickets this machine has printed. */
  public issuedCount(): number {
    return this.nextNumber - 1;
  }
}
