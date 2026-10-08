# Chapter 2 - Events: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. Roll a die

**Project:** [solutions/ch02_challenge_1_roll_a_die](solutions/ch02_challenge_1_roll_a_die/)
(from `ch02_project01_coin_toss`)

`src/die.ts`
```ts
const SIDES = 6;

/** 1 to 6, from a random number from 0 up to (not including) 1. */
export function dieFace(random: number): number {
  // Math.floor rounds down: 0 to 0.999... times 6 is 0 to 5.99..., which rounds down to 0 to 5.
  return Math.floor(random * SIDES) + 1;
}
```

`src/main.ts`
```ts
// CHALLENGE 1: a second button, with a listener of its own
function handleRoll(): void {
  if (result !== null) {
    result.textContent = `${dieFace(Math.random())}`;
  }
}

if (rollButton !== null) {
  rollButton.addEventListener("click", handleRoll);
}
```

Tests: 0 → 1, 0.999 → 6, 0.1666 → 1, `1 / 6` → 2.

**Look for:** the random number passed in, as with `coinFace`. A second listener rather than one
listener that does both. `dieFace` returns a `number`, so `main.ts` turns it into a string for
`textContent` (`` `${...}` ``) - assigning the number directly is a type error, a nice small lesson.

---

## 2. Take one away

**Project:** [solutions/ch02_challenge_2_take_one_away](solutions/ch02_challenge_2_take_one_away/)
(from `ch02_project02_click_counter`)

`src/Counter.ts`
```ts
  // CHALLENGE 2
  /** Takes one away from the count - but never goes below zero. */
  public decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }
```

`tests/Counter.test.ts`
```ts
Deno.test("decrement never goes below zero", () => {
  const counter = new Counter();
  counter.decrement();
  assertEquals(counter.getCount(), 0);
});
```

plus a `-1` button and a `handleTake` listener that calls `decrement()` then `render()`.

**Look for:** the rule ("never below zero") in `Counter`, where it is tested - not only in `main.ts`
(disabling the button at zero is a nice extra, but not instead). `render()` called after the change.

---

## 3. Step size

**Project:** [solutions/ch02_challenge_3_step_size](solutions/ch02_challenge_3_step_size/)
(from `ch02_project02_click_counter`)

`src/Counter.ts`
```ts
  // CHALLENGE 3: a default parameter - increment() still adds one
  /** Adds `step` to the count (one, if no step is given). */
  public increment(step: number = 1): void {
    this.count += step;
  }
```

`src/main.ts`
```ts
function handleAdd(): void {
  // CHALLENGE 3: read the step each time, so a new choice takes effect straight away
  const step = stepSelect !== null ? Number(stepSelect.value) : 1;
  counter.increment(step);
  render();
}
```

**Look for:** the existing tests still pass unchanged - that is what the default parameter buys. The
value read inside the listener (reading it once at the top of `main.ts` would freeze the first
choice). `Number(...)` used: without it, TypeScript reports that a `string` is not a `number` -
the type checker catching what in JavaScript would silently turn the count into `"05"`.

---

## 4. Stopwatch

**Project:** [solutions/ch02_challenge_4_stopwatch](solutions/ch02_challenge_4_stopwatch/)
(from `ch02_project03_ticking_clock`)

`src/elapsed.ts`
```ts
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;
const MS_PER_TENTH = 100;

/** For example, 7300 ms is "0:07.3", and 62000 ms is "1:02.0". */
export function formatElapsed(ms: number): string {
  const minutes = Math.floor(ms / MS_PER_MINUTE);
  const seconds = Math.floor(ms / MS_PER_SECOND) % 60;
  const tenths = Math.floor(ms / MS_PER_TENTH) % 10;
  return `${minutes}:${`${seconds}`.padStart(2, "0")}.${tenths}`;
}
```

`src/main.ts`
```ts
let elapsedMs = 0;
let timerId: number | null = null;

function tick(): void {
  elapsedMs += TICK_MS;
  render();
}

function handleStart(): void {
  if (timerId === null) { // already running? then do nothing - a second timer would double the speed
    timerId = setInterval(tick, TICK_MS);
  }
}

function handleReset(): void {
  handleStop();
  elapsedMs = 0;
  render();
}
```

Tests: 0, 7300, 62000, 59900 ("0:59.9"), and 150 ("0:00.1" - parts of a tenth are dropped).

**Look for:** the guard in `handleStart` (pressing Start twice is the classic bug - try it on
solutions without the guard). Reset that also stops. Named constants. **Discussion:** adding 100 ms
per tick drifts - `setInterval` is not exact, and a busy page delays ticks. An accurate stopwatch
records the start time (`Date.now()`) and computes elapsed time from it; a good extension, and a
lesson in what timers promise.

---

## 5. Getting close

**Project:** [solutions/ch02_challenge_5_getting_close](solutions/ch02_challenge_5_getting_close/)
(from `ch02_project04_character_count`)

`src/characters.ts`
```ts
// CHALLENGE 5
const WARNING_BELOW = 20;

/** "over" when there are too many characters, "warning" when fewer than 20 are left, else "ok". */
export function status(left: number): string {
  if (left < 0) {
    return "over";
  }
  if (left < WARNING_BELOW) {
    return "warning";
  }
  return "ok";
}
```

`src/main.ts`
```ts
  counter.className = status(left); // CHALLENGE 5: "ok", "warning" or "over" - see styles.css
```

Tests: 100 → ok, 20 → ok, 19 → warning, 0 → warning, -1 → over.

**Look for:** the edges tested (20/19, 0/-1). The decision in a tested function, the colours in CSS.
Note that `className =` replaces the element's `muted` class from the HTML; the solution gives `.ok`
the muted colour to keep the look.

---

## 6. Ten-second challenge

**Project:** [solutions/ch02_challenge_6_ten_seconds](solutions/ch02_challenge_6_ten_seconds/)
(from `ch02_project02_click_counter`)

`src/Counter.ts`
```ts
  private best: number = 0; // CHALLENGE 6

  /** Ends a round: the count becomes the new best, if it beats it. The count itself is kept. */
  public finishRound(): void {
    if (this.count > this.best) {
      this.best = this.count;
    }
  }

  public getBest(): number {
    return this.best;
  }
```

`src/main.ts`
```ts
const ROUND_LENGTH_MS = 10000; // CHALLENGE 6: 10 seconds, in milliseconds

function startRound(): void {
  counter.reset();
  render();
  if (addButton !== null) {
    addButton.disabled = false;
  }
  if (startButton !== null) {
    startButton.disabled = true;
  }
  setTimeout(endRound, ROUND_LENGTH_MS);
}

function endRound(): void {
  counter.finishRound();
  // ... disable the click button, enable Start, show "Time's up! 23 clicks. Best: 31"
}
```

Tests: best starts at zero; a higher score sets a new best; a lower one does not; `reset()` keeps
the best.

**Look for:** the split - **time** in `main.ts` (it needs the browser's clock), **rules** in
`Counter` (tested, with no waiting). A solution that tests by actually waiting 10 seconds has missed
the point; Book 2 (Chapter 3) returns to this. The Start button disabled during a round (otherwise a second
timer starts and the round ends early - a good bug to discuss).
