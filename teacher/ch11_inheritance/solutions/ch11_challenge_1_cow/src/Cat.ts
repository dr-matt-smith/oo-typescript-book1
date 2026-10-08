// Cat: an Animal that says "Meow". It has no constructor of its own, so it uses Animal's:
// `new Cat("Tom")` runs Animal's constructor with "Tom".

import { Animal } from "./Animal.ts";

export class Cat extends Animal {
  // `override`: this replaces a method of Animal. The compiler checks that Animal has one.
  public override getSound(): string {
    return "Meow";
  }

  public override toString(): string {
    // `name` is protected in Animal, so a subclass may use it.
    return `${this.name}, a cat`;
  }
}
