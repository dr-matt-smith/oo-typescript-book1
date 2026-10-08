# Chapter 11 - Inheritance: teacher notes

## Overview

The last chapter of Book 1. Students know inheritance well from Java (three chapters, plus
`protected` and `super` constructors), so the chapter moves quickly through the familiar parts -
`extends`, `super(...)`, `protected`, `abstract` - and spends its time on what is different in
TypeScript and on testing:

- `override` is a keyword, made compulsory by `noImplicitOverride` (already on in every project's
  `deno.json`); it catches accidental overrides and typos
- a subclass with no constructor **inherits** its superclass's constructor (Java never does this)
- `protected` has no package part
- there is **no `final`**: `readonly` for fields, a private constructor for classes, and private
  helpers plus tests for methods
- abstract class or interface? (links back to Chapter 10)
- **one test suite written as a function** (`testAccountRules(kind, makeAccount)`) and called once per
  subclass - the test-first face of the Liskov substitution principle

The Java `cat1`-`cat11` progression is compressed into a single table plus the finished Animal
project. Polymorphism is used (the mixed `Animal[]`, `chorus`, `wireCard`) and named, but explicitly
left to Book 2 Chapter 1, which starts there.

The red-green cycle in the text is the current account's overdraft: the red is an **error thrown
inside the code under test**, not an assertion diff - a good moment to read a stack trace.

## Prerequisites

- Chapters 4-10, in particular: `assertThrows` (4); constructors, parameter properties, default
  parameters, `toString` (5); `private`/`readonly`, throwing errors (6); `requireElement` and
  `textContent` (7); static methods and string literal unions (8); spread and composition (9);
  interfaces and structural typing (10)
- Java: inheritance, `super`, `protected`, `abstract`, `final`

The projects' `main.ts` files use `try`/`catch` (project 3) with `error instanceof Error`; the chapter
explains it in two sentences, and Book 2's errors chapter covers it properly.

## Learning outcomes

Students can:

1. decide between inheritance (is-a) and composition (has-a) for a pair of classes
2. write a subclass with `extends`, and say what it inherits - including the constructor
3. write an abstract class with abstract methods, and explain the compiler errors when it is
   instantiated or a subclass leaves an abstract method out
4. use `override` on every overriding method, and explain what `noImplicitOverride` protects against
5. choose between `private`, `protected` and `public` for a member, starting from `private`
6. write a subclass constructor that calls `super(...)` correctly, and use `super.method()`
7. explain what TypeScript offers instead of Java's `final`
8. write a shared test suite as a function and run it against every subclass

## Suggested session plan (2 x 2 hour labs)

**Session 1 - extends, abstract, override, protected (projects 1-2)**

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Slides 1-4: is-a vs has-a; the Java cat projects in one table |
| 0:10 - 0:30 | Slides 5-9: `Animal`, `Cat`, `Dog`. **Live demo** of the errors below |
| 0:30 - 0:45 | Slides 10-13: an `Animal[]`, `instanceof`, `toString`, `protected`. Exercise 11.1 (slide 14) |
| 0:45 - 1:05 | Slides 15-19: `Person`, `Student`, `super(...)` and its rules, `super.toString()` |
| 1:05 - 1:15 | Exercise 11.2 (initials) |
| 1:15 - 1:55 | Challenges 1, 2 and 3 |
| 1:55 - 2:00 | Recap |

**Session 2 - abstract rules, test first, shared tests, no final (project 3)**

| Time | Activity |
|---|---|
| 0:00 - 0:15 | Slide 20: `BankAccount`, `withdraw` calling the abstract `available()` |
| 0:15 - 0:35 | **Live-code** the overdraft test first (slides 21-22): `available()` returns `this.balance`, write the test, read the red stack trace together, fix `available()` |
| 0:35 - 0:55 | Slides 23-24: `testAccountRules`. **Live demo**: the broken `StudentAccount` below |
| 0:55 - 1:10 | Slides 25-26: no `final`; abstract class or interface |
| 1:10 - 1:55 | Challenges 4, 5 and 6 |
| 1:55 - 2:00 | Slides 27-28: summary; what next (Book 2) |

### Live demo: the compiler as a safety net (session 1)

In a copy of `ch11_project01_animals`, add a `src/Cow.ts` and make these mistakes one at a time,
saving each time and reading the type-error section of the report:

1. `export class Cow extends Animal {}` - TS2515, `Cow` does not implement `getSound`
2. add `public override getSond()` - TS4117, with "Did you mean 'getSound'?"
3. fix it, then add `public toString()` without `override` - TS4114
4. in `main.ts`, `new Animal("Thing")` - TS2511
5. in `main.ts`, `console.log(new Cat("Tom").name)` - TS2445

Point out that the tests still run (they run with `--no-check`) - type errors are reported in their
own section, and the page is not rebuilt until they are fixed.

### Live demo: shared tests catch a bad subclass (session 2)

Start from the Challenge 4 solution (or write `StudentAccount` live). Replace `super.withdraw(amount)`
with `this.balance -= amount;` - it compiles, because `balance` is protected. Save. Three tests go red:

```text
not ok 35 - StudentAccount: a withdrawal of zero or less is rejected
not ok 37 - StudentAccount: no more than what is available can be withdrawn
not ok 40 - a student account cannot go past €50 overdrawn
```

Two of them are shared rules the student account's author never wrote. That is the point of
`testAccountRules`: there is no `final` on `withdraw`, but the rules are still enforced.

## Key points to stress

- **Is-a, out loud.** If "a ___ is a ___" sounds wrong, use composition (Chapter 9)
- **`override` everywhere.** The compiler requires it when replacing a method with a body; it is
  optional when writing an abstract method's body, but the book writes it every time
- **A subclass without a constructor inherits its superclass's.** Java students expect to have to
  write one. Once a subclass needs extra data, it needs its own constructor, which must call
  `super(...)` before touching `this`
- **Pass on, don't redeclare.** In `Student`'s constructor, `name` and `email` are plain parameters;
  only the new ones are parameter properties
- **Start `private`.** `protected` is a promise to every future subclass. `BankAccount.owner` stays
  private; `balance` is protected because subclasses genuinely need it
- **Through an `Animal` variable you only see `Animal`.** The object decides *which* method runs, the
  variable's type decides *which methods exist*
- **`instanceof` works for classes** (they exist at run time) but not for interfaces (Chapter 10)
- **No `final`.** Know the three replacements, and that the method case has no language answer -
  tests are the answer
- **A shared suite registers tests; it does not run them.** It is not named `.test.ts`. Each call
  makes a fresh account through `makeAccount`, so tests never share state

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `TS4114 [ERROR]: This member must have an 'override' modifier because it overrides a member in the base class 'Animal'.` | replaced `toString` (or any method with a body) without `override` | add `override` |
| `TS4117 [ERROR]: This member cannot have an 'override' modifier because it is not declared in the base class 'Animal'. Did you mean 'getSound'?` | a typo in an overriding method's name | fix the name |
| `TS2515 [ERROR]: Non-abstract class 'Cow' does not implement inherited abstract member getSound from class 'Animal'.` | abstract method not written (also appears for every subclass the moment an abstract method is added - Challenge 6) | write the method |
| `TS2511 [ERROR]: Cannot create an instance of an abstract class.` | `new Animal(...)` | make a subclass object |
| `TS2377 [ERROR]: Constructors for derived classes must contain a 'super' call.` | subclass constructor without `super(...)` | call `super(...)` |
| `TS17009 [ERROR]: 'super' must be called before accessing 'this' in the constructor of a derived class.` | `this.x = ...` before `super(...)` | move `super(...)` first |
| `TS2554 [ERROR]: Expected 2 arguments, but got 1.` | `super(name)` when `Person` needs name and email | pass every argument the superclass constructor needs |
| `TS2445 [ERROR]: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.` | used a protected member from outside (often in `main.ts` or a test) | use a public getter |
| `TS2341 [ERROR]: Property 'owner' is private and only accessible within class 'BankAccount'.` | a subclass used a private member | use `getOwner()`, or make it `protected` if subclasses really need it |
| `TS2339 [ERROR]: Property 'wagTail' does not exist on type 'Animal'.` | called a subclass-only method through a superclass variable | keep a variable of the subclass type (as `main.ts` does with `savings`) |
| `TS2513 [ERROR]: Abstract method 'getSound' in class 'Animal' cannot be accessed via super expression.` | `super.getSound()` when `Animal`'s version is abstract | there is nothing to call; write the body |
| `TS2415 [ERROR]: Class 'Isa' incorrectly extends base class 'BankAccount'. Types have separate declarations of a private property 'requirePositive'.` | a subclass declared a method with the same name as a private one | choose another name - private members cannot be overridden |
| The page shows `[object Object]` | an object in a template literal with no `toString()` | write `toString()` |
| A subclass test fails with `Not enough money` from `BankAccount.ts` | the error is thrown in the inherited `withdraw`; the bug is in the subclass's `available()` | read the stack trace from the top: where it was thrown, then who called it |
| Shared tests missing from the report for one kind of account | its test file never calls `testAccountRules(...)` - the rules file registers nothing on its own | add the one-line call to that test file |

## Discussion questions

1. `Person` is a normal class, `Animal` is abstract. What makes the difference? Would an abstract
   `Person` with a `Visitor` subclass be better?
2. `Cat` and `Dog` each override `toString()` with almost the same code. How could `Animal` do it once?
   (An abstract `getKind()`, as `BankAccount` has.)
3. Why does TypeScript let a subclass inherit a constructor, when Java does not? What can go wrong
   when the superclass's constructor later gains a parameter? (Challenge 3 shows it.)
4. Should the €200 limit in Challenge 4 go in `available()` or in an overridden `withdraw`? What would
   the shared test "everything available can be withdrawn" say about each choice?
5. With no `final`, is a test suite a good enough guard? Who runs it, and when?
6. Pick a pair from your Java course (Phone, Iphone, Galaxy...). Inheritance, interface, or
   composition?

## Extension ideas

- Testing an abstract class directly: a tiny subclass written inside the test file
  (`class TestAccount extends BankAccount { ... }`)
- `t.step` (Chapter 4) instead of separate `Deno.test`s inside `testAccountRules`: one test per kind
  of account, one step per rule - compare the report
- Remove the duplicated `toString()` in `Cat` and `Dog` with an abstract `getKind()`, under green tests
- Make `Animal` implement a Chapter 10 interface (`Speaker { speak(): string }`) and give `chorus` the
  interface type instead - then pass it an object literal
- Read about the Template Method pattern (`withdraw` calling `available()`), ahead of Book 3

## Assessment ideas

- Given a Java hierarchy (e.g. `Shape`, `Circle`, `Square` with `final` and `@Override`), translate it
  to TypeScript, with tests
- Spot the bugs: a subclass with a constructor that uses `this` before `super`, a missing `override`,
  and a `protected` field read in `main.ts` - say the error for each without compiling
- Lab check: Challenge 4 or 6, with the shared suite extended and passing for every subclass
- Short answer: abstract class or interface - when would you choose each, and why?
