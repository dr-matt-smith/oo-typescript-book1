// Functions that work on any shapes at all. They only use what the Shape interface promises,
// so they work for circles, rectangles, triangles - and for shapes nobody has written yet.

import type { Shape } from "./Shape.ts";

/** The areas of all the shapes, added up. */
export const totalArea = (shapes: Shape[]): number => shapes.reduce((total, shape) => total + shape.area(), 0);

/** A number for the table: one decimal place. */
export const oneDecimal = (value: number): string => value.toFixed(1);


// CHALLENGE 6
/** The shape at (x, y), or undefined. Later shapes are drawn on top, so the search starts at the end. */
export const shapeAt = (shapes: Shape[], x: number, y: number): Shape | undefined =>
  shapes.findLast((shape) => shape.contains(x, y));

// CHALLENGE 6
/** One line about a shape: "Circle: area 78.5, perimeter 31.4". */
export const describe = (shape: Shape): string =>
  `${shape.name}: area ${oneDecimal(shape.area())}, perimeter ${oneDecimal(shape.perimeter())}`;
