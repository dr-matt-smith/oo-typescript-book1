# Chapter 10 - Interfaces and structural typing: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. Square

**Project:** [solutions/ch10_challenge_1_square](solutions/ch10_challenge_1_square/)
(from `ch10_project01_shapes`)

`src/Square.ts`
```ts
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
```

`main.ts` adds an "Add square" listener: `addShape((x, y, colour) => new Square(x, y, randomSize(), colour))`.

Tests: area 25 and perimeter 20 for side 5; a `Square` assigned to a `Shape` variable; the recording
pen shows `rect 80 30 40 40` for a square of side 40 centred on (100, 50).

**Look for:** `implements Shape` written on the class; the tests written first, with the
"incorrectly implements" list shrinking as members are added. Some students will reach for
`extends Rectangle` - that is next chapter, and a fair discussion (is a square a rectangle?), but
this challenge asks for `implements Shape`. A recording-pen test, not just area and perimeter.

---

## 2. Cities

**Project:** [solutions/ch10_challenge_2_cities](solutions/ch10_challenge_2_cities/)
(from `ch10_project03_sort_anything`)

`src/City.ts`
```ts
export class City implements Sortable {
  constructor(
    public readonly name: string,
    public readonly population: number,
  ) {}

  /** "Dublin (592,713)" - en-GB, so the thousands separator is always a comma. */
  public label(): string {
    return `${this.name} (${this.population.toLocaleString("en-GB")})`;
  }

  public sortKey(): number {
    return -this.population;
  }
}
```

Five cities are added to `data.json` (JSON cannot hold comments, so that change is not marked), made
into `City` objects with `map`, and shown with `showList("#cities", cities)`.

Tests: the label with and without a comma; three cities sort biggest first.

**Look for:** minus the population for "biggest first", as `Mountain` does. `sortAll` and `showList`
unchanged - ask the student to confirm that, since it is the point of the challenge. A locale passed
to `toLocaleString`: without one, the test depends on the machine's language settings.

---

## 3. The biggest shape

**Project:** [solutions/ch10_challenge_3_largest](solutions/ch10_challenge_3_largest/)
(from `ch10_project01_shapes`)

`src/shapes.ts`
```ts
/** The shape with the biggest area - the first one, if two tie - or undefined if there are none. */
export const largestShape = (shapes: Shape[]): Shape | undefined => {
  let largest: Shape | undefined = undefined;
  for (const shape of shapes) {
    if (largest === undefined || shape.area() > largest.area()) {
      largest = shape;
    }
  }
  return largest;
};
```

`fakeShape` gains a `name` parameter (with a default, so the old tests are unchanged) so the tests
can tell the fakes apart. `main.ts` shows "Largest: Rectangle (area 5400.0)", or "Largest: none"
after Clear.

Tests: no shapes gives `undefined`; the biggest in the middle; the biggest last; a tie goes to the
first.

**Look for:** fake shapes only - no `Circle` or `Rectangle` in these tests. The empty array. A
`reduce` version is fine too (`shapes.reduce<Shape | undefined>(...)` needs a type argument, which
students may not manage yet; a loop is clearer). Comparing with `>` (first wins a tie) or `>=` (last
wins) - either, as long as a test says which.

---

## 4. Things that make a sound

**Project:** [solutions/ch10_challenge_4_sound_makers](solutions/ch10_challenge_4_sound_makers/)
(from `ch10_project02_instruments`)

`src/SoundMaker.ts` and `src/Instrument.ts`
```ts
export interface SoundMaker {
  readonly name: string;
  /** The sound it makes, as text: "Ding dong!" */
  play(): string;
}

export interface Instrument extends SoundMaker {
  /** How many strings it has - left out by instruments without strings. */
  readonly strings?: number;
}
```

`src/band.ts`
```ts
export const soundCheck = (makers: SoundMaker[]): string[] => makers.map((maker) => `${maker.name}: ${maker.play()}`);
```

`Doorbell implements SoundMaker` plays "Ding dong!". The Sound check button calls
`soundCheck([...band, doorbell])`.

Tests: a `Doorbell` is a `SoundMaker`; `soundCheck` with a kazoo, a fake cat and a doorbell; a
whole `Instrument[]` passed straight to `soundCheck`.

**Look for:** `Instrument` no longer repeating `name` and `play()`. The answer to the hint: an
`Instrument[]` can be passed where a `SoundMaker[]` is wanted because every `Instrument` has
everything a `SoundMaker` needs - by `extends`, and structurally. No class needed to change:
`Guitar`, `Drum` and the rest still compile, which is worth pointing out. `playAll` and `soundCheck`
now do the same thing; a student who makes `playAll` call `soundCheck` (or removes one) has spotted
the duplication.

---

## 5. Ties

**Project:** [solutions/ch10_challenge_5_ties](solutions/ch10_challenge_5_ties/)
(from `ch10_project03_sort_anything`)

`src/sorting.ts`
```ts
export const sortAll = (items: Sortable[]): Sortable[] =>
  items.toSorted((a, b) => {
    const byKey = a.sortKey() - b.sortKey();
    if (byKey !== 0) {
      return byKey;
    }
    return a.label().localeCompare(b.label());
  });
```

Tests: `item("b", 1)` and `item("a", 1)` come out "a", "b"; different keys still sort by key ("z"
with key 1 before "a" with key 2); a tie in the middle of a longer list.

**Look for:** a test that the key still wins over the label - without it, a comparator that sorts
by label only would pass the tie test. The earlier tests still passing. The comparator growing from
an expression body to a block body with `return`s (Chapter 3).

---

## 6. Click to choose

**Project:** [solutions/ch10_challenge_6_click](solutions/ch10_challenge_6_click/)
(from `ch10_project01_shapes`)

`src/Shape.ts` gains `contains(x: number, y: number): boolean;` - and the compiler at once reports
`Circle`, `Rectangle`, `Triangle` and the `fakeShape` in the tests. Each class implements it:

```ts
// Circle
public contains(x: number, y: number): boolean {
  return Math.hypot(x - this.x, y - this.y) <= this.radius;
}

// Triangle
public contains(x: number, y: number): boolean {
  const top = this.y - this.height / 2;
  const bottom = this.y + this.height / 2;
  if (y < top || y > bottom) {
    return false;
  }
  const halfWidthHere = (this.base / 2) * (y - top) / this.height;
  return Math.abs(x - this.x) <= halfWidthHere;
}
```

`src/shapes.ts`
```ts
export const shapeAt = (shapes: Shape[], x: number, y: number): Shape | undefined =>
  shapes.findLast((shape) => shape.contains(x, y));
```

`main.ts` keeps `let selected: Shape | undefined`, and on a canvas click scales the position:

```ts
canvas.addEventListener("click", (event: MouseEvent) => {
  const scale = canvas.width / canvas.clientWidth;
  selected = shapeAt(shapes, event.offsetX * scale, event.offsetY * scale);
  render();
});
```

`render` shows `describe(selected)` ("Triangle: area 3600.0, perimeter 273.6"); Clear resets
`selected`.

Tests (`tests/contains.test.ts`): for each shape, the centre, points on the edge, and points just
outside each edge (for the circle, (8, 8) - inside the square round it but outside the circle; for
the triangle, points beside the sloping sides half way up). `shapeAt` is tested with fakes that
contain everything or nothing, including "the shape on top wins".

**Look for:** the student noticing that adding a member to an interface breaks every implementer,
and the fakes too - and that this is useful, not annoying. Edge cases written as tests before the
code. The triangle: a bounding-box version is acceptable (the challenge says so), but its tests
must then not include points beside the sloping sides. `findLast` (or a loop from the end) for
"on top wins". The scale factor: without it, clicks are off on any screen where the canvas is not
shown at exactly 720 pixels wide.
