// CHALLENGE 5: a pet, written the TypeScript way. The getX()/setX() methods have become get/set
// accessors, so other code writes pet.name and pet.age = 4. The setters still check every value, so
// a Pet can never hold a blank name or an impossible age.

const DEFAULT_AGE = 5;

export class Pet {
  // CHALLENGE 5: #fields, so the accessors can be called name, age and hungry
  #name: string;
  #age: number;
  #hungry: boolean = false;

  // CHALLENGE 5: species has no rules and never changes, so a public readonly parameter property
  // replaces the private field and getSpecies().
  constructor(name: string, public readonly species: string, age: number = DEFAULT_AGE) {
    // The constructor uses the same checks as the setters, so a Pet cannot start life invalid either.
    this.#name = this.#checkName(name);
    this.#age = this.#checkAge(age);
  }

  // CHALLENGE 5
  public get name(): string {
    return this.#name;
  }

  /** Runs on `pet.name = ...`. Throws an Error (and keeps the old name) if the new name is blank. */
  public set name(name: string) { // CHALLENGE 5
    this.#name = this.#checkName(name);
  }

  // CHALLENGE 5
  public get age(): number {
    return this.#age;
  }

  /** Runs on `pet.age = ...`. Throws an Error (and keeps the old age) unless it is a whole number, 0 or more. */
  public set age(age: number) { // CHALLENGE 5
    this.#age = this.#checkAge(age);
  }

  /** One year older. Cannot make the age invalid, so it needs no check. */
  public haveBirthday(): void {
    this.#age++;
  }

  // CHALLENGE 5: a read-only property. Changing it is done by play() and feed(), which say what happens.
  public get hungry(): boolean {
    return this.#hungry;
  }

  public play(): void {
    this.#hungry = true;
  }

  public feed(): void {
    this.#hungry = false;
  }

  /** For example "(PET) Rex is a dog, and is 3 years old." */
  public toString(): string {
    const years = this.#age === 1 ? "year" : "years";
    return `(PET) ${this.#name} is a ${this.species}, and is ${this.#age} ${years} old.`;
  }

  // CHALLENGE 5: #private helpers, to match the #fields

  /** Gives back the name if it is allowed; throws an Error if it is blank. */
  #checkName(name: string): string {
    if (name.trim() === "") {
      throw new Error("A pet needs a name");
    }
    return name;
  }

  /** Gives back the age if it is allowed; throws an Error if not. */
  #checkAge(age: number): number {
    if (!Number.isInteger(age) || age < 0) {
      throw new Error(`Age must be a whole number, 0 or more (not ${age})`);
    }
    return age;
  }
}
