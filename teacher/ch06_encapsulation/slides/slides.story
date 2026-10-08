{
  "name": "Chapter 6 - Encapsulation",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 6",
  "navigation": {
    "show": true,
    "style": "arrows",
    "position": "top-right",
    "showNumber": true
  },
  "sequenceArrows": {
    "show": true,
    "style": "dashed",
    "color": "#ffcc00",
    "alpha": 0.75
  },
  "nodes": [
    {
      "name": "Start",
      "x": 0,
      "y": 0,
      "text": "# Chapter 6\n## Encapsulation\n\nObject-oriented TypeScript, test first\n\n![w:520](images/bank_account.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- why an object hides its data\n- `private`, `#private` and `readonly`\n- getters and setters - methods and accessors\n- setters that **refuse**, test first\n- invariants: rules that are always true\n- `try`/`catch` on the page\n"
    },
    {
      "name": "Why hide data?",
      "x": 480,
      "y": 0,
      "text": "# Why hide data?\n\n- if any code can set `age = -3`, every bug can too\n- hide the data; let methods change it - and **check** it\n- the class can then *promise* things: \"age is never negative\"\n- Chapter 2's `Counter` already did this: `count` was private\n"
    },
    {
      "name": "The outside and the inside",
      "x": 720,
      "y": 0,
      "text": "# The outside and the inside\n\n```nomnoml\n#fill: #f1faee; #a8dadc\n#stroke: #1d3557\n#lineWidth: 1.5\n#font: Arial\n#fontSize: 14\n#direction: down\n#.interface: fill=#a8dadc italic\n#direction: right\n[main.ts (or a test)] pet.setAge(4) -> [Pet|- name: string;- readonly species: string;- age: number;- hungry: boolean|+ getName(), setName(name), getSpecies();+ getAge(), setAge(age), haveBirthday();+ isHungry(), play(), feed(), toString()|- checkName(), checkAge()]\n[main.ts (or a test)] -- [<note> pet.age = -3;compile error: age is private]\n```\n\n- outside: a promise to other code - inside: free to change\n"
    },
    {
      "name": "Pet - the Java way",
      "x": 960,
      "y": 0,
      "text": "# Pet - the Java way\n\n```ts\nexport class Pet {\n  private name: string;\n  private readonly species: string;\n  private age: number;\n  private hungry: boolean = false;\n\n  public getName(): string {\n    return this.name;\n  }\n\n  public setName(name: string): void {\n    this.name = this.checkName(name);\n  }\n```\n"
    },
    {
      "name": "The compiler guards private",
      "x": 1200,
      "y": 0,
      "text": "# The compiler guards `private`\n\n```ts\nconst pet = new Pet(\"Rex\", \"dog\", 3);\npet.age = -3;\n```\n\n```text\nTS2341 [ERROR]: Property 'age' is private and only\naccessible within class 'Pet'.\n```\n\n- private **methods** too: `checkName`, `checkAge`\n- no visibility written = `public` (Java: package-private)\n"
    },
    {
      "name": "isX() and actions",
      "x": 0,
      "y": 140,
      "text": "# `isX()` and actions\n\n- boolean getter: `isHungry()`, as in Java\n- no `setHungry(true)` - instead `play()` and `feed()`\n- methods that say **what happens**, not which field changes\n- a setter for every field is a habit worth questioning\n"
    },
    {
      "name": "readonly - Java's final",
      "x": 240,
      "y": 140,
      "text": "# `readonly` - Java's `final`\n\n```ts\npublic adopt(): void {\n  this.species = \"cat\";\n}\n```\n\n```text\nTS2540 [ERROR]: Cannot assign to 'species'\nbecause it is a read-only property.\n```\n\n- set in the declaration or the constructor - then never again\n"
    },
    {
      "name": "Red: a setter that says no",
      "x": 480,
      "y": 140,
      "text": "# Red: a setter that says no\n\n```ts\nDeno.test(\"setAge refuses a negative age\", () => {\n  const pet = new Pet(\"Rex\", \"dog\", 3);\n\n  assertThrows(() => pet.setAge(-1), Error,\n    \"Age must be a whole number\");\n  assertEquals(pet.getAge(), 3);\n});\n```\n\n```text\nerror: AssertionError: Expected function to throw.\n```\n"
    },
    {
      "name": "Green",
      "x": 720,
      "y": 140,
      "text": "# Green\n\n```ts\npublic setAge(age: number): void {\n  if (age < 0) {\n    throw new Error(\n      `Age must be a whole number, 0 or more (not ${age})`);\n  }\n  this.age = age;\n}\n```\n\n- check **before** change: `throw` leaves at once\n- next red: `setAge(2.5)` - add `!Number.isInteger(age)`\n"
    },
    {
      "name": "Red again: the constructor",
      "x": 960,
      "y": 140,
      "text": "# Red again: the constructor\n\n- `new Pet(\"Rex\", \"dog\", -1)` still works\n- `Expected function to throw.`\n- copy the `if`? Then the rule is written twice...\n"
    },
    {
      "name": "Refactor: one copy of the rule",
      "x": 1200,
      "y": 140,
      "text": "# Refactor: one copy of the rule\n\n```ts\npublic setAge(age: number): void {\n  this.age = this.checkAge(age);\n}\n\nprivate checkAge(age: number): number {\n  if (!Number.isInteger(age) || age < 0) {\n    throw new Error(`Age must be ... (not ${age})`);\n  }\n  return age;\n}\n```\n\n- constructor: `this.age = this.checkAge(age);`\n"
    },
    {
      "name": "Why not this.setAge(age)?",
      "x": 0,
      "y": 280,
      "text": "# Why not `this.setAge(age)`?\n\n```text\nTS2564 [ERROR]: Property 'name' has no initializer\nand is not definitely assigned in the constructor.\n```\n\n- TypeScript does not look inside called methods\n- and parameter properties skip checks - only for fields with no rules\n"
    },
    {
      "name": "Catching it on the page",
      "x": 240,
      "y": 280,
      "text": "# Catching it on the page\n\n```ts\ntry {\n  pet.setName(nameBox.value);\n  showMessage(\"\");\n} catch (error) {\n  showMessage(error instanceof Error\n    ? error.message : String(error));\n}\n```\n\n- one `catch`; `error` is `unknown` (anything can be thrown)\n"
    },
    {
      "name": "Who does what",
      "x": 480,
      "y": 280,
      "text": "# Who does what\n\n![w:500](images/pet.png)\n\n- `Pet` decides what is allowed, and says why not\n- `main.ts` decides how to show it\n"
    },
    {
      "name": "How private is private?",
      "x": 720,
      "y": 280,
      "text": "# How private is `private`?\n\n```ts\npet[\"age\"] = -3;\nconsole.log(pet.toString());\n```\n\n```text\n(PET) Rex is a dog, and is -3 years old.\n```\n\n- no type error, no lint warning\n- the build removes `private`: `dist/app.js` has plain `age;`\n"
    },
    {
      "name": "#private - real privacy",
      "x": 960,
      "y": 280,
      "text": "# `#private` - real privacy\n\n```ts\nexport class BankAccount {\n  #balance: number = 0;\n\n  constructor(public readonly owner: string,\n    public readonly accountNumber: string) {}\n```\n\n```text\nTS18013 [ERROR]: Property '#balance' is not accessible\noutside class 'BankAccount' because it has a private\nidentifier.\n```\n"
    },
    {
      "name": "private vs #",
      "x": 1200,
      "y": 280,
      "text": "# `private` vs `#`\n\n![w:760](images/private_vs_hash.svg)\n"
    },
    {
      "name": "A getter with no setter",
      "x": 0,
      "y": 420,
      "text": "# A getter with no setter\n\n```ts\npublic get balance(): number {\n  return this.#balance;\n}\n```\n\n- read like a field: `account.balance` - no brackets\n- `account.balance = 5` is a compile error: read-only\n- `#balance` + `balance`: no naming clash\n- money in whole **cents** - decimals are not exact\n"
    },
    {
      "name": "The invariant",
      "x": 240,
      "y": 420,
      "text": "# The invariant\n\n> the balance is a whole number of cents,\n> and never below zero\n\n```ts\npublic withdraw(cents: number): void {\n  this.#checkAmount(cents);\n  if (cents > this.#balance) {\n    throw new Error(`Not enough money: ...`);\n  }\n  this.#balance -= cents;\n}\n```\n"
    },
    {
      "name": "Change first, check after?",
      "x": 480,
      "y": 420,
      "text": "# Change first, check after?\n\n```ts\nthis.#balance -= cents;\nif (this.#balance < 0) { throw new Error(...); }\n```\n\n```text\n-   -1000\n+   2000\n```\n\n- it throws - **after** the damage\n- a refusal must leave the object exactly as it was\n"
    },
    {
      "name": "Many bad values: t.step",
      "x": 720,
      "y": 420,
      "text": "# Many bad values: `t.step`\n\n```ts\nfor (const amount of [0, -500, 12.5, NaN]) {\n  await t.step(`deposit(${amount}) is refused`, () => {\n    assertThrows(() => account.deposit(amount),\n      Error, \"An amount must be\");\n  });\n  // ... and the same for withdraw\n}\nassertEquals(account.balance, 2000);\n```\n"
    },
    {
      "name": "The thermostat: get and set",
      "x": 960,
      "y": 420,
      "text": "# The thermostat: `get` and `set`\n\n```ts\npublic get target(): number {\n  return this.#target;\n}\n\npublic set target(celsius: number) {\n  if (celsius < MIN_TARGET || celsius > MAX_TARGET) {\n    throw new Error(`The target must be ...`);\n  }\n  // ... half degrees only\n  this.#target = celsius;\n}\n```\n"
    },
    {
      "name": "An assignment runs a method",
      "x": 1200,
      "y": 420,
      "text": "# An assignment runs a method\n\n```mermaid\nflowchart LR\n  A[\"thermostat.target = value\"] --> S[\"<b>set target(celsius)</b><br/>from 5 to 30?<br/>a whole or half degree?<br/><i>a method, called by an assignment</i>\"]\n  S -- yes --> Y[\"this.#target = celsius<br/>stored\"]\n  S -- no --> N[\"throw new Error(...)<br/>#target unchanged;<br/>main.ts catches it\"]\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n  class A src\n  class S tool\n  class Y ok\n  class N bad\n```\n\n```ts\nassertThrows(() => {\n  thermostat.target = 30.5;\n}, Error, \"The target must be from 5 to 30 °C\");\n```\n"
    },
    {
      "name": "Inside the class",
      "x": 0,
      "y": 560,
      "text": "# Inside the class\n\n```ts\npublic up(): void {\n  this.target = Math.min(this.#target + STEP,\n    MAX_TARGET);\n}\n\npublic get heating(): boolean {\n  return this.room < this.#target;\n}\n```\n\n- `up()` goes **through the setter**: rules in one place\n- `heating` is computed - never out of date\n"
    },
    {
      "name": "Not everything needs hiding",
      "x": 240,
      "y": 560,
      "text": "# Not everything needs hiding\n\n```ts\nconstructor(public room: number) {}\n```\n\n- no rules, so a public field is fine\n- later it can become `get room()` / `set room(...)`\n- `thermostat.room = 22` keeps working - no caller changes\n- Java cannot do that, hence getters \"just in case\"\n"
    },
    {
      "name": "Accessors or methods?",
      "x": 480,
      "y": 560,
      "text": "# Accessors or methods?\n\n- `get`: cheap, no parameters, no side effects\n- `set`: setting is all that happens, with a check\n- method: it **does** something - `deposit(500)`, `feed()`\n- `getX()`/`setX()` are never wrong - accessors are neater\n- either way: check first, refuse with an `Error`\n"
    },
    {
      "name": "Java and TypeScript",
      "x": 720,
      "y": 560,
      "text": "# Java and TypeScript\n\n| Java | TypeScript |\n|---|---|\n| `private` (also at run time) | `private` (compiler only) |\n| - | `#field` (at run time too) |\n| `final` field | `readonly` |\n| `getAge()` / `setAge(4)` | same, or `pet.age` / `pet.age = 4` |\n| `catch (IllegalArgumentException e)` | `catch (error)` + `instanceof Error` |\n"
    },
    {
      "name": "Challenges",
      "x": 960,
      "y": 560,
      "text": "# Challenges\n\n1. Tidy names - trim, at most 20 characters\n2. Fahrenheit - a computed read-only property\n3. An overdraft limit\n4. Transfers - all or nothing\n5. Pet, the TypeScript way - accessors\n6. Holiday mode for the thermostat\n\nNext: Chapter 7 - Model and view\n"
    }
  ]
}
