# Chapter 5 - Classes, objects and constructors: teacher notes

## Overview

Classes properly, for students who know them from Java. They have already written `Counter`
(Chapter 2) and `Team` (Chapter 3), so the chapter does not re-teach "what is an object"; it
concentrates on where TypeScript's classes differ: the constructor called `constructor`,
**parameter properties**, default and optional parameters in place of overloading, `toString()` and
where JavaScript calls it, and turning plain JSON data into objects with
`map((d) => new Student(...))`.

Every class is built test first, using Chapter 4's habits. The text shows three real red outputs for
`Student` (missing module, missing default, `[object Object]`) and a small-steps cycle for
`Die.roll` (not a function -> fake it -> the second test forces the real formula). The die also
reinforces Chapter 2's "pass the random number in".

## Prerequisites

- Chapters 1-3: types, template literals, `type` aliases, JSON imports, arrays and `map`/`filter`/
  `reduce`, the DOM, events, a first class with fields and methods, `T | undefined`, `number | null`
- Chapter 4: red-green-refactor in small steps, arrange/act/assert, test names as sentences,
  `assertStrictEquals` vs `assertEquals`
- Java: classes, constructors (including overloading and `this(...)`), `toString()`

## Learning outcomes

Students can:

1. write a class with a constructor, and explain how it differs from a Java constructor
2. refactor a constructor to parameter properties, and say when that is (and is not) appropriate
3. use default and optional parameters instead of overloaded constructors, in the right order
4. explain what `undefined` means for a missing argument and a missing JSON property
5. write and test a `toString()` method, and say where it is called automatically (and where not)
6. turn an array of plain data into objects with `map` and a constructor
7. decide what to test about a constructor
8. keep randomness out of a class by passing a random number (or function) in

## Suggested session plan (2 x 2 hour labs)

**Session 1 - constructors and toString (project 1)**

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Slides 1-3: what you will learn; the words (class, object, constructor) |
| 0:10 - 0:30 | **Live-code** `Student` test first: the first test (red: module not found), the long-form class (green) - slides 4-5 |
| 0:30 - 0:45 | Slides 6-7: parameter properties. **Live refactor** to parameter properties under the green test. Then delete `private` from one parameter and show the error |
| 0:45 - 0:55 | Exercise 5.1 (slide 8) |
| 0:55 - 1:15 | Slides 9-14: default parameter test first (show both the type error and the `undefined` diff), optional `nickname?`, passing `undefined`, one constructor, required-first |
| 1:15 - 1:30 | Slides 15-16: **live-code** `toString` test first - the `[object Object]` red, with no type error (ask why) |
| 1:30 - 1:55 | Challenge 1, then start Challenge 6 (discussion only, or as homework) |
| 1:55 - 2:00 | Recap |

**Session 2 - data to objects, the die, modules (projects 1-3)**

| Time | Activity |
|---|---|
| 0:00 - 0:15 | Slides 17-18: JSON to objects; `studentsFrom`; plain data has no methods (the console demo below) |
| 0:15 - 0:30 | Slides 19-20: what to test about a constructor; `assertEquals` vs `assertStrictEquals` on two `new`s |
| 0:30 - 0:55 | Slides 21-24: **live-code** `Die.roll` in small steps: red, fake it (point at the lint warning), second test, the formula. Exercise 5.2 |
| 0:55 - 1:10 | Slides 25-27: `Module`, `undefined` with a meaning, `join` calling `toString`; class or type? Exercise 5.3 |
| 1:10 - 1:55 | Challenges 2-5 |
| 1:55 - 2:00 | Recap: slides 28-29 |

### The `toString` and `console.log` demo

In `ch05_project01_student_cards`, open `dist/index.html` in a browser with the developer tools'
console open: six lines like `(Student) 101 Ada Lovelace, Computing`. Change the log in `main.ts`
to `console.log(student)`, rebuild, reload: now each line is an expandable object showing its fields,
including `nickname: undefined` for the students without one - the parameter property still
creates the field, it just has no value. (In Deno the same log prints
`Student { id: 102, firstName: "Alan", surname: "Turing", course: "Undecided", nickname: undefined }`.)
Ask what a plain object from the JSON would print with `` `${...}` `` (`[object Object]` - the test in
`tests/students.test.ts` checks it).

## Key points to stress

- **The constructor is called `constructor`**, has no return type, and there is only one per class
- **Parameter properties need a modifier.** `private name: string` in the constructor's brackets
  is a field; `name: string` is only a parameter. Without the modifier, `this.name` is an error
- **Use parameter properties when the constructor only stores its arguments.** When it has to work
  something out (Challenge 6, or validation in Chapter 6), ordinary fields and a body are clearer
- **Default vs optional.** A default (`= "Undecided"`) means "there is always a value"; optional
  (`?`) means "there may be no value", and the type becomes `T | undefined`, which TypeScript makes
  you check
- **`undefined` is the link.** A missing argument, a missing JSON property, and an explicit
  `undefined` all trigger a default - that is why `studentsFrom` needs no `if`
- **Required parameters first.** Positional arguments mean an optional parameter can only be left
  out from the end
- **`toString()` returns, it does not print.** Template literals, `String()`, `+ ""` and `join` call
  it; `console.log` does not
- **Plain data is not an object of your class.** It has no methods and no defaults until it goes
  through the constructor
- **Test decisions, not assignments.** Defaults, optional parameters, `toString()`; not "the
  constructor stores the id" for its own sake

## Common problems and errors

All of these messages were produced by making the mistake in the chapter's projects.

| What students see | Cause | Fix |
|---|---|---|
| `Cannot find name 'firstName'. Did you mean the instance member 'this.firstName'?` | `return firstName` in a method | `this.firstName` |
| `Type 'void' is not assignable to type 'string'.` on `return name;` | forgot `this.` on a field called `name` - and `name` is a (deprecated) global in the browser's types, so the error is confusing | `this.name`; worth showing, as it baffles students |
| `Property 'name' does not exist on type 'Student'.` | parameter written as `constructor(name: string) {}` without `private` | `constructor(private name: string) {}` |
| `Multiple constructor implementations are not allowed.` | a second constructor, Java style | one constructor with default/optional parameters |
| `A required parameter cannot follow an optional parameter.` | `(a: string, b?: string, c: string)` | put the optional/default parameters last |
| `Expected 3-5 arguments, but got 1.` | too few arguments to `new Student(...)` | pass the required ones; the numbers say how many are optional |
| `Value of type 'typeof Student' is not callable. Did you mean to include 'new'?` | `Student(101, ...)` | `new Student(101, ...)` |
| A test diff `- [object Object]` and no type error | `toString()` not written yet (or misspelt `tostring`) - every object has the built-in one | write `public toString(): string` |
| `Values have the same structure but are not reference-equal.` | `assertStrictEquals` on two separately made objects | `assertEquals`, if contents are what matter |
| The diff shows `-   Student {` / `+   {` | `assertEquals` comparing a class object with a plain object literal | compare with an object made by the constructor, or compare a method's result |
| `` `random` is never used `` (lint) | the "fake it" step of `roll` | expected - the next test removes it |

## Discussion questions

1. Java lets you write several constructors. Why can a TypeScript class not choose between
   constructors at run time? (Types vanish when compiled.)
2. Parameter properties save lines. What do they cost? Is the class easier or harder to read for
   someone new to TypeScript?
3. `course` has a default but `nickname` is optional. Why not the other way round? When is a default
   better than `undefined`, and when is it a lie (the die's `value` starts as `null`, not 1)?
4. Why does `roll` take a number instead of calling `Math.random()` itself? What would its tests look
   like otherwise?
5. Challenge 6 changes the constructor to take one object. What is gained, and what is lost (for
   example, can the compiler still tell you a required value is missing)?
6. `totalCredits` is a function, not a method. Where should it live, and why?

## Extension ideas

- `public` parameter properties (`constructor(public name: string)`) and why this book avoids them
  (Chapter 6 on encapsulation)
- `readonly` parameter properties (`private readonly id: number`), as a preview of Chapter 6
- A static factory function `Student.fromData(d)` instead of the free function `studentsFrom` (static
  members are Chapter 8)
- Overload signatures in TypeScript: write two for a function and one implementation, and compare
  the result with default parameters
- `JSON.stringify(student)` - what does it produce, and what happens when you `JSON.parse` it back?
  (A plain object: the class is lost.)

## Assessment ideas

- Given a Java class with three overloaded constructors, write the TypeScript class with one
  constructor and tests for each way of calling it
- Spot the bugs: a class with a parameter missing its `private`, a required parameter after an
  optional one, and a `toString` that `console.log`s instead of returning
- Lab check: Challenge 5 (`DiceCup`), with tests using a fake random function
