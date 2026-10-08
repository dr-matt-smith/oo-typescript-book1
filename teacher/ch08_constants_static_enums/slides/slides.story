{
  "name": "Chapter 8 - Constants, static and enums",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 8",
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
      "text": "# Chapter 8\n## Constants, static and enums\n\nObject-oriented TypeScript, test first\n\n![w:520](images/traffic_light.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- `const`, `readonly` and `static readonly`\n- string-literal unions: \"one of these values, nothing else\"\n- a `switch` the compiler checks for **every** value\n- testing every value with a loop\n- `enum` vs union vs `as const` - and why this book uses unions\n- static fields and methods\n- what static state does to your **tests**\n"
    },
    {
      "name": "Three kinds of \"never changes\"",
      "x": 480,
      "y": 0,
      "text": "# Three kinds of \"never changes\"\n\n| You want | TypeScript | Java |\n|---|---|---|\n| a variable never reassigned | `const LIMIT = 3;` | `final int` |\n| a field set once per object | `readonly name` | `private final` |\n| one value for the class | `static readonly PREFIX` | `static final` |\n\nAll three checked by the compiler:\n\n```text\nCannot assign to 'LIMIT' because it is a constant.\nCannot assign to 'name' because it is a read-only property.\n```\n"
    },
    {
      "name": "A type with four values",
      "x": 720,
      "y": 0,
      "text": "# A type with four values\n\n```ts\nexport type LightColour =\n  \"red\" | \"red-amber\" | \"green\" | \"amber\";\n```\n\n- a **string-literal union**: one of these four strings, nothing else\n- at run time: just a string\n- the compiler checks every place one is made:\n\n```text\nTS2345 [ERROR]: Argument of type '\"purple\"' is not\nassignable to parameter of type 'LightColour'.\n```\n\n- the editor offers the four values as you type\n"
    },
    {
      "name": "nextColour, test first: red, green",
      "x": 960,
      "y": 0,
      "text": "# nextColour, test first: red, green\n\n```ts\nDeno.test(\"after red comes red and amber\", () => {\n  assertEquals(nextColour(\"red\"), \"red-amber\");\n});\n```\n\nSimplest code that passes:\n\n```ts\nexport const nextColour =\n  (colour: LightColour): LightColour => \"red-amber\";\n```\n"
    },
    {
      "name": "Red again",
      "x": 1200,
      "y": 0,
      "text": "# Red again\n\n```ts\nDeno.test(\"after red and amber comes green\", () => {\n  assertEquals(nextColour(\"red-amber\"), \"green\");\n});\n```\n\n```text\nnot ok 2 - after red and amber comes green\n    AssertionError: Values are not equal.\n\n        [Diff] Actual / Expected\n\n    -   red-amber\n    +   green\n```\n"
    },
    {
      "name": "Two cases... and a surprise",
      "x": 0,
      "y": 140,
      "text": "# Two cases... and a surprise\n\n```ts\nexport const nextColour = (colour: LightColour): LightColour => {\n  switch (colour) {\n    case \"red\":\n      return \"red-amber\";\n    case \"red-amber\":\n      return \"green\";\n  }\n};\n```\n\nTests pass - but:\n\n```text\nTS2366 [ERROR]: Function lacks ending return statement\nand return type does not include 'undefined'.\n```\n\nThe compiler knows `\"green\"` and `\"amber\"` are possible too\n"
    },
    {
      "name": "Every case",
      "x": 240,
      "y": 140,
      "text": "# Every case\n\n```ts\nexport const nextColour = (colour: LightColour): LightColour => {\n  switch (colour) {\n    case \"red\":\n      return \"red-amber\";\n    case \"red-amber\":\n      return \"green\";\n    case \"green\":\n      return \"amber\";\n    case \"amber\":\n      return \"red\";\n  }\n};\n```\n\n- **no `default`** - it would hide a missing case\n- needs the **return type** written - one more reason to write it\n"
    },
    {
      "name": "Testing every value",
      "x": 480,
      "y": 140,
      "text": "# Testing every value\n\n```ts\nexport const LIGHT_COLOURS: LightColour[] =\n  [\"red\", \"red-amber\", \"green\", \"amber\"];\n```\n\n```ts\nDeno.test(\"every colour comes back after four steps\", () => {\n  for (const colour of LIGHT_COLOURS) {\n    const afterFour =\n      nextColour(nextColour(nextColour(nextColour(colour))));\n    assertEquals(afterFour, colour);\n  }\n});\n```\n\nWeakness: the colours are written **twice** (type and array)\n"
    },
    {
      "name": "static readonly and readonly",
      "x": 720,
      "y": 140,
      "text": "# static readonly and readonly\n\n```ts\nexport class TrafficLight {\n  // one value for the whole class\n  public static readonly STARTING_COLOUR: LightColour = \"red\";\n\n  private colour: LightColour = TrafficLight.STARTING_COLOUR;\n\n  // one value per object, set once\n  constructor(public readonly name: string) {}\n}\n```\n\n- static: `TrafficLight.STARTING_COLOUR` - through the **class**\n- even inside the class: never `this.STARTING_COLOUR`\n"
    },
    {
      "name": "Record: a key for every value",
      "x": 960,
      "y": 140,
      "text": "# Record: a key for every value\n\n```ts\npublic static readonly SECONDS: Record<LightColour, number> = {\n  \"red\": 5,\n  \"red-amber\": 2,\n  \"green\": 5,\n  \"amber\": 3,\n};\n```\n\nLeave one out:\n\n```text\nTS2741 [ERROR]: Property '\"red-amber\"' is missing in type\n'{ red: number; green: number; amber: number; }' but\nrequired in type 'Record<LightColour, number>'.\n```\n"
    },
    {
      "name": "readonly is shallow",
      "x": 1200,
      "y": 140,
      "text": "# readonly is shallow\n\n```ts\nTrafficLight.SECONDS = { ... };   // error: read-only\nTrafficLight.SECONDS.red = 99;    // compiles!\n```\n\n- `readonly` stops the property pointing somewhere else\n- it does not freeze the object it points to\n- same as Java's `final` on a list\n- Chapter 9: references\n"
    },
    {
      "name": "Project 2: Menu Order",
      "x": 0,
      "y": 280,
      "text": "# Project 2: Menu Order\n\n![h:300](images/menu_order.png)\n\n```java\npublic enum DietType { VEGAN, VEGETARIAN, CARNIVORE }\n```\n\nTypeScript can do this three ways\n"
    },
    {
      "name": "Three ways",
      "x": 240,
      "y": 280,
      "text": "# Three ways\n\n![w:1000](images/three_ways.svg)\n"
    },
    {
      "name": "Way 1: enum",
      "x": 480,
      "y": 280,
      "text": "# Way 1: enum\n\n```ts\nexport enum DietEnum {\n  Vegan = \"vegan\",\n  Vegetarian = \"vegetarian\",\n  Meat = \"meat\",\n}\n```\n\n- looks like Java: `DietEnum.Vegan`\n- **not just a type**: it becomes a real object in the JavaScript\n- Node.js running TypeScript directly:\n\n```text\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]:\nTypeScript enum is not supported in strip-only mode\n```\n"
    },
    {
      "name": "Enum surprises",
      "x": 720,
      "y": 280,
      "text": "# Enum surprises\n\nA plain string is not accepted - but JSON data is plain strings:\n\n```text\nTS2322 [ERROR]: Type '\"vegan\"' is not assignable to\ntype 'DietEnum'.\n```\n\nWithout values, members are numbers - mapped both ways:\n\n```ts\nenum NumberedCourse { Starter, Main, Dessert }\n\nNumberedCourse[1]             // \"Main\"\nObject.keys(NumberedCourse)\n// [\"0\", \"1\", \"2\", \"Starter\", \"Main\", \"Dessert\"]\n```\n"
    },
    {
      "name": "Way 2: a string-literal union",
      "x": 960,
      "y": 280,
      "text": "# Way 2: a string-literal union\n\n```ts\nexport type DietUnion = \"vegan\" | \"vegetarian\" | \"meat\";\n```\n\n- only a type - vanishes from the JavaScript\n- values are ordinary strings\n- works with `switch`, compiler checks every case\n- weakness: no values at run time to loop over\n"
    },
    {
      "name": "Way 3: as const",
      "x": 1200,
      "y": 280,
      "text": "# Way 3: as const\n\n```ts\nexport const DIETS = [\"vegan\", \"vegetarian\", \"meat\"] as const;\n\nexport type Diet = (typeof DIETS)[number];\n```\n\n- `as const`: these exact values, never changed\n- `(typeof DIETS)[number]`: the type of one element\n- values at run time **and** a union - from **one** line\n- the page loops over `COURSES` to build its sections\n"
    },
    {
      "name": "Which to use?",
      "x": 0,
      "y": 420,
      "text": "# Which to use?\n\n- a fixed set of values: a **string-literal union**\n- need to list the values too (loop, buttons, checking data)?\n  an **`as const` array**, with the union worked out from it\n- `enum`: recognise it in other people's code - you do not need it\n"
    },
    {
      "name": "Checking data from JSON",
      "x": 240,
      "y": 420,
      "text": "# Checking data from JSON\n\n```ts\nexport const toDiet = (text: string): Diet => {\n  const diet = DIETS.find((value) => value === text);\n  if (diet === undefined) {\n    throw new Error(`\"${text}\" is not a diet`);\n  }\n  return diet;\n};\n```\n\n```ts\nassertThrows(() => toDiet(\"pescatarian\"), Error);\n```\n\n- JSON gives `diet: string` - the compiler will not accept it as a `Diet`\n- try it: put `\"vegen\"` in `menu.json`\n"
    },
    {
      "name": "A static factory method",
      "x": 480,
      "y": 420,
      "text": "# A static factory method\n\n```ts\nexport class Dish {\n  constructor(\n    public readonly name: string,\n    public readonly course: Course,\n    public readonly diet: Diet,\n    public readonly priceInCents: number,\n  ) {}\n\n  public static fromData(data: DishData): Dish {\n    return new Dish(data.name, toCourse(data.course),\n      toDiet(data.diet), data.price);\n  }\n}\n```\n\n`menu.map((data) => Dish.fromData(data))` - no dish needed to call it\n"
    },
    {
      "name": "Project 3: Ticket Numbers",
      "x": 720,
      "y": 420,
      "text": "# Project 3: Ticket Numbers\n\n![w:620](images/ticket_numbers.png)\n\nWhere should \"the next number\" be stored?\n"
    },
    {
      "name": "A static counter",
      "x": 960,
      "y": 420,
      "text": "# A static counter\n\n```ts\nexport class Ticket {\n  public static readonly PREFIX = \"A\";\n  private static nextNumber = 1;   // one, shared\n\n  public readonly number: number;  // one per ticket\n\n  constructor() {\n    this.number = Ticket.nextNumber;\n    Ticket.nextNumber++;\n  }\n}\n```\n"
    },
    {
      "name": "Class and objects",
      "x": 1200,
      "y": 420,
      "text": "# Class and objects\n\n**static belongs to the class; everything else belongs to each object**\n\n```nomnoml\n#fill: #f1faee; #a8dadc\n#stroke: #1d3557\n#lineWidth: 1.5\n#font: Arial\n#fontSize: 14\n#direction: down\n#.interface: fill=#a8dadc italic\n[Ticket|static readonly PREFIX = \"A\";static nextNumber = 4]\n[<instance>first: Ticket|readonly number = 1]\n[<instance>second: Ticket|readonly number = 2]\n[<instance>third: Ticket|readonly number = 3]\n[Ticket] new -> [first: Ticket]\n[Ticket] new -> [second: Ticket]\n[Ticket] new -> [third: Ticket]\n```\n\n`new Ticket()` takes `nextNumber`, then adds 1 to it. Use `Ticket.PREFIX` and `Ticket.issuedCount()` on the class, `first.number` on an object.\n"
    },
    {
      "name": "Static methods",
      "x": 0,
      "y": 560,
      "text": "# Static methods\n\n```ts\npublic static issuedCount(): number {\n  return Ticket.nextNumber - 1;\n}\n```\n\nNo object, so no `this.field`:\n\n```text\nProperty 'count' does not exist on type 'typeof Broken'.\n```\n\nJava allows `ticket.PREFIX`; TypeScript does not:\n\n```text\nProperty 'PREFIX' does not exist on type 'Ticket'. Did you\nmean to access the static member 'Ticket.PREFIX' instead?\n```\n"
    },
    {
      "name": "Two right tests, one red",
      "x": 240,
      "y": 560,
      "text": "# Two right tests, one red\n\n```ts\nDeno.test(\"the first ticket is number 1\", ...);\nDeno.test(\"each new ticket gets the next number\", () => {\n  const first = new Ticket();\n  const second = new Ticket();\n  assertEquals(first.number, 1);\n  // ...\n```\n\n```text\nnot ok 2 - each new ticket gets the next number\n    -   2\n    +   1\n```\n\nAlone, it passes. The static counter carried over from test 1.\n"
    },
    {
      "name": "A fresh start in every test",
      "x": 480,
      "y": 560,
      "text": "# A fresh start in every test\n\n```ts\npublic static resetNumbering(): void {\n  Ticket.nextNumber = 1;\n}\n```\n\n```ts\nconst freshQueue = (): TicketQueue => {\n  Ticket.resetNumbering();\n  return new TicketQueue();\n};\n```\n\n- every new object starts fresh; a static field does not\n- every test that makes tickets resets first\n"
    },
    {
      "name": "When not to use static",
      "x": 720,
      "y": 560,
      "text": "# When not to use static\n\n- `static readonly` constants: always fine\n- static methods using only their parameters: fine\n- static fields that **change**: global state\n- two desks, each numbering from 1? One static counter cannot do it\n- ask: **\"could there ever be two of these?\"** - then use an object\n"
    },
    {
      "name": "Summary",
      "x": 960,
      "y": 560,
      "text": "# Summary\n\n- `const` / `readonly` / `static readonly`\n- union types; `switch` with a return type and no `default`\n- loop over the values to test every one\n- `as const` array + `(typeof VALUES)[number]`: write values once\n- `enum` works, but is unlike the rest of TypeScript\n- check strings from outside: `find`, then throw\n- static belongs to the class; reset static state in every test\n"
    },
    {
      "name": "Challenges",
      "x": 1200,
      "y": 560,
      "text": "# Challenges\n\n1. What should drivers do? (a switch, every colour)\n2. A new diet - let the compiler find the switches\n3. Back to the start after A999\n4. Courses in order - `COURSES.indexOf`\n5. Two desks - static counter to `TicketMachine`\n6. A junction - at least one light red in **every** phase\n"
    }
  ]
}
