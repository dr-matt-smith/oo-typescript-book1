// The drawing methods a shape needs. We wrote this interface ourselves - the browser's canvas
// context (CanvasRenderingContext2D) has never heard of it - yet the canvas context fits it,
// because it has every one of these methods. That is structural typing: the shape counts, not the name.
// It also means a test can hand a shape a small fake pen instead of a real canvas.

export interface Pen {
  beginPath(): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void;
  rect(x: number, y: number, width: number, height: number): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  closePath(): void;
  fill(): void;
}
