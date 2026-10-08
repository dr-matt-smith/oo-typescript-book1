// Functions that work on any shapes at all. They only use what the Shape interface promises,
// so they work for circles, rectangles, triangles - and for shapes nobody has written yet.

import type { Shape } from "./Shape.ts";

/** The areas of all the shapes, added up. */
export const totalArea = (shapes: Shape[]): number => shapes.reduce((total, shape) => total + shape.area(), 0);

/** A number for the table: one decimal place. */
export const oneDecimal = (value: number): string => value.toFixed(1);


// CHALLENGE 3
/** The shape with the biggest area - the first one, if two tie - or undefined if there are none. */
export const largestShape = (shapes: Shape[]): Shape | undefined => {
  let largest: Shape | undefined = undefined;
  for (const shape of shapes) {
    if (largest === undefined || shape.area() > largest.area()) {
      largest = shape;
    }
  }
  return largest;
};
