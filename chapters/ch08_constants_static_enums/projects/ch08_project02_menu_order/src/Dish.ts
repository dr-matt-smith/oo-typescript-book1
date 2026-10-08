// One dish on the menu. Its fields are readonly: a dish does not change once it is on the menu.

import { type Course, type Diet, toCourse, toDiet } from "./diet.ts";

/** The shape of a dish in menu.json, where everything is a plain string or number. */
export type DishData = { name: string; course: string; diet: string; price: number };

export class Dish {
  constructor(
    public readonly name: string,
    public readonly course: Course,
    public readonly diet: Diet,
    public readonly priceInCents: number,
  ) {}

  /**
   * A static "factory" method: it belongs to the class, not to a dish, and makes a Dish from the
   * JSON data - checking the course and diet on the way, so a typo in menu.json is caught.
   */
  public static fromData(data: DishData): Dish {
    return new Dish(data.name, toCourse(data.course), toDiet(data.diet), data.price);
  }
}
