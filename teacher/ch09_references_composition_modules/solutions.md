# Chapter 9 - References, composition and modules: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. Take it out again

**Project:** [solutions/ch09_challenge_1_without_item](solutions/ch09_challenge_1_without_item/)
(from `ch09_project01_aliasing`)

`src/basket.ts`
```ts
// CHALLENGE 1
/** A new basket without the item called `name`. The basket it is given is left as it was. */
export const withoutItem = (basket: Item[], name: string): Item[] => basket.filter((item) => item.name !== name);
```

`src/main.ts` adds a **Remove eggs from B** button whose listener is
`b = withoutItem(b, "eggs"); render();`.

Tests: the item is gone from the result; the original still equals a fresh `makeBasket()`;
removing a name that is not there gives an equal basket that is **not** the same array
(`assertNotStrictEquals`).

**Look for:** `filter`, which always makes a new array - students who reach for `splice` (which
changes the array) will fail the "original as it was" test, which is the point. The third test is
the subtle one: even when nothing is removed, the result must be a new array, or the caller would
have an alias. In the page, try it after `const b = a`: removing eggs from B leaves them in A,
because `b` now refers to a new array - a good discussion point (`b = ...` changes what `b` refers
to, not the array).

---

## 2. Move down

**Project:** [solutions/ch09_challenge_2_move_down](solutions/ch09_challenge_2_move_down/)
(from `ch09_project02_playlist`)

`src/Playlist.ts`
```ts
  // CHALLENGE 2
  /** Swaps the song at `index` with the one after it. The last song stays where it is. */
  public moveDown(index: number): void {
    this.checkIndex(index);
    if (index === this.songs.length - 1) {
      return;
    }
    // Moving a song down is moving the song after it up.
    this.moveUp(index + 1);
  }
```

`src/main.ts` adds a **↓** button to each playlist row, disabled on the last song.

Tests: swaps with the next song; the last song stays put; position 3 of 3 throws "No song at
position 3".

**Look for:** reuse of `moveUp` and `checkIndex` rather than a copy of the swapping code - and the
edge tests written before the code. Students who write their own swap are fine too; check they kept
the index check, and that the existing tests still pass.

---

## 3. Duplicate a playlist

**Project:** [solutions/ch09_challenge_3_duplicate](solutions/ch09_challenge_3_duplicate/)
(from `ch09_project02_playlist`)

`src/Playlist.ts`
```ts
  // CHALLENGE 3
  /**
   * A new playlist with the same songs. The constructor copies the array, so the two playlists can
   * be changed separately. The Song objects themselves are shared, not copied: a Song is readonly,
   * so no change to one playlist can ever reach the other through a song.
   */
  public duplicate(name: string): Playlist {
    return new Playlist(name, this.songs);
  }
```

`src/main.ts` adds a **Duplicate** button: the page switches to editing the copy (so `playlist`
becomes `let`) and shows the previous playlist's song count, which does not change.

Tests: same songs in the same order and the new name; removing from the duplicate leaves the
original with 3; `assertStrictEquals` on a song from each.

**Look for:** passing `this.songs` to the constructor is safe *only* because the constructor makes
a copy - ask students what would happen if it did not (both playlists would share one array). A
solution that writes `new Playlist(name, [...this.songs])` is also fine, just copies twice. Students
who `structuredClone` the songs have missed the point of the comment, and also turned them into
plain objects that are no longer `Song`s (their own `toString` is gone, so the page shows
`[object Object]`).

---

## 4. Which modules is a student on?

**Project:** [solutions/ch09_challenge_4_modules_for](solutions/ch09_challenge_4_modules_for/)
(from `ch09_project03_course_modules`)

`src/model/Course.ts`
```ts
  // CHALLENGE 4
  /** The modules the student with this id is on, in course order. None for an unknown id. */
  public modulesFor(id: string): Module[] {
    const student = this.getStudent(id);
    if (student === undefined) {
      return [];
    }
    return this.modules.filter((module) => module.isEnrolled(student));
  }
```

`src/report.ts` gains `studentModules(name, modules)` - "Aoife Byrne is on: OOP2, WEB2" or "... is
not on any module" - and `main.ts` turns each student's name into a button that shows it.

Tests (all from `makeCourse()`): Ann, after enrolling on Maths too, is on `["MATH", "PROG"]`; Bob is
on none; `"S9"` gives `[]`; the modules returned are the course's own objects (`assertStrictEquals`
with `moduleOf`).

**Look for:** the decision for an unknown id - `[]` here; throwing is also defensible if the tests
say so. Every test builds its own course; a student who enrols Ann on Maths in one test and expects
it in another has rediscovered the shared fixture bug. The text belongs in `report.ts`, not in
`Course` - the model should not know how the page words things.

---

## 5. A second folder

**Project:** [solutions/ch09_challenge_5_report_folder](solutions/ch09_challenge_5_report_folder/)
(from `ch09_project03_course_modules`)

```text
src/report/
  index.ts      export { courseToCsv } from "./csv.ts";
                export { courseSummary, moduleSummary } from "./summary.ts";
  summary.ts    the old report.ts (its import now starts "../model/")
  csv.ts        courseToCsv
```

`src/report/csv.ts`
```ts
import type { Course } from "../model/index.ts";

const HEADER = "module,id,name";

/** One line per enrolment, module by module: "OOP2,C001,Aoife Byrne". */
export const courseToCsv = (course: Course): string => {
  const lines = [HEADER];
  for (const module of course.getModules()) {
    for (const student of module.getStudents()) {
      lines.push(`${module.code},${student.id},${student.name}`);
    }
  }
  return lines.join("\n");
};
```

`main.ts` and `tests/build_course.test.ts` now import from `./report/index.ts`; the page shows the
CSV in a read-only `<textarea>`.

Tests (`tests/csv.test.ts`): an empty course gives just the header; `makeCourse()` with Bob and Cat
added to Maths gives four lines in module order.

`deno lint --rules-include=verbatim-module-syntax src/` reports no problems.

**Look for:** `import type` in both files in `report/` (they only read the model); the extra `../`
after the move; tests importing through `index.ts` rather than reaching into `csv.ts`. A named
constant for the header. Names containing commas would break the CSV - a good question for the
quick ones (quote the field), not required.

---

## 6. Save and restore

**Project:** [solutions/ch09_challenge_6_save_restore](solutions/ch09_challenge_6_save_restore/)
(from `ch09_project03_course_modules`)

`src/model/Course.ts`
```ts
  // CHALLENGE 6
  public toData(): CourseData {
    return {
      name: this.name,
      students: this.students.map((student) => ({ id: student.id, name: student.name })),
      modules: this.modules.map((module) => ({
        code: module.code,
        title: module.title,
        credits: module.credits,
        studentIds: module.getStudents().map((student) => student.id),
      })),
    };
  }
```

`src/main.ts`: `let course` and `let snapshot: CourseData | null = null`; **Save** sets
`snapshot = course.toData()`, **Restore** sets `course = buildCourse(snapshot)` and re-renders
(disabled until something is saved).

Tests (`tests/save_restore.test.ts`):

- `buildCourse(data).toData()` equals `course.json` itself
- a course rebuilt from `toData()` has equal `toData()`
- after `toData()`, enrolling and withdrawing do not change the saved data
- the restored course's modules and students are not the same objects (`assertNotStrictEquals`)

**Look for:** every array in the result is new (`map`), so the snapshot shares nothing with the
course. A student who writes `studentIds: module.getStudents()...` is fine (that is already a copy);
one who returns a stored array from the course is caught by the third test. Ask why
`structuredClone(course)` is no good: it gives a plain object, not a `Course` - no methods, so
Restore would break the page. Note the new dependency: `Course.ts` now does `import type` from
`data/course_data.ts`. It is a type only, so there is no run-time circle, but some students may
prefer to move the data types into `model/` - a good discussion of which way dependencies should
point.
