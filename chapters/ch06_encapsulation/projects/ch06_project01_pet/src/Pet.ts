// A pet, written the Java way: every field is private, and the outside world reads and changes it
// only through public getX(), isX() and setX() methods. The setters check every value, so a Pet
// can never hold a blank name or an impossible age - whatever the page (or a bug) asks for.

const DEFAULT_AGE = 5;

export class Pet {
  private name: string;
  // readonly: set once, in the constructor, and never again. A dog stays a dog.
  private readonly species: string;
  private age: number;
  private hungry: boolean = false;

  constructor(name: string, species: string, age: number = DEFAULT_AGE) {
    // The constructor uses the same checks as the setters, so a Pet cannot start life invalid either.
    this.name = this.checkName(name);
    this.species = species;
    this.age = this.checkAge(age);
  }

  public getName(): string {
    return this.name;
  }

  /** Renames the pet. Throws an Error (and keeps the old name) if the new name is blank. */
  public setName(name: string): void {
    this.name = this.checkName(name);
  }

  // No setSpecies: the field is readonly, and there is nothing for a setter to do.
  public getSpecies(): string {
    return this.species;
  }

  public getAge(): number {
    return this.age;
  }

  /** Changes the age. Throws an Error (and keeps the old age) unless it is a whole number, 0 or more. */
  public setAge(age: number): void {
    this.age = this.checkAge(age);
  }

  /** One year older. Cannot make the age invalid, so it needs no check. */
  public haveBirthday(): void {
    this.age++;
  }

  // A boolean's getter is called isX(), not getX() - the same convention as Java.
  public isHungry(): boolean {
    return this.hungry;
  }

  public play(): void {
    this.hungry = true;
  }

  public feed(): void {
    this.hungry = false;
  }

  /** For example "(PET) Rex is a dog, and is 3 years old." */
  public toString(): string {
    const years = this.age === 1 ? "year" : "years";
    return `(PET) ${this.name} is a ${this.species}, and is ${this.age} ${years} old.`;
  }

  // Private methods: helpers for this class only. main.ts cannot call them, and does not need to.

  /** Gives back the name if it is allowed; throws an Error if it is blank. */
  private checkName(name: string): string {
    if (name.trim() === "") {
      throw new Error("A pet needs a name");
    }
    return name;
  }

  /** Gives back the age if it is allowed; throws an Error if not. */
  private checkAge(age: number): number {
    if (!Number.isInteger(age) || age < 0) {
      throw new Error(`Age must be a whole number, 0 or more (not ${age})`);
    }
    return age;
  }
}
