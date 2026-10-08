// A numbered ticket, like the ones at a deli counter: A001, A002, A003 ...
// The number to give the next ticket belongs to the class, not to any one ticket - it is static.

export class Ticket {
  /** Printed before every number. static readonly: one value for the class, never changed. */
  public static readonly PREFIX = "A";

  /** How many digits the number is padded to: 7 is shown as 007. */
  public static readonly DIGITS = 3;

  // static, but not readonly: one counter, shared by every ticket, that goes up each time a ticket
  // is made. There is exactly one nextNumber, however many tickets exist - even none.
  private static nextNumber = 1;

  // readonly, not static: every ticket has its own number, fixed when the ticket is made.
  public readonly number: number;

  constructor() {
    // Inside the class, static members are still reached through the class name, never `this`.
    this.number = Ticket.nextNumber;
    Ticket.nextNumber++;
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
    return Ticket.nextNumber - 1;
  }

  /** Starts the numbering again from 1: for a new day - and for tests, which each need a fresh start. */
  public static resetNumbering(): void {
    Ticket.nextNumber = 1;
  }
}
