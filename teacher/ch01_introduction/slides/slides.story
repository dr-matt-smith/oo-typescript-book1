{
  "name": "Chapter 1 - Introduction: TypeScript, Deno and Celbridge",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 1",
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
      "text": "# Chapter 1\n## Introduction: TypeScript, Deno and Celbridge\n\nObject-oriented TypeScript, test first\n\n![w:640](images/hello_world.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- what TypeScript is - and how it compares with Java\n- opening a project: it builds, tests and watches by itself\n- **Hello, world!** - then the time of day, then functions\n- **checking**: doc comment examples, tests, **test-driven development** (TDD)\n- arrays, lists on the page, and JSON data\n\nSeven small projects - each a little bigger than the last\n"
    },
    {
      "name": "What is TypeScript?",
      "x": 480,
      "y": 0,
      "text": "# What is TypeScript?\n\n- browsers run one language: **JavaScript** - no types\n- **TypeScript** = JavaScript + types\n- types are **checked**, then **removed**\n- the browser never sees a type\n- classes, interfaces, `extends`, `private` ... as in Java (from Chapter 2)\n"
    },
    {
      "name": "Java vs TypeScript",
      "x": 720,
      "y": 0,
      "text": "# Java vs TypeScript\n\n```mermaid\nflowchart LR\n  subgraph Java\n    direction LR\n    J1[\"Main.java<br/>source, with types\"] --> J2[\"javac<br/>checks types, compiles\"] --> J3[\"Main.class<br/>bytecode\"] --> J4[\"JVM<br/>runs bytecode\"]\n  end\n  subgraph TS[\"TypeScript (this book)\"]\n    direction LR\n    T1[\"src/*.ts<br/>source, with types\"] --> T2[\"deno (build.ts)<br/>checks types, bundles\"] --> T3[\"dist/app.js<br/>JavaScript, no types\"] --> T4[\"web browser<br/>runs JavaScript\"]\n  end\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n  class J1,J3,T1,T3 src\n  class J2,T2 tool\n  class J4,T4 run\n```\n\nTypes are checked before the program runs - the browser never sees a type\n"
    },
    {
      "name": "The tools",
      "x": 960,
      "y": 0,
      "text": "# The tools\n\n- **Deno** - type checker, bundler, test runner, linter: all built in\n- **Celbridge** - open a project folder, and three things open:\n  - the **console** - runs `deno task dev`\n  - **`dist/index.html`** - your page, as a preview\n  - **`README.md`**\n\nNo web server needed\n"
    },
    {
      "name": "Every time you save",
      "x": 1200,
      "y": 0,
      "text": "# Every time you save\n\n```mermaid\nflowchart LR\n  dev[\"<b>deno task dev</b><br/>1 type check<br/>2 bundle src/main.ts<br/>3 copy public/<br/>4 tidy dist/<br/>5 run the tests\"]\n  src[\"src/<br/>your TypeScript\"] --> dev\n  pub[\"public/<br/>HTML, CSS, images\"] --> dev\n  tests[\"tests/<br/>your tests\"] --> dev\n  dev --> dist[\"dist/<br/>index.html + app.js\"]\n  dev --> out[\"test_output/<br/>index.html, summary.md<br/>(TAP in the console too)\"]\n  save([\"you save a file\"]) -. \"it all happens again\" .-> dev\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n  class src,pub,tests src\n  class dev tool\n  class dist,out run\n```\n\nPress **refresh** on the preview when it lights up\n"
    },
    {
      "name": "Time to refresh",
      "x": 0,
      "y": 140,
      "text": "# The reload icon indicates it’s time to REFRESH\n\nviewing `/dist/index.html` in Celbridge preview:\n\n![refresh time](images/reload_HTML.webp)"
    },
    {
      "name": "Edit these, look at those",
      "x": 240,
      "y": 140,
      "text": "# Edit these, look at those\n\n| Edit | Look at (never edit) |\n|---|---|\n| `src/` - your TypeScript | `dist/` - the built page |\n| `tests/` - your tests | `test_output/` - the test report |\n| `public/` - HTML, CSS, images | |\n"
    },
    {
      "name": "Project 1: Hello, world!",
      "x": 480,
      "y": 140,
      "text": "# Project 1: Hello, world!\n\nin `public/index.html`:\n- ```html\n  <h1 id=\"output\">(if you can read this, ...)</h1>\n  <script src=\"app.js\"></script>\n  ```\n\nin `/src/main.ts`:\n- ```ts\n  // locate HTML element with CSS selector \"#output\"\n  const output = document.querySelector(\"#output\");\n\n  if (output !== null) {\n     output.textContent = \"Hello, world!\";\n  }\n  ```\n\n- `querySelector` finds an element - or gives **`null`**\n- TypeScript **makes** you check for `null`\n"
    },
    {
      "name": "Exercise 1.1 - Hello, you",
      "x": 720,
      "y": 140,
      "text": "# Exercise 1.1 - Hello, you\n\n```ts\nconst NAME = \"Ada\";\n\nconst output = document.querySelector(\"#output\");\nif (output !== null) {\n  output.textContent = `Hello, ${NAME}!`;\n}\n```\n\n- `const` - can never change (Java `final`); type is **inferred**\n- backticks + `${...}` - a **template literal**\n"
    },
    {
      "name": "Project 2: What's the time?",
      "x": 960,
      "y": 140,
      "text": "# Project 2: What's the time?\n\n```ts\nconst now = new Date();\nconst hour: number = now.getHours();\n```\n\n- types come **after** the name\n- one `number` type: `7 / 2` is `3.5`\n- `string`, `boolean`, `string[]`, `void`\n"
    },
    {
      "name": "Exercise 1.2 - Good morning",
      "x": 1200,
      "y": 140,
      "text": "# Exercise 1.2 - Good morning\n\n```ts\nlet message = \"Good day!\";\nif (hour < 12) {\n  message = \"Good morning!\";\n}\n```\n\n- `let` - a variable that can change; `const` otherwise; never `var`\n- compare with `===` and `!==` - never `==` (`0 == \"\"` is `true`!)\n- `\"cat\" === \"cat\"` - no `.equals()`\n"
    },
    {
      "name": "Exercise 1.3 - A function of its own",
      "x": 0,
      "y": 280,
      "text": "# Exercise 1.3 - A function of its own\n\n```ts\n// greeting.ts\nconst MIDDAY = 12;\n\nexport function greeting(hour: number): string {\n  if (hour < MIDDAY) {\n    return \"Good morning\";\n  }\n  return \"Good day\";\n}\n\n// main.ts\nimport { greeting } from \"./greeting.ts\";\n```\n\nFunctions need no class · `export` / `import` · paths end `.ts`\n"
    },
    {
      "name": "Why test?",
      "x": 240,
      "y": 280,
      "text": "# Why test?\n\n- does `greeting` get midday right? midnight?\n- checking by hand: wait until the afternoon ... every time you change the code\n- a **test** runs your code and checks the answer - instantly, every save\n- `greeting(hour)` takes the hour as a parameter, so a test can try **any** hour\n- no page code in `greeting.ts` → Deno can test it without a browser\n"
    },
    {
      "name": "A first check: an example",
      "x": 480,
      "y": 280,
      "text": "# A first check: an example\n\n`src/greeting.ts`\n```ts\n/**\n * \"Good morning\" before midday, \"Good day\" from midday on.\n *\n * @example\n * ```ts\n * import { assertEquals } from \"@std/assert\";\n *\n * assertEquals(greeting(9), \"Good morning\");\n * assertEquals(greeting(15), \"Good day\");\n * ```\n */\nexport function greeting(hour: number): string {\n```\n\n- Deno **runs the example** as a test, every save\n- `assertEquals(actual, expected)` - actual **first**\n"
    },
    {
      "name": "The first result",
      "x": 720,
      "y": 280,
      "text": "# The first result\n\n```text\nTAP version 14\n# src/greeting.ts\nok 1 - example in the doc comment (lines 11-17)\n1..1\n\nTests: 0 failed, 1 passed, 0 skipped, 0 type errors, ...\n```\n\n![h:200](images/report_first_example.png)\n\n**A comment is not a check:** `greeting(9); // \"Good evening\"` passes\n"
    },
    {
      "name": "When a check fails",
      "x": 960,
      "y": 280,
      "text": "# When a check fails\n\nChange `MIDDAY` to `8` and save:\n\n```text\nnot ok 1 - example in the doc comment (lines 11-17)\n  message: |-\n    AssertionError: Values are not equal.\n\n        [Diff] Actual / Expected\n\n    -   Good day\n    +   Good morning\n        at src/greeting.ts (example at lines 11-17)\n```\n\n`-` what the code **actually** gave · `+` what was **expected**\n"
    },
    {
      "name": "Examples are not enough",
      "x": 1200,
      "y": 280,
      "text": "# Examples are not enough\n\nWhat about 11 o'clock? Midday? Midnight?\n\nPut them all in the doc comment and:\n\n- the example is no longer short and clear\n- an example has **no name** saying what it checks\n- the first failing `assertEquals` **stops** the rest\n\nSo: **test files** - `tests/*.test.ts`\n"
    },
    {
      "name": "A test file",
      "x": 0,
      "y": 420,
      "text": "# A test file\n\n```ts\nimport { assertEquals } from \"@std/assert\";\n\nDeno.test(\"one plus one is two\", () => {\n  assertEquals(1 + 1, 2);\n});\n```\n\n- a **name** (a sentence) and the **code** that checks it\n- `() => { ... }` - \"the test's code\" (Chapter 3)\n- each test runs on its own: one failure does not stop the others\n"
    },
    {
      "name": "Testing the greeting",
      "x": 240,
      "y": 420,
      "text": "# Testing the greeting\n\n```ts\nDeno.test(\"11 o'clock is still morning\", () => {\n  assertEquals(greeting(11), \"Good morning\");\n});\n\nDeno.test(\"midday (hour 12) is day\", () => {\n  assertEquals(greeting(12), \"Good day\");\n});\n```\n\nA test file imports what it tests: `../src/greeting.ts`\n\n**Test the edges** - `<=` instead of `<` only shows up at 12\n"
    },
    {
      "name": "The results",
      "x": 480,
      "y": 420,
      "text": "# The results\n\n```text\nTAP version 14\n# tests/first.test.ts\nok 1 - one plus one is two\n# tests/greeting.test.ts\nok 2 - 9 o'clock is morning\n...\n# src/greeting.ts\nok 7 - example in the doc comment (lines 11-17)\n1..7\n\nTests: 0 failed, 7 passed, 0 skipped, 0 type errors, 0 lint warnings\n```\n\n**Examples** show typical use · **tests** check the edges, by name\n"
    },
    {
      "name": "The test report",
      "x": 720,
      "y": 420,
      "text": "# The test report\n\n![h:470](images/report_first_tests.png)\n"
    },
    {
      "name": "Test-driven development",
      "x": 960,
      "y": 420,
      "text": "# Test-driven development\n\n```mermaid\nflowchart LR\n  R([\"<b>RED</b><br/>write a test for what you<br/>want next - watch it fail\"]) --> G([\"<b>GREEN</b><br/>write just enough code<br/>to make every test pass\"]) --> F([\"<b>REFACTOR</b><br/>tidy the code up - the tests<br/>check you broke nothing\"])\n  F -- \"round again, one small step at a time\" --> R\n  classDef red fill:#e63946,stroke:#e63946,color:#fff\n  classDef green fill:#2a9d8f,stroke:#2a9d8f,color:#fff\n  classDef blue fill:#457b9d,stroke:#457b9d,color:#fff\n  class R red\n  class G green\n  class F blue\n```\n\nWrite the test **first** - then just enough code to pass\n"
    },
    {
      "name": "Project 4: Age groups",
      "x": 1200,
      "y": 420,
      "text": "# Project 4: Age groups\n\n- cage categories:\n  - under 12: child\n  - 13-19: teenager \n  - 20+: adult \n  - below 0 or over 150: invalid\n- **What about 12?** Tests need exact answers - so they find the gaps\n- step 1: a test for \"child\" → **red** (no function yet)\n- step 2: `return \"child\";` → **green** (yes, really)\n"
    },
    {
      "name": "Red again",
      "x": 0,
      "y": 560,
      "text": "# Red again\n\n- step 3: a test for \"teenager\" → **red**\n- the diff: `-` actual is `child`, `+` expected is `teenager`\n- step 4: add an `if` → **green**\n- ... one group at a time, then the edges\n"
    },
    {
      "name": "The report after step 3",
      "x": 240,
      "y": 560,
      "text": "# The report after step 3\n\n![h:470](images/report_age_red.png)\n"
    },
    {
      "name": "Refactor",
      "x": 480,
      "y": 560,
      "text": "# Refactor\n\n```ts\nconst OLDEST_CHILD = 12;\nconst OLDEST_TEENAGER = 19;\nconst OLDEST_POSSIBLE = 150;\n\nexport function ageGroup(age: number): string {\n  if (age < 0 || age > OLDEST_POSSIBLE) {\n    return \"invalid\";\n  }\n  if (age <= OLDEST_CHILD) {\n    return \"child\";\n  }\n  if (age <= OLDEST_TEENAGER) {\n    return \"teenager\";\n  }\n  return \"adult\";\n}\n```\n\nStill green → tidy-up safe · then add an `@example` doc comment\n"
    },
    {
      "name": "Project 5: A bulleted list",
      "x": 720,
      "y": 560,
      "text": "# Project 5: A bulleted list\n\n```ts\n// our <ul> in the HTML code has ID #planets\nconst list = document.querySelector(\"#planets\");\n\nconst PLANETS: string[] = [\"Mercury\", \"Venus\", \"Earth\", \"Mars\"];\n\nfor (const planet of PLANETS) {\n  const item = document.createElement(\"li\");\n  item.textContent = planet;\n\n  // add an <li> element to the list with current planet name\n  list.appendChild(item);\n}\n```\n\n- `for ... of` - not `for ... in`\n- `.length` - no brackets\n"
    },
    {
      "name": "Exercises 1.4 and 1.5 - data in a file",
      "x": 960,
      "y": 560,
      "text": "# Exercises 1.4 and 1.5 - data in a file\n\n```ts\n// planets.ts\nexport const PLANETS: string[] = [\"Mercury\", \"Venus\"];\n```\n\n```json\n[\"Mercury\", \"Venus\", \"Earth\", \"Mars\"]\n```\n\n```ts\nimport planets from \"./planets.json\" with { type: \"json\" };\nconst PLANETS: string[] = planets;\n```\n\nThe build reads and **parses** the JSON → no server needed\n"
    },
    {
      "name": "Project 7: Putting it together",
      "x": 1200,
      "y": 560,
      "text": "# Project 7: Putting it together\n\n- `partOfDay(hour)` - morning, afternoon, evening; `greeting(name, hour)`\n- a list of facts from `facts.ts`, and tests for it all\n- nothing new - just everything at once\n\n![h:300](images/hello_page.png)\n"
    },
    {
      "name": "Where problems show up",
      "x": 0,
      "y": 700,
      "text": "# Where problems show up\n\n| Problem | Where |\n|---|---|\n| type error | console + report |\n| failing test or example | console (TAP) + report |\n| lint warning | console + report |\n| wrong `id` at run time | browser developer tools |\n"
    },
    {
      "name": "Summary",
      "x": 240,
      "y": 700,
      "text": "# Summary\n\n- TypeScript = JavaScript + types; checked, then removed\n- save → type check, build, test, report\n- `const` / `let`; types after names; `${}`; `===`\n- functions in any file; `export` / `import`\n- `@example` in a doc comment: checked documentation\n- test files: the edges, by name; `assertEquals(actual, expected)`\n- **red → green → refactor**, in small steps\n- arrays, `for ... of`, JSON data\n"
    },
    {
      "name": "Challenges",
      "x": 480,
      "y": 700,
      "text": "# Challenges\n\n1. **Make it yours** - name, a sixth fact, colours\n2. **Good night** - hours 22-4, test first\n3. **Break it on purpose** - four mistakes; where does each show?\n4. **Seniors** - a fifth age group, test first\n5. **Planets with facts** - objects in JSON\n6. **Day and night colours** - `themeFor(hour)`, tested\n"
    }
  ]
}
