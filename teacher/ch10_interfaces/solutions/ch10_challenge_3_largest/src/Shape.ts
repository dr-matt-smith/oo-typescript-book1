// The contract every shape keeps. Anything with these members can be drawn and measured -
// the page, and the functions in shapes.ts, only ever see a Shape, never a Circle or a Triangle.

import type { Pen } from "./Pen.ts";

export interface Shape {
  /** What to call it in the table: "Circle", "Rectangle" ... */
  readonly name: string;
  /** A CSS colour, used to fill it. */
  readonly colour: string;
  area(): number;
  perimeter(): number;
  /** Draws the shape, centred on its position, with the pen it is given. */
  draw(pen: Pen): void;
}
