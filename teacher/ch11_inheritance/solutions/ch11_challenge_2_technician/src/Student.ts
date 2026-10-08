// Student: a Person with a student number and a course.

import { Person, type Role } from "./Person.ts";

export class Student extends Person {
  // name and email are plain parameters, handed on to Person's constructor.
  // studentId and course are new parameter properties, belonging to Student.
  constructor(name: string, email: string, private readonly studentId: string, private readonly course: string) {
    // A subclass constructor must call super(...) - Person's constructor - before it uses `this`.
    super(name, email);
  }

  public getStudentId(): string {
    return this.studentId;
  }

  public getCourse(): string {
    return this.course;
  }

  public override getRole(): Role {
    return "Student";
  }

  public override toString(): string {
    // super.toString() runs Person's version: "Ann <ann@college.ie>". Student adds to it.
    return `${super.toString()}, student ${this.studentId}, ${this.course}`;
  }
}
