// Lecturer: a Person with a department and an office.

import { Person, type Role } from "./Person.ts";

export class Lecturer extends Person {
  constructor(name: string, email: string, private readonly department: string, private readonly office: string) {
    super(name, email);
  }

  public getDepartment(): string {
    return this.department;
  }

  public override getRole(): Role {
    return "Lecturer";
  }

  public override toString(): string {
    return `${super.toString()}, lecturer in ${this.department}, room ${this.office}`;
  }

  /** How a lecturer signs an email. `name` is protected in Person, so Lecturer can read it. */
  public signature(): string {
    return `${this.name}, Department of ${this.department}`;
  }
}
