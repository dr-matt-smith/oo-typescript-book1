# Chapter 1 - Introduction: challenge solutions

Each solution (except Challenge 3, a written exercise) is a complete project in
[solutions/](solutions/), made from the chapter project the challenge starts from. Every change is
marked with a `CHALLENGE n` comment, so a search for `CHALLENGE` finds them all. Every solution
builds with all tests passing, 0 type errors and 0 lint warnings.

The in-chapter **exercises** (1.1-1.5) have their answers in the chapter itself, and in the next
project.

---

## 1. Make it yours

**Project:** [solutions/ch01_challenge_1_make_it_yours](solutions/ch01_challenge_1_make_it_yours/)
(from `ch01_project07_hello_page`)

`src/main.ts`
```ts
const NAME = "Ada"; // CHALLENGE 1: my own name
```

`src/facts.ts`
```ts
  "A file can contain plain functions - they do not have to be inside a class.", // CHALLENGE 1
```

and new values for `--bg`, `--accent` and `--accent-dark` in `public/styles.css`.

**The question:** the heading says "6 things" because `main.ts` writes `FACTS.length` into it: the
page is computed from the data, not typed in by hand.

**Look for:** changes in `src/` and `public/`, not `dist/`.

---

## 2. Good night

**Project:** [solutions/ch01_challenge_2_good_night](solutions/ch01_challenge_2_good_night/)
(from `ch01_project07_hello_page`)

`src/greeting.ts`
```ts
const NIGHT_STARTS = 22; // CHALLENGE 2

export function partOfDay(hour: number): string {
  if (hour >= MORNING_STARTS && hour < AFTERNOON_STARTS) {
    return "morning";
  }
  if (hour >= AFTERNOON_STARTS && hour < EVENING_STARTS) {
    return "afternoon";
  }
  // CHALLENGE 2: evening now stops at NIGHT_STARTS; everything else (22-23 and 0-4) is night
  if (hour >= EVENING_STARTS && hour < NIGHT_STARTS) {
    return "evening";
  }
  return "night";
}
```

plus a `partOfDay(2)` line, `"night"`, added to the doc comment's example, and six tests: 2 is night, 22 is night, 21 is evening, 4 is night, 5 is morning, and the full
greeting at 23.

**Look for:** the first test seen failing before the code changed (ask what the failure said). Tests
on **both sides** of each boundary. A named constant rather than a bare `22`. A common wrong answer
is `if (hour >= 22 || hour < 5) return "night";` placed *after* the evening check - it never runs
for 22 and 23, and the edge tests catch it.

---

## 3. Break it on purpose

No project - a written exercise. Expected answers:

| Mistake | Where it shows | Message |
|---|---|---|
| `const hour: number = "nine";` | console (type check) and report: 1 type error. The page still builds - the bundler ignores types - and says "Good evening" (every comparison with `"nine"` is false) | `TS2322: Type 'string' is not assignable to type 'number'.` |
| `let unused = 1;` | console summary line and report: 2 lint warnings | `no-unused-vars`: "`unused` is never used"; `prefer-const`: "`unused` is never reassigned" |
| `AFTERNOON_STARTS` changed to `13` | **nowhere** - every test still passes (the tests check hours 9, 14 and 20, not 12). The page says "Good morning" at 12:30 | none |
| `"#facts"` changed to `"#fact"` | **nowhere** - the list is just empty | none |

Two discussion points:

- **Item 3** is a trap worth springing: project 7's tests check hours 9, 14 and 20, so moving the
  afternoon to 13 breaks nothing they test. The page says "Good morning" at 12:30, and no test
  notices. That is exactly why Challenge 2 asks for edge tests - add `partOfDay(12)` and it fails.
- **Item 4** is caught by nothing: `querySelector` returning `null` is legal, the `if` quietly skips
  the list, and no test looks at the page. Ways to find it: look at the page; the browser's
  developer tools; or make `main.ts` fail loudly when an element is missing (Chapter 7 shows a small
  helper that throws an error naming the missing id).

---

## 4. Seniors

**Project:** [solutions/ch01_challenge_4_seniors](solutions/ch01_challenge_4_seniors/)
(from `ch01_project04_age_groups`)

`src/age_group.ts`
```ts
const YOUNGEST_SENIOR = 65; // CHALLENGE 4
// ...
  if (age <= OLDEST_TEENAGER) {
    return "teenager";
  }
  // CHALLENGE 4
  if (age >= YOUNGEST_SENIOR) {
    return "senior";
  }
  return "adult";
```

New tests: 70 is a senior, 64 is still an adult, 65 is a senior. The doc comment's example gains
`assertEquals(ageGroup(70), "senior");`, so the documentation shows every group.

**The failing test:** "150 is still an adult" now fails - 150 is a senior. It was really testing the
**top edge of the valid ages**, so the solution renames it to "150 is still a senior" rather than
deleting it.

**Look for:** the red step seen first; the existing test fixed to keep its purpose (deleting it
loses the check on 150); a named constant.

---

## 5. Planets with facts

**Project:** [solutions/ch01_challenge_5_planets_with_facts](solutions/ch01_challenge_5_planets_with_facts/)
(from `ch01_project06_list_from_json`)

`src/planets.json`
```json
[
  { "name": "Mercury", "fact": "the smallest planet, and the closest to the Sun" },
  { "name": "Venus", "fact": "the hottest planet, hidden under thick clouds" },
  ...
]
```

`src/main.ts`
```ts
// CHALLENGE 5: each planet is now an object with a name and a fact, so the type says so.
const PLANETS: { name: string; fact: string }[] = planets;
// ...
    // CHALLENGE 5: innerHTML, so the <b> tags make the name bold
    item.innerHTML = `<b>${planet.name}</b> - ${planet.fact}`;
```

Tests updated to `planets[0].name`, plus "every planet has a fact".

**Look for:** the tests changed **first** - with the old tests, changing the JSON breaks "the planets
are in order" (comparing an object with `"Mercury"`), which is a useful red. The type written out.
Students may ask about `innerHTML` versus `textContent`: `innerHTML` treats the string as HTML,
which is fine for our own data and dangerous for anything a user typed - a point for Chapter 7.

---

## 6. Day and night colours

**Project:** [solutions/ch01_challenge_6_day_and_night](solutions/ch01_challenge_6_day_and_night/)
(from `ch01_project07_hello_page`)

`src/theme.ts`
```ts
const DAY_STARTS = 7;
const NIGHT_STARTS = 19;

/**
 * "day" from 7:00 to 18:59, and "night" otherwise.
 *
 * @example
 * ```ts
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(themeFor(12), "day");
 * assertEquals(themeFor(23), "night");
 * ```
 */
export function themeFor(hour: number): string {
  if (hour >= DAY_STARTS && hour < NIGHT_STARTS) {
    return "day";
  }
  return "night";
}
```

`src/main.ts`
```ts
// CHALLENGE 6: the page's class chooses its colours - see body.day and body.night in styles.css
document.body.className = themeFor(hour);
```

`public/styles.css`
```css
body.day { --bg: #fffbea; --accent-dark: #9a4d00; }
body.night { --bg: #16191f; --card: #1f232b; --text: #e8eaed; --muted: #9aa3ad; --accent-dark: #a8dadc; --line: #333a45; }
```

Six tests, including 6/7 and 18/19, and a doc comment example with one day and one night hour.

**Look for:** the decision in a tested function, not an `if` in `main.ts`. The edges (6/7, 18/19)
in the test file, not crammed into the example. The CSS overriding the
variables rather than rewriting every rule. The hint's point: you do not need to stay up late to
know the night theme is chosen - the tests say so (though checking the CSS once by temporarily
setting `hour = 23` is reasonable).
