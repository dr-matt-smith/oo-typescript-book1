// A numbered ticket, like the ones at a deli counter: A001, A002, A003 ...
// CHALLENGE 5: a ticket no longer numbers itself. A TicketMachine gives it a prefix and a number,
// so each machine can have its own counter. The static counter, issuedCount and resetNumbering are gone.

export class Ticket {
  /** How many digits the number is padded to: 7 is shown as 007. A constant, so static is fine. */
  public static readonly DIGITS = 3;

  // CHALLENGE 5: both are given by the machine; both are fixed once the ticket is printed.
  constructor(public readonly prefix: string, public readonly number: number) {}

  /** The ticket as printed: A007. */
  public toString(): string {
    return Ticket.format(this.prefix, this.number); // CHALLENGE 5
  }

  /** How any prefix and number look when printed. Static: it needs no ticket. CHALLENGE 5: takes the prefix. */
  public static format(prefix: string, number: number): string {
    return `${prefix}${String(number).padStart(Ticket.DIGITS, "0")}`;
  }
}
