{
  "name": "Chapter 10 - Interfaces and structural typing",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 10",
  "navigation": {
    "show": true,
    "style": "arrows",
    "position": "top-right",
    "showNumber": true
  },
  "sequenceArrows": {
    "show": true,
    "style": "dashed",
    "color": "#ffcc00",
    "alpha": 0.75
  },
  "nodes": [
    {
      "name": "Start",
      "x": 0,
      "y": 0,
      "text": "# Chapter 10 - Interfaces and structural typing\n\nObject-oriented TypeScript, test first\n\n![w:620](images/shapes.png)\n"
    },
    {
      "name": "What you will learn",
      "x": 240,
      "y": 0,
      "text": "## What you will learn\n\n- `interface` and `implements`\n- the compiler as your first red\n- **structural typing**: shape, not name\n- two interfaces, one object\n- optional and `readonly` members\n- `type` or `interface`?\n- interfaces vanish at run time\n- object literals as test fakes\n"
    },
    {
      "name": "Why interfaces?",
      "x": 480,
      "y": 0,
      "text": "## Why interfaces?\n\n- drawing code wants: *for every shape, draw it*\n- totals code wants: *for every shape, add its area*\n- neither wants `if (circle) ... else if (rectangle) ...`\n- neither should change when a `Hexagon` arrives\n\nA **contract**: what every shape can do.\nJava: `interface Shape` + `class Circle implements Shape`\n"
    },
    {
      "name": "Writing an interface",
      "x": 720,
      "y": 0,
      "text": "## Writing an interface\n\n```ts\nexport interface Shape {\n  readonly name: string;\n  readonly colour: string;\n  area(): number;\n  perimeter(): number;\n  draw(pen: Pen): void;\n}\n```\n\n- members with types, no bodies\n- **properties** too - not just methods (unlike Java)\n- everything is public; no `public` keyword\n"
    },
    {
      "name": "Implementing it",
      "x": 960,
      "y": 0,
      "text": "## Implementing it\n\n```ts\nexport class Circle implements Shape {\n  public readonly name: string = \"Circle\";\n\n  constructor(\n    private readonly x: number,\n    private readonly y: number,\n    private readonly radius: number,\n    public readonly colour: string,\n  ) {}\n\n  public area(): number {\n    return Math.PI * this.radius * this.radius;\n  }\n  // ... perimeter(), draw(pen)\n}\n```\n"
    },
    {
      "name": "The interface is the type",
      "x": 1200,
      "y": 0,
      "text": "## The interface is the type\n\n```ts\nlet shapes: Shape[] = [\n  new Circle(60, 60, 40, COLOURS[0]),\n  new Rectangle(180, 60, 90, 60, COLOURS[1]),\n  new Triangle(300, 60, 90, 80, COLOURS[2]),\n];\n\nexport const totalArea = (shapes: Shape[]): number =>\n  shapes.reduce((total, shape) => total + shape.area(), 0);\n```\n\n- `totalArea` never asks which kind of shape\n- a new `Hexagon` works with no change\n"
    },
    {
      "name": "Rectangle, test first: red 1",
      "x": 0,
      "y": 140,
      "text": "## Rectangle, test first: red 1\n\n```ts\nDeno.test(\"a 3 by 4 rectangle has an area of 12\", () => {\n  const rectangle = new Rectangle(0, 0, 3, 4, \"blue\");\n  assertEquals(rectangle.area(), 12);\n});\n```\n\n```text\nTS2307 [ERROR]: Cannot find module 'src/Rectangle.ts'.\n```\n"
    },
    {
      "name": "Red 2: the compiler's checklist",
      "x": 240,
      "y": 140,
      "text": "## Red 2: the compiler's checklist\n\n```ts\nexport class Rectangle implements Shape {\n  constructor(/* x, y, width, height, colour */) {}\n}\n```\n\n```text\nTS2420 [ERROR]: Class 'Rectangle' incorrectly\n  implements interface 'Shape'.\n  Type 'Rectangle' is missing the following\n  properties from type 'Shape':\n  name, area, perimeter, draw\n```\n\n`implements` turns the interface into a checklist.\n"
    },
    {
      "name": "Red 3, then green",
      "x": 480,
      "y": 140,
      "text": "## Red 3, then green\n\nAdd every member, doing nothing (`return 0;`):\n\n```text\n    -   0\n    +   12\n```\n\nA real assertion failure. Then:\n\n```ts\n  public area(): number {\n    return this.width * this.height;\n  }\n```\n\nGreen. Repeat for `perimeter` and `draw`.\n"
    },
    {
      "name": "How do you test drawing?",
      "x": 720,
      "y": 140,
      "text": "## How do you test drawing?\n\n```ts\nexport interface Pen {\n  beginPath(): void;\n  arc(x: number, y: number, radius: number,\n      startAngle: number, endAngle: number): void;\n  rect(x: number, y: number,\n       width: number, height: number): void;\n  moveTo(x: number, y: number): void;\n  lineTo(x: number, y: number): void;\n  closePath(): void;\n  fill(): void;\n}\n```\n\nOur own interface: just what a shape needs.\n"
    },
    {
      "name": "The canvas fits the Pen",
      "x": 960,
      "y": 140,
      "text": "## The canvas fits the Pen\n\n```ts\nfor (const shape of shapes) {\n  context.fillStyle = shape.colour;\n  // a CanvasRenderingContext2D, passed as a Pen\n  shape.draw(context);\n}\n```\n\n- the browser's canvas context never says `implements Pen`\n- in Java: an error\n- in TypeScript: fine - it **has** every method\n"
    },
    {
      "name": "Nominal vs structural",
      "x": 1200,
      "y": 140,
      "text": "## Nominal vs structural\n\n| Java (nominal) | TypeScript (structural) |\n|---|---|\n| a `Shape` if it *says* `implements Shape` | a `Shape` if it *has* the members |\n| the name matters | the shape matters |\n| fakes need classes or Mockito | an object literal is a fake |\n"
    },
    {
      "name": "Is it a Shape?",
      "x": 0,
      "y": 280,
      "text": "## Is it a Shape?\n\n```nomnoml\n#fill: #f1faee; #a8dadc\n#stroke: #1d3557\n#lineWidth: 1.5\n#font: Arial\n#fontSize: 14\n#direction: down\n#.interface: fill=#a8dadc italic\n#.bad: fill=#fde2e4 stroke=#e63946\n[<interface>Shape|name: string;colour: string;area(): number;perimeter(): number;draw(pen: Pen): void]\n[class Circle implements Shape|✓ says so, and has every member]\n[class Dot|✓ never mentions Shape,;but has every member]\n[{ name, colour, area,;perimeter, draw }|✓ an object literal -;a quick fake in a test]\n[<bad>{ name, colour, area }|✗ missing perimeter and draw]\n[Shape] <:-- [class Circle implements Shape]\n[Shape] <:-- [class Dot]\n[Shape] <:-- [{ name, colour, area,;perimeter, draw }]\n[Shape] <-- [{ name, colour, area }]\n```\n\nIn Java only **Circle** would count: a Java class is a Shape only if it says `implements Shape`.\n"
    },
    {
      "name": "Why still write implements?",
      "x": 240,
      "y": 280,
      "text": "## Why still write implements?\n\n```ts\nexport class Dot {            // no implements\n  public aera(): number { return 0; }   // typo!\n  // ...\n}\nconst shapes: Shape[] = [new Dot()];\n```\n\n```text\nTS2741 [ERROR]: Property 'area' is missing in type\n  'Dot' but required in type 'Shape'.\n```\n\nReported on the **array**, far away. With `implements`, it is on the class.\n"
    },
    {
      "name": "A fit that fails",
      "x": 480,
      "y": 280,
      "text": "## A fit that fails\n\n```ts\nexport interface StrictPen {\n  fillStyle: string;\n  fill(): void;\n}\n```\n\n```text\nTypes of property 'fillStyle' are incompatible.\n  Type 'string | CanvasGradient | CanvasPattern'\n  is not assignable to type 'string'.\n```\n\nTypes are checked too. So `Pen` holds only methods.\n"
    },
    {
      "name": "Fakes: object literals",
      "x": 720,
      "y": 280,
      "text": "## Fakes: object literals\n\n```ts\nconst fakeShape = (area: number): Shape => ({\n  name: \"fake\",\n  colour: \"black\",\n  area: () => area,\n  perimeter: () => 0,\n  draw: () => {},\n});\n\nDeno.test(\"the total area adds up every shape's area\", () => {\n  assertEquals(\n    totalArea([fakeShape(10), fakeShape(5), fakeShape(2.5)]),\n    17.5);\n});\n```\n"
    },
    {
      "name": "A pen that records",
      "x": 960,
      "y": 280,
      "text": "## A pen that records\n\n```ts\nconst calls: string[] = [];\nconst pen: Pen = {\n  beginPath: () => {\n    calls.push(\"beginPath\");\n  },\n  rect: (x, y, width, height) => {\n    calls.push(`rect ${x} ${y} ${width} ${height}`);\n  },\n  // ... the other five\n};\n```\n\n```ts\nnew Rectangle(100, 50, 40, 20, \"blue\").draw(recorder.pen);\nassertEquals(recorder.calls,\n  [\"beginPath\", \"rect 80 40 40 20\", \"fill\"]);\n```\n"
    },
    {
      "name": "Optional members",
      "x": 1200,
      "y": 280,
      "text": "## Optional members\n\n```ts\nexport interface Instrument {\n  readonly name: string;\n  readonly strings?: number;   // optional\n  play(): string;\n}\n\nexport class Drum implements Instrument {\n  public readonly name: string = \"Drum\";\n  public play(): string {\n    return \"Boom!\";\n  }\n}\n```\n"
    },
    {
      "name": "Optional means | undefined",
      "x": 0,
      "y": 420,
      "text": "## Optional means | undefined\n\n```ts\ninstrument.strings + 1\n```\n\n```text\nTS18048 [ERROR]: 'instrument.strings' is possibly 'undefined'.\n```\n\n```ts\nif (instrument.strings === undefined) {\n  return `${instrument.name} · no strings`;\n}\nreturn `${instrument.name} · ${instrument.strings} strings`;\n```\n"
    },
    {
      "name": "The Drum surprise",
      "x": 240,
      "y": 420,
      "text": "## The Drum surprise\n\n- through `Instrument`: `drum.strings` is `undefined` - fine\n- through `Drum`: an error\n\n```text\nProperty 'strings' does not exist on type 'Drum'.\n```\n\n```ts\nconst drum: Instrument = new Drum();\nassertEquals(drum.strings, undefined);\n```\n"
    },
    {
      "name": "Two interfaces, one class",
      "x": 480,
      "y": 420,
      "text": "## Two interfaces, one class\n\n```ts\nexport interface Tunable {\n  readonly name: string;\n  isInTune(): boolean;\n  tune(): void;\n}\n\nexport class Guitar implements Instrument, Tunable {\n  public readonly name: string = \"Guitar\";\n  public readonly strings: number = GUITAR_STRINGS;\n  constructor(private inTune: boolean = false) {}\n  // play(), isInTune(), tune()\n}\n```\n"
    },
    {
      "name": "One guitar, two arrays",
      "x": 720,
      "y": 420,
      "text": "## One guitar, two arrays\n\n```nomnoml\n#fill: #f1faee; #a8dadc\n#stroke: #1d3557\n#lineWidth: 1.5\n#font: Arial\n#fontSize: 14\n#direction: down\n#.interface: fill=#a8dadc italic\n#.tunable: fill=#a8dadc\n#spacing: 18\n#padding: 5\n[<interface>Instrument|readonly name: string;readonly strings?: number;play(): string]\n[<interface>Tunable|readonly name: string;isInTune(): boolean;tune(): void]\n[Drum|no strings]\n[Flute|no strings]\n[<tunable>Guitar|6 strings, tunable]\n[<tunable>Violin|4 strings, tunable]\n[Instrument] <:-- [Drum]\n[Instrument] <:-- [Flute]\n[Instrument] <:-- [Guitar]\n[Instrument] <:-- [Violin]\n[Tunable] <:-- [Guitar]\n[Tunable] <:-- [Violin]\n```\n\n```ts\nconst band: Instrument[] = [guitar, violin, new Drum(), new Flute()];\nconst tunables: Tunable[] = [guitar, violin]; // the same two objects\n```\n\nEach interface is a **view**: `tuneAll` cannot play anything.\n"
    },
    {
      "name": "readonly - through a view",
      "x": 960,
      "y": 420,
      "text": "## readonly - through a view\n\n```ts\nconst shape: Shape = new Circle(0, 0, 1, \"red\");\nshape.colour = \"blue\";\n```\n\n```text\nTS2540 [ERROR]: Cannot assign to 'colour'\n  because it is a read-only property.\n```\n\n- a promise about the **view**, not the object\n- a class may keep a changeable `public name: string`\n- want it fixed everywhere? `readonly` in the class too\n"
    },
    {
      "name": "type or interface?",
      "x": 1200,
      "y": 420,
      "text": "## type or interface?\n\n| | `interface` | `type` |\n|---|---|---|\n| object shape | yes | yes |\n| `implements` | yes | yes |\n| build on another | `extends` | `&` |\n| union `\"a\" \\| \"b\"` | no | yes |\n| function type | awkward | yes |\n\n**Rule:** `interface` for object shapes and what classes implement; `type` for the rest.\n"
    },
    {
      "name": "Interfaces vanish",
      "x": 0,
      "y": 560,
      "text": "## Interfaces vanish\n\n```js\n  // src/Circle.ts\n  var FULL_TURN = 2 * Math.PI;\n  var Circle = class {\n    x;\n    y;\n    radius;\n```\n\nNo `implements`, no `Shape.ts`, no `Pen.ts` in `dist/app.js`.\n\n```text\n'Shape' only refers to a type, but is being used\nas a value here.          // value instanceof Shape\n```\n"
    },
    {
      "name": "Sort anything",
      "x": 240,
      "y": 560,
      "text": "## Sort anything\n\n```ts\nexport interface Sortable {\n  label(): string;\n  sortKey(): number;   // smaller comes first\n}\n\nexport class Mountain implements Sortable {\n  // ...\n  public sortKey(): number {\n    return -this.metres;   // tallest first\n  }\n}\n```\n\nLike Java's `Comparable`: each class picks its own order.\n"
    },
    {
      "name": "sortAll, test first with fakes",
      "x": 480,
      "y": 560,
      "text": "## sortAll, test first with fakes\n\n```ts\nconst item = (label: string, key: number): Sortable => ({\n  label: () => label,\n  sortKey: () => key,\n});\n\nassertEquals(labels(sortAll(\n  [item(\"c\", 3), item(\"a\", 1), item(\"b\", 2)])),\n  [\"a\", \"b\", \"c\"]);\n```\n\nRed with `=> items`, then green:\n\n```ts\nitems.toSorted((a, b) => a.sortKey() - b.sortKey())\n```\n"
    },
    {
      "name": "Java and TypeScript",
      "x": 720,
      "y": 560,
      "text": "## Java and TypeScript\n\n| Java | TypeScript |\n|---|---|\n| `double area();` | `area(): number;` |\n| methods and constants only | properties too |\n| must say `implements` | anything that fits |\n| fakes: classes, Mockito | object literals |\n| `instanceof Shape` | an error: interfaces vanish |\n| `Comparable<T>` | your own interface; generics in Book 2 |\n"
    },
    {
      "name": "Summary and challenges",
      "x": 960,
      "y": 560,
      "text": "## Summary and challenges\n\n- interfaces list members; `implements` checks them\n- structural: shape, not name - still write `implements`\n- object literals make fakes; small interfaces fake easily\n- `?` means `| undefined`; `readonly` guards a view\n- interfaces are compile-time only\n\nChallenges: 1 Square · 2 Cities · 3 Biggest shape ·\n4 SoundMaker · 5 Ties · 6 Click to choose\n\nNext: Chapter 11 - Inheritance\n"
    }
  ]
}
