// Functions that work on any shapes at all. They only use what the Shape interface promises,
// so they work for circles, rectangles, triangles - and for shapes nobody has written yet.

import type { Shape } from "./Shape.ts";

/** The areas of all the shapes, added up. */
export const totalArea = (shapes: Shape[]): number => shapes.reduce((total, shape) => total + shape.area(), 0);

/** A number for the table: one decimal place. */
export const oneDecimal = (value: number): string => value.toFixed(1);

