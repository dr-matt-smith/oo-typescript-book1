# Object-oriented TypeScript, test first

**OOP in TypeScript for Java programmers - with Deno, Celbridge, and test-driven development**

You know object-oriented programming from Java. This book shows you how the same ideas work in
TypeScript, the language most web software is written in - which habits carry over, which change,
and which TypeScript ideas replace Java ones. Every chapter comes with small Celbridge projects that
run as a web page. Testing starts in Chapter 1, and from Chapter 4 on every project is written
**test first**.

## Getting started

You need [Deno](https://deno.com/) 2.4 or later, and (optionally) [Celbridge](https://celbridge.org/).
Open any project folder in Celbridge: its console starts by itself, builds the page into `dist/`,
runs the tests, writes a report to `test_output/`, and then rebuilds and retests every time you
save. Open `dist/index.html` to see the page - no server needed. Chapter 1 explains it all.

## Chapters

1. **[Introduction: TypeScript, Deno and Celbridge](chapters/ch01_introduction/README.md)**
   A gentle start in seven small projects: "Hello, world!", the time of day, functions, why and how
   to test, a first function written test first, arrays and lists on the page, and data in JSON.
   Covers the tools, what happens every time you save, and the TypeScript basics for Java programmers.

2. **[Events: clicks, keys and timers](chapters/ch02_events/README.md)**
   How web pages respond: the event-driven model and the browser's event loop, listeners for clicks,
   typing and key presses, and timers. Introduces the first TypeScript class, next to its Java twin,
   and the pattern used all through the book: object, event, render.

3. **[Arrow functions](chapters/ch03_arrow_functions/README.md)**
   Java's lambdas, TypeScript-style: arrow syntax, listeners written where they are used and the
   variables they remember, the `this` trap, the array methods `map`, `filter`, `reduce`, `find` and
   `toSorted`, and functions stored in data and chosen while the program runs.

4. **[Test first, properly](chapters/ch04_test_first/README.md)**
   Test-driven development becomes the habit for the rest of the book: FizzBuzz built one
   red-green-refactor cycle at a time, Roman numerals refactored from a pile of `if`s into a data
   table under green tests, and a password checker that brings in `throw`, `assertThrows`,
   `assertStrictEquals` versus `assertEquals`, steps with `t.step`, and helper functions instead of
   `beforeEach` - ending with katas and a "start red" exercise.

5. **[Classes, objects and constructors](chapters/ch05_classes/README.md)**
   Classes as you know them from Java, and where TypeScript differs: one `constructor`, parameter
   properties, default and optional parameters instead of overloading, `toString()`, and turning
   JSON data into objects with `map`. Each class is built test first: a student card, a die rolled
   with a random number passed in, and a module list.

6. **[Encapsulation](chapters/ch06_encapsulation/README.md)**
   Objects that look after their own data: `private` and `readonly` fields, getters and setters
   that refuse bad values by throwing an `Error`, and the invariants encapsulation keeps true - plus
   TypeScript's twists: `private` versus `#private`, and `get`/`set` accessors that let a field gain
   checks later without changing the code that uses it.

7. **[Model and view](chapters/ch07_model_and_view/README.md)**
   Every program split three ways: a model that holds the data and the rules, never touches the DOM
   and is fully tested; a thin view that only shows the model; and `main.ts`, joining them so every
   event is "change the model, then render". Along the way: `requireElement`, why text a user typed
   must never go into `innerHTML`, and views that report clicks through functions they are given.

8. **[Constants, static and enums](chapters/ch08_constants_static_enums/README.md)**
   `const`, `readonly` and `static readonly`; string-literal unions and `switch`es the compiler
   checks for every value; `enum`, unions and `as const` compared (unions recommended); and static
   fields and methods through a ticket counter - which also shows how static state makes tests
   depend on each other.

9. **[References, composition and modules](chapters/ch09_references_composition_modules/README.md)**
   Which values are copied and which are shared, why `const` is not immutability, spread copies and
   `structuredClone`, and tests that catch aliasing bugs; then composition and aggregation (a
   playlist has songs, a course has modules has students) and ES modules in depth, compared with
   Java packages.

10. **[Interfaces and structural typing](chapters/ch10_interfaces/README.md)**
    Interfaces checked by shape, not by name: shapes drawn on a `<canvas>`, the browser's own canvas
    context fitting an interface you wrote, plain object literals as fakes in tests, a band played
    through two interfaces, and one `Sortable` interface sorting songs, planets and mountains.

11. **[Inheritance](chapters/ch11_inheritance/README.md)**
    Cats and dogs that are animals, students and lecturers who are people, savings and current
    accounts that are bank accounts: `extends`, `super(...)`, `protected`, abstract classes, the
    compulsory `override`, what TypeScript offers instead of `final`, and one test suite, written as
    a function, that checks every subclass keeps the rules.

Appendix: **[Java to TypeScript cheat sheet](cheat_sheet.md)**

## What comes next

**Book 2 - Object-oriented TypeScript, further** carries on from here: polymorphism and narrowing,
generics and collections, errors and test doubles, and an introduction to measuring code quality,
statically and at run time. **Book 3** introduces design patterns, and **Book 4** is a reference to
the rest.

Teachers: see [teacher/](teacher/README.md) for notes, slides, and solutions to every challenge.
