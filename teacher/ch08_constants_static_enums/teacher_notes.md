# Chapter 8 - Constants, static and enums: teacher notes

## Overview

Three related ideas, all about values that are fixed or shared:

1. **`const` vs `readonly` vs `static readonly`** - TypeScript's three kinds of "never changes",
   compared with Java's `final` and `static final`
2. **Fixed sets of values** - string-literal unions, `switch` statements the compiler checks for
   completeness, `as const` arrays, and TypeScript's `enum` (shown, compared, and not recommended)
3. **Static fields and methods** - the Java static chapter's counter, static methods and factory
   methods, and the cost of static state in tests

The chapter's recommendation is firm: **use string-literal unions; add an `as const` array when the
values are needed at run time; recognise `enum` but do not reach for it.** Java students will
expect `enum` to be the answer, so the comparison in Project 2 matters - let them see the surprises
(a real object in the output, plain strings rejected, numeric reverse mapping) rather than just being
told.

Test-first moments: `nextColour` is built red-green, and the compiler's `TS2366` turns out to be a
second safety net ("every value must be handled"). The static counter produces the chapter's best
lesson: two correct tests that fail together, because static state leaks between tests.

## Prerequisites

- Chapters 1-3: unions such as `number | null`, `type`, `switch` (from Java), `find`, `map`,
  `filter`, `reduce`, `toSorted`, JSON imports
- Chapter 4: `assertThrows`, `throw new Error(...)`, helper functions instead of `beforeEach`
- Chapter 5: constructors and parameter properties, `toString()`
- Chapter 6: `readonly`, `private`
- Chapter 7: model and view, `main.ts` as the only file touching the DOM
- Java: `final`, `static`, `enum`, `switch`

## Learning outcomes

Students can:

1. choose between `const`, `readonly` and `static readonly` for a given value, and explain the choice
2. define a string-literal union type and explain what the compiler checks
3. write a `switch` over a union with no `default`, and explain why the return type makes the
   compiler insist on every case
4. test every value of a union by looping over an array of its values
5. write an `as const` array and derive the union from it with `(typeof VALUES)[number]`
6. compare `enum`, unions and `as const`, and justify using unions
7. check a string from outside (JSON) against a union, throwing on a bad value, and test it with
   `assertThrows`
8. write and call static fields and methods, including a static factory method
9. explain why static state makes tests depend on each other, and keep tests independent

## Suggested session plan (2 x 2 hour labs)

**Session 1 - constants and unions (Project 1, start of Project 2)**

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Slides 1-3: what you will learn; the three kinds of "never changes" |
| 0:10 - 0:25 | Slide 4: union types. **Demo**: type `nextColour("` and show the editor's suggestions; try `"purple"` |
| 0:25 - 0:50 | Slides 5-8: **live-code** `nextColour` test first: the red diff, then the two-case switch and `TS2366`, then all four cases. Show that adding `default:` silences the error |
| 0:50 - 1:00 | Slide 9: testing every value with `LIGHT_COLOURS` |
| 1:00 - 1:15 | Slides 10-12: `static readonly`, `readonly`, `Record`; `readonly` is shallow. Exercise 8.1 |
| 1:15 - 1:55 | Challenge 1, then start Challenge 6 (stronger students) |
| 1:55 - 2:00 | Recap: "the compiler knows every value - let it check your switches" |

**Session 2 - enums compared, and static (Projects 2 and 3)**

| Time | Activity |
|---|---|
| 0:00 - 0:20 | Slides 13-16: Java's enum; the three ways; enum surprises (run `tests/three_ways.test.ts`) |
| 0:20 - 0:35 | Slides 17-20: unions again; `as const`; which to use; checking JSON with `toDiet`. **Try it**: put `"vegen"` in `menu.json` |
| 0:35 - 0:45 | Slide 21: static factory method `Dish.fromData`; static `formatPrice`. Exercise 8.2 |
| 0:45 - 1:05 | Slides 22-27: the static counter; static methods; **live demo** below - the two tests that fail together |
| 1:05 - 1:10 | Slides 28-30: when not to use static; summary; challenges |
| 1:10 - 1:55 | Challenges 2-5 |
| 1:55 - 2:00 | Recap |

### The static test-order demo

In a copy of `ch08_project03_ticket_numbers`, delete `Ticket.resetNumbering();` from the first two
tests in `tests/Ticket.test.ts` (and delete `tests/TicketQueue.test.ts`, whose tests run in the same
process). Run the tests: test 2, "each new ticket gets the next number", fails with actual `2`,
expected `1`. Ask the class why, before explaining. Then run it alone:
`deno test --filter "next number" tests/` - it passes. Swap the order of the two tests: now test 1
passes and... ask what happens (the first test now gets ticket 3). Put the resets back.

## Key points to stress

- **The return type is what makes the switch check work.** Without `: LightColour`, a two-case
  switch compiles and the function silently returns `undefined` for the other values (TypeScript
  infers `"red-amber" | "green" | undefined`)
- **No `default` in a switch over a union.** A `default` hides missing cases - the opposite of what
  Java habits suggest
- **Write values once.** Project 1 deliberately has the colours twice (type and array) to motivate
  `as const` in Project 2
- **Unions are just strings at run time.** That is why they work with JSON, forms and `<select>`
  elements, and why data from outside must be checked (`toDiet`)
- **`enum` is the odd one out**: it emits a real object, so it is not "just types"; Node's built-in
  TypeScript support refuses it
- **Static members are reached through the class name**, even inside the class: `Ticket.nextNumber`,
  never `this.nextNumber`
- **`static readonly` is harmless; static fields that change are global state.** Ask "could there
  ever be two of these?"
- **`readonly` is shallow** - same as Java's `final` on a reference. Chapter 9 picks this up

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `Function lacks ending return statement and return type does not include 'undefined'.` | a `switch` over a union is missing a case | add the case (not a `default`) |
| `Argument of type '"purple"' is not assignable to parameter of type 'LightColour'.` | a string that is not in the union | use one of the union's values |
| `Type '"gren"' is not comparable to type 'LightColour'.` | a typo in a `case` | fix the spelling |
| `Property '"red-amber"' is missing in type '{ red: number; green: number; amber: number; }' but required in type 'Record<LightColour, number>'.` | a `Record` without a key for every value | add the missing key |
| `Cannot assign to 'STARTING_COLOUR' because it is a read-only property.` | assigning to a `readonly` or `static readonly` field | do not - or remove `readonly` if it really changes |
| `Argument of type 'string' is not assignable to parameter of type '"starter" \| "main" \| "dessert"'.` | passing JSON data straight to a constructor expecting a union | check it first: `toCourse(data.course)` |
| `Type '"vegan"' is not assignable to type 'DietEnum'.` | a plain string where an enum is expected | use `DietEnum.Vegan` - or use a union instead |
| `Property 'PREFIX' does not exist on type 'Ticket'. Did you mean to access the static member 'Ticket.PREFIX' instead?` | reaching a static member through an object (allowed in Java) | `Ticket.PREFIX` |
| `Property 'count' does not exist on type 'typeof Broken'.` | `this.field` inside a static method | static methods have no object: pass what they need as parameters, or make the method non-static |
| A test passes alone but fails with the others (actual `2`, expected `1`) | a static counter carried over from an earlier test | reset it at the start of every test, or move the state into an object |
| `SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode` | running a file with an `enum` directly with Node | use a union (or a build step) |

## Discussion questions

1. Java's `switch` over an enum usually has a `default`. Why does this chapter say never to write one
   over a union? Is there any case where a `default` is right?
2. `Ticket.nextNumber` is static. `TrafficLight.SECONDS` is static too. Why is one a problem for
   testing and the other not?
3. A teammate wants to use `enum` because "it's what Java does". What would you show them?
4. `toDiet` throws for an unknown diet. Would it be better to return `undefined`? Who should decide
   what happens to a menu with a bad dish? (A preview of Book 2's errors chapter.)
5. Could `formatPrice` be a plain function in its own file instead of a static method? What are the
   arguments each way? (TypeScript, unlike Java, does not need a class for a function.)

## Extension ideas

- Look at the JavaScript an enum turns into: use `DietEnum.Vegan` in `main.ts`, build, and find
  `DietEnum` in `dist/app.js`. Then do the same with the union - and find nothing
- `as const` on an object, and why `(typeof Diet)[keyof typeof Diet]` works - for keen students only
- `Record<Diet, string>` instead of `dietLabel`'s `switch`: which is clearer? Which does the
  compiler check?
- Static counters in Java and TypeScript: try the Java `Student` object-count exercise in TypeScript,
  test first, and notice the test-order problem
- Book 2 shows exhaustiveness with `never` - a way to get the switch check even when the function
  returns nothing

## Assessment ideas

- Given a Java class with `public static final` constants, a `static int count` and an `enum`,
  rewrite it in TypeScript with tests (union, `as const`, `static readonly`, static counter with a
  reset)
- Spot the bug: a `switch` over a union with a `default`, after a new value was added to the union
- Lab check: Challenge 5 (two desks) with a short written explanation of why the tests no longer
  need `resetNumbering`
