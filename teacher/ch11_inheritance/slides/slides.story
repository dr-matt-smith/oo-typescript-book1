{
  "name": "Chapter 11 - Inheritance",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 11",
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
      "text": "# Chapter 11\n## Inheritance\n\nObject-oriented TypeScript, test first\n\n![w:560](images/animals.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- `extends`, and what a subclass inherits\n- `abstract` classes and methods\n- `override` - a keyword, and compulsory\n- `protected`\n- `super(...)` and `super.method()`\n- no `final` - what to do instead\n- **one test suite for every subclass**\n"
    },
    {
      "name": "Is-a or has-a?",
      "x": 480,
      "y": 0,
      "text": "# Is-a or has-a?\n\n- \"a cat **is an** animal\" - inheritance\n- \"a student **is a** person\" - inheritance\n- \"a car **has an** engine\" - composition (Chapter 9)\n- say it out loud: if it sounds wrong, don't inherit\n- inheritance: write what they share **once**\n"
    },
    {
      "name": "cat1 to cat11, in one slide",
      "x": 720,
      "y": 0,
      "text": "# cat1 to cat11, in one slide\n\n| Java | TypeScript |\n|---|---|\n| `class Cat extends Animal` | the same |\n| `@Override` (optional) | `override` (required) |\n| `Animal a = new Cat()` | `const a: Animal = new Cat(\"Tom\")` |\n| `abstract class`, method | the same |\n| `final` class, method | **no `final`** |\n"
    },
    {
      "name": "An abstract superclass",
      "x": 960,
      "y": 0,
      "text": "# An abstract superclass\n\n```ts\nexport abstract class Animal {\n  constructor(protected readonly name: string) {}\n\n  public abstract getSound(): string;\n\n  public speak(): string {\n    return `${this.name} says ${this.getSound()}`;\n  }\n\n  public toString(): string {\n    return `${this.name}, an animal`;\n  }\n}\n```\n"
    },
    {
      "name": "A subclass",
      "x": 1200,
      "y": 0,
      "text": "# A subclass\n\n```ts\nexport class Cat extends Animal {\n  public override getSound(): string {\n    return \"Meow\";\n  }\n\n  public override toString(): string {\n    return `${this.name}, a cat`;\n  }\n}\n```\n\n- no constructor: `new Cat(\"Tom\")` uses **Animal's**\n- Java never inherits constructors - TypeScript does\n"
    },
    {
      "name": "Abstract: the compiler holds you to it",
      "x": 0,
      "y": 140,
      "text": "# Abstract: the compiler holds you to it\n\n`new Animal(\"Thing\")`\n\n```text\nTS2511 Cannot create an instance of an abstract class.\n```\n\n`class Cow extends Animal {}`\n\n```text\nTS2515 Non-abstract class 'Cow' does not implement\ninherited abstract member getSound from class 'Animal'.\n```\n"
    },
    {
      "name": "override and noImplicitOverride",
      "x": 240,
      "y": 140,
      "text": "# override and noImplicitOverride\n\n`toString()` without `override`:\n\n```text\nTS4114 This member must have an 'override' modifier\nbecause it overrides a member in the base class 'Animal'.\n```\n\n`override getSond()`:\n\n```text\nTS4117 This member cannot have an 'override' modifier\nbecause it is not declared in the base class 'Animal'.\nDid you mean 'getSound'?\n```\n"
    },
    {
      "name": "Adding something new",
      "x": 480,
      "y": 140,
      "text": "# Adding something new\n\n```ts\nexport class Dog extends Animal {\n  // ... getSound, toString\n  public wagTail(): string {\n    return `${this.name} wags their tail`;\n  }\n}\n\nconst pet: Animal = new Dog(\"Rex\");\npet.wagTail();\n```\n\n```text\nTS2339 Property 'wagTail' does not exist on type 'Animal'.\n```\n"
    },
    {
      "name": "The hierarchy",
      "x": 720,
      "y": 140,
      "text": "# The hierarchy\n\n```nomnoml\n#fill: #f1faee; #a8dadc\n#stroke: #1d3557\n#lineWidth: 1.5\n#font: Arial\n#fontSize: 14\n#direction: down\n#.interface: fill=#a8dadc italic\n#spacing: 25\n#padding: 6\n[<abstract>Animal|# name: string (readonly)|+ getName(): string;+ getSound(): string (abstract);+ speak(): string;+ toString(): string]\n[Cat||+ override getSound(): string;+ override toString(): string]\n[Dog||+ override getSound(): string;+ override toString(): string;+ wagTail(): string]\n[<note># protected;+ public;italic = abstract]\n[Animal] <:- [Cat]\n[Animal] <:- [Dog]\n```\n"
    },
    {
      "name": "A cat is an animal",
      "x": 960,
      "y": 140,
      "text": "# A cat is an animal\n\n```ts\nconst animals: Animal[] = [new Cat(\"Tom\"), new Dog(\"Rex\")];\n\nexport const chorus = (animals: Animal[]): string[] =>\n  animals.map((animal) => animal.speak());\n// [\"Tom says Meow\", \"Rex says Woof\"]\n\ntom instanceof Animal   // true - classes exist at run time\n```\n\n- the **object** decides which method runs\n- the **variable's type** decides which methods exist\n- Book 2 starts here: polymorphism\n"
    },
    {
      "name": "toString",
      "x": 1200,
      "y": 140,
      "text": "# toString\n\n- `${animal}` calls `animal.toString()` - the subclass's\n- no `toString()` at all: `[object Object]`\n- Java's default: `Animal@1b6d3586`\n"
    },
    {
      "name": "protected",
      "x": 0,
      "y": 280,
      "text": "# protected\n\n| | class | subclasses | everyone else |\n|---|---|---|---|\n| `private` | yes | no | no |\n| `protected` | yes | yes | no |\n| `public` | yes | yes | yes |\n\n- no package access (TypeScript has no packages)\n- start `private`; open up only when a subclass needs it\n"
    },
    {
      "name": "Exercise 11.1 - which lines compile?",
      "x": 240,
      "y": 280,
      "text": "\n# Exercise 11.1 - which lines compile?\n\n```nomnoml\n#fill: #f1faee; #a8dadc\n#stroke: #1d3557\n#lineWidth: 1.5\n#font: Arial\n#fontSize: 14\n#direction: down\n#.interface: fill=#a8dadc italic\n#direction: right\n[<abstract>Animal|# name: string|+ getSound(): string (abstract);+ speak(): string]\n[Dog||+ getSound(): string;+ wagTail(): string]\n[Animal] <:- [Dog]\n```\n\n\n```ts\nconst pet: Animal = new Dog(\"Rex\");\npet.speak();          // 1\npet.wagTail();        // 2\npet.name;             // 3\nnew Animal(\"Thing\");  // 4\n```\n\nOnly 1. Then TS2339, TS2445, TS2511.\n\n\n"
    },
    {
      "name": "Person: an ordinary superclass",
      "x": 480,
      "y": 280,
      "text": "# Person: an ordinary superclass\n\n```ts\nexport class Person {\n  constructor(\n    protected readonly name: string,\n    protected readonly email: string,\n  ) {\n    if (!email.includes(\"@\")) {\n      throw new Error(`Not an email address: ${email}`);\n    }\n  }\n  // getName, getEmail, getRole, toString\n}\n```\n"
    },
    {
      "name": "super(...)",
      "x": 720,
      "y": 280,
      "text": "# super(...)\n\n```ts\nexport class Student extends Person {\n  constructor(\n    name: string,\n    email: string,\n    private readonly studentId: string,\n    private readonly course: string,\n  ) {\n    super(name, email);\n  }\n}\n```\n\n- `name`, `email`: plain parameters, **passed on**\n- `studentId`, `course`: Student's own\n"
    },
    {
      "name": "What new Student(...) does",
      "x": 960,
      "y": 280,
      "text": "# What new Student(...) does\n\n`new Student(\"Ann\", \"ann@college.ie\", \"S1\", \"Computing\")`\n\n```mermaid\nflowchart LR\n  A[\"1. Student's constructor<br>gets all four arguments<br>this cannot be used yet\"]\n  B[\"2. super(name, email)<br>Person's constructor sets<br>and checks the email<br>(it may throw)\"]\n  C[\"3. back in Student<br>stores studentId, course<br>this can be used now\"]\n  D[\"4. the finished object<br>name, email (Person)<br>studentId, course (Student)\"]\n  A --> B --> C --> D\n```\n\n`toString()`: `super.toString()` gives `\"Ann <ann@college.ie>\"` and Student adds `\", student S1, Computing\"`\n"
    },
    {
      "name": "The rules, enforced",
      "x": 1200,
      "y": 280,
      "text": "# The rules, enforced\n\n```text\nTS2377 Constructors for derived classes must contain\na 'super' call.\n\nTS17009 'super' must be called before accessing 'this'\nin the constructor of a derived class.\n\nTS2554 Expected 2 arguments, but got 1.\n```\n\n- every Student goes through Person's email check\n"
    },
    {
      "name": "super.toString()",
      "x": 0,
      "y": 420,
      "text": "# super.toString()\n\n```ts\npublic override toString(): string {\n  return `${super.toString()}, student ${this.studentId}`\n    + `, ${this.course}`;\n}\n// \"Ann <ann@college.ie>, student S1, Computing\"\n```\n\n- build on the superclass's version - don't repeat it\n"
    },
    {
      "name": "BankAccount: the rules, once",
      "x": 240,
      "y": 420,
      "text": "# BankAccount: the rules, once\n\n```ts\nexport abstract class BankAccount {\n  protected balance: number = 0;\n\n  public withdraw(amount: number): void {\n    this.requirePositive(amount);\n    if (amount > this.available()) {\n      throw new Error(`Not enough money: ...`);\n    }\n    this.balance -= amount;\n  }\n\n  public abstract available(): number;\n}\n```\n"
    },
    {
      "name": "The overdraft, test first: red",
      "x": 480,
      "y": 420,
      "text": "# The overdraft, test first: red\n\n```ts\nconst account = new CurrentAccount(\"Ann\", 100);\naccount.deposit(50);\naccount.withdraw(120);\nassertEquals(account.getBalance(), -70);\n```\n\n```text\nnot ok 10 - a current account can withdraw into its overdraft\n    Error: Not enough money: €50.00 available\n        at CurrentAccount.withdraw (src/BankAccount.ts:35:13)\n        at tests/current.test.ts:12:11\n```\n"
    },
    {
      "name": "Green",
      "x": 720,
      "y": 420,
      "text": "# Green\n\n```ts\npublic override available(): number {\n  return this.balance + this.overdraftLimit;\n}\n```\n\n- thrown in `BankAccount.ts`, but the bug was in `available()`\n- read the stack: where it was thrown, then who called it\n"
    },
    {
      "name": "One test suite, every subclass",
      "x": 960,
      "y": 420,
      "text": "# One test suite, every subclass\n\n```ts\nexport const testAccountRules = (\n  kind: string,\n  makeAccount: (owner: string) => BankAccount,\n): void => {\n  Deno.test(`${kind}: a new account is empty`, () => {\n    assertEquals(makeAccount(\"Ann\").getBalance(), 0);\n  });\n  // ... eight more rules\n};\n\ntestAccountRules(\"SavingsAccount\", (o) => new SavingsAccount(o));\n```\n"
    },
    {
      "name": "Registered once per subclass",
      "x": 1200,
      "y": 420,
      "text": "# Registered once per subclass\n\n```mermaid\nflowchart TD\n  R[\"tests/account_rules.ts<br>testAccountRules(kind, makeAccount)<br>9 rules every account keeps<br>registers the tests - runs none itself\"]\n  S[\"savings.test.ts<br>testAccountRules('SavingsAccount', ...)<br>9 shared tests<br>+ 4 of its own (no overdraft, interest)\"]\n  C[\"current.test.ts<br>testAccountRules('CurrentAccount', ...)<br>9 shared tests<br>+ 4 of its own (the overdraft)\"]\n  R --> S\n  R --> C\n```\n\n- any `BankAccount` must keep the rules (Liskov, the L in SOLID)\n"
    },
    {
      "name": "No final",
      "x": 0,
      "y": 560,
      "text": "# No final\n\n| Java | TypeScript |\n|---|---|\n| `final` field | `readonly` |\n| `final class` | `private constructor` + static factory |\n| `final` method | nothing |\n\nFor methods: private helpers, a comment, **shared tests**, shallow\nhierarchies - and composition (Book 3)\n"
    },
    {
      "name": "Abstract class or interface?",
      "x": 240,
      "y": 560,
      "text": "# Abstract class or interface?\n\n| | interface | abstract class |\n|---|---|---|\n| method bodies, fields | no | yes |\n| how many | any number | one |\n| `instanceof` | no | yes |\n\n- only a shape? **interface**\n- shared code or state? **abstract class**\n"
    },
    {
      "name": "Summary",
      "x": 480,
      "y": 560,
      "text": "# Summary\n\n- `extends` for is-a; `abstract` for \"not on its own\"\n- `override` on every overriding method\n- `protected`: subclasses only - start `private`\n- `super(...)` before `this`; `super.method()` to build on\n- no `final`: `readonly`, private constructor, tests\n- shared rules: a function that registers tests\n"
    },
    {
      "name": "What next: Book 2",
      "x": 720,
      "y": 560,
      "text": "# What next: Book 2\n\n*Object-oriented TypeScript, further*\n\n- polymorphism, narrowing, discriminated unions\n- generics, `Map` and `Set`, `null` and `undefined`\n- errors, test doubles\n- code quality: static and runtime analysis\n"
    }
  ]
}
