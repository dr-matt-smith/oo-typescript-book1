{
  "name": "Chapter 3 - Arrow functions",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 3",
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
      "text": "# Chapter 3\n## Arrow functions\n\nObject-oriented TypeScript, test first\n\n![w:560](images/marks_table.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- what `() => { ... }` really is\n- arrow functions vs Java lambdas vs `function`\n- arrows as listeners - and what they **remember**\n- the `this` trap\n- `map`, `filter`, `reduce`, `find`, `toSorted`\n- functions stored in data\n"
    },
    {
      "name": "Functions are values",
      "x": 480,
      "y": 0,
      "text": "# Functions are values\n\n- Chapter 2: `addEventListener(\"click\", handleToss)` - the function **itself**\n- a value can be stored, put in an array or object, passed, returned\n- so can a function\n- arrow functions: write a function **anywhere a value can go**, no name needed\n"
    },
    {
      "name": "Three ways",
      "x": 720,
      "y": 0,
      "text": "# Three ways\n\n![w:1000](images/arrow_anatomy.svg)\n"
    },
    {
      "name": "Reading an arrow function",
      "x": 960,
      "y": 0,
      "text": "# Reading an arrow function\n\n```ts\nexport const toFahrenheit = (celsius: number): number =>\n  celsius * 9 / 5 + 32;\n```\n\n- `(celsius: number)` - parameters\n- `: number` - return type\n- `=>` - \"gives\"\n- expression body → **returned**, no `return`\n- `{ block }` body → needs `return`\n"
    },
    {
      "name": "Java lambdas and TypeScript arrows",
      "x": 1200,
      "y": 0,
      "text": "# Java lambdas and TypeScript arrows\n\n| Java | TypeScript |\n|---|---|\n| `c -> c * 9 / 5 + 32` | `(c) => c * 9 / 5 + 32` |\n| `(a, b) -> a + b` | `(a, b) => a + b` |\n| `Function<Double, Double>` | `(c: number) => number` |\n| effectively final variables only | any variable it can see |\n\n`=>` - an equals sign, not a minus\n"
    },
    {
      "name": "Tests are arrow functions",
      "x": 0,
      "y": 140,
      "text": "# Tests are arrow functions\n\n```ts\nDeno.test(\"water boils at 212 °F\", () => {\n  assertEquals(toFahrenheit(100), 212);\n});\n```\n\n`Deno.test(name, function)` - Deno stores the function and calls it later\n\nJust like `addEventListener`\n"
    },
    {
      "name": "Decimals are not exact",
      "x": 240,
      "y": 140,
      "text": "# Decimals are not exact\n\n```text\nassertEquals(toFahrenheit(36.6), 97.88)\n\n-   97.88000000000001\n+   97.88\n```\n\n```ts\nassertAlmostEquals(toFahrenheit(36.6), 97.88);\n```\n\n`0.1 + 0.2` is `0.30000000000000004` - in Java too\n"
    },
    {
      "name": "Project 2: arrow listeners",
      "x": 480,
      "y": 140,
      "text": "# Project 2: arrow listeners\n\n```ts\nfor (const points of POINTS) {\n  const button = document.createElement(\"button\");\n  button.textContent = `+${points}`;\n  button.addEventListener(\"click\", () => {\n    team.addPoints(points);\n    render();\n  });\n  container.appendChild(button);\n}\n```\n\nSix buttons, one loop - each listener made inside it\n"
    },
    {
      "name": "The scoreboard",
      "x": 720,
      "y": 140,
      "text": "# The scoreboard\n\n![h:440](images/scoreboard.png)\n"
    },
    {
      "name": "Closures",
      "x": 960,
      "y": 140,
      "text": "# Closures\n\n- the listener runs **later** - after `addButtons` has finished\n- it still knows `team` and `points`\n- an arrow function **remembers the variables it could see** when it was made\n- function + remembered variables = a **closure**\n- each time round the loop: a new function, its own `points`\n"
    },
    {
      "name": "?. - a shorter null check",
      "x": 1200,
      "y": 140,
      "text": "# `?.` - a shorter null check\n\n```ts\nresetButton?.addEventListener(\"click\", () => {\n  home.reset();\n  away.reset();\n  render();\n});\n```\n\n\"if `resetButton` is null, do nothing; otherwise call it\"\n"
    },
    {
      "name": "The this trap",
      "x": 0,
      "y": 280,
      "text": "# The `this` trap\n\n```ts\nresetButton?.addEventListener(\"click\", home.reset);      // wrong!\nresetButton?.addEventListener(\"click\", () => home.reset()); // right\n```\n\n- no type error, no lint warning, tests pass - **and nothing happens**\n- `home.reset` on its own is cut off from `home`\n- the browser calls it with `this` = the button\n- **never pass a method on its own - wrap it**\n"
    },
    {
      "name": "Project 3: working through arrays",
      "x": 240,
      "y": 280,
      "text": "# Project 3: working through arrays\n\n```mermaid\nflowchart LR\n  A[\"marks<br/>55 · 72 · 30<br/>(never changed)\"]\n  A -- \".map((m) => m + 5)\" --> M[\"60 · 77 · 35<br/>every element changed\"]\n  A -- \".filter((m) => m >= 40)\" --> F[\"55 · 72<br/>only those that pass\"]\n  A -- \".reduce((sum, m) => sum + m, 0)\" --> Rd[\"157<br/>combined into one\"]\n  A -- \".find((m) => m > 60)\" --> D[\"72<br/>the first that passes\"]\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n  class A tool\n  class M,F src\n  class Rd,D ok\n```\n"
    },
    {
      "name": "map, filter, find",
      "x": 480,
      "y": 280,
      "text": "# map, filter, find\n\n```ts\nexport type Student = { name: string; mark: number };\n\nexport const marksOf = (students: Student[]): number[] =>\n  students.map((student) => student.mark);\n\nexport const passed = (students: Student[]): Student[] =>\n  students.filter((student) => student.mark >= PASS_MARK);\n\nexport const findStudent = (\n  students: Student[],\n  name: string,\n): Student | undefined => students.find((s) => s.name === name);\n```\n\n`type` names a type · `find` may give **`undefined`**\n"
    },
    {
      "name": "reduce",
      "x": 720,
      "y": 280,
      "text": "# reduce\n\n```ts\nconst total = marks.reduce((sum, mark) => sum + mark, 0);\n```\n\n| step | sum | mark | result |\n|---|---|---|---|\n| 1 | 0 | 50 | 50 |\n| 2 | 50 | 60 | 110 |\n| 3 | 110 | 70 | 180 |\n"
    },
    {
      "name": "Average, test first",
      "x": 960,
      "y": 280,
      "text": "# Average, test first\n\n```ts\nDeno.test(\"the average of no marks is 0, not NaN\", () => {\n  assertEquals(average([]), 0);\n});\n```\n\n- without a check: `0 / 0` is **`NaN`** → red\n- add `if (marks.length === 0) return 0;` → green\n- the test found the bug **before** a user did\n"
    },
    {
      "name": "Sorting",
      "x": 1200,
      "y": 280,
      "text": "# Sorting\n\n```ts\nexport const byMark = (students: Student[]): Student[] =>\n  students.toSorted((a, b) => b.mark - a.mark);\n\nexport const byName = (students: Student[]): Student[] =>\n  students.toSorted((a, b) => a.name.localeCompare(b.name));\n```\n\n- a **comparator**, as in Java: negative / zero / positive\n- `toSorted` - a copy; `sort` changes the original\n"
    },
    {
      "name": "Chaining",
      "x": 0,
      "y": 420,
      "text": "# Chaining\n\n```ts\nrows.innerHTML = shown\n  .map((s) => `<tr><td>${s.name}</td><td>${s.mark}</td></tr>`)\n  .join(\"\");\n```\n\n- each method gives a new array → call the next one on it\n- `map` to HTML strings, `join` into one string\n- (the real code adds a grade column too)\n"
    },
    {
      "name": "Project 4: functions in data",
      "x": 240,
      "y": 420,
      "text": "# Project 4: functions in data\n\n```ts\nexport type ConvertFunction = (value: number) => number;\n\nexport type Converter = {\n  name: string;\n  from: string;\n  to: string;\n  convert: ConvertFunction;\n};\n\nexport const CONVERTERS: Converter[] = [\n  {\n    name: \"Kilometres to miles\", from: \"km\", to: \"miles\",\n    convert: (km) => km * 0.621371,\n  },\n  // ...\n];\n```\n\n`(km)` needs no type - TypeScript knows from `Converter`\n"
    },
    {
      "name": "Choosing a function",
      "x": 480,
      "y": 420,
      "text": "# Choosing a function\n\n```ts\nconst converter = findConverter(choice.value);\nconst converted = convertAll(EXAMPLES, converter.convert);\n\nexport const convertAll = (\n  values: number[],\n  convert: ConvertFunction,\n): number[] => values.map(convert);\n\nDeno.test(\"convertAll applies the function to every value\", () => {\n  assertEquals(convertAll([1, 2, 3], (x) => x * 10), [10, 20, 30]);\n});\n```\n\nNew conversion = one new object. The idea behind **Strategy** (Book 3)\n"
    },
    {
      "name": "Summary",
      "x": 720,
      "y": 420,
      "text": "# Summary\n\n- `(params) => body` - expression body returns; block body needs `return`\n- arrows go anywhere a value goes: listeners, `map`, objects\n- closures remember variables\n- `assertAlmostEquals` for decimals; `?.` for \"if not null\"\n- **wrap methods**: `() => obj.method()`\n- `map`, `filter`, `reduce`, `find`, `toSorted` - originals untouched\n- `type` names; `(v: number) => number` is a function type\n"
    },
    {
      "name": "Challenges",
      "x": 960,
      "y": 420,
      "text": "# Challenges\n\n1. **Kelvin** - `toKelvin`, test first\n2. **Free throw and undo** - `undo()`, with `push`, `pop`, `reduce`\n3. **Highest and lowest** - `bottomStudent`\n4. **Grade counts** - `countGrade`, `map` + `join`\n5. **New conversions, no new code** - and a better test\n6. **Search as you type** - `searchByName`\n"
    }
  ]
}
