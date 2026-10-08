// Functions that work with any animals at all. They only know about Animal, not Cat or Dog.

import type { Animal } from "./Animal.ts";

/** Every animal speaks, in order. Each one uses its own getSound(). */
export const chorus = (animals: Animal[]): string[] => animals.map((animal) => animal.speak());
