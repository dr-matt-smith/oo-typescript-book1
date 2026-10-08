{
  "name": "Chapter 9 - References, composition and modules",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 9",
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
      "text": "# Chapter 9\n## References, composition and modules\n\nObject-oriented TypeScript, test first\n\n![w:560](images/aliasing_lab.png)\n"
    },
    {
      "name": "Today",
      "x": 240,
      "y": 0,
      "text": "# Today\n\n- copied or shared? values and **references**\n- `const` is not \"constant\"\n- three ways to copy - and what each shares\n- aliasing bugs, found by tests\n- composition and aggregation: objects that **have** objects\n- ES modules: `import type`, folders, `index.ts`\n- fresh test data, every time\n"
    },
    {
      "name": "Copied",
      "x": 480,
      "y": 0,
      "text": "# Copied\n\n```ts\nDeno.test(\"numbers are copied\", () => {\n  const a = 10;\n  let b = a;\n  b += 1;\n  assertEquals(a, 10);\n});\n```\n\n- primitives: `number`, `string`, `boolean`, `null`, `undefined`\n"
    },
    {
      "name": "Shared",
      "x": 720,
      "y": 0,
      "text": "# Shared\n\n```ts\nDeno.test(\"arrays are shared\", () => {\n  const a = [\"bread\"];\n  const b = a;\n  b.push(\"milk\");\n  assertEquals(a, [\"bread\", \"milk\"]);\n  assertStrictEquals(b, a);\n});\n```\n\n- a variable holds a **reference** to an object\n- two references to one object: **aliases**\n- exactly Java's rule\n"
    },
    {
      "name": "Same object, or same contents?",
      "x": 960,
      "y": 0,
      "text": "# Same object, or same contents?\n\n```ts\nconst a = { name: \"milk\", quantity: 2 };\nconst b = { name: \"milk\", quantity: 2 };\nassertEquals(a, b);          // same contents\nassertEquals(a === b, false); // different objects\n```\n\n| Ask | Use |\n|---|---|\n| the same object? | `===`, `assertStrictEquals` |\n| the same contents? | `assertEquals` |\n"
    },
    {
      "name": "const is not \"constant\"",
      "x": 1200,
      "y": 0,
      "text": "# `const` is not \"constant\"\n\n```ts\nconst shopping = [\"bread\"];\nshopping.push(\"milk\");   // fine\nshopping = [\"cake\"];     // error\n```\n\n```text\nTS2588 [ERROR]: Cannot assign to 'shopping'\n  because it is a constant.\n```\n\n- `const` fixes the **variable**, not the object - like Java's `final`\n"
    },
    {
      "name": "Parameters are references too",
      "x": 0,
      "y": 140,
      "text": "# Parameters are references too\n\n```ts\nconst addMilk = (list: string[]): void => {\n  list.push(\"milk\");\n};\nconst shopping = [\"bread\"];\naddMilk(shopping);\n// shopping is now [\"bread\", \"milk\"]\n```\n\n- the function gets a **copy of the reference**\n- it can change the object, not the caller's variable\n"
    },
    {
      "name": "The Aliasing Lab",
      "x": 240,
      "y": 140,
      "text": "# The Aliasing Lab\n\n![w:560](images/aliasing_lab.png)\n"
    },
    {
      "name": "Three ways to make B from A",
      "x": 480,
      "y": 140,
      "text": "# Three ways to make B from A\n\n![w:1000](images/three_copies.svg)\n"
    },
    {
      "name": "In code",
      "x": 720,
      "y": 140,
      "text": "# In code\n\n```ts\nswitch (mode) {\n  case \"same array\":\n    return basket;               // no copy\n  case \"spread copy\":\n    return [...basket];          // shallow\n  case \"structuredClone\":\n    return structuredClone(basket); // deep\n}\n```\n\n- `{ ...item }` - spread for objects, also shallow\n"
    },
    {
      "name": "Predict, then check",
      "x": 960,
      "y": 140,
      "text": "# Predict, then check\n\n`const b = [...a];` then:\n\n- one more of B's first item - twice\n- add eggs to B\n\nWhat does **A** show?\n\n**bread × 3, milk × 2** - items shared, arrays not\n"
    },
    {
      "name": "Test first: withItem",
      "x": 1200,
      "y": 140,
      "text": "# Test first: `withItem`\n\n```ts\nDeno.test(\"withItem leaves the original basket as it was\",\n  () => {\n    const original = makeBasket();\n    withItem(original, EGGS);\n    assertEquals(original.length, 2);\n  });\n```\n\n```ts\n// first attempt\nbasket.push(item);\nreturn basket;\n```\n"
    },
    {
      "name": "Red",
      "x": 0,
      "y": 280,
      "text": "# Red\n\n```text\nnot ok 8 - withItem leaves the original basket as it was\n    [Diff] Actual / Expected\n\n-   3\n+   2\n```\n\n```ts\nexport const withItem = (basket: Item[], item: Item)\n  : Item[] => [...basket, item];\n```\n\nGreen - return something **new**\n"
    },
    {
      "name": "Careful with structuredClone",
      "x": 240,
      "y": 280,
      "text": "# Careful with `structuredClone`\n\n- copies **data**, not classes\n- a cloned `Box` is a plain object: `instanceof Box` is `false`\n- its methods are gone - and TypeScript still says `Box`\n- plain data: fine. Your classes: write a copy method\n"
    },
    {
      "name": "A playlist has songs",
      "x": 480,
      "y": 280,
      "text": "# A playlist has songs\n\n![w:640](images/playlist.png)\n\n- **composition**: the whole owns and makes its parts\n- **aggregation**: it refers to parts that live on their own\n"
    },
    {
      "name": "Sharing is safe if nothing can change",
      "x": 720,
      "y": 280,
      "text": "# Sharing is safe if nothing can change\n\n```ts\nexport class Song {\n  constructor(\n    public readonly title: string,\n    public readonly artist: string,\n    public readonly seconds: number,\n  ) { ... }\n}\n```\n\n- library and playlists share the **same** `Song` objects\n- `readonly`: no alias can surprise you\n"
    },
    {
      "name": "The leaking getter",
      "x": 960,
      "y": 280,
      "text": "# The leaking getter\n\n```ts\npublic getSongs(): Song[] {\n  return this.songs;   // the private array itself!\n}\n```\n\n```text\nnot ok 11 - changing the array from getSongs does not\n            change the playlist\n-   4\n+   3\n```\n\n`private` protects the field, not the array it refers to\n"
    },
    {
      "name": "Copy, and say so in the type",
      "x": 1200,
      "y": 280,
      "text": "# Copy, and say so in the type\n\n```ts\npublic getSongs(): readonly Song[] {\n  return [...this.songs];\n}\n```\n\n```text\nTS2339 [ERROR]: Property 'push' does not exist on\n  type 'readonly Song[]'.\n```\n\n- `readonly` - compile time only; the copy is the real protection\n- copy coming **in** too: `this.songs = [...songs];`\n"
    },
    {
      "name": "Course has Modules has Students",
      "x": 0,
      "y": 420,
      "text": "# Course has Modules has Students\n\n```nomnoml\n#fill: #f1faee; #a8dadc\n#stroke: #1d3557\n#lineWidth: 1.5\n#font: Arial\n#fontSize: 14\n#direction: down\n#.interface: fill=#a8dadc italic\n#direction: right\n#spacing: 70\n#edgeMargin: 6\n[Course|+ name: string;- modules: Module\\[\\];- students: Student\\[\\]|+ addModule(...): Module;+ addStudent(...): Student;+ enrol(code, id): void;+ totalCredits(): number]\n[Module|+ code, title, credits;- students: Student\\[\\]|+ enrol(student): void;+ withdraw(id): void;+ getStudents(): readonly Student\\[\\]]\n[Student|+ id: string;+ name: string|+ toString(): string]\n[Course] 1 +-> 1..* [Module]\n[Course] 1 +-> 0..* [Student]\n[Module] 0..* o-> 0..* [Student]\n```\n\nFilled diamond: composition - the course creates its modules and students.\nHollow diamond: aggregation - a module shares the course's Student objects.\n"
    },
    {
      "name": "Identity or id?",
      "x": 240,
      "y": 420,
      "text": "# Identity or id?\n\n```ts\npublic isEnrolled(student: Student): boolean {\n  return this.students.some(\n    (enrolled) => enrolled.id === student.id,\n  );\n}\n```\n\n- playlist: \"this very song?\" - `===`\n- module: \"this person?\" - compare ids\n- a design decision\n"
    },
    {
      "name": "ES modules",
      "x": 480,
      "y": 420,
      "text": "# ES modules\n\n- every file with `import`/`export` is a module\n- not exported = invisible everywhere else\n- **named exports** only in this book\n\n```ts\nexport class Course { ... }\nimport { courseSummary } from \"./report.ts\";\n```\n\n- relative imports end in `.ts`\n"
    },
    {
      "name": "import type",
      "x": 720,
      "y": 420,
      "text": "# `import type`\n\n```ts\nimport type { Course, Module } from \"./model/index.ts\";\nimport { addItem, type Item } from \"./basket.ts\";\n```\n\n- types only - gone after compiling\n- use it as a value and:\n\n```text\nTS1361 [ERROR]: 'Course' cannot be used as a value\n  because it was imported using 'import type'.\n```\n"
    },
    {
      "name": "A folder with a front door",
      "x": 960,
      "y": 420,
      "text": "# A folder with a front door\n\n```ts\n// src/model/index.ts\nexport { Course } from \"./Course.ts\";\nexport { Module } from \"./Module.ts\";\nexport { Student } from \"./Student.ts\";\n```\n\n```ts\nimport { Course } from \"../model/index.ts\";\n```\n"
    },
    {
      "name": "Who imports whom",
      "x": 1200,
      "y": 420,
      "text": "# Who imports whom\n\n```mermaid\nflowchart TD\n  main[main.ts]\n  build[data/build_course.ts]\n  report[report.ts]\n  json[data/course.json]\n  subgraph model [src/model/]\n    direction LR\n    index[index.ts]\n    Course[Course.ts]\n    Module[Module.ts]\n    Student[Student.ts]\n  end\n  main --> build\n  main --> report\n  main --> json\n  main -.-> index\n  report -.-> index\n  build --> index\n  index --> Course\n  index --> Module\n  index --> Student\n  Course --> Module\n  Course --> Student\n  Module -.-> Student\n```\n\nSolid: `import { ... }`. Dashed: `import type { ... }` - gone after compiling.\n\nDependencies go one way - never in a circle\n"
    },
    {
      "name": "Java packages and ES modules",
      "x": 0,
      "y": 560,
      "text": "# Java packages and ES modules\n\n| Java | TypeScript |\n|---|---|\n| package = folder, `package model;` | module = file |\n| `public class` | `export class` |\n| package-private | not exported (file-private) |\n| `import model.Course;` | `import { Course } from \"...\"` |\n| - | `index.ts` as a front door |\n"
    },
    {
      "name": "A shared fixture",
      "x": 240,
      "y": 560,
      "text": "# A shared fixture\n\n```ts\nconst COURSE = makeCourse();\n\nDeno.test(\"enrol adds Bob to Maths\", () => {\n  COURSE.enrol(\"MATH\", \"S2\");\n  assertEquals(moduleOf(COURSE, \"MATH\").count(), 1);\n});\nDeno.test(\"nobody is on Maths yet\", () => {\n  assertEquals(moduleOf(COURSE, \"MATH\").count(), 0);\n});\n```\n\nThe second test fails (actual 1, expected 0) - yet passes on its own!\n"
    },
    {
      "name": "Fresh data, every time",
      "x": 480,
      "y": 560,
      "text": "# Fresh data, every time\n\n```ts\nexport const makeCourse = (): Course => {\n  const course = new Course(\"Test course\");\n  course.addStudent(\"S1\", \"Ann\");\n  // ...\n  return course;\n};\n```\n\n- each test: `const course = makeCourse();`\n- Java: `@BeforeEach` - here, a plain function\n"
    },
    {
      "name": "Summary",
      "x": 720,
      "y": 560,
      "text": "# Summary\n\n- primitives copied; objects shared - beware aliases\n- `[...a]` shallow, `structuredClone` deep (plain data)\n- return something new; test the original is unchanged\n- copy arrays into and out of a class; `readonly T[]`\n- composition owns; aggregation shares\n- named exports, `import type`, `index.ts`\n- fixtures are functions\n"
    },
    {
      "name": "Challenges",
      "x": 960,
      "y": 560,
      "text": "# Challenges\n\n1. `withoutItem` - a new basket\n2. `moveDown`\n3. duplicate a playlist\n4. which modules is a student on?\n5. a second folder: `report/` and CSV\n6. save and restore with `toData()`\n\nAll test first\n"
    }
  ]
}
