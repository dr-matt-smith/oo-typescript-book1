// A numbered ticket, like the ones at a deli counter: A001, A002, A003 ...
// The number to give the next ticket belongs to the class, not to any one ticket - it is static.

export class Ticket {
  /** Printed before every number. static readonly: one value for the class, never changed. */
  public static readonly PREFIX = "A";

  /** How many digits the number is padded to: 7 is shown as 007. */
  public static readonly DIGITS = 3;

  /** CHALLENGE 3: the largest number that fits in DIGITS digits - 999. After it, numbering starts at 1. */
  public static readonly LARGEST = 10 ** Ticket.DIGITS - 1;

  // static, but not readonly: one counter, shared by every ticket, that goes up each time a ticket
  // is made. There is exactly one nextNumber, however many tickets exist - even none.
  private static nextNumber = 1;

  // CHALLENGE 3: the numbers now go round, so nextNumber - 1 is no longer the count. Keep a count too.
  private static issued = 0;

  // readonly, not static: every ticket has its own number, fixed when the ticket is made.
  public readonly number: number;

  constructor() {
    // Inside the class, static members are still reached through the class name, never `this`.
    this.number = Ticket.nextNumber;
    // CHALLENGE 3: after the largest number, start again at 1
    Ticket.nextNumber = Ticket.nextNumber === Ticket.LARGEST ? 1 : Ticket.nextNumber + 1;
    Ticket.issued++;
  }

  /** The ticket as printed: A007. */
  public toString(): string {
    return Ticket.format(this.number);
  }

  /** How any number looks when printed. Static: it needs a number, not a ticket. */
  public static format(number: number): string {
    return `${Ticket.PREFIX}${String(number).padStart(Ticket.DIGITS, "0")}`;
  }

  /** How many tickets have been made since numbering last started at 1. */
  public static issuedCount(): number {
    return Ticket.issued; // CHALLENGE 3
  }

  /** Starts the numbering again from 1: for a new day - and for tests, which each need a fresh start. */
  public static resetNumbering(): void {
    Ticket.nextNumber = 1;
    Ticket.issued = 0; // CHALLENGE 3
  }
}
