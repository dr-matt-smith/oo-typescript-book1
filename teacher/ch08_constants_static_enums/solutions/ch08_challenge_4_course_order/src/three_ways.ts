// The same set of diets written the three ways TypeScript allows, side by side, for comparison.
// The rest of the project uses the third way (src/diet.ts); tests/three_ways.test.ts shows how
// each one behaves. Nothing on the page uses this file.

// 1. An enum - like Java's. Each member is given a string value; without one, members are
//    numbered 0, 1, 2 ... (see NumberedCourse below). Unlike almost all of TypeScript, an enum is
//    not just a type: it becomes a real object in the JavaScript.
export enum DietEnum {
  Vegan = "vegan",
  Vegetarian = "vegetarian",
  Meat = "meat",
}

/** An enum without values: its members are numbered from 0. */
export enum NumberedCourse {
  Starter,
  Main,
  Dessert,
}

// 2. A string-literal union - only a type. It disappears completely from the JavaScript.
export type DietUnion = "vegan" | "vegetarian" | "meat";

// 3a. An array `as const`, with the union worked out from it - what src/diet.ts does.
export const DIET_VALUES = ["vegan", "vegetarian", "meat"] as const;
export type DietFromArray = (typeof DIET_VALUES)[number];

// 3b. An object `as const` - enum-style names (Diet.Vegan) for plain strings.
export const Diet = { Vegan: "vegan", Vegetarian: "vegetarian", Meat: "meat" } as const;
/** "vegan" | "vegetarian" | "meat": the type of any value in the Diet object. */
export type Diet = (typeof Diet)[keyof typeof Diet];
