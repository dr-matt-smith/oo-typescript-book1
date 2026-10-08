// CHALLENGE 3
// Bird: an Animal with two legs that says "Tweet".

import { Animal } from "./Animal.ts";

const BIRD_LEGS = 2;

export class Bird extends Animal {
  constructor(name: string) {
    super(name, BIRD_LEGS);
  }

  public override getSound(): string {
    return "Tweet";
  }

  public override toString(): string {
    return `${this.name}, a bird`;
  }
}
