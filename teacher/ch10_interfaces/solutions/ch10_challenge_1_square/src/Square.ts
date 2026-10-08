// CHALLENGE 1: a square, centred on (x, y), with one side length.

import type { Pen } from "./Pen.ts";
import type { Shape } from "./Shape.ts";

export class Square implements Shape {
  public readonly name: string = "Square";

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly side: number,
    public readonly colour: string,
  ) {}

  public area(): number {
    return this.side * this.side;
  }

  public perimeter(): number {
    return 4 * this.side;
  }

  public draw(pen: Pen): void {
    // canvas rect() wants the top-left corner: half a side up and to the left of the centre
    const half = this.side / 2;
    pen.beginPath();
    pen.rect(this.x - half, this.y - half, this.side, this.side);
    pen.fill();
  }
}
