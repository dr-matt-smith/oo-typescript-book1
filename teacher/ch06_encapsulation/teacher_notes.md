# Chapter 6 - Encapsulation: teacher notes

## Overview

Encapsulation, the TypeScript way. Students know the Java version - private fields, public
getters and setters - and Project 1 (the Java course's Pet exercise) starts exactly there, so the
familiar part goes quickly. The chapter then adds what Java students usually skip: setters that
**refuse** bad values by throwing, constructors that use the same checks, and invariants.

The TypeScript-specific content is:

- `private` is checked by the compiler only - `pet["age"] = -3` compiles and runs - while `#private`
  is enforced by the JavaScript engine
- `readonly` (Java's `final` field)
- `get`/`set` accessors, read and written like fields, and computed properties
- in TypeScript a public field can become a `get`/`set` pair later without changing callers, so
  "a getter and setter for every field, just in case" is not needed
- `try`/`catch` with an `unknown` error and `error instanceof Error` (taught briefly; Book 2 has a
  chapter on errors)

Testing: `assertThrows` with a message, "a refusal changes nothing" as the second half of every
refusal test, `t.step` over a list of bad values, and the edges of a range. The chapter's
red-green-refactor walk-through is `setAge` (three reds, then extracting `checkAge`), and the bank
account shows a red caused by "change first, check after".

## Prerequisites

- Chapters 1-3: classes with fields and methods, `this.`, arrow functions, `try` is new
- Chapter 4: `assertThrows`, `throw new Error(...)`, `t.step`, helper functions in test files
- Chapter 5: constructors, parameter properties, default parameters, `toString()`
- Java: visibility modifiers, getters/setters, `final`, exceptions and `try`/`catch`

## Learning outcomes

Students can:

1. explain encapsulation as "the outside and the inside" of a class, and why hiding the inside
   both protects data and allows refactoring
2. use `private` and `#private` fields and methods, and explain the difference at compile time and
   run time
3. use `readonly` fields, and `public readonly` parameter properties for values with no rules
4. write `getX()`/`isX()`/`setX()` methods and `get`/`set` accessors, and choose between them
5. write setters and constructors that refuse bad values with `throw new Error(...)`, checking
   before changing anything
6. state an invariant for a class and explain how encapsulation keeps it true
7. test refused input with `assertThrows` (including the message) and check that a refusal leaves
   the object unchanged
8. catch an error on the page with `try`/`catch` and show its message

## Suggested session plan (2 x 2 hour labs)

**Session 1 - private, readonly, setters that refuse (Project 1)**

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Slides 1-4: why hide data; the outside and the inside; Counter (Chapter 2) was already encapsulated |
| 0:10 - 0:25 | Slides 5-8: Pet - private fields, getters/setters, `isHungry()`, `readonly`. **Demo**: `pet.age = -3` and the TS2341 error; `this.species = "cat"` and TS2540 |
| 0:25 - 0:55 | **Live-code** `setAge` red-green-refactor (slides 9-13): the plain setter, the red test, the `if`, the 2.5 test, the constructor test, extracting `checkAge`. Show the TS2564 error when the constructor calls `this.setName(name)` |
| 0:55 - 1:05 | Slides 14-15: `try`/`catch` on the page; `unknown` and `instanceof Error` |
| 1:05 - 1:15 | Slide 16: the `pet["age"]` hole. **Demo** below |
| 1:15 - 1:55 | Exercise 6.1, then Challenges 1 and 5 |
| 1:55 - 2:00 | Recap |

**Session 2 - #private, invariants, accessors (Projects 2-3)**

| Time | Activity |
|---|---|
| 0:00 - 0:15 | Slides 17-19: `#balance`, the getter with no setter, money in cents |
| 0:15 - 0:30 | Slides 20-21: the invariant; **live demo** of "change first, check after" going red (below) |
| 0:30 - 0:40 | Slide 22: `t.step` over bad amounts; Exercise 6.2 |
| 0:40 - 1:00 | Slides 23-26: the thermostat's `get`/`set` pair, testing a setter, `up()` through the setter, computed `heating`, public `room` |
| 1:00 - 1:10 | Slides 27-28: accessors or methods? Java comparison |
| 1:10 - 1:55 | Exercise 6.3, then Challenges 2, 3, 4 and 6 |
| 1:55 - 2:00 | Recap |

### The `private` hole demo

In `ch06_project01_pet`, add to `src/main.ts`, just before `render();`:

```ts
pet["age"] = -3;
```

Save: no type error, no lint warning, all tests green - and the page says
`(PET) Rex is a dog, and is -3 years old.` Then open `dist/app.js` and find `var Pet = class` -
the fields are plain `name; species; age; hungry = false;` with no trace of `private`. Then show the
bank account's bundle: `#balance;` is still there. Ask: why might TypeScript allow the bracket form
at all? (It is a deliberate escape hatch, used in tests and special cases.) Remove the line.

### The "change first, check after" demo

In `ch06_project02_bank_account/src/BankAccount.ts`, rewrite `withdraw` as:

```ts
public withdraw(cents: number): void {
  this.#checkAmount(cents);
  this.#balance -= cents;
  if (this.#balance < 0) {
    throw new Error(`Not enough money: the balance is ${formatEuro(this.#balance)}`);
  }
}
```

Ask the class first: does this work? It does throw. Then save: two tests go red - the balance after
a refused withdrawal of 3000 from 2000 is `-1000`, not `2000`, and the message test gets
`"Not enough money: the balance is €-0.01"`. Point out that the message alone gives the bug away:
the account says its balance is negative, which the invariant says can never happen.

## Key points to stress

- **The setter's job is to refuse.** A setter that copies its argument into the field protects
  nothing - it is a public field with extra typing. Every setter in the chapter checks first
- **Check first, change after.** A refused call must leave the object exactly as it was. Every
  refusal test has two halves: it throws, and nothing changed
- **One copy of each rule.** The constructor and the setter share a private `checkX` helper; `up()`
  goes through the `target` setter; `transferTo` (Challenge 4) reuses `withdraw` and `deposit`
- **`private` is a compile-time check only.** It is enough in practice, but students coming from
  Java assume the runtime enforces it. `#` is real privacy
- **Parameter properties skip validation.** Use them for values with no rules (the account owner),
  not for fields with a check
- **A getter is read like a field** (`account.balance`, no brackets) and should behave like one:
  cheap, no side effects
- **Not every field needs hiding.** In TypeScript a public field can become an accessor later without
  changing callers, so a field with no rules can simply be public (`room`)
- **Encapsulation is what makes tests survive refactoring**: tests that use only the outside do not
  care how the inside changes - Challenge 5 is the counter-example, where the outside changes and
  the tests must too

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `Property 'age' is private and only accessible within class 'Pet'.` | reaching for a private field (or method) from `main.ts` or a test | use the public method or accessor |
| `Cannot assign to 'species' because it is a read-only property.` | assigning to a `readonly` field outside the constructor | set it in the constructor only, or drop `readonly` if it really must change |
| `Cannot assign to 'balance' because it is a read-only property.` | assigning to a `get` accessor with no `set` | use the method that changes it (`deposit`) |
| `Property 'name' has no initializer and is not definitely assigned in the constructor.` | the constructor calls `this.setName(name)` instead of assigning the field | `this.name = this.checkName(name)` |
| `Property '#balance' is not accessible outside class 'BankAccount' because it has a private identifier.` | using a `#` field outside the class | use the accessor |
| `An accessibility modifier cannot be used with a private identifier.` | `private #balance` | just `#balance` |
| `This expression is not callable.` / `Type 'Number' has no call signatures.` | `thermostat.target(21)` - calling an accessor like a Java setter | `thermostat.target = 21` |
| `Property 'getTarget' does not exist on type 'Thermostat'. Did you mean 'target'?` | Java habit: `getTarget()` | `thermostat.target` |
| `'error' is of type 'unknown'.` | `catch (error) { ... error.message ... }` | `error instanceof Error ? error.message : String(error)` |
| `Argument of type 'void' is not assignable to parameter of type '() => unknown'.` | `assertThrows(pet.setAge(-1))` - calling the method instead of passing a function | `assertThrows(() => pet.setAge(-1))` |
| `AssertionError: Expected function to throw.` | the check is missing, or in the wrong place (e.g. only in the setter, not the constructor) | add the check, ideally in a shared helper |
| `AssertionError: Expected error message to include "...", but got "...".` | the message differs from what the test expects | decide which wording is right; test a distinctive part, not every word |
| A refused withdrawal leaves the balance changed (`-1000` instead of `2000`) | changed first, checked after | check everything before changing anything |
| A button does nothing after a refusal, no message | no `try`/`catch` in the listener: the error stops it | wrap the call in `try`/`catch` and show `error.message` |
| `pet["age"] = -3` "works" | TypeScript's `private` is erased by the build | use `#age` if it must be enforced; otherwise, do not do that |

(`assertThrows(() => thermostat.target = 31)` without braces compiles, lints and works; the book
uses braces for readability.)

## Discussion questions

1. Java programmers write a getter and setter for every field. Why is that less necessary in
   TypeScript? Is it ever still a good idea?
2. `Pet` has `play()` and `feed()` instead of `setHungry(boolean)`. What is gained? Find another
   class you have written in Java where a setter should have been an action.
3. Should `withdraw` throw when there is not enough money, or return `false`? Who has to remember
   to check in each case? (Book 2's chapter on errors returns to this.)
4. `private` or `#`? Make the case for each. Does it matter in a program only you work on?
5. The thermostat's `up()` stops at 30 °C silently, but typing 35 is an error. Why the difference?
   Where else does software clamp instead of refusing?
6. What is the invariant of Chapter 2's `Counter`? Of a `Die` from Chapter 5?

## Extension ideas

- A `Temperature` or `Money` class that cannot be made invalid (a "value object"), used inside the
  thermostat or the account - previewing composition (Chapter 9)
- A transaction history for the account: `get history(): string[]`. What goes wrong if the getter
  returns the private array itself? (The caller can `push` to it - Chapter 9's references; a
  `readonly string[]` return type or a copy fixes it)
- `Object.freeze` vs `readonly`: one works at run time, one at compile time - the same split as `#`
  and `private`
- Write the invariant as a private method `#checkInvariant()` and call it at the end of every
  public method during development

## Assessment ideas

- Given a class with public fields and a list of rules, encapsulate it: choose private or `#`,
  getters or accessors, write the checks, and write refusal tests that check nothing changed
- Spot the bug: four setters, one of which changes the field before checking
- Short answer: explain why `pet["age"] = -3` compiles and what to do about it
- Lab check: Challenge 4 (transfers) with the "neither balance changes" test, and an explanation of
  why the order of `withdraw` and `deposit` matters
