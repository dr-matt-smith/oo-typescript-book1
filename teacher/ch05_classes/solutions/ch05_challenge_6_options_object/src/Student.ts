// A student: an id, a name, a course, a year of study, and perhaps a nickname and an email address.
// CHALLENGE 6: the constructor takes ONE object - a StudentData - instead of a long list of
// arguments, so every value is named where the student is made, and any optional one can be left out.

/** The course a student is on until they choose one. */
const DEFAULT_COURSE = "Undecided";

/** Students start in year 1 unless you say otherwise. */
const DEFAULT_YEAR = 1; // CHALLENGE 6

// CHALLENGE 6: the shape of the constructor's argument (and of one student in students.json).
// It lives here, beside the class that uses it.
export type StudentData = {
  id: number;
  firstName: string;
  surname: string;
  course?: string;
  year?: number;
  nickname?: string;
  email?: string;
};

export class Student {
  // CHALLENGE 6: ordinary private fields again - parameter properties only work for parameters
  private id: number;
  private firstName: string;
  private surname: string;
  private course: string;
  private year: number;
  private nickname?: string;
  private email?: string;

  constructor(data: StudentData) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.surname = data.surname;
    // The defaults: a missing property reads as undefined, so it is replaced here.
    this.course = data.course === undefined ? DEFAULT_COURSE : data.course;
    this.year = data.year === undefined ? DEFAULT_YEAR : data.year;
    this.nickname = data.nickname;
    this.email = data.email;
  }

  public getId(): number {
    return this.id;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.surname}`;
  }

  public getCourse(): string {
    return this.course;
  }

  // CHALLENGE 6
  public getYear(): number {
    return this.year;
  }

  // CHALLENGE 6
  /** The email address, or undefined if there is none. */
  public getEmail(): string | undefined {
    return this.email;
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
    return `(Student) ${this.id} ${this.getFullName()}, ${this.course}, year ${this.year}`; // CHALLENGE 6
  }
}
