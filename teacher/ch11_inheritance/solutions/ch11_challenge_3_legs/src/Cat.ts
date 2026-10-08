// Cat: an Animal that says "Meow", with four legs. (CHALLENGE 3: it now has a constructor.)

import { Animal } from "./Animal.ts";

const CAT_LEGS = 4; // CHALLENGE 3

export class Cat extends Animal {
  // CHALLENGE 3: Animal's constructor now needs the legs, so Cat needs a constructor of its own.
  constructor(name: string) {
    super(name, CAT_LEGS);
  }

  // `override`: this replaces a method of Animal. The compiler checks that Animal has one.
  public override getSound(): string {
    return "Meow";
  }

  public override toString(): string {
    // `name` is protected in Animal, so a subclass may use it.
    return `${this.name}, a cat`;
  }
}
