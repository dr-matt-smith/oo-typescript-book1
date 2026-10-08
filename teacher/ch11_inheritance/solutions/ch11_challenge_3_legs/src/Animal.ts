// Animal: everything that cats, dogs and any other animal have in common.
//
// It is `abstract`: there is no such thing as "just an animal", so `new Animal("Tom")` is an
// error. Each kind of animal is a subclass that `extends Animal` and says what sound it makes.

export abstract class Animal {
  // `protected`: this class and its subclasses can read `name`; code outside cannot.
  // `readonly`: an animal keeps its name.
  // CHALLENGE 3: a second parameter, legs. Each subclass now has to say how many.
  constructor(protected readonly name: string, private readonly legs: number) {}

  // CHALLENGE 3
  public getLegs(): number {
    return this.legs;
  }

  public getName(): string {
    return this.name;
  }

  /** Every animal makes a sound, but each kind makes its own - so there is no body here. */
  public abstract getSound(): string;

  /** Written once, for every animal. It calls getSound(), and the subclass's version runs. */
  public speak(): string {
    return `${this.name} says ${this.getSound()}`;
  }

  /** A subclass can override this to say what kind of animal it is. */
  public toString(): string {
    return `${this.name}, an animal`;
  }
}
