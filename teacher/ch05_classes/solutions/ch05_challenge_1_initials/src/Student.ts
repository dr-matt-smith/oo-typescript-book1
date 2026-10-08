// A student: an id, a name, a course, and perhaps a nickname.
// The constructor's parameters are also the fields - TypeScript's "parameter properties".

/** The course a student is on until they choose one. */
const DEFAULT_COURSE = "Undecided";

export class Student {
  // Each parameter marked `private` becomes a private field, set from the argument - no
  // separate field declarations, and no `this.id = id;` lines are needed.
  constructor(
    private id: number,
    private firstName: string,
    private surname: string,
    private course: string = DEFAULT_COURSE, // a default: used when no course (or undefined) is given
    private nickname?: string, // optional: may be left out, and is then undefined
  ) {}

  public getId(): number {
    return this.id;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.surname}`;
  }

  public getCourse(): string {
    return this.course;
  }

  // CHALLENGE 1
  /** The first letter of the first name and of the surname, e.g. "AL" for Ada Lovelace. */
  public getInitials(): string {
    return `${this.firstName.charAt(0)}${this.surname.charAt(0)}`;
  }

  /** The name to greet the student by: their nickname if they have one, otherwise their first name. */
  public getGreetingName(): string {
    if (this.nickname === undefined) {
      return this.firstName;
    }
    return this.nickname;
  }

  /** A short summary of the student, for showing or logging - like Java's toString(). */
  public toString(): string {
    return `(Student) ${this.id} ${this.getFullName()}, ${this.course}`;
  }
}
