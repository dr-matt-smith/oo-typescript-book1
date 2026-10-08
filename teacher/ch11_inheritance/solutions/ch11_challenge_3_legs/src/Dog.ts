// Dog: an Animal that says "Woof" - and can wag its tail. (CHALLENGE 3: it now has a constructor.)

import { Animal } from "./Animal.ts";

const DOG_LEGS = 4; // CHALLENGE 3

export class Dog extends Animal {
  // CHALLENGE 3: Animal's constructor now needs the legs, so Dog needs a constructor of its own.
  constructor(name: string) {
    super(name, DOG_LEGS);
  }

  public override getSound(): string {
    return "Woof";
  }

  public override toString(): string {
    return `${this.name}, a dog`;
  }

  /** Only dogs have this method. A variable of type Animal cannot call it. */
  public wagTail(): string {
    return `${this.name} wags their tail`;
  }
}
