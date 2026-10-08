// One module of a course: a code, a title, its credits, and the semester it runs in.
// Most modules are worth 5 credits, so that is the default. A module with no semester runs all year.

/** Most modules are worth this many credits. */
const DEFAULT_CREDITS = 5;

export class Module {
  constructor(
    private code: string,
    private title: string,
    private credits: number = DEFAULT_CREDITS,
    private semester?: number, // optional: undefined means the module runs all year
  ) {}

  public getCode(): string {
    return this.code;
  }

  public getTitle(): string {
    return this.title;
  }

  public getCredits(): number {
    return this.credits;
  }

  /** The semester (1 or 2), or undefined for a module that runs all year. */
  public getSemester(): number | undefined {
    return this.semester;
  }

  /** True when the module has no semester, because it runs all year. */
  public isYearLong(): boolean {
    return this.semester === undefined;
  }

  /** Does this module run in the given semester? A year-long module runs in both. */
  public runsIn(semester: number): boolean {
    return this.isYearLong() || this.semester === semester;
  }

  /** For example "COMP1001 Programming 1 (10 credits)". */
  public toString(): string {
    return `${this.code} ${this.title} (${this.credits} credits)`;
  }
}
