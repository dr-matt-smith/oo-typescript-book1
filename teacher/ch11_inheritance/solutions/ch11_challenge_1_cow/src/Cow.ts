// CHALLENGE 1
// Cow: an Animal that says "Moo". Like Cat, it uses Animal's constructor.

import { Animal } from "./Animal.ts";

export class Cow extends Animal {
  public override getSound(): string {
    return "Moo";
  }

  public override toString(): string {
    return `${this.name}, a cow`;
  }
}
