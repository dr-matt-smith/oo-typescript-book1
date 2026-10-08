// Dog: an Animal that says "Woof" - and can do something cats cannot: wag its tail.

import { Animal } from "./Animal.ts";

export class Dog extends Animal {
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
