// An isosceles triangle, centred on (x, y): a flat base at the bottom, and a point at the top.

import type { Pen } from "./Pen.ts";
import type { Shape } from "./Shape.ts";

export class Triangle implements Shape {
  public readonly name: string = "Triangle";

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly base: number,
    private readonly height: number,
    public readonly colour: string,
  ) {}

  public area(): number {
    return this.base * this.height / 2;
  }

  public perimeter(): number {
    // the two sloping sides are equal: Pythagoras, with half the base and the height
    const side = Math.hypot(this.base / 2, this.height);
    return this.base + 2 * side;
  }

  public draw(pen: Pen): void {
    const left = this.x - this.base / 2;
    const right = this.x + this.base / 2;
    const top = this.y - this.height / 2;
    const bottom = this.y + this.height / 2;
    pen.beginPath();
    pen.moveTo(left, bottom);
    pen.lineTo(right, bottom);
    pen.lineTo(this.x, top);
    pen.closePath();
    pen.fill();
  }

  // CHALLENGE 6: the triangle is 0 wide at the top and `base` wide at the bottom. A point is inside
  // if it is between the top and bottom, and no further from the centre line than the triangle is
  // half-wide at that height.
  public contains(x: number, y: number): boolean {
    const top = this.y - this.height / 2;
    const bottom = this.y + this.height / 2;
    if (y < top || y > bottom) {
      return false;
    }
    const halfWidthHere = (this.base / 2) * (y - top) / this.height;
    return Math.abs(x - this.x) <= halfWidthHere;
  }
}
