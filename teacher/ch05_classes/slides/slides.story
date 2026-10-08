{
  "name": "Chapter 5 - Classes, objects and constructors",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 5",
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
      "text": "# Chapter 5\n## Classes, objects and constructors\n\nObject-oriented TypeScript, test first\n\n![w:560](images/student_cards.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- classes and objects - what changes from Java\n- constructors, and **parameter properties**\n- default and optional parameters instead of overloading\n- `toString()` - and where it is called for you\n- JSON data -> objects with `map` + `new`\n- what to test about a constructor\n- a die that can be tested: pass the random number in\n"
    },
    {
      "name": "The words (as in Java)",
      "x": 480,
      "y": 0,
      "text": "# The words (as in Java)\n\n- **class** - a blueprint: fields + methods\n- **object** (instance) - one thing made from it, with its own values\n- **constructor** - runs when `new` makes an object\n- you know already: `export class`, types after names, `this.` always\n"
    },
    {
      "name": "Test first: the first test",
      "x": 720,
      "y": 0,
      "text": "# Test first: the first test\n\n```ts\nDeno.test(\"a new student has the full name it was given\", () => {\n  const student = new Student(101, \"Ada\", \"Lovelace\", \"Computing\");\n\n  assertEquals(student.getFullName(), \"Ada Lovelace\");\n});\n```\n\n```text\nerror: Module not found \"src/Student.ts\".\nTests: the tests could not run (see above)\n```\n"
    },
    {
      "name": "The long way (Java style)",
      "x": 960,
      "y": 0,
      "text": "# The long way (Java style)\n\n```ts\nexport class Student {\n  private id: number;\n  private firstName: string;\n  // ... surname, course\n\n  constructor(id: number, firstName: string /* ... */) {\n    this.id = id;\n    this.firstName = firstName;\n    // ...\n  }\n}\n```\n\n- always called `constructor`; no return type\n- `this.` is never optional - forget it and TypeScript suggests it\n"
    },
    {
      "name": "Parameter properties",
      "x": 1200,
      "y": 0,
      "text": "# Parameter properties\n\n![w:760](images/parameter_properties.svg)\n"
    },
    {
      "name": "Refactor under a green test",
      "x": 0,
      "y": 140,
      "text": "# Refactor under a green test\n\n```ts\nexport class Student {\n  constructor(\n    private id: number,\n    private firstName: string,\n    private surname: string,\n    private course: string,\n  ) {}\n}\n```\n\n- `private` in front: declares the field **and** sets it\n- no modifier = just a parameter:\n  `Property 'name' does not exist on type 'Student'.`\n"
    },
    {
      "name": "Exercise 5.1 - Shorten Team",
      "x": 240,
      "y": 140,
      "text": "# Exercise 5.1 - Shorten Team\n\n```ts\nexport class Team {\n  private score: number = 0;\n\n  constructor(private name: string) {}\n  // ...\n}\n```\n\n- `score` stays an ordinary field - it does not come from an argument\n- the tests pass unchanged: a refactor\n"
    },
    {
      "name": "A default parameter - red first",
      "x": 480,
      "y": 140,
      "text": "# A default parameter - red first\n\n```ts\nconst student = new Student(102, \"Alan\", \"Turing\");\nassertEquals(student.getCourse(), \"Undecided\");\n```\n\n```text\nTS2554 [ERROR]: Expected 4 arguments, but got 3.\n\n-   undefined\n+   \"Undecided\"\n```\n\n- a missing argument is `undefined` at run time\n"
    },
    {
      "name": "The fix",
      "x": 720,
      "y": 140,
      "text": "# The fix\n\n```ts\nconst DEFAULT_COURSE = \"Undecided\";\n\nexport class Student {\n  constructor(\n    // ... id, firstName, surname\n    private course: string = DEFAULT_COURSE,\n  ) {}\n}\n```\n\n- used when the argument is missing **or** `undefined`\n- works in any function or method\n"
    },
    {
      "name": "Optional parameters",
      "x": 960,
      "y": 140,
      "text": "# Optional parameters\n\n```ts\n    private nickname?: string,\n```\n\n```ts\npublic getGreetingName(): string {\n  if (this.nickname === undefined) {\n    return this.firstName;\n  }\n  return this.nickname;\n}\n```\n\n- type is `string | undefined` - TypeScript makes you check\n"
    },
    {
      "name": "Passing undefined",
      "x": 1200,
      "y": 140,
      "text": "# Passing undefined\n\n```ts\nnew Student(105, \"Margaret\", \"Hamilton\", undefined, \"Maggie\");\n```\n\n- arguments match parameters **by position**\n- `undefined` triggers the default: course is \"Undecided\"\n- fine for one or two; ugly for many (Challenge 6)\n"
    },
    {
      "name": "One constructor, not several",
      "x": 0,
      "y": 280,
      "text": "# One constructor, not several\n\n```text\nTS2392 [ERROR]: Multiple constructor implementations\nare not allowed.\n```\n\n| Java | TypeScript |\n|---|---|\n| 4-argument constructor | `new Student(101, \"Ada\", \"Lovelace\", \"Computing\")` |\n| 3 arguments + `this(...)` | `new Student(102, \"Alan\", \"Turing\")` |\n\n- types vanish at run time: nothing to choose by\n"
    },
    {
      "name": "Required first",
      "x": 240,
      "y": 280,
      "text": "# Required first\n\n```ts\nconstructor(a: string, b?: string, c: string) {}\n```\n\n```text\nA required parameter cannot follow an optional parameter.\n```\n\n- required, then defaults / `?`\n- only the end of the list can be left out\n"
    },
    {
      "name": "toString, test first",
      "x": 480,
      "y": 280,
      "text": "# toString, test first\n\n```ts\nassertEquals(student.toString(),\n  \"(Student) 101 Ada Lovelace, Computing\");\n```\n\n```text\n-   [object Object]\n+   (Student) 101 Ada Lovelace, Computing\n```\n\n- **no type error**: every object already has a `toString()`\n- returns a string - it does not print\n"
    },
    {
      "name": "Where toString is called for you",
      "x": 720,
      "y": 280,
      "text": "# Where toString is called for you\n\n```ts\n`${student}`              // \"(Student) 102 Alan Turing, Undecided\"\nString(student)           // the same\nmodules.join(\"; \")        // each element's toString\nconsole.log(student)      // NOT: shows the fields\n```\n\n- no `override`: `Student` extends nothing (Chapter 11)\n"
    },
    {
      "name": "From plain data to objects",
      "x": 960,
      "y": 280,
      "text": "# From plain data to objects\n\n```mermaid\nflowchart LR\n  subgraph data[\"students.json: just values\"]\n    d1[\"{ id: 101, firstName: 'Ada', ... }\"]\n    d2[\"{ id: 105, firstName: 'Margaret' }\"]\n  end\n  subgraph objs[\"Student objects: values + behaviour\"]\n    o1[\"Ada Lovelace · Computing<br/>getFullName() toString() ...\"]\n    o2[\"Margaret Hamilton · Undecided (default)<br/>getFullName() toString() ...\"]\n  end\n  data -- \"data.map((d) => new Student(d.id, ...))<br/>the constructor runs once for each\" --> objs\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n  class d1,d2 src\n  class o1,o2 tool\n```\n\nOne class (the blueprint), as many objects as there are rows of data\n"
    },
    {
      "name": "studentsFrom",
      "x": 1200,
      "y": 280,
      "text": "# studentsFrom\n\n```ts\nexport type StudentData = {\n  id: number;\n  firstName: string;\n  surname: string;\n  course?: string;\n  nickname?: string;\n};\n\nexport const studentsFrom = (data: StudentData[]): Student[] =>\n  data.map((d) => new Student(d.id, d.firstName, d.surname,\n    d.course, d.nickname));\n```\n\n- missing property -> `undefined` -> default. No `if`\n"
    },
    {
      "name": "Testing constructors",
      "x": 0,
      "y": 420,
      "text": "# Testing constructors\n\n- test **your** decisions: values kept, defaults, optional both ways, `toString()`\n- the compiler catches the rest:\n\n| Mistake | TypeScript says |\n|---|---|\n| `new Student(101)` | `Expected 3-5 arguments, but got 1.` |\n| `Student(101, ...)` | `... not callable. Did you mean to include 'new'?` |\n"
    },
    {
      "name": "Two objects, same values",
      "x": 240,
      "y": 420,
      "text": "# Two objects, same values\n\n```ts\nconst a = new Student(1, \"Ada\", \"Lovelace\");\nconst b = new Student(1, \"Ada\", \"Lovelace\");\nassertEquals(a, b);        // passes: same contents\nassertStrictEquals(a, b);  // fails: two objects\n```\n\n```text\nValues have the same structure but are not reference-equal.\n```\n\n- `assertEquals` also checks the class: `Student {` vs `{`\n"
    },
    {
      "name": "Project 2: a die",
      "x": 480,
      "y": 420,
      "text": "# Project 2: a die\n\n![w:520](images/dice_roller.png)\n\n- `constructor(private sides: number = DEFAULT_SIDES) {}`\n- `roll(random)` is **given** its random number\n"
    },
    {
      "name": "Rolling in small steps",
      "x": 720,
      "y": 420,
      "text": "# Rolling in small steps\n\n```ts\nassertEquals(die.roll(0), 1);\n```\n\n```text\nTypeError: die.roll is not a function\n```\n\n```ts\npublic roll(random: number): number {\n  return 1;  // fake it\n}\n```\n\n- green - and the linter: `` `random` is never used ``\n"
    },
    {
      "name": "The next test forces the formula",
      "x": 960,
      "y": 420,
      "text": "# The next test forces the formula\n\n```ts\nassertEquals(die.roll(ALMOST_ONE), 6);   // -  1  +  6\n```\n\n```ts\npublic roll(random: number): number {\n  this.value = Math.floor(random * this.sides) + 1;\n  return this.value;\n}\n```\n\n- 0 -> 1, just below 1 -> 6, 0.5 -> 4, a d20 can roll 20\n"
    },
    {
      "name": "New objects while the page runs",
      "x": 1200,
      "y": 420,
      "text": "# New objects while the page runs\n\n```ts\nlet die = new Die();\n\nsidesChoice?.addEventListener(\"change\", () => {\n  die = new Die(Number(sidesChoice.value));\n  history = [];\n  render();\n});\n```\n\n- `Math.random()` is called only in `main.ts`\n"
    },
    {
      "name": "Project 3: undefined with a meaning",
      "x": 0,
      "y": 560,
      "text": "# Project 3: undefined with a meaning\n\n```ts\nconstructor(\n  private code: string,\n  private title: string,\n  private credits: number = DEFAULT_CREDITS,\n  private semester?: number,   // undefined: all year\n) {}\n\npublic isYearLong(): boolean {\n  return this.semester === undefined;\n}\n```\n"
    },
    {
      "name": "Class or type?",
      "x": 240,
      "y": 560,
      "text": "# Class or type?\n\n- **`type`**: the shape of plain data (JSON) - no constructor, no methods\n- **class**: behaviour - defaults in one place, methods, private fields\n- `StudentData` (shape) -> `studentsFrom` -> `Student` (object)\n"
    },
    {
      "name": "Java and TypeScript",
      "x": 480,
      "y": 560,
      "text": "# Java and TypeScript\n\n| Java | TypeScript |\n|---|---|\n| `this.id = id;` in the body | `constructor(private id: number) {}` |\n| overloaded constructors | defaults `=` and optional `?` |\n| `@Override toString()` | `toString(): string` |\n| `Student@6d06d69c` | `[object Object]` |\n| `a == b` | `assertStrictEquals` / `===` |\n"
    },
    {
      "name": "Summary",
      "x": 720,
      "y": 560,
      "text": "# Summary\n\n- `constructor`, one per class; `this.` always\n- parameter properties when the constructor just stores\n- defaults and `?` replace overloading; required first\n- `undefined` triggers a default\n- `toString()` returns; template literals and `join` call it\n- `data.map((d) => new Student(...))` - data becomes objects\n- pass randomness in\n"
    },
    {
      "name": "Challenges",
      "x": 960,
      "y": 560,
      "text": "# Challenges\n\n1. **Initials** - `getInitials()`\n2. **Critical roll** - `isMaximum()`\n3. **Who teaches it?** - optional `lecturer`\n4. **Enough credits?** - `creditCheck(modules, target = 60)`\n5. **A cup of dice** - `DiceCup`, a random **function**\n6. **Too many arguments** - one object for the constructor\n"
    }
  ]
}
