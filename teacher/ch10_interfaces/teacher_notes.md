# Chapter 10 - Interfaces and structural typing: teacher notes

## Overview

Interfaces, and the one big idea that makes TypeScript's interfaces different from Java's:
**structural typing**. Students know Java interfaces (`interface`, `implements`, several interfaces
per class, `SoundMaker` from the Java course), so the syntax takes minutes. The time goes on the
consequences of "shape, not name":

- a class that never says `implements Shape` still fits a `Shape`
- an object literal is a complete test fake, with no class and no mocking library
- the browser's `CanvasRenderingContext2D` fits a `Pen` interface we wrote ourselves
- interfaces vanish from the JavaScript, so `instanceof Shape` cannot work

Along the way: `implements` as a compiler-driven first red (test first, Chapter 4's habit), optional
members (`strings?: number` is `number | undefined`), `readonly` as a promise about the *view*, one
object held through two interfaces (references, Chapter 9), and `type` vs `interface`.

Three projects: shapes on a `<canvas>` (the main teaching project), instruments (two interfaces,
optional and `readonly`), and sort anything (a `Comparable`-like interface, `sortAll` developed test
first with fakes).

## Prerequisites

- Chapters 1-9, in particular: classes, parameter properties and default parameters (5); `readonly`
  and `private` (6); main.ts as the only DOM file and `requireElement` (7); string-literal unions
  (8, for the `type` vs `interface` table); references, spread and `import type` (9)
- Chapter 3's comparators, `toSorted`, closures and contextual typing (`(x) => ...` with no type
  because the target type says what `x` is)
- Java: interfaces and `implements`; `Comparable` helps for Project 3

The projects keep their own copy of `requireElement` inside `main.ts` (with a one-line comment),
so they do not depend on any file from Chapter 7.

## Learning outcomes

Students can:

1. write an interface with methods and properties, and implement it with `implements`
2. use the compiler's "incorrectly implements interface" message as a first red, working test first
3. explain structural typing, and contrast it with Java's nominal typing
4. write a test fake as an object literal, including one that records calls
5. implement two interfaces in one class, and hold one object through each
6. use optional members safely (checking for `undefined`) and explain what `readonly` does and
   does not promise
7. choose between `type` and `interface`
8. explain why interfaces have no run-time existence, and why `instanceof Shape` is an error

## Suggested session plan (2 x 2 hour labs)

**Session 1 - interfaces and structural typing (project 1)**

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Slides 1-4: why interfaces; the Java version; the `Shape` interface |
| 0:10 - 0:20 | Slides 5-6: `Circle implements Shape`; one `Shape[]`, `totalArea` |
| 0:20 - 0:45 | **Live-code** `Rectangle` test first (below). Slides 7-9 as a recap |
| 0:45 - 1:05 | Slides 10-13: the `Pen` interface; the canvas context fits it; nominal vs structural; the diagram |
| 1:05 - 1:15 | Slides 14-15: why still write `implements`; the `fillStyle` mismatch |
| 1:15 - 1:25 | Slides 16-17: fakes - `fakeShape` and the recording pen. Exercise 10.1 |
| 1:25 - 1:55 | Challenges 1 and 3 |
| 1:55 - 2:00 | Recap |

**Session 2 - two interfaces, optional, `type`, run time (projects 2-3)**

| Time | Activity |
|---|---|
| 0:00 - 0:15 | Slides 18-20: optional members; `strings?` is `number \| undefined`; the Drum surprise |
| 0:15 - 0:30 | Slides 21-22: two interfaces, one class; one guitar in two arrays. Exercise 10.2 |
| 0:30 - 0:40 | Slide 23: `readonly` through a view |
| 0:40 - 0:50 | Slide 24: `type` or `interface`, and the rule |
| 0:50 - 1:00 | Slide 25: interfaces vanish - **demo** below |
| 1:00 - 1:15 | Slides 26-27: `Sortable`; **live-code** `sortAll` test first with fake items; Exercise 10.3 |
| 1:15 - 1:55 | Challenges 2, 4, 5 (and 6 for the quick ones) |
| 1:55 - 2:00 | Recap; slide 28-29 |

### Live-coding Rectangle

In a copy of `ch10_project01_shapes`, delete `src/Rectangle.ts`, `tests/Rectangle.test.ts`, and
the lines of `main.ts` that use `Rectangle` (the import, the array entry and the button
listener). Then follow the chapter:

1. write the area test - red: `Cannot find module`
2. `export class Rectangle implements Shape` with only the constructor - the compiler lists
   `name, area, perimeter, draw`. Pause here: this list is the interface doing its job
3. add the members returning 0 / doing nothing - the real red, `-   0` / `+   12`; point out the
   lint warning `` `pen` is never used ``
4. implement `area`, then perimeter and draw, each test first; the draw test uses `recordingPen`

### The "interfaces vanish" demo

Build `ch10_project01_shapes` and open `dist/app.js`. Search for `implements`, `Shape.ts` and
`Pen.ts`: nothing. Search for `class`: the classes are there, with `x;`, `y;` ... as plain fields -
`private` and `readonly` are gone too. Then type `value instanceof Shape` in a scratch file and show
`'Shape' only refers to a type, but is being used as a value here.` Contrast with `instanceof
Circle`, which compiles.

### The structural typing demo

In `src/main.ts`, add a class `Dot` with the five members and no `implements`, and put a `new Dot()`
in `shapes`. It compiles and draws nothing (its `draw` only calls `fill()`). Then misspell `area` as
`aera` in `Dot` and look at *where* the error is reported - on the array in `main.ts`, not on the
class. Add `implements Shape` and the error moves to the class. That is the case for writing
`implements`.

## Key points to stress

- **Shape, not name.** The single most important idea. Use the diagram: four candidates, three fit
- **Still write `implements`** on your own classes - for where errors appear, and for the reader
- **Interfaces can hold properties**, not just methods - unlike Java
- **Object literals are fakes.** No Mockito needed; a closure lets a fake remember things
- **Small interfaces.** `Pen` has only the seven methods a shape needs, which is why a fake is easy
  and why the canvas fits. `Tunable` is separate from `Instrument` because not every instrument
  tunes
- **Optional means `| undefined`**, and the compiler insists on a check
- **`readonly` is about the view**, not the object: a class may implement `readonly name` with a
  changeable field; code holding the object as its own class can still change it
- **Interfaces are compile-time only.** No `instanceof`, nothing in `dist/app.js`; hence
  `import type`
- **`interface` for object shapes; `type` for unions, function types and other names**

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `Class 'Rectangle' incorrectly implements interface 'Shape'.` `Type 'Rectangle' is missing the following properties from type 'Shape': name, area, perimeter, draw` | members missing | add them (this is a good red when working test first) |
| `Property 'contains' is missing in type 'Blob' but required in type 'Shape2'.` | one member missing (e.g. after adding a method to the interface, Challenge 6) | add it to every class the compiler lists |
| `Property 'colour' is private in type 'Blob' but not in type 'Shape'.` | `constructor(private readonly colour: string)` - interface members are public | `public readonly colour` |
| `Cannot extend an interface 'Shape'. Did you mean 'implements'?` | `class Circle extends Shape` | `implements` |
| `Property 'area' in type 'Square' is not assignable to the same property in base type 'Shape'.` | a member with the wrong type (`area(): string`) | match the interface's types |
| `error: SyntaxError: Expected '{', got 'interface'` | a method body inside an interface (`area(): number { return 0; }`) | interfaces hold no bodies - remove it (the message is confusing; the problem is the body) |
| `'Shape' only refers to a type, but is being used as a value here.` | `x instanceof Shape` | keep objects in arrays of the right type; narrowing is in Book 2 |
| `'instrument.strings' is possibly 'undefined'.` | using an optional member without a check | `if (instrument.strings === undefined) ...` |
| `Property 'strings' does not exist on type 'Drum'.` | asking a `Drum` (typed as its class) for an optional member it left out | ask through the interface: `const drum: Instrument = new Drum()` |
| `Cannot assign to 'colour' because it is a read-only property.` | assigning through an interface with `readonly` | intended - that is the point |
| `Object literal may only specify known properties, and 'sides' does not exist in type 'Shape'.` | an extra member in a fresh object literal | remove it, or check for a typo |
| `Argument of type 'CanvasRenderingContext2D' is not assignable to parameter of type ...` `Types of property 'fillStyle' are incompatible.` | putting `fillStyle: string` in `Pen` | keep `Pen` to methods; set `fillStyle` in `main.ts` |
| A test compares `rect 80 40 ...` and gets something else | rect wants the top-left corner, not the centre | subtract half the width and height |

A surprise worth showing: a class with `draw(): void` (no parameter) still implements `Shape`,
whose `draw` takes a `Pen`. A function that ignores an argument can safely be given one, so
TypeScript allows fewer parameters. (Array callbacks rely on this: `map((x) => ...)` ignores the
index and array arguments.)

## Discussion questions

1. Java chose nominal typing and TypeScript structural. What does each protect you from? Can you
   think of two unrelated interfaces with the same members, where structural typing would let a
   value fit by accident? (For example `{ x: number; y: number }` as a point and as a size.)
2. Why is `Pen` better than taking a `CanvasRenderingContext2D` directly? What else could be passed
   as a `Pen` - an SVG builder? A pen that draws twice as big?
3. The guitar is in two arrays. What would go wrong if `main.ts` made a *copy* of the guitar for the
   tunables array (Chapter 9's `structuredClone`)?
4. `readonly` in an interface does not make the object immutable. Is that a weakness, or useful?
5. `sortAll` returns `Sortable[]`, losing the fact that they were songs. How does Java's
   `Comparable<T>` avoid this? (A preview of Book 2's generics.)
6. When would you use an abstract class (next chapter) instead of an interface?

## Extension ideas

- Interface for a function: `interface Comparator { (a: Song, b: Song): number }` vs
  `type Comparator = (a: Song, b: Song) => number` - and why the `type` reads better
- Index signatures: `interface Scores { [name: string]: number }`
- Declaration merging: two `interface Window { ... }` declarations combine; used to add
  properties to built-in types. Show why `type` cannot do this
- Interface segregation (the "I" of SOLID): split a fat `Animal` interface into `Walker`,
  `Swimmer`, `Flyer`
- Draw the shapes as SVG instead of canvas, by writing a second `Pen` that builds an SVG path string
  - the shapes do not change at all

## Assessment ideas

- Given an interface and three objects (a class with `implements`, a class without, an object
  literal with one member missing), say which fit and why
- Write a recording fake for a given interface, and a test that uses it
- Spot the bugs: `private` member implementing an interface, `extends` for an interface,
  `instanceof` on an interface, optional member used without a check
- Lab check: Challenge 6 with tests, including a point just outside each edge of each shape
