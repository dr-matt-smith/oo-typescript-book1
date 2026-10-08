// Working with the whole menu: choosing the dishes for a diet and a course.

import { type Course, type Diet, suits } from "./diet.ts";
import { type Dish } from "./Dish.ts";

/** The dishes of one course that suit `eater` (or every dish of that course, if `eater` is null). */
export const dishesFor = (menu: Dish[], course: Course, eater: Diet | null): Dish[] =>
  menu.filter((dish) => dish.course === course && (eater === null || suits(dish.diet, eater)));
