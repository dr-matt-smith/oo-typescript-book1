// A circle, centred on (x, y).

import type { Pen } from "./Pen.ts";
import type { Shape } from "./Shape.ts";

const FULL_TURN = 2 * Math.PI; // a whole circle, in radians - what canvas arc() measures angles in

export class Circle implements Shape {
  public readonly name: string = "Circle";

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly radius: number,
    public readonly colour: string,
  ) {}

  public area(): number {
    return Math.PI * this.radius * this.radius;
  }

  public perimeter(): number {
    return FULL_TURN * this.radius;
  }

  public draw(pen: Pen): void {
    pen.beginPath();
    pen.arc(this.x, this.y, this.radius, 0, FULL_TURN);
    pen.fill();
  }

  // CHALLENGE 6: inside if the point is no further from the centre than the radius
  public contains(x: number, y: number): boolean {
    return Math.hypot(x - this.x, y - this.y) <= this.radius;
  }
}
