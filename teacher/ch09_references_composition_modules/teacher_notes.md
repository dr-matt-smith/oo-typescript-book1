# Chapter 9 - References, composition and modules: teacher notes

## Overview

Three ideas that belong together: **references** (what happens when two variables refer to one
object), **composition** (objects that hold other objects), and **modules** (organising the files
once there are enough classes to need it). The link between the first two is the core of the
chapter: as soon as an object holds an array or other objects, the question "who else has a
reference to this?" decides whether the class's rules can be broken from outside.

Java students already know the rule - primitives copied, objects shared - from the Java
pass-by-value chapter. What is new is seeing it bite: an `addItem`-style function that quietly
changes its argument, a getter that leaks a private array, and a shared test fixture that makes a
test pass alone and fail in company. Each one is shown red first, with the real output.

The modules half is lighter: students have used `export`/`import` since Chapter 1. Here they get
named vs default exports, `import type`, a folder with an `index.ts`, the direction of dependencies,
and a Java packages comparison.

## Prerequisites

- Chapters 1-3: arrays, objects, `type`, arrow functions, `map`/`filter`/`reduce`/`find`, `toSorted`
- Chapter 4: `assertStrictEquals` vs `assertEquals`, `assertThrows`, helper functions instead of
  `beforeEach`
- Chapters 5-6: parameter properties, `readonly`, `private`, throwing errors for invalid input
- Chapter 7: model and view, `requireElement`, `textContent` rather than `innerHTML`
- Chapter 8: string-literal unions and `switch` over them
- Java: pass-by-value, composition/aggregation, packages

## Learning outcomes

Students can:

1. say which values are copied and which are shared, and predict the effect of changing an alias
2. explain why `const` does not make an array or object unchangeable, and use `readonly T[]`
3. tell apart no copy, a shallow copy (`[...a]`, `{ ...o }`) and a deep copy (`structuredClone`),
   and know that `structuredClone` loses classes
4. use `assertStrictEquals` / `assertNotStrictEquals` to test identity, and `assertEquals` for
   contents
5. write a test that catches a function changing its argument, and fix it by returning a new value
6. protect a class's private array with defensive copies in the constructor and getters
7. explain composition vs aggregation, and when sharing an object is safe
8. organise files into folders with an `index.ts`, use named exports and `import type`, and compare
   ES modules with Java packages
9. build test data with a function, and explain the shared-fixture bug

## Suggested session plan (2 x 2 hour labs)

**Session 1 - references and copying (Project 1, start of Project 2)**

| Time | Activity |
|---|---|
| 0:00 - 0:15 | Slides 1-6: values and references, `===` vs `assertEquals`, `const` |
| 0:15 - 0:30 | **Live-code** in `tests/values.test.ts`: change the number test to use an array; watch it go red |
| 0:30 - 0:50 | Slides 7-10: the Aliasing Lab and the three copies. Students do Exercise 9.1 in the page *before* clicking |
| 0:50 - 1:10 | **Live-code** `withItem` test first (see below) |
| 1:10 - 1:20 | Slides 11-12: `structuredClone` and classes; fresh data with `makeBasket()` |
| 1:20 - 1:55 | Challenge 1, then Challenge 2 |
| 1:55 - 2:00 | Recap: "who else has a reference to this?" |

**Session 2 - composition and modules (Projects 2-3)**

| Time | Activity |
|---|---|
| 0:00 - 0:20 | Slides 13-17: has-a, composition vs aggregation, the leaking getter, `readonly Song[]` |
| 0:20 - 0:35 | **Live demo**: the leaking getter (below). Students do Exercise 9.2 |
| 0:35 - 0:50 | Slides 18-19: the course class diagram; ids vs identity |
| 0:50 - 1:10 | Slides 20-25: ES modules, `import type`, `index.ts`, the imports diagram, Java packages |
| 1:10 - 1:20 | Slides 26-27: **live demo** of the shared fixture bug (below) |
| 1:20 - 1:55 | Challenges 3-6 (4 and 5 are a good pair; 6 for the quick ones) |
| 1:55 - 2:00 | Recap |

### The `withItem` live-code

In `ch09_project01_aliasing`, write the two `withItem` tests, then the "obvious" version with
`basket.push(item); return basket;`. Ask the room whether it is right before saving. The first test
passes, the second is red with `-   3 / +   2`. Ask: *why did the first test not notice?* (Because the
result looks right - the damage is to the caller's array.) Fix with `[...basket, item]`.

### The leaking getter demo

In `ch09_project02_playlist`, change `getSongs()` to `return this.songs;` with return type
`Song[]`, and remove the `as Song[]` from the test. Save: one red test (`-   4 / +   3`). Then show
that `main.ts` could now change the **+** listener to `playlist.getSongs().push(song)` - it still
works in the page, but every check in `add` has been skipped, and nothing warns you. Put the copy back, then change the return type to
`readonly Song[]` and show the compile error on `songs.push(...)` - the type and the copy are two
separate layers of protection.

### The shared fixture demo

In `ch09_project03_course_modules`, add `tests/shared.test.ts` with the two tests from the chapter
(`const COURSE = makeCourse();` at the top). Save: "nobody is on Maths yet" fails with
`-   1 / +   0`. Then run it alone: `deno test --filter "nobody" tests/shared.test.ts` - it passes.
Swap the order of the two tests in the file and save - now both pass. Delete the file afterwards.
The point to land: a test that depends on what ran before it is not one test, it is a sequence.

## Key points to stress

- **The Java rule is the TypeScript rule.** Students sometimes expect something new; there isn't.
  The only difference is that `string` is a primitive (and immutable in both languages)
- **"Copy" is ambiguous.** Always ask: a copy of what - the reference, the array, or everything?
- **Spread is shallow.** It is by far the most common copying mistake: `[...a]` and `{ ...o }` copy
  one level only
- **`structuredClone` is for plain data.** Class instances come back as plain objects, without
  methods, and TypeScript does not notice (the type still says it is the class)
- **`readonly` is compile time only.** It stops honest mistakes; the defensive copy is the run-time
  protection. That is why the playlist test keeps both
- **Sharing is safe when the object cannot change** (`Song`, `Student`: all `readonly`) **or guards
  its own rules** (`Module`: private array, checked `enrol`). Sharing a bare array is never safe
- **Identity or id?** `includes` and `===` ask "the same object?"; for real-world things you often
  want "the same id?" - a design decision, made explicit in `Module.isEnrolled`
- **In TypeScript the file is the unit of privacy**, not the folder: not exported means invisible
  everywhere else, even next door
- **Fixtures are functions.** Shared constants are fine only for data that never changes

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `TS2588 [ERROR]: Cannot assign to 'shopping' because it is a constant.` | reassigning a `const` | use `let`, or (more often) change the object instead of the variable |
| A change to B also appears in A, no error anywhere | `const b = a` (or `[...a]` then changing an item) | copy at the right depth; test with `assertNotStrictEquals` |
| `Values are not equal ... -   3 +   2` on an "original is unchanged" test | the function `push`es onto its parameter | return a new array: `[...basket, item]` |
| `TS2339 [ERROR]: Property 'push' does not exist on type 'readonly Song[]'.` | changing an array a getter returned as `readonly` | ask the class to make the change (`playlist.add`), or copy it first if a separate list is wanted |
| A cloned object's method is `undefined` at run time; `instanceof` is `false` | `structuredClone` on a class instance | write a copy method, or convert to plain data (`toData`, Challenge 6) |
| `TS1361 [ERROR]: 'Course' cannot be used as a value because it was imported using 'import type'.` | `import type` then `new Course(...)` | a normal import (or `type` only on the names used as types) |
| `TS2305 [ERROR]: Module '".../index.ts"' has no exported member 'Teacher'.` | the name is not exported (or not re-exported by `index.ts`) | export it, and add it to `index.ts` |
| `TS2307 [ERROR]: Cannot find module '.../src/model/Student'. Maybe add a '.ts' extension ...` | relative import without `.ts` | add `.ts` |
| After moving a file into a folder, many `Cannot find module` errors | relative paths are relative to the *importing* file | add `../` to that file's own imports; fix the importers' paths |
| A test passes alone but fails with the others (or the other way round) | shared mutable test data (`const COURSE = ...` at the top) | build data in each test with `makeCourse()` |
| `'module' is possibly 'undefined'` in a test | `course.getModule(code)` returns `Module \| undefined` | the `moduleOf` helper in `tests/fixtures.ts` |

## Discussion questions

1. `toSorted` (Chapter 3) and `withItem` both return something new instead of changing their input.
   What does that cost, and when would you *want* a method that changes its object?
2. `Playlist` copies its array in the constructor and in `getSongs()`. Why does it not copy the
   `Song` objects too? What would change if `Song` had a `setTitle` method?
3. `getModule` hands out the course's real `Module`. Is that a leak, like the original `getSongs`?
   What makes the difference?
4. Should `Module.isEnrolled` compare students by identity or by id? Think of a situation where each
   answer gives a bug.
5. Java's package is the unit of privacy; TypeScript's file is. Which do you prefer, and what does an
   `index.ts` add?
6. JUnit has `@BeforeEach`. What does a `makeCourse()` function give you that `@BeforeEach` does not
   (and the other way round)?

## Extension ideas

- `Object.freeze(array)` makes changes fail at run time. Compare
  with `readonly` and with a defensive copy - three layers, three costs
- `ReadonlyArray<T>` is another way of writing `readonly T[]`; `Readonly<T>` makes every property of
  an object type readonly
- Write `deepCopyItems(items)` by hand with `map` and `{ ...item }`, test it against
  `structuredClone`, and discuss when hand-written is better (classes)
- A circular import: make `Student.ts` import `Course.ts` and discuss why the model folder keeps
  its dependencies one-way
- Run `deno lint --rules-include=verbatim-module-syntax src/` on earlier chapters' projects

## Assessment ideas

- Predict-the-output questions: five short snippets with `=`, spread and `structuredClone`, and the
  value of the original after a change
- Spot the leak: a small class with a getter, a constructor and a method; find every way outside
  code could break its rules, and write a test for each
- Lab check: Challenge 3 (duplicate) with the three tests, plus the comment explaining why songs are
  shared and the array is copied
- Draw the class diagram for Challenge 6's snapshot: what is shared between the course and the
  snapshot? (Nothing - that is the point.)
