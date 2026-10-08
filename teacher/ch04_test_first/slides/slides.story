{
  "name": "Chapter 4 - Test first, properly",
  "description": "Object-oriented TypeScript, test first - teacher slides for Chapter 4",
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
      "text": "# Chapter 4 - Test first, properly\n\nObject-oriented TypeScript, test first\n\n- red-green-refactor, in really small steps\n- FizzBuzz, Roman numerals, password rules, leap years\n"
    },
    {
      "name": "What you will learn",
      "x": 240,
      "y": 0,
      "text": "## What you will learn\n\n- small steps, and why small is the point\n- test names as sentences; arrange / act / assert\n- refactoring with the tests green\n- `throw new Error(...)` and `assertThrows`\n- `assertEquals` vs `assertStrictEquals`\n- steps with `t.step`; helper functions\n- katas and \"start red\" exercises\n- doc comment examples versus test files\n"
    },
    {
      "name": "The cycle",
      "x": 480,
      "y": 0,
      "text": "## The cycle\n\n1. **Red** - write **one** test. Watch it fail\n2. **Green** - the **least** code that passes\n3. **Refactor** - tidy up while everything is green\n\nWhy watch it fail? A test you have never seen fail might not test\nanything at all.\n\nWhy so small? Two lines changed, one test red: you know where to look.\n"
    },
    {
      "name": "FizzBuzz: the test list first",
      "x": 720,
      "y": 0,
      "text": "## FizzBuzz: the test list first\n\nCount from 1. Multiples of 3: **Fizz**. Of 5: **Buzz**. Of both: **FizzBuzz**.\n\nA plan on paper, simplest first:\n\n- 1 is \"1\"\n- 2 is \"2\"\n- 3 is \"Fizz\"\n- 5 is \"Buzz\"\n- 6 is \"Fizz\" (and other multiples of 3)\n- 15 is \"FizzBuzz\"\n"
    },
    {
      "name": "One cycle per line",
      "x": 960,
      "y": 0,
      "text": "## One cycle per line\n\n```mermaid\nflowchart LR\n  subgraph c1[\"cycle 1\"]\n    direction TB\n    r1[\"1 is said as 1\"] --> g1[\"return '1'\"]\n  end\n  subgraph c2[\"cycle 2\"]\n    direction TB\n    r2[\"2 is said as 2\"] --> g2[\"return `${n}`\"]\n  end\n  subgraph c3[\"cycle 3\"]\n    direction TB\n    r3[\"3 is Fizz\"] --> g3[\"if n % 3 === 0<br/>return 'Fizz'\"]\n  end\n  subgraph c4[\"cycle 4\"]\n    direction TB\n    r4[\"5 is Buzz\"] --> g4[\"if n % 5 === 0<br/>return 'Buzz'\"]\n  end\n  subgraph c5[\"cycle 5\"]\n    direction TB\n    r5[\"15 is FizzBuzz\"] --> g5[\"check 15 first<br/>\u2192 'FizzBuzz'\"]\n  end\n  c1 --> c2 --> c3 --> c4 --> c5 --> ref[\"<b>Refactor</b><br/>named constants<br/>isDivisibleBy helper<br/>'Fizz' + 'Buzz'<br/>all tests stay green\"]\n  classDef red fill:#fde8ea,stroke:#e63946\n  classDef green fill:#e8f5f1,stroke:#2a9d8f\n  class r1,r2,r3,r4,r5 red\n  class g1,g2,g3,g4,g5 green\n  class ref tool\n  classDef src fill:#f1faee,stroke:#1d3557\n  classDef tool fill:#a8dadc,stroke:#1d3557\n  classDef run fill:#1d3557,stroke:#1d3557,color:#fff\n  classDef ok fill:#e8f5f1,stroke:#2a9d8f\n  classDef bad fill:#fde8ea,stroke:#e63946\n```\n\nRed: a new failing test \u00b7 Green: the smallest change \u00b7 6 and 99: already green\n"
    },
    {
      "name": "Cycle 1",
      "x": 1200,
      "y": 0,
      "text": "## Cycle 1\n\n```ts\nDeno.test(\"1 is said as 1\", () => {\n  assertEquals(fizzBuzz(1), \"1\");\n});\n```\n\n```text\nerror: Module not found \"src/fizz_buzz.ts\".\n```\n\nRed. Now the least code that passes:\n\n```ts\nexport const fizzBuzz = (n: number): string => \"1\";\n```\n"
    },
    {
      "name": "Cycle 2: triangulation",
      "x": 0,
      "y": 140,
      "text": "## Cycle 2: triangulation\n\n```text\nnot ok 2 - 2 is said as 2\n    -   1\n    +   2\n```\n\n```ts\nexport const fizzBuzz = (n: number): string => `${n}`;\n```\n\nGeneralise only when a second example **forces** you.\n"
    },
    {
      "name": "Cycles 3 and 4",
      "x": 240,
      "y": 140,
      "text": "## Cycles 3 and 4\n\n```ts\nexport const fizzBuzz = (n: number): string => {\n  if (n % 3 === 0) {\n    return \"Fizz\";\n  }\n  if (n % 5 === 0) {\n    return \"Buzz\";\n  }\n  return `${n}`;\n};\n```\n\n\"6 and 99 are Fizz\" passes straight away: not a cycle, but worth keeping.\n"
    },
    {
      "name": "Cycle 5: red",
      "x": 480,
      "y": 140,
      "text": "## Cycle 5: red\n\n![h:440](images/report_fizzbuzz_red.png)\n"
    },
    {
      "name": "Cycle 5: green",
      "x": 720,
      "y": 140,
      "text": "## Cycle 5: green\n\n```ts\nexport const fizzBuzz = (n: number): string => {\n  if (n % 15 === 0) {\n    return \"FizzBuzz\";\n  }\n  if (n % 3 === 0) {\n    return \"Fizz\";\n  }\n  // ... Buzz, then the number\n};\n```\n\nIt works. **Now** tidy it.\n"
    },
    {
      "name": "Refactor on green",
      "x": 960,
      "y": 140,
      "text": "## Refactor on green\n\n```ts\nconst FIZZ_DIVISOR = 3;\nconst BUZZ_DIVISOR = 5;\n\nconst isDivisibleBy = (n: number, divisor: number): boolean =>\n  n % divisor === 0;\n\nexport const fizzBuzz = (n: number): string => {\n  let answer = \"\";\n  if (isDivisibleBy(n, FIZZ_DIVISOR)) answer += \"Fizz\";\n  if (isDivisibleBy(n, BUZZ_DIVISOR)) answer += \"Buzz\";\n  return answer === \"\" ? `${n}` : answer;\n};\n```\n\n(The project writes each `if` with braces.) Ifs the wrong way round?\n`- BuzzFizz` / `+ FizzBuzz` - at once.\n"
    },
    {
      "name": "Test names are sentences",
      "x": 1200,
      "y": 140,
      "text": "## Test names are sentences\n\n| Not like this | Like this |\n|---|---|\n| `test1` | `1 is said as 1` |\n| `testFizz` | `3 is Fizz` |\n| `fizzBuzz works` | `15 is FizzBuzz` |\n| `edge case` | `no answers up to 0` |\n\nRead the list of tests: you have the rules.\n"
    },
    {
      "name": "Arrange, act, assert",
      "x": 0,
      "y": 280,
      "text": "## Arrange, act, assert\n\n```ts\nDeno.test(\"the first five answers, in order\", () => {\n  // Arrange\n  const count = 5;\n\n  // Act\n  const answers = fizzBuzzUpTo(count);\n\n  // Assert\n  assertEquals(answers, [\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"]);\n});\n```\n\nAct, assert, act, assert? That is two tests.\n"
    },
    {
      "name": "Examples and tests",
      "text": "## Examples and tests\n\nLast step, once `fizzBuzz` has settled - a doc comment example:\n\n```ts\n/**\n * What to say for one number: \"Fizz\", \"Buzz\", ...\n *\n * @example\n * ```ts\n * import { assertEquals } from \"@std/assert\";\n *\n * assertEquals(fizzBuzz(3), \"Fizz\");\n * assertEquals(fizzBuzz(15), \"FizzBuzz\");\n * assertEquals(fizzBuzz(7), \"7\");\n * ```\n */\n```\n\nTests **drove** the code \u00b7 the example **shows** how to use it\n",
      "x": 240,
      "y": 280
    },
    {
      "name": "Which goes where?",
      "text": "## Which goes where?\n\n| | Doc comment example | Test file |\n|---|---|---|\n| for | someone **using** it | someone **changing** it |\n| holds | a few typical calls | every rule and edge |\n| name | none: \"lines 14-22\" | a sentence |\n| on failure | the rest is skipped | every test still runs |\n| written | once settled | first, one at a time |\n\nSwap the `if`s: tests 7 and 8 say **what** broke, by name; the example only says **where**\n",
      "x": 480,
      "y": 280
    },
    {
      "name": "Roman numerals",
      "x": 720,
      "y": 280,
      "text": "## Roman numerals\n\nI 1 \u00b7 V 5 \u00b7 X 10 \u00b7 L 50 \u00b7 C 100 \u00b7 D 500 \u00b7 M 1000\n\n- added up, biggest first: VIII is 8\n- smaller in front is taken away: IV 4, IX 9, XL 40, CM 900\n- 1994 is MCMXCIV\n\nAfter the units, \"10 is X\" is red:\n\n```text\n    -   VIIIII\n    +   X\n```\n"
    },
    {
      "name": "The pile of ifs (green!)",
      "x": 960,
      "y": 280,
      "text": "## The pile of ifs (green!)\n\n```ts\nlet result = \"\";\nlet rest = n;\nwhile (rest >= 10) { result += \"X\"; rest -= 10; }\nif (rest >= 9) { result += \"IX\"; rest -= 9; }\nif (rest >= 5) { result += \"V\"; rest -= 5; }\nif (rest >= 4) { result += \"IV\"; rest -= 4; }\nwhile (rest >= 1) { result += \"I\"; rest -= 1; }\nreturn result;\n```\n\nFive blocks, the same shape. Only the **data** changes.\n"
    },
    {
      "name": "Data in a table, one loop",
      "x": 1200,
      "y": 280,
      "text": "## Data in a table, one loop\n\n```ts\nconst NUMERALS: Numeral[] = [\n  { value: 1000, symbol: \"M\" },\n  { value: 900, symbol: \"CM\" },\n  // ... down to\n  { value: 1, symbol: \"I\" },\n];\n\nfor (const numeral of NUMERALS) {\n  while (rest >= numeral.value) {\n    result += numeral.symbol;\n    rest -= numeral.value;\n  }\n}\n```\n"
    },
    {
      "name": "A slip, caught",
      "x": 0,
      "y": 420,
      "text": "## A slip, caught\n\nIV typed above V in the table:\n\n```text\n# Subtest: each symbol on its own\n    ok 1 - 1 is I\n    not ok 2 - 5 is V\n        -   IVI\n        +   V\n# Subtest: symbols written together are added up\n    not ok 3 - 6 is VI\n    not ok 4 - 8 is VIII\n    not ok 5 - 27 is XXVII\n```\n\nEvery failure has a 5 in it.\n"
    },
    {
      "name": "Steps: t.step",
      "x": 240,
      "y": 420,
      "text": "## Steps: `t.step`\n\n```ts\nDeno.test(\"smaller in front is taken away\", async (t) => {\n  await t.step(\"4 is IV\", () => {\n    assertEquals(toRoman(4), \"IV\");\n  });\n  await t.step(\"9 is IX\", () => {\n    assertEquals(toRoman(9), \"IX\");\n  });\n});\n```\n\n- `async (t)`, and `await` before **every** `t.step`\n- a failing step does not stop the others\n"
    },
    {
      "name": "Forget the await",
      "x": 480,
      "y": 420,
      "text": "## Forget the await\n\n```text\nnot ok 2 - 1 is I\n  message: |-\n    Didn't complete before parent.\n    Await step with `await t.step(...)`.\n```\n\nForget the `async`:\n\n```text\nTS1308 [ERROR]: 'await' expressions are only allowed within\nasync functions and at the top levels of modules.\n```\n"
    },
    {
      "name": "A helper makes the steps",
      "x": 720,
      "y": 420,
      "text": "## A helper makes the steps\n\n```ts\ntype Example = { n: number; numeral: string };\n\nconst checkExamples = async (\n  t: Deno.TestContext, examples: Example[],\n): Promise<void> => {\n  for (const example of examples) {\n    await t.step(`${example.n} is ${example.numeral}`, () => {\n      assertEquals(toRoman(example.n), example.numeral);\n    });\n  }\n};\n```\n\nA new case is one line of data.\n"
    },
    {
      "name": "Throwing an error",
      "x": 960,
      "y": 420,
      "text": "## Throwing an error\n\n```ts\nexport const minLength = (length: number): Rule => {\n  if (!Number.isInteger(length) || length < 1) {\n    throw new Error(\n      `a minimum length must be a whole number of at least 1, ` +\n      `not ${length}`,\n    );\n  }\n  return { description: `at least ${length} characters`,\n    isMetBy: (password) => password.length >= length };\n};\n```\n\nA mistake in the **program**: stop loudly. No checked exceptions,\nno `throws` clause.\n"
    },
    {
      "name": "assertThrows",
      "x": 1200,
      "y": 420,
      "text": "## assertThrows\n\n```ts\nassertThrows(() => minLength(0));\n```\n\nRed first: `AssertionError: Expected function to throw.`\n\nWithout the `() =>`, `minLength(0)` runs first and its error fails the test:\n\n```text\nArgument of type 'Rule' is not assignable to parameter\nof type '() => unknown'.\n```\n"
    },
    {
      "name": "Checking the message",
      "x": 0,
      "y": 560,
      "text": "## Checking the message\n\n```ts\nassertThrows(() => minLength(2.5), Error, \"must be a whole number\");\n```\n\n- the text only has to be **included** in the message\n- the wrong text:\n\n```text\nExpected error message to include \"must be a positive number\",\nbut got \"a minimum length must be a whole number of at least 1,\nnot 2.5\".\n```\n"
    },
    {
      "name": "A fresh object for every test",
      "x": 240,
      "y": 560,
      "text": "## A fresh object for every test\n\n```ts\nconst makeChecker = (): PasswordChecker =>\n  new PasswordChecker([minLength(8), HAS_DIGIT, HAS_UPPER_CASE]);\n\nDeno.test(\"a password that breaks one rule is not acceptable\",\n  () => {\n    const checker = makeChecker();\n    assertEquals(checker.isAcceptable(\"elephant42\"), false);\n  });\n```\n\nInstead of `@BeforeEach`: nothing leaks between tests, and the\nsetup is in plain sight.\n"
    },
    {
      "name": "Equal, or the same object?",
      "x": 480,
      "y": 560,
      "text": "## Equal, or the same object?\n\n![w:760](images/equals_vs_strict.svg)\n"
    },
    {
      "name": "assertStrictEquals",
      "x": 720,
      "y": 560,
      "text": "## assertStrictEquals\n\n```ts\nconst failed = checker.failedRules(\"Elephants\");\nassertStrictEquals(failed[0], HAS_DIGIT);\n```\n\nA lookalike copy fails:\n\n```text\nAssertionError: Values have the same structure but are not\nreference-equal.\n```\n\nSurprise: `assertEquals(minLength(8), minLength(8))` **fails** -\ntwo different `isMetBy` functions.\n"
    },
    {
      "name": "Start red: leap years",
      "x": 960,
      "y": 560,
      "text": "## Start red: leap years\n\n![h:380](images/report_leap_years_red.png)\n\nPick one failing test, make it pass, repeat. Never change a test.\n"
    },
    {
      "name": "Katas, and the habit",
      "x": 1200,
      "y": 560,
      "text": "## Katas, and the habit\n\nA kata: a small problem solved again and again, to practise the **way**.\n\n1. a test list first\n2. one test at a time; see it fail\n3. the least code\n4. refactor on green\n5. sentence names; arrange, act, assert\n6. edges: 0, empty, one, the boundary, refused input\n7. once settled: a doc comment example\n"
    },
    {
      "name": "JUnit and Deno",
      "x": 0,
      "y": 700,
      "text": "## JUnit and Deno\n\n| JUnit 5 | Deno |\n|---|---|\n| `assertEquals(expected, actual)` | `assertEquals(actual, expected)` |\n| `assertSame` | `assertStrictEquals` |\n| `assertThrows(X.class, () -> f())` | `assertThrows(() => f(), Error, \"msg\")` |\n| `throw new IllegalArgumentException` | `throw new Error(\"...\")` |\n| `@BeforeEach` | a helper function |\n| `@Nested`, `@ParameterizedTest` | `t.step`, a table of examples |\n"
    },
    {
      "name": "Challenges",
      "x": 240,
      "y": 700,
      "text": "## Challenges\n\n1. Fizz, Buzz, Whizz\n2. Make it green (leap years)\n3. More password rules\n4. Back from Roman\n5. The string calculator kata\n6. Strict Roman\n\nAll test first: see each test fail before you make it pass.\n"
    }
  ]
}
