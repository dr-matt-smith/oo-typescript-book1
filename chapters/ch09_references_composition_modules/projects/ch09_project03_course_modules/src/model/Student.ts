// A student. Readonly, so one Student object can safely be shared by every module they take.

export class Student {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  public toString(): string {
    return `${this.name} (${this.id})`;
  }
}
