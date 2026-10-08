{
  "name": "Chapter 7 - Model and view",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 7",
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
      "text": "# Chapter 7\n## Model and view\n\nObject-oriented TypeScript, test first\n\n![w:560](images/todo_list.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- splitting a program into **model**, **view** and `main.ts`\n- a small view class with a `render` method\n- `requireElement`: failing **loudly** on a missing element\n- `innerHTML` vs `textContent` - and why it is a security question\n- views that report clicks through functions\n- event → model → render, at scale\n- testing the model only\n"
    },
    {
      "name": "Why split?",
      "x": 480,
      "y": 0,
      "text": "# Why split?\n\n- Chapter 3's `main.ts`: state, decisions **and** DOM code in one file\n- fine for a small page - but every feature touches the same file\n- and none of it can be tested: Deno has no page\n- the fix used by almost every user interface: **separate the jobs**\n"
    },
    {
      "name": "Model, view, main.ts",
      "x": 720,
      "y": 0,
      "text": "# Model, view, main.ts\n\n- **model** - the data and the rules. Plain classes. **Never touches the DOM**\n- **view** - shows the model. Makes no decisions about the data\n- **`main.ts`** - makes both, joins them with listeners\n- new house rule: model files never touch the DOM; DOM code lives in\n  `main.ts`, `dom.ts` and `*View.ts`\n- Java: MVC - `main.ts` plays the controller\n"
    },
    {
      "name": "The shape of every program in this chapter",
      "x": 960,
      "y": 0,
      "text": "# The shape of every program in this chapter\n\n```mermaid\nsequenceDiagram\n  participant V as The view: touches the DOM\n  participant M as main.ts: joins them up\n  participant T as The model: no DOM at all\n  V->>M: 1 click\n  M->>T: 2 change it: tally.increment()\n  M->>V: 3 render\n  V->>T: 4 reads tally.count, tally.isFull\n```\n\nThe view is checked by looking; the model (`Tally`) is tested with `Deno.test`.\n"
    },
    {
      "name": "The model, test first",
      "x": 1200,
      "y": 0,
      "text": "# The model, test first\n\n```ts\nDeno.test(\"decrement never goes below zero\", () => {\n  const tally = new Tally();\n  tally.decrement();\n  assertEquals(tally.count, 0);\n});\n```\n\nWith `this.current--;` it is red:\n\n```text\n-   -1\n+   0\n```\n\nThen the other edge: a room of 2 stops at 2 (`-   3` / `+   2`)\n"
    },
    {
      "name": "Refactor: the guards become questions",
      "x": 0,
      "y": 140,
      "text": "# Refactor: the guards become questions\n\n```ts\nexport class Tally {\n  private current: number = 0;\n\n  constructor(public readonly capacity: number = 20) { ... }\n\n  public get isFull(): boolean {\n    return this.current === this.capacity;\n  }\n\n  public increment(): void {\n    if (this.isFull) {\n      return;\n    }\n    this.current++;\n  }\n}\n```\n\nNo `document`, no `HTMLElement` - it would work behind any interface\n"
    },
    {
      "name": "The silent typo",
      "x": 240,
      "y": 140,
      "text": "# The silent typo\n\n```ts\nconst count = document.querySelector<HTMLElement>(\"#cuont\");\nif (count !== null) {\n  count.textContent = \"4\";\n}\n```\n\n- `querySelector` gives `null`, the `if` skips, the page does nothing\n- no error, no message, nowhere to look\n- for an element the page **must** have, missing is a bug - make it loud\n"
    },
    {
      "name": "requireElement",
      "x": 480,
      "y": 140,
      "text": "# requireElement\n\n```ts\nexport const requireElement = <T extends HTMLElement>(\n  selector: string,\n): T => {\n  const element = document.querySelector<T>(selector);\n  if (element === null) {\n    throw new Error(`No element matches \"${selector}\"`);\n  }\n  return element;\n};\n```\n\n- `<T extends HTMLElement>` - \"any kind of element\": passes your choice on\n- you have used `<T>` since Chapter 1: `querySelector<HTMLButtonElement>`\n- never returns `null`, so no `if` afterwards\n"
    },
    {
      "name": "Loud, with a clue",
      "x": 720,
      "y": 140,
      "text": "# Loud, with a clue\n\nRename `id=\"count\"` and rebuild - the console says:\n\n```text\nError: No element matches \"#count\" - check index.html\n    at requireElement (app.js:6:13)\n    ...\n    at new TallyView (app.js:61:19)\n```\n\n- forget the `<HTMLButtonElement>` and the compiler says:\n  `Property 'disabled' does not exist on type 'HTMLElement'.`\n- not tested: in Deno, `document is not defined` - which is exactly why\n  the model must stay DOM-free\n"
    },
    {
      "name": "The view class",
      "x": 960,
      "y": 140,
      "text": "# The view class\n\n```ts\nexport class TallyView {\n  private readonly countText = requireElement<HTMLElement>(\"#count\");\n  private readonly addButton =\n    requireElement<HTMLButtonElement>(\"#add\");\n  // ... #status, #remove\n\n  public render(tally: Tally): void {\n    this.countText.textContent = `${tally.count}`;\n    this.addButton.disabled = tally.isFull;\n    // ... status text, the - button\n  }\n}\n```\n\n- elements found **once**, when `new TallyView()` runs\n- `render` asks the model; it decides only how things **look**\n"
    },
    {
      "name": "main.ts: change the model, then render",
      "x": 1200,
      "y": 140,
      "text": "# main.ts: change the model, then render\n\n```ts\nconst tally = new Tally(ROOM_CAPACITY);\nconst view = new TallyView();\n\nconst render = (): void => view.render(tally);\n\nrequireElement<HTMLButtonElement>(\"#add\")\n  .addEventListener(\"click\", () => {\n    tally.increment();\n    render();\n  });\n// ... #remove and #reset the same way\n\nrender();\n```\n"
    },
    {
      "name": "Try it: forget to render",
      "x": 0,
      "y": 280,
      "text": "# Try it: forget to render\n\n- comment out `render();` in the **+** listener\n- click **+** three times: still 0, and **−** still greyed out\n- the model has 3 people - the page was not told\n- the commonest model-view bug\n- no model test can catch it\n\n![w:420](images/room_counter.png)\n"
    },
    {
      "name": "Rules about input",
      "x": 240,
      "y": 280,
      "text": "# Rules about input\n\n```ts\npublic problemWith(text: string): string | null {\n  const name = text.trim();\n  if (name === \"\") {\n    return \"Type an item first\";\n  }\n  const lower = name.toLowerCase();\n  if (this.items.some((item) => item.toLowerCase() === lower)) {\n    return `${name} is already on the list`;\n  }\n  return null;\n}\n```\n\n- `problemWith` - a polite answer for the view\n- `add` **throws** for the same cases - it guards the invariant\n"
    },
    {
      "name": "A red that taught something",
      "x": 480,
      "y": 280,
      "text": "# A red that taught something\n\nFirst try: `this.items.includes(name)`\n\n```ts\nassertEquals(\n  listOf([\"Milk\"]).problemWith(\"milk\"),\n  \"milk is already on the list\",\n);\n```\n\n```text\n-   null\n+   \"milk is already on the list\"\n```\n\n`\"Milk\" === \"milk\"` is false - compare lower-case copies\n"
    },
    {
      "name": "Handing out a copy",
      "x": 720,
      "y": 280,
      "text": "# Handing out a copy\n\n```ts\npublic get all(): string[] {\n  return [...this.items];\n}\n```\n\n```ts\nDeno.test(\"changing the copy does not change the list\", () => {\n  const list = listOf([\"milk\"]);\n  list.all.push(\"cake\");\n  assertEquals(list.size, 1);\n});\n```\n\nThe view gets the items - but cannot skip the rules\n"
    },
    {
      "name": "Tempting...",
      "x": 960,
      "y": 280,
      "text": "# Tempting...\n\n```ts\n// WRONG: the names were typed by the user\nthis.listElement.innerHTML = items\n  .map((name) => `<li><span>${name}</span>...</li>`)\n  .join(\"\");\n```\n\nNow type:\n\n```text\n<b>cheese</b>\n<img src=x onerror=\"document.body.style.background=`red`\">\n```\n"
    },
    {
      "name": "The browser obeyed",
      "x": 1200,
      "y": 280,
      "text": "# The browser obeyed\n\n![w:640](images/innerhtml_attack.png)\n\n**Cross-site scripting** (XSS): user text run as code - in every visitor's browser\n"
    },
    {
      "name": "The rule",
      "x": 0,
      "y": 420,
      "text": "# The rule\n\n![w:900](images/innerhtml_vs_textcontent.svg)\n\n- `textContent` for anything from a user, a file or another computer\n- `innerHTML` only for HTML **you** wrote\n"
    },
    {
      "name": "Building items safely",
      "x": 240,
      "y": 420,
      "text": "# Building items safely\n\n```ts\nprivate itemElement(name: string, index: number): HTMLLIElement {\n  const item = document.createElement(\"li\");\n  const label = document.createElement(\"span\");\n  label.textContent = name; // text, never HTML\n  const removeButton = document.createElement(\"button\");\n  removeButton.textContent = \"Remove\";\n  removeButton.addEventListener(\"click\",\n    () => this.onRemove(index));\n  item.append(label, removeButton);\n  return item;\n}\n```\n\nArrow function: `this` is still the view (Chapter 3's trap)\n"
    },
    {
      "name": "A view that reports clicks",
      "x": 480,
      "y": 420,
      "text": "# A view that reports clicks\n\n```ts\nexport type RemoveHandler = (index: number) => void;\n\nexport class ShoppingListView {\n  constructor(private readonly onRemove: RemoveHandler) {}\n}\n```\n\n```ts\nconst view = new ShoppingListView((index) => {\n  list.remove(index);\n  render();\n});\n```\n\nThe view **reports**; `main.ts` **decides**. Never `list.remove` on its own!\n"
    },
    {
      "name": "To-do list: ids, not positions",
      "x": 720,
      "y": 420,
      "text": "# To-do list: ids, not positions\n\n![w:520](images/todo_list.png)\n\n- under \"Active\", the first to-do on screen may be the third in the list\n- \"delete item 0\" would delete the wrong one\n- each `Todo` has a `readonly id` that never changes - and ids are never reused\n"
    },
    {
      "name": "A filter is one of three words",
      "x": 960,
      "y": 420,
      "text": "# A filter is one of three words\n\n```ts\nexport type Filter = \"all\" | \"active\" | \"done\";\n\nexport const FILTERS: Filter[] = [\"all\", \"active\", \"done\"];\n```\n\n```text\nTS2820 [ERROR]: Type '\"All\"' is not assignable to type 'Filter'.\nDid you mean '\"all\"'?\n```\n\nA union of strings: a typo is a compile error, not an empty list\n(Chapter 8 says more)\n"
    },
    {
      "name": "Words out of the view",
      "x": 1200,
      "y": 420,
      "text": "# Words out of the view\n\n```ts\n// in render: \"1 items left\"!\nthis.remainingLabel.textContent = `${remaining} items left`;\n```\n\n```ts\nexport const remainingText = (count: number): string => {\n  if (count === 0) {\n    return \"Nothing left to do\";\n  }\n  return count === 1 ? \"1 item left\" : `${count} items left`;\n};\n```\n\nIf an `if` in view code could be wrong, move it where it can be tested\n"
    },
    {
      "name": "An object of handlers",
      "x": 0,
      "y": 560,
      "text": "# An object of handlers\n\n```ts\nexport type TodoHandlers = {\n  onToggle: (id: number) => void;\n  onRemove: (id: number) => void;\n  onFilter: (filter: Filter) => void;\n};\n\nexport class TodoView {\n  constructor(private readonly handlers: TodoHandlers) { ... }\n\n  public render(todos: Todo[], remaining: number,\n    filter: Filter): void { ... }\n}\n```\n\nThe view is given what to show - it does not filter or count\n"
    },
    {
      "name": "Event → model → render, at scale",
      "x": 240,
      "y": 560,
      "text": "# Event → model → render, at scale\n\n```ts\nconst view = new TodoView({\n  onToggle: (id) => {\n    list.toggle(id);\n    render();\n  },\n  onFilter: (chosen) => {\n    filter = chosen;\n    render();\n  },\n  // ... onRemove\n});\nconst render = (): void =>\n  view.render(list.visible(filter), list.remaining, filter);\n```\n\nThe filter is state too. Every event: change the state, then render\n"
    },
    {
      "name": "Testing the model only",
      "x": 480,
      "y": 560,
      "text": "# Testing the model only\n\n- 17 tests: `Todo`, `TodoList`, `matchesFilter`, `remainingText`,\n  `emptyText`\n- not tested: `TodoView`, `main.ts` - finding elements, `textContent`,\n  listeners, calls to the model\n- nothing in them decides anything about the data\n- views *can* be tested (fake `document`, headless browser) - slower,\n  and worth it only once the model is covered\n\n**Keep the view thin; put everything that can be wrong where it can be tested**\n"
    },
    {
      "name": "Java and TypeScript",
      "x": 720,
      "y": 560,
      "text": "# Java and TypeScript\n\n| Java | TypeScript |\n|---|---|\n| Swing model, `JPanel`, listeners | model class, view class, `main.ts` |\n| `label.setText(name)` | `el.textContent = name` (not `innerHTML`) |\n| `Objects.requireNonNull(x, msg)` | `requireElement(selector)` |\n| an `ActionListener` given to a view | a function given to a view |\n| `List.copyOf(items)` | `[...this.items]` |\n| `enum Filter { ALL, ACTIVE, DONE }` | `\"all\" \\| \"active\" \\| \"done\"` |\n"
    },
    {
      "name": "Summary",
      "x": 960,
      "y": 560,
      "text": "# Summary\n\n- model: data and rules, no DOM, tested. View: shows the model, thin\n- every event: change the model, then render\n- `requireElement` - a typo in an id is loud, not silent\n- `textContent` for user text, never `innerHTML`\n- views report clicks through functions they are given\n- copies out, ids not positions, unions for fixed choices\n- rules that creep into the view move into tested functions\n"
    },
    {
      "name": "Challenges",
      "x": 1200,
      "y": 560,
      "text": "# Challenges\n\n1. Nearly full - an `isNearlyFull` getter, test first\n2. Clear the list - `clear()`, and a button disabled when empty\n3. Two rooms - two tallies, two views, one page\n4. Clear done - `clearDone()` says how many it removed\n5. Move up and down - and what \"up\" means under a filter\n6. Remember the list - plain data, a round-trip test, `localStorage`\n\nWrite the tests first. Keep the model free of the DOM.\n"
    }
  ]
}
