// Draws a row of shapes on a <canvas>, and lists them in a table with their areas and perimeters.
// The array holds Shapes: the drawing loop and the table never ask which kind of shape they have.
// This is the only file that touches the page.

import { Circle } from "./Circle.ts";
import { Rectangle } from "./Rectangle.ts";
import { describe, oneDecimal, shapeAt, totalArea } from "./shapes.ts"; // CHALLENGE 6
import type { Shape } from "./Shape.ts";
import { Triangle } from "./Triangle.ts";

const SLOT_WIDTH = 120; // each shape gets a 120 x 120 square of the canvas
const SLOTS_PER_ROW = 6;
const MAX_SHAPES = 12; // two rows fill the canvas
const MIN_SIZE = 40;
const MAX_SIZE = 100;
const COLOURS: string[] = ["#e63946", "#457b9d", "#2a9d8f", "#f4a261", "#1d3557", "#a8dadc"];

/** Finds an element, or throws an error naming the one that is missing (Chapter 7's helper). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`index.html has no element matching "${selector}"`);
  }
  return element;
};

const canvas = requireElement<HTMLCanvasElement>("#canvas");
const rows = requireElement<HTMLElement>("#rows");
const summary = requireElement<HTMLElement>("#summary");
const selectedText = requireElement<HTMLElement>("#selected"); // CHALLENGE 6

const context = canvas.getContext("2d");
if (context === null) {
  throw new Error("This browser cannot draw on a canvas");
}

// The model: one array of Shape. Circles, rectangles and triangles all fit in it.
let shapes: Shape[] = [
  new Circle(60, 60, 40, COLOURS[0]),
  new Rectangle(180, 60, 90, 60, COLOURS[1]),
  new Triangle(300, 60, 90, 80, COLOURS[2]),
];

let selected: Shape | undefined = undefined; // CHALLENGE 6: the shape last clicked on

const randomSize = (): number => MIN_SIZE + Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE));

/** The centre of the next free slot: left to right, then the next row. */
const nextCentre = (): { x: number; y: number } => {
  const slot = shapes.length;
  const column = slot % SLOTS_PER_ROW;
  const row = Math.floor(slot / SLOTS_PER_ROW);
  return { x: column * SLOT_WIDTH + SLOT_WIDTH / 2, y: row * SLOT_WIDTH + SLOT_WIDTH / 2 };
};

const nextColour = (): string => COLOURS[shapes.length % COLOURS.length];

const render = (): void => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (const shape of shapes) {
    context.fillStyle = shape.colour;
    // The real canvas context is passed where a Pen is wanted - it fits the Pen interface.
    shape.draw(context);
  }

  rows.innerHTML = shapes
    .map((shape) =>
      `<tr><td><span class="swatch" style="background:${shape.colour}"></span>${shape.name}</td>` +
      `<td>${oneDecimal(shape.area())}</td><td>${oneDecimal(shape.perimeter())}</td></tr>`
    )
    .join("");
  summary.textContent = `${shapes.length} shapes · total area ${oneDecimal(totalArea(shapes))}`;
  // CHALLENGE 6
  selectedText.textContent = selected === undefined ? "Click a shape to choose it." : describe(selected);
};

/** Adds a shape made by `make`, if there is room for one more. */
const addShape = (make: (x: number, y: number, colour: string) => Shape): void => {
  if (shapes.length >= MAX_SHAPES) {
    return;
  }
  const centre = nextCentre();
  shapes.push(make(centre.x, centre.y, nextColour()));
  // CHALLENGE 6: the canvas is 720 pixels wide inside, but shown at whatever width the page gives it,
// so the click position (in page pixels) is scaled to canvas pixels before asking the shapes.
canvas.addEventListener("click", (event: MouseEvent) => {
  const scale = canvas.width / canvas.clientWidth;
  selected = shapeAt(shapes, event.offsetX * scale, event.offsetY * scale);
  render();
});

render();
};

requireElement<HTMLButtonElement>("#add-circle").addEventListener("click", () => {
  addShape((x, y, colour) => new Circle(x, y, randomSize() / 2, colour));
});
requireElement<HTMLButtonElement>("#add-rectangle").addEventListener("click", () => {
  addShape((x, y, colour) => new Rectangle(x, y, randomSize(), randomSize(), colour));
});
requireElement<HTMLButtonElement>("#add-triangle").addEventListener("click", () => {
  addShape((x, y, colour) => new Triangle(x, y, randomSize(), randomSize(), colour));
});
requireElement<HTMLButtonElement>("#clear").addEventListener("click", () => {
  shapes = [];
  selected = undefined; // CHALLENGE 6
  // CHALLENGE 6: the canvas is 720 pixels wide inside, but shown at whatever width the page gives it,
// so the click position (in page pixels) is scaled to canvas pixels before asking the shapes.
canvas.addEventListener("click", (event: MouseEvent) => {
  const scale = canvas.width / canvas.clientWidth;
  selected = shapeAt(shapes, event.offsetX * scale, event.offsetY * scale);
  render();
});

render();
});

// CHALLENGE 6: the canvas is 720 pixels wide inside, but shown at whatever width the page gives it,
// so the click position (in page pixels) is scaled to canvas pixels before asking the shapes.
canvas.addEventListener("click", (event: MouseEvent) => {
  const scale = canvas.width / canvas.clientWidth;
  selected = shapeAt(shapes, event.offsetX * scale, event.offsetY * scale);
  render();
});

render();
