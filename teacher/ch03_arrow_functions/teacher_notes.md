# Chapter 3 - Arrow functions: teacher notes

## Overview

Arrow functions, properly. Students have typed `() => { ... }` in every test since Chapter 1 without
being told what it is; this chapter explains it, then uses it for the three things arrows make easy:
listeners written where they are used (with closures), the array methods (`map`, `filter`,
`reduce`, `find`, `toSorted`), and functions stored in data and chosen at run time.

Students have met Java lambdas, but many are shaky. Lean on the Java comparison table early, then
let the TypeScript stand on its own - arrows are simpler than Java lambdas (no functional interfaces).

Along the way: `assertAlmostEquals`, `?.` (optional chaining) as a shorter null check, `type` to
name a type, function types, and `undefined` from `find`. The **`this` trap** (passing a method as a
listener) is the most important "gotcha" in the chapter; it fails silently.

## Prerequisites

- Chapters 1 and 2: functions, arrays, JSON imports, `addEventListener`, classes, object -> event ->
  render, `number | null`
- Java: lambdas and streams help, but are not required

## Learning outcomes

Students can:

1. write arrow functions with expression and block bodies, with typed parameters and return types
2. compare arrow functions with Java lambdas and with `function` declarations
3. use `assertAlmostEquals` for calculated decimals, and explain why exact comparison fails
4. write a listener as an arrow function, and explain how it remembers variables (a closure)
5. use `?.` to call a method on something that may be `null`
6. explain why `addEventListener("click", obj.method)` is wrong, and fix it
7. use `map`, `filter`, `reduce`, `find` and `toSorted` instead of loops, and chain them
8. name a type with `type`, write a function type, and store functions in objects

## Suggested session plan (2 x 2 hour labs)

**Session 1 - arrow functions and listeners (projects 1-2)**

| Time | Activity |
|---|---|
| 0:00 - 0:15 | Slides 1-6: functions are values; three ways to write one; Java lambdas |
| 0:15 - 0:30 | **Live-code**: convert `twoDigits` (Exercise 3.1) and a test's arrow; show the tests still pass |
| 0:30 - 0:45 | Slides 7-8: decimals and `assertAlmostEquals`. **Demo**: `0.1 + 0.2` in the console |
| 0:45 - 1:05 | Slides 9-12: arrow listeners, closures, `?.`. Students do Exercise 3.2 |
| 1:05 - 1:20 | Slide 13: the `this` trap. **Live demo** below |
| 1:20 - 1:55 | Challenges 1 and 2 |
| 1:55 - 2:00 | Recap |

**Session 2 - array methods and functions in data (projects 3-4)**

| Time | Activity |
|---|---|
| 0:00 - 0:25 | Slides 14-18: `map`, `filter`, `reduce`, `find`; `type`; `undefined` |
| 0:25 - 0:40 | **Live-code** `average` test first: write the empty-array test, show `NaN`, add the guard |
| 0:40 - 0:55 | Slides 19-21: sorting and comparators; `sort` vs `toSorted`; chaining; Exercise 3.3 |
| 0:55 - 1:10 | Slides 22-24: function types; converters holding functions; `values.map(convert)` |
| 1:10 - 1:55 | Challenges 3-6 |
| 1:55 - 2:00 | Recap |

### The `this` trap demo

In `ch03_project02_scoreboard`, change the reset listener to
`resetButton?.addEventListener("click", home.reset);`. Save: no type error, no lint warning, tests
green. Score some points, press New game: nothing happens. Open `dist/index.html` in a browser,
open the developer tools, and after clicking type `document.querySelector("#reset").score` - it is
`0`: `reset` ran with `this` set to the button. Then fix it with `() => home.reset()`.

## Key points to stress

- **Expression body returns; block body needs `return`.** `(x) => { x * 2 }` returns `undefined` -
  a classic mistake (TypeScript catches it when a return type is written: another reason to write it)
- **`=>`, not `->`.** Java habits produce `->`, which is a syntax error
- **A closure remembers variables, not values-at-the-time** - for `let`/`const` in a `for ... of` loop
  each iteration has its own variable, so each button gets its own `points`. (Do not go into `var`
  and the old loop-closure bug unless asked)
- **Never pass a method on its own.** Wrap it: `() => obj.method()`
- **The array methods do not change the array** - except `sort`, which is why the book uses
  `toSorted`
- **`find` can give `undefined`**, and TypeScript makes you deal with it
- **Contextual typing**: inside `CONVERTERS`, `(celsius) => ...` needs no type, because the type
  `Converter` says what `convert` must be

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `SyntaxError: Expression expected` (the page is not rebuilt) | `->` instead of `=>` | `=>` |
| `A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.` | `(x): number => { x * 2 }` - braces but no `return` | add `return`, or remove the braces |
| A value shows as `undefined` | arrow with braces and no return, without a return type written | add `return` (and write the return type) |
| `Values are not equal ... 97.88000000000001` | `assertEquals` with a calculated decimal | `assertAlmostEquals` |
| A button does nothing, no error | `addEventListener("click", team.reset)` - the `this` trap | `() => team.reset()` |
| `'top' is possibly 'undefined'` | used the result of `find` (or `topStudent`) without checking | check `=== undefined`, or `top?.name` |
| The table order is wrong everywhere after sorting once | used `sort` (changes the array) on `STUDENTS` | `toSorted` |
| Sorting by name gives a strange order | comparator `a.name - b.name` (strings) | `a.name.localeCompare(b.name)` |

## Discussion questions

1. Six buttons, one loop. How would you have done it in Chapter 2's style? What would change if
   there were a fourth number of points?
2. Why does Java not have the `this` trap with `home::reset`? What does an arrow function do that a
   plain method reference does not?
3. `toSorted` copies the array. When might copying be a bad idea? (A first look at Chapter 9's
   references and copying.)
4. Adding a conversion means adding one object, and no code. What other programs could be built that
   way?
5. `average([])` - should it be 0, `NaN`, or an error? Who decides?

## Extension ideas

- `forEach` as an alternative to `for ... of` - and why `for ... of` is usually clearer
- `some` and `every` (true if any / all elements pass) - e.g. "did anyone get an A?"
- Write `myMap(values, f)` yourself with a loop, test it, and compare with `values.map(f)`
- A function that **returns** a function: `const multiplyBy = (n: number) => (x: number) => x * n;`

## Assessment ideas

- Rewrite three loops from Java as `map`/`filter`/`reduce` one-liners
- Spot the bug: four listener registrations, one of which passes a method directly
- Lab check: Challenge 6 with tests, including the empty search
