# Chapter 5 - Classes, objects and constructors: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all (JSON files cannot hold comments, so changes to `.json` data are listed
below instead). Every solution builds with all tests passing, 0 type errors and 0 lint warnings.

---

## 1. Initials

**Project:** [solutions/ch05_challenge_1_initials](solutions/ch05_challenge_1_initials/)
(from `ch05_project01_student_cards`)

`src/Student.ts`
```ts
  // CHALLENGE 1
  /** The first letter of the first name and of the surname, e.g. "AL" for Ada Lovelace. */
  public getInitials(): string {
    return `${this.firstName.charAt(0)}${this.surname.charAt(0)}`;
  }
```

`src/main.ts` adds a `div.initials` to each card; `public/styles.css` makes it a circle.

Tests: "AL" for Ada Lovelace; "TB" for Tim Berners-Lee. Run before the method exists, both fail with
`TypeError: student.getInitials is not a function` (and a type error).

**Look for:** a method on `Student`, not initials worked out in `main.ts` from `getFullName()`
(splitting the full name on spaces works, but goes the long way round, and breaks for a first name
with a space in it). `charAt(0)` or `[0]` - both fine. The hyphen test passes without any special
code, which is the point: a test that passes straight away still records a promise.

---

## 2. Critical roll

**Project:** [solutions/ch05_challenge_2_critical](solutions/ch05_challenge_2_critical/)
(from `ch05_project02_die`)

`src/Die.ts`
```ts
  // CHALLENGE 2
  /** True when the die shows its highest number - a 20 on a d20. False if it has not been rolled. */
  public isMaximum(): boolean {
    return this.value === this.sides;
  }
```

`src/main.ts`
```ts
    face.classList.toggle("maximum", die.isMaximum()); // CHALLENGE 2
```

and " - Maximum!" after the description.

Tests: a d20 rolled with `ALMOST_ONE` (20) is a maximum; rolled with 0.9 (19) is not; an unrolled die
is not.

**Look for:** the unrolled case. `null === 20` is `false`, so no `if` is needed - but students
should have *tested* it rather than assumed it. Choosing the "random" numbers for 19 and 20 means
working the formula backwards (`floor(0.9 * 20) + 1 = 19`) - good practice in reading their own
code. `classList.toggle(name, condition)` from Chapter 2.

---

## 3. Who teaches it?

**Project:** [solutions/ch05_challenge_3_lecturer](solutions/ch05_challenge_3_lecturer/)
(from `ch05_project03_module_list`)

`src/Module.ts`
```ts
    private semester?: number, // optional: undefined means the module runs all year
    // CHALLENGE 3: last, because it is optional - and after semester, so old calls still work
    private lecturer?: string,
```

```ts
  public toString(): string {
    const summary = `${this.code} ${this.title} (${this.credits} credits)`;
    // CHALLENGE 3
    if (this.lecturer === undefined) {
      return summary;
    }
    return `${summary} - taught by ${this.lecturer}`;
  }
```

`src/modules.ts` adds `lecturer?: string` to `ModuleData` and passes `d.lecturer` to the
constructor. `src/modules.json` gives a lecturer to COMP1001, COMP1005 and COMP1010 (not marked: JSON
has no comments).

Tests: `toString` with and without a lecturer; a year-long module with a lecturer (which needs
`undefined` for the semester); a lecturer in the data reaching the module.

**Look for:** the answer to "where must it go, and why?": at the end. It is optional, so it cannot
come before a required parameter, and putting it before `semester` would silently change the meaning
of every existing `new Module(code, title, credits, semester)` call - the type checker would catch
`number` vs `string` here, but not if both were strings. The old `toString` tests still pass, which
shows nothing was broken. Some students will spot the `undefined` in `new Module("COMP1010", "Team
Project", 10, undefined, "Dr Okafor")` and find it ugly - a lead-in to Challenge 6.

---

## 4. Enough credits?

**Project:** [solutions/ch05_challenge_4_credit_check](solutions/ch05_challenge_4_credit_check/)
(from `ch05_project03_module_list`)

`src/modules.ts`
```ts
// CHALLENGE 4
/** A full-time year is worth this many credits. */
const FULL_YEAR_CREDITS = 60;

/** "60 credits - complete", "55 credits - 5 short" or "65 credits - 5 over". The target is 60 unless given. */
export const creditCheck = (modules: Module[], target: number = FULL_YEAR_CREDITS): string => {
  const total = totalCredits(modules);
  if (total < target) {
    return `${total} credits - ${target - total} short`;
  }
  if (total > target) {
    return `${total} credits - ${total - target} over`;
  }
  return `${total} credits - complete`;
};
```

`src/main.ts` shows `creditCheck(MODULES)` in a new `#check` paragraph when the whole year is shown
(the chapter's data makes exactly 60: "60 credits - complete").

Tests: 60, 55 and 65 credits; a part-time target of 30 (complete and 10 short); no modules at all
("0 credits - 60 short"). A small test helper, `fiveCreditModules(count)`, makes lists that add up to
any multiple of 5 - Chapter 4's "helper functions instead of `beforeEach`".

**Look for:** `totalCredits` reused; `60` as a named constant; a default parameter in a plain
function. The test helper (or something like it) rather than long hand-written arrays in every
test. Students may compute `Math.abs(total - target)` - fine, if the "short"/"over" choice is still
right. Ask why the check is hidden for one semester (a year-long module counts in both semesters, so
semester totals do not add up to the year).

---

## 5. A cup of dice

**Project:** [solutions/ch05_challenge_5_dice_cup](solutions/ch05_challenge_5_dice_cup/)
(from `ch05_project02_die`)

`src/DiceCup.ts`
```ts
export class DiceCup {
  private dice: Die[] = [];

  constructor(count: number, private sides: number = DEFAULT_SIDES) {
    // count is a plain parameter, not a field: once the dice are made, the array's length says it.
    for (let i = 0; i < count; i++) {
      this.dice.push(new Die(sides));
    }
  }

  public roll(random: () => number): number {
    return this.dice.reduce((total, die) => total + die.roll(random()), 0);
  }
  // ... toString(): "2d6: 3 + 5 = 8", or "2d6 (not rolled yet)"
}
```

`tests/DiceCup.test.ts`
```ts
/** A fake for Math.random: each call returns the next number from the list. */
const randomFrom = (numbers: number[]): () => number => {
  let next = 0;
  return () => {
    const value = numbers[next];
    next++;
    return value;
  };
};
```

`src/main.ts` replaces the `Die` with a `DiceCup`, adds a "Dice" drop-down, and rolls with
`cup.roll(Math.random)`.

Tests: the fake itself; default and chosen sides (through `toString`); totals of two and three dice;
a one-die cup; `toString` after a roll.

**Look for:** a constructor that does real work (making the dice) - so the class mixes an ordinary
field (`dice`), a plain parameter (`count`) and a parameter property (`sides`). Reuse of `Die`, not
the rolling formula copied. Passing `Math.random` **without brackets** - the function, not a number;
it is safe here because `Math.random` does not use `this` (contrast Chapter 3's `this` trap). The
fake random function is a closure (Chapter 3) and a first **test double**, which Book 2 Chapter 8
develops. A student who designs `roll(random: number)` and hands the same number to every die gets
the same value on every die - the tests with a different number per die catch that.

---

## 6. Too many arguments

**Project:** [solutions/ch05_challenge_6_options_object](solutions/ch05_challenge_6_options_object/)
(from `ch05_project01_student_cards`)

`src/Student.ts`
```ts
export type StudentData = {
  id: number;
  firstName: string;
  surname: string;
  course?: string;
  year?: number;
  nickname?: string;
  email?: string;
};

export class Student {
  private id: number;
  // ... firstName, surname, course, year, nickname?, email?

  constructor(data: StudentData) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.surname = data.surname;
    // The defaults: a missing property reads as undefined, so it is replaced here.
    this.course = data.course === undefined ? DEFAULT_COURSE : data.course;
    this.year = data.year === undefined ? DEFAULT_YEAR : data.year;
    this.nickname = data.nickname;
    this.email = data.email;
  }
```

`src/students.ts`
```ts
export const studentsFrom = (data: StudentData[]): Student[] => data.map((d) => new Student(d));
```

`StudentData` moved into `Student.ts`, beside the class whose constructor uses it. `toString()`
adds ", year 2"; the cards show the year. `src/students.json` gives years to Alan Turing and Grace
Hopper, and an email to Margaret Hamilton (not marked: JSON has no comments).

Tests: every existing test rewritten as `new Student({ id: 101, firstName: "Ada", ... })`; the old
`undefined`-in-the-middle test becomes "a nickname can be given without a course"; year default and
given; email given and missing; `toString` with the year.

**Look for:** the tests reading better - every value is named, and any optional one can be left out
without `undefined` placeholders. The trade-offs, in discussion: parameter properties are gone (more
lines in the class); the compiler still insists on `id`, `firstName` and `surname` (try leaving one
out: `Property 'surname' is missing in type '{ id: number; firstName: string; }' but required in type
'StudentData'.`); a typo such as `yaer: 2` in an object literal is still caught (`Object literal may
only specify known properties, and 'yaer' does not exist in type 'StudentData'.`). Students who know JavaScript may use destructuring with defaults
(`constructor({ id, course = DEFAULT_COURSE, ... }: StudentData)`) - neat, but not yet taught; accept
it if they can explain it. Some will keep the long positional constructor and add a second
"from data" function - also a reasonable design to discuss.
