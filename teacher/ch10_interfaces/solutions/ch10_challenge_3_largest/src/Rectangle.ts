// A rectangle, centred on (x, y).

import type { Pen } from "./Pen.ts";
import type { Shape } from "./Shape.ts";

export class Rectangle implements Shape {
  public readonly name: string = "Rectangle";

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly width: number,
    private readonly height: number,
    public readonly colour: string,
  ) {}

  public area(): number {
    return this.width * this.height;
  }

  public perimeter(): number {
    return 2 * (this.width + this.height);
  }

  public draw(pen: Pen): void {
    // canvas rect() wants the top-left corner, so step back half the size from the centre
    pen.beginPath();
    pen.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    pen.fill();
  }
}
