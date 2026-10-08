// A module HAS students. The students are not owned by the module: the same Student object can be
// enrolled on several modules (aggregation). The array of students is the module's own, though,
// and only the module's methods change it.

import type { Student } from "./Student.ts";

export class Module {
  private students: Student[] = [];

  constructor(
    public readonly code: string,
    public readonly title: string,
    public readonly credits: number,
  ) {}

  /** Is a student with this id enrolled? Compares ids, not objects: see the note below. */
  public isEnrolled(student: Student): boolean {
    // some(...) is true if the arrow function is true for at least one element.
    // Comparing ids, not objects (===), means a second Student object for the same person - made
    // from the same data, say - still counts as the same student.
    return this.students.some((enrolled) => enrolled.id === student.id);
  }

  /** Adds a student. Enrolling the same student twice is a mistake, so it throws. */
  public enrol(student: Student): void {
    if (this.isEnrolled(student)) {
      throw new Error(`${student.name} is already enrolled on ${this.code}`);
    }
    this.students.push(student);
  }

  /** Removes the student with this id, if they are enrolled. */
  public withdraw(id: string): void {
    this.students = this.students.filter((student) => student.id !== id);
  }

  /** A copy of the enrolled students, in the order they enrolled. */
  public getStudents(): readonly Student[] {
    return [...this.students];
  }

  public count(): number {
    return this.students.length;
  }

  public toString(): string {
    return `${this.code} ${this.title} (${this.credits} credits)`;
  }
}
