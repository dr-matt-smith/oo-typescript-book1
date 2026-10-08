// A customer's order: the dishes chosen so far, and the total.

import { COURSES } from "./diet.ts"; // CHALLENGE 4
import { type Dish } from "./Dish.ts";

const CENTS_PER_EURO = 100;

export class Order {
  private dishes: Dish[] = [];

  /** Adds a dish to the order. */
  public add(dish: Dish): void {
    this.dishes.push(dish);
  }

  /** Empties the order. */
  public clear(): void {
    this.dishes = [];
  }

  /** The dishes ordered so far, in the order they were added. */
  public getDishes(): Dish[] {
    return this.dishes;
  }

  // CHALLENGE 4
  /**
   * The dishes in the order the kitchen wants them: starters, mains, desserts. The order of the
   * courses comes from the COURSES array, so it is written down in one place only. toSorted makes a
   * copy, and keeps dishes of the same course in the order they were added.
   */
  public byCourse(): Dish[] {
    return this.dishes.toSorted((a, b) => COURSES.indexOf(a.course) - COURSES.indexOf(b.course));
  }

  /** The total, in cents. */
  public totalInCents(): number {
    return this.dishes.reduce((total, dish) => total + dish.priceInCents, 0);
  }

  /**
   * A static method: it needs no Order (it uses no `this`), so it belongs to the class.
   * Prices are kept in whole cents so that adding them up never gives 12.499999999.
   */
  public static formatPrice(cents: number): string {
    return `€${(cents / CENTS_PER_EURO).toFixed(2)}`;
  }
}
