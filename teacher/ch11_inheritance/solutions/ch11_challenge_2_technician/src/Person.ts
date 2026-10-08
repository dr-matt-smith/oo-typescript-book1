// Person: what everybody in the college has - a name and an email address.
//
// Person is an ordinary class, not abstract: a visitor is just a Person. Student and Lecturer
// extend it and add what is special about them.

/** The roles the directory knows about (a string literal union, as in Chapter 8). */
export type Role = "Visitor" | "Student" | "Lecturer" | "Technician"; // CHALLENGE 2: "Technician"

export class Person {
  // Parameter properties (Chapter 5). `protected`, so Student and Lecturer can use them too.
  constructor(protected readonly name: string, protected readonly email: string) {
    // Every Person checks this, so every Student and Lecturer gets the check for free.
    if (!email.includes("@")) {
      throw new Error(`Not an email address: ${email}`);
    }
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): Role {
    return "Visitor";
  }

  public toString(): string {
    return `${this.name} <${this.email}>`;
  }
}
