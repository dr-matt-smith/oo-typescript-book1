{
  "name": "Chapter 2 - Events: clicks, keys and timers",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 2",
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
      "text": "# Chapter 2\n## Events: clicks, keys and timers\n\nObject-oriented TypeScript, test first\n\n![w:420](images/coin_toss.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- programs that **wait**: event-driven pages\n- the browser's **event loop**\n- responding to clicks - and passing a function\n- a **first class**: `Counter.ts` next to `Counter.java`\n- **object → event → render**\n- timers, typing and key presses\n"
    },
    {
      "name": "Programs that wait",
      "x": 480,
      "y": 0,
      "text": "# Programs that wait\n\n- Java console programs: top to bottom, then stop\n- a web page: the user could click anything, any time\n- **`main.ts` runs once**, when the page loads - it sets things up\n- after that, your code runs **only when an event calls it**\n- like Swing's `ActionListener`, JavaFX's `setOnAction`\n"
    },
    {
      "name": "main.ts runs once - listeners run later",
      "x": 720,
      "y": 0,
      "text": "# main.ts runs once - listeners run later\n\n```mermaid\nflowchart LR\n  main[\"<b>main.ts runs once</b><br/>when the page loads<br/>addEventListener('click', handleAdd)<br/>render()\"] -- \"page waits ... click\" --> h1[\"handleAdd()\"] -- \"waits ... click\" --> h2[\"handleAdd()\"] -- \"waits ... click\" --> h3[\"handleAdd()\"]\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n  class main tool\n  class h1,h2,h3 run\n```\n\nIn between, none of your code is running - the page just waits\n"
    },
    {
      "name": "The event loop",
      "x": 960,
      "y": 0,
      "text": "# The event loop\n\n```mermaid\nflowchart LR\n  e1[\"a mouse click\"]\n  e2[\"a key press\"]\n  e3[\"a timer going off\"]\n  e4[\"typing in a box\"]\n  Q[\"<b>the event queue</b><br/>click · key · timer\"]\n  L[\"the browser calls<br/>your listener function<br/>handleClick()\"]\n  O[\"it changes<br/>your objects\"]\n  D[\"it changes<br/>the page (DOM)\"]\n  P[\"the browser<br/>redraws the page<br/>then the next event -<br/>or wait for one\"]\n  e1 --> Q\n  e2 --> Q\n  e3 --> Q\n  e4 --> Q\n  Q --> L\n  L --> O\n  L --> D\n  D --> P\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n  class e1,e2,e3,e4,O,D src\n  class Q tool\n  class L run\n  class P ok\n```\n"
    },
    {
      "name": "One event at a time",
      "x": 1200,
      "y": 0,
      "text": "# One event at a time\n\n- each event goes into a **queue**\n- the browser calls **your listener**, which runs to the end\n- then it **redraws** the page, and takes the next event\n- only one listener runs at a time - no clashes\n- a slow listener **freezes** the page - keep them quick\n"
    },
    {
      "name": "Project 1: a click",
      "x": 0,
      "y": 140,
      "text": "# Project 1: a click\n\n```ts\nfunction handleToss(): void {\n  const face = coinFace(Math.random());\n  if (result !== null) {\n    result.textContent = face;\n  }\n}\n\ntossButton.addEventListener(\"click\", handleToss);\n```\n\n- **`handleToss`** - the function itself, to call later\n- **not** `handleToss()` - that calls it *now*\n"
    },
    {
      "name": "Functions are values",
      "x": 240,
      "y": 140,
      "text": "# Functions are values\n\n- a function can be stored, and passed to another function\n- `addEventListener(\"click\", handleToss)` hands it to the browser\n- `querySelector<HTMLButtonElement>(\"#toss\")` - says what kind of element\n- with brackets by mistake:\n\n```text\nArgument of type 'void' is not assignable to parameter of type ...\n```\n"
    },
    {
      "name": "Testing something random",
      "x": 480,
      "y": 140,
      "text": "# Testing something random\n\n```ts\nexport function coinFace(random: number): string {\n  if (random < HALF) {\n    return \"Heads\";\n  }\n  return \"Tails\";\n}\n\nDeno.test(\"exactly a half gives tails\", () => {\n  assertEquals(coinFace(0.5), \"Tails\");\n});\n```\n\n`main.ts` makes the random number; the **tests choose** it\n"
    },
    {
      "name": "Project 2: a first class",
      "x": 720,
      "y": 140,
      "text": "# Project 2: a first class\n\n```ts\nexport class Counter {\n  private count: number = 0;\n\n  public increment(): void {\n    this.count++;\n  }\n\n  public getCount(): number {\n    return this.count;\n  }\n}\n```\n\n`export class` · types after names · **`this.` is compulsory**\n"
    },
    {
      "name": "The same class in Java",
      "x": 960,
      "y": 140,
      "text": "# The same class in Java\n\n```java\npublic class Counter {\n    private int count = 0;\n\n    public void increment() {\n        count++;\n    }\n\n    public int getCount() {\n        return count;\n    }\n}\n```\n\nForget `this.` in TypeScript: `Cannot find name 'count'. Did you mean the instance member 'this.count'?`\n"
    },
    {
      "name": "Object → event → render",
      "x": 1200,
      "y": 140,
      "text": "# Object → event → render\n\n```ts\nconst counter = new Counter();\n\nfunction render(): void {\n  countDisplay.textContent = `${counter.getCount()}`;\n}\n\nfunction handleAdd(): void {\n  counter.increment();\n  render();\n}\n```\n\n1. the **object** holds the state\n2. each **event** changes it, then calls `render()`\n3. `render()` **shows** the state\n"
    },
    {
      "name": "Testing the class",
      "x": 0,
      "y": 280,
      "text": "# Testing the class\n\n```ts\nDeno.test(\"reset goes back to zero\", () => {\n  const counter = new Counter();   // arrange\n  counter.increment();             // act\n  counter.reset();\n  assertEquals(counter.getCount(), 0);   // assert\n});\n```\n\n- a new object in every test - tests can't affect each other\n- **arrange, act, assert**\n"
    },
    {
      "name": "Project 3: timer events",
      "x": 240,
      "y": 280,
      "text": "# Project 3: timer events\n\n| Function | Does |\n|---|---|\n| `setTimeout(fn, ms)` | calls `fn` once, later |\n| `setInterval(fn, ms)` | calls `fn` every `ms` |\n| `clearInterval(id)` | stops it |\n\n```ts\nlet timerId: number | null = null;\ntimerId = setInterval(showTime, ONE_SECOND_MS);\n```\n\n`number | null` - a **union** type: \"a number, or null\"\n"
    },
    {
      "name": "Testing the clock",
      "x": 480,
      "y": 280,
      "text": "# Testing the clock\n\n```ts\nexport function twoDigits(value: number): string {\n  return `${value}`.padStart(2, \"0\");\n}\n\nexport function formatTime(h: number, m: number, s: number): string {\n  return `${twoDigits(h)}:${twoDigits(m)}:${twoDigits(s)}`;\n}\n```\n\nThe time changes - but **formatting** it can be tested\n"
    },
    {
      "name": "Project 4: typing and keys",
      "x": 720,
      "y": 280,
      "text": "# Project 4: typing and keys\n\n```ts\nfunction handleKey(event: KeyboardEvent): void {\n  if (event.key === \"Escape\" && box !== null) {\n    box.value = \"\";\n    render();\n  }\n}\n\nbox.addEventListener(\"input\", handleInput);\nbox.addEventListener(\"keydown\", handleKey);\n```\n\n- `input` - the text changed; `box.value` is the text\n- `keydown` - gives an **event object**: which key?\n"
    },
    {
      "name": "Common events",
      "x": 960,
      "y": 280,
      "text": "# Common events\n\n| Event | When |\n|---|---|\n| `click`, `dblclick` | clicked |\n| `input` | a text box's value changes |\n| `change` | a drop-down or checkbox is changed |\n| `keydown`, `keyup` | a key is pressed, released |\n| `mouseenter`, `mouseleave` | the mouse moves on, off |\n| `submit` | a form is submitted |\n"
    },
    {
      "name": "Summary",
      "x": 1200,
      "y": 280,
      "text": "# Summary\n\n- event-driven: `main.ts` sets up; listeners run later\n- one event at a time, then the page redraws\n- `addEventListener(\"click\", handleClick)` - pass, don't call\n- classes as in Java - but `this.` is compulsory\n- **object → event → render**\n- `setInterval`, `setTimeout`; `input`, `keydown`\n- keep random numbers and the time **out** of tested code\n"
    },
    {
      "name": "Challenges",
      "x": 0,
      "y": 420,
      "text": "# Challenges\n\n1. **Roll a die** - `dieFace(random)`, test first\n2. **Take one away** - `decrement()`, never below zero\n3. **Step size** - `increment(step: number = 1)`\n4. **Stopwatch** - `formatElapsed(ms)`\n5. **Getting close** - `status(left)`: ok, warning, over\n6. **Ten-second challenge** - a timed round, best score tested\n"
    }
  ]
}
