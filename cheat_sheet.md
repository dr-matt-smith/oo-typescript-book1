# Java to TypeScript cheat sheet

One page of everything Book 1 translates from Java. The chapter that explains each row is in the
last column.

## Basics

| Java | TypeScript | Ch |
|---|---|---|
| `int n = 5;` / `double d = 2.5;` | `let n = 5;` / `let d: number = 2.5;` - one `number` type | 1 |
| `final String NAME = "Ada";` | `const NAME = "Ada";` | 1 |
| `String`, `boolean`, `char` | `string`, `boolean` (no `char`: a one-letter `string`) | 1 |
| `"Hi " + name + "!"` | `` `Hi ${name}!` `` | 1 |
| `a.equals(b)` (strings), `==` (numbers) | `a === b` for both; never `==` | 1 |
| `String[] xs = {"a", "b"};` / `ArrayList<String>` | `const xs: string[] = ["a", "b"];` (grows like a list) | 1 |
| `for (String x : xs)` | `for (const x of xs)` - `of`, not `in` | 1 |
| `xs.length` / `list.size()` | `xs.length` | 1 |
| `static int twice(int n) { ... }` in a class | `function twice(n: number): number { ... }` in any file | 1 |
| `public` class, `import pkg.Name;` | `export`, `import { Name } from "./Name.ts";` | 1, 9 |
| `null` | `null` and `undefined`; only allowed if the type says so: `string \| null` | 2 |

## Functions

| Java | TypeScript | Ch |
|---|---|---|
| `x -> x * 2` | `(x) => x * 2` | 3 |
| `Function<Integer, Integer>` | `(x: number) => number` | 3 |
| `list.stream().map(f).collect(...)` | `xs.map(f)` | 3 |
| `.filter(p)`, `.reduce(0, Integer::sum)`, `.findFirst()` | `.filter(p)`, `.reduce((s, x) => s + x, 0)`, `.find(p)` (or `undefined`) | 3 |
| `list.sort(cmp)` (changes the list) | `xs.toSorted(cmp)` (a copy) | 3 |
| `obj::method` | `() => obj.method()` - never `obj.method` on its own | 3 |
| `button.addActionListener(e -> ...)` | `button.addEventListener("click", () => { ... })` | 2, 3 |

## Classes

| Java | TypeScript | Ch |
|---|---|---|
| `public class Student { ... }` | `export class Student { ... }`, one per file, `Student.ts` | 2, 5 |
| `count++` inside a method | `this.count++` - `this.` is compulsory | 2 |
| `private String name;` + constructor assigning it | `constructor(private name: string) {}` (parameter property) | 5 |
| several constructors / overloaded methods | one constructor/method with default (`x = 1`) or optional (`x?`) parameters | 5 |
| `toString()` | `toString(): string` - used by `${obj}` | 5 |
| `private` | `private` (checked by the compiler) or `#field` (private at run time too) | 6 |
| `final` field | `readonly` field | 6, 8 |
| `getName()`, `isActive()`, `setName(...)` | methods, or `get name()` / `set name(v)` accessors | 6 |
| `throw new IllegalArgumentException("...")` | `throw new Error("...")` | 4, 6 |
| `static final int MAX = 3;` | `static readonly MAX = 3;` (or a module-level `const`) | 8 |
| `enum Colour { RED, GREEN }` | `type Colour = "red" \| "green";` (or `enum`, or `as const`) | 8 |
| `interface Shape { double area(); }` | `interface Shape { area(): number; }` - matched by shape, not name | 10 |
| `class Circle implements Shape` | `class Circle implements Shape` (optional - any object of the right shape fits) | 10 |
| `class Cat extends Animal`, `super(...)` | the same | 11 |
| `@Override` | `override` keyword - compulsory in this book's projects | 11 |
| `protected`, `abstract` | the same | 11 |
| `final class` / `final` method | no equivalent - prefer composition, or document "do not override" | 11 |
| `obj instanceof Shape` (interface) | not possible - interfaces vanish at run time | 10 |

## Tests

| JUnit | Deno | Ch |
|---|---|---|
| a Javadoc example nobody runs | a doc comment `@example` - Deno runs and checks it | 1 |
| `@Test void name() { ... }` | `Deno.test("a sentence saying what should be true", () => { ... });` | 1 |
| `assertEquals(expected, actual)` | `assertEquals(actual, expected)` - the other way round | 1 |
| `assertEquals(e, a, delta)` | `assertAlmostEquals(actual, expected)` | 3 |
| `assertThrows(X.class, () -> ...)` | `assertThrows(() => ..., Error, "part of the message")` | 4 |
| `assertSame(e, a)` | `assertStrictEquals(actual, expected)` | 4 |
| `@BeforeEach` | a helper function each test calls | 4 |
| nested tests | `await t.step("...", () => { ... })` in an `async` test | 4 |

## Running things

| Java | This book | Ch |
|---|---|---|
| `javac` then `java` | open the project in Celbridge: `deno task dev` builds, tests and watches; press refresh on the preview | 1 |
| the console | the TAP output in Celbridge's console, and `test_output/index.html` | 1 |
| a `.jar` | `dist/` - a plain web page, no server needed | 1 |
