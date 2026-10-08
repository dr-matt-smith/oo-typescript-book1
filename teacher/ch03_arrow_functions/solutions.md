# Chapter 3 - Arrow functions: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. Kelvin

**Project:** [solutions/ch03_challenge_1_kelvin](solutions/ch03_challenge_1_kelvin/)
(from `ch03_project01_temperatures`)

`src/temperature.ts`
```ts
// CHALLENGE 1
const ABSOLUTE_ZERO_CELSIUS = -273.15;

/** Celsius to Kelvin: 0 K is absolute zero, -273.15 °C. */
export const toKelvin = (celsius: number): number => celsius - ABSOLUTE_ZERO_CELSIUS;
```

Tests: 0 °C is 273.15 K, 100 °C is 373.15 K, -273.15 °C is 0 K - all with `assertAlmostEquals`.

**Look for:** `assertAlmostEquals`. These three cases happen to come out exact, so `assertEquals`
would pass - but `toKelvin(-40)` is `233.14999999999998`, so a student who adds a -40 test with
`assertEquals` gets a useful surprise. A named constant
rather than a bare 273.15. An expression-body arrow function.

---

## 2. Free throw and undo

**Project:** [solutions/ch03_challenge_2_undo](solutions/ch03_challenge_2_undo/)
(from `ch03_project02_scoreboard`)

`src/Team.ts`
```ts
  private baskets: number[] = []; // CHALLENGE 2

  // CHALLENGE 2: the total of the baskets
  public getScore(): number {
    return this.baskets.reduce((total, points) => total + points, 0);
  }

  public addPoints(points: number): void {
    this.baskets.push(points); // CHALLENGE 2
  }

  /** Takes away the last basket scored. Does nothing if there are none. */
  public undo(): void {
    this.baskets.pop();
  }
```

`src/main.ts` adds an Undo button in `addButtons`, with the listener `() => { team.undo(); render(); }`.

Tests: undo after +2 and +3 leaves 2; two undos leave 0; undo with no baskets does nothing.

**Look for:** the existing tests still pass unchanged - the class's *outside* (its methods) stayed
the same while its *inside* changed from a stored score to a list of baskets. That is encapsulation,
and Chapter 6's subject; point it out. `pop()` on an empty array does nothing (it returns
`undefined`), so no `if` is needed. An arrow function for the listener, not `team.undo` (the `this`
trap).

---

## 3. Highest and lowest

**Project:** [solutions/ch03_challenge_3_highest_and_lowest](solutions/ch03_challenge_3_highest_and_lowest/)
(from `ch03_project03_marks_table`)

`src/marks.ts`
```ts
// CHALLENGE 3
/** The student with the lowest mark, or undefined if there are no students. */
export const bottomStudent = (students: Student[]): Student | undefined => byMark(students).at(-1);
```

`src/main.ts`
```ts
    // CHALLENGE 3: top and bottom, described by one small arrow function
    const describe = (student: Student | undefined): string =>
      student === undefined ? "nobody" : `${student.name} (${student.mark})`;
```

**Look for:** reuse of `byMark` (or `toSorted` the other way round and `[0]`). `at(-1)` is "the last
element" and gives `undefined` for an empty array - students may write
`sorted[sorted.length - 1]`, which also works. The empty-class test. A small local arrow function to
avoid repeating the "nobody" logic - worth praising.

---

## 4. Grade counts

**Project:** [solutions/ch03_challenge_4_grade_counts](solutions/ch03_challenge_4_grade_counts/)
(from `ch03_project03_marks_table`)

`src/marks.ts`
```ts
// CHALLENGE 4
export const GRADES: string[] = ["A", "B", "C", "D", "F"];

/** How many of the students got this grade. */
export const countGrade = (students: Student[], grade: string): number =>
  students.filter((student) => gradeFor(student.mark) === grade).length;

/** For example "A: 2 · B: 2 · C: 2 · D: 2 · F: 2". */
export const gradeSummary = (students: Student[]): string =>
  GRADES.map((grade) => `${grade}: ${countGrade(students, grade)}`).join(" · ");
```

Tests: counts for one grade; the summary for the made-up class (`"A: 1 · B: 0 · C: 1 · D: 0 · F:
1"`); an empty class.

**Look for:** `gradeFor` reused, not the grade bands repeated. The summary built with `map` and
`join` over the list of grades - and in `render`, from `shown`, so it follows "passes only".

---

## 5. New conversions, no new code

**Project:** [solutions/ch03_challenge_5_new_conversions](solutions/ch03_challenge_5_new_conversions/)
(from `ch03_project04_unit_converter`)

`src/converters.ts`
```ts
  // CHALLENGE 5: three more - nothing else in the program had to change
  { name: "Miles to kilometres", from: "miles", to: "km", convert: (miles) => miles * 1.609344 },
  { name: "Pounds to kilograms", from: "lb", to: "kg", convert: (pounds) => pounds * 0.453592 },
  { name: "Litres to pints", from: "l", to: "pints", convert: (litres) => litres * 1.75975 },
```

`tests/converters.test.ts`
```ts
// CHALLENGE 5: counting the converters broke every time one was added. What matters is that each
// one can be found by its own name - so names must be unique - and that each one works.
Deno.test("every converter has a different name", () => {
  const names = CONVERTERS.map((converter) => converter.name);
  assertEquals(new Set(names).size, names.length);
});
```

plus a test for each new converter, and a "there and back" test (km -> miles -> km).

**Look for:** no change to `main.ts`. The discussion about the count test: a test that breaks every
time correct code is added is testing the wrong thing. `new Set(names).size` (a `Set` keeps one of
each value) is a preview of Book 2's collections; students may instead compare against a list of
expected names - also fine. The test file's `convert(name, value)` helper throws if the name is not
found, rather than using `!` (not yet taught).

---

## 6. Search as you type

**Project:** [solutions/ch03_challenge_6_search](solutions/ch03_challenge_6_search/)
(from `ch03_project03_marks_table`)

`src/marks.ts`
```ts
// CHALLENGE 6
/** The students whose names contain `text`, ignoring case. An empty search matches everybody. */
export const searchByName = (students: Student[], text: string): Student[] =>
  students.filter((student) => student.name.toLowerCase().includes(text.toLowerCase()));
```

`src/main.ts`
```ts
let searchText = ""; // CHALLENGE 6
// ...
  const found = searchByName(STUDENTS, searchText); // CHALLENGE 6: search first, then the rest as before
  const chosen = passesOnly ? passed(found) : found;
// ...
searchBox?.addEventListener("input", () => {
  searchText = searchBox.value;
  render();
});
```

Tests: a match; case ignored; an empty search matches everybody (`"".includes` is always true -
nice to discover through the test); no match gives `[]`.

**Look for:** the search kept as **state** (`searchText`) and applied in `render`, so it combines
with sorting and "passes only" - rather than the listener rebuilding the table itself, which breaks
as soon as a sort button is pressed.
