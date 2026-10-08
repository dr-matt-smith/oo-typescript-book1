// CHALLENGE 5
// PhdStudent: a Student who also teaches a module. Three levels: Person -> Student -> PhdStudent.

import { Student } from "./Student.ts";

export class PhdStudent extends Student {
  constructor(name: string, email: string, studentId: string, course: string, private readonly module: string) {
    // Student's constructor needs four arguments; it passes name and email on to Person's.
    super(name, email, studentId, course);
  }

  public getModule(): string {
    return this.module;
  }

  public override toString(): string {
    // super.toString() is Student's, which itself starts with Person's.
    return `${super.toString()}, teaches ${this.module}`;
  }
}
