// CHALLENGE 2
// Technician: a Person who looks after a lab.

import { Person, type Role } from "./Person.ts";

export class Technician extends Person {
  constructor(name: string, email: string, private readonly lab: string) {
    super(name, email);
  }

  public getLab(): string {
    return this.lab;
  }

  public override getRole(): Role {
    return "Technician";
  }

  public override toString(): string {
    return `${super.toString()}, technician, lab ${this.lab}`;
  }
}
