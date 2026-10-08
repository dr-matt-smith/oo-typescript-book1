# Chapter 6 - Encapsulation: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. Tidy names

**Project:** [solutions/ch06_challenge_1_tidy_names](solutions/ch06_challenge_1_tidy_names/)
(from `ch06_project01_pet`)

`src/Pet.ts`
```ts
const MAX_NAME_LENGTH = 20; // CHALLENGE 1

  /** Gives back the tidied name if it is allowed; throws an Error if it is blank or too long. */
  private checkName(name: string): string {
    const tidy = name.trim();
    if (tidy === "") {
      throw new Error("A pet needs a name");
    }
    if (tidy.length > MAX_NAME_LENGTH) {
      throw new Error(`A name can have at most ${MAX_NAME_LENGTH} characters`);
    }
    return tidy;
  }
```

Tests: `"  Max  "` is stored as `"Max"`; the constructor tidies too; exactly 20 characters allowed;
21 refused with the old name kept; 20 characters plus surrounding spaces allowed; the constructor
refuses 21 (`"a".repeat(21)` makes long names easily).

**Look for:** the change made **once**, in `checkName`, and the constructor and `setName` both
getting it for free - the payoff of the chapter's refactor. The helper now *returns* a different
value from the one it was given, which is why it was written to return the name rather than just
check it. Trim before measuring (otherwise `" Rex "` padded to 21 is refused). Edge tests at 20 and
21. A named constant used in the message as well as the check.

---

## 2. Fahrenheit too

**Project:** [solutions/ch06_challenge_2_fahrenheit](solutions/ch06_challenge_2_fahrenheit/)
(from `ch06_project03_thermostat`)

`src/Thermostat.ts`
```ts
  /** The target in Fahrenheit: 20 °C is 68 °F. Read-only. */
  public get targetFahrenheit(): number {
    return this.#target * 9 / 5 + 32;
  }
```

`src/main.ts` shows `thermostat.targetFahrenheit.toFixed(1)` in a new `#fahrenheit` paragraph.

Tests: 20 °C is 68 °F; after `up()` it is about 68.9 (`assertAlmostEquals` - 20.5 * 9 / 5 + 32
happens to be exact here, but students should reach for it with calculated decimals, Chapter 3); 5
and 30 °C give 41 and 86.

**Look for:** the written answer. **No field**: a stored Fahrenheit value would have to be updated
by the setter, `up()` and `down()`, and would one day be forgotten - the same argument as `heating`.
**No setter**: it would be a second way to set the target, and would need its own copy of the range
and half-degree rules (in Fahrenheit, half a Celsius degree is 0.9 °F, so "half degrees" does not
even translate neatly). Students who add a setter that converts and calls the Celsius setter have
avoided the copy - accept it, but ask what `thermostat.targetFahrenheit = 70` should do (70 °F is
21.11 °C: refused).

---

## 3. An overdraft

**Project:** [solutions/ch06_challenge_3_overdraft](solutions/ch06_challenge_3_overdraft/)
(from `ch06_project02_bank_account`)

`src/BankAccount.ts`
```ts
  public readonly overdraftLimit: number;

  constructor(public readonly owner: string, public readonly accountNumber: string, overdraftLimit: number = 0) {
    if (!Number.isInteger(overdraftLimit) || overdraftLimit < 0) {
      throw new Error(`An overdraft limit must be a whole number of cents, 0 or more (not ${overdraftLimit})`);
    }
    this.overdraftLimit = overdraftLimit;
  }
  // ... in withdraw:
    if (cents > this.#balance + this.overdraftLimit) { // CHALLENGE 3
```

`src/money.ts` changes `formatEuro` so that -500 is `"-€5.00"` rather than `"€-5.00"`, with a test.
`main.ts` makes the account with a €100 limit, shows the limit, and colours an overdrawn balance red.

Tests: every original test passes unchanged (no limit given = no overdraft); with a €100 overdraft,
withdrawing 12000 from 2000 leaves -10000; 12001 is refused with the balance unchanged; deposits
into an overdrawn account; a negative or fractional limit refused by the constructor.

**Look for:** a default parameter (Chapter 5) so that old code and old tests are untouched. The
limit is **checked** in the constructor, so it cannot be a parameter property - the chapter's note
about parameter properties skipping validation, met in practice. `readonly`: the limit cannot be
changed after opening (students who want a `set overdraftLimit` must think about what happens if
the new limit is lower than the current overdraft - a good discussion). The new invariant: *the
balance is a whole number of cents, and never below minus the overdraft limit*.

---

## 4. Transfers

**Project:** [solutions/ch06_challenge_4_transfers](solutions/ch06_challenge_4_transfers/)
(from `ch06_project02_bank_account`)

`src/BankAccount.ts`
```ts
  public transferTo(other: BankAccount, cents: number): void {
    if (other === this) {
      throw new Error("Cannot transfer money to the same account");
    }
    this.withdraw(cents);
    other.deposit(cents);
  }
```

`main.ts` adds a second account (Ben) shown in its own card, and "Transfer to Ben" / "Transfer to
Aoife" buttons that go through the existing `attempt` helper.

Tests: a transfer moves the money; a transfer of more than the balance is refused and **both**
balances are unchanged; a bad amount is refused and both unchanged; a transfer to the same account
is refused.

**Look for:** the order. `withdraw` is the step that can be refused, and it changes nothing when it
is; once it has worked the amount is known to be good, so `deposit` cannot fail. In the other order,
the "neither balance changes" test is red - checked: with `other.deposit` first, the receiving
account ends up with 2501 instead of 500, money made out of nothing. The answer to the hint's
question: `other.#balance` *is* allowed (privacy is per class, as in Java), but it is not needed -
and reusing `withdraw` and `deposit` keeps every rule in one place. A student who writes
`this.#balance -= cents; other.#balance += cents;` has bypassed the checks; ask them which tests
would catch it. `other === this` uses identity (`===` on objects), previewing Chapter 9.

---

## 5. Pet, the TypeScript way

**Project:** [solutions/ch06_challenge_5_pet_accessors](solutions/ch06_challenge_5_pet_accessors/)
(from `ch06_project01_pet`)

`src/Pet.ts`
```ts
export class Pet {
  #name: string;
  #age: number;
  #hungry: boolean = false;

  constructor(name: string, public readonly species: string, age: number = DEFAULT_AGE) {
    this.#name = this.#checkName(name);
    this.#age = this.#checkAge(age);
  }

  public get name(): string {
    return this.#name;
  }

  public set name(name: string) {
    this.#name = this.#checkName(name);
  }
  // ... age the same way; get hungry(); haveBirthday, play, feed unchanged
```

Tests change first: `pet.getAge()` becomes `pet.age`, `pet.setName("Max")` becomes
`pet.name = "Max"`, and refusals become `assertThrows(() => { pet.age = -1; }, Error, "...")`. Run
against the old class, the new tests do not compile - and the error is a nice surprise:
`Property 'age' is private and only accessible within class 'Pet'.` (17 such errors, for `age`,
`name`, `hungry` and `species`) - the old private fields already had those names.

**Look for:** `#` fields solving the naming clash (with `private`, students end up with
`_name`); `species` as a public readonly parameter property - no rule, never changes, so no
accessor is needed; `hungry` read-only (no setter), changed only by `play()`/`feed()`; actions kept
as methods. Braces in the `assertThrows` arrows. In `main.ts`, the rename is now an assignment
inside `try`. The discussion: most students find `pet.age` neater; some find `setAge` clearer because
it *looks* like it might fail. Both are defensible - that is the point.

---

## 6. Holiday mode

**Project:** [solutions/ch06_challenge_6_holiday](solutions/ch06_challenge_6_holiday/)
(from `ch06_project03_thermostat`)

`src/Thermostat.ts`
```ts
const FROST_TARGET = 7;

  #target: number = START_TARGET;
  #holiday: boolean = false;

  public get target(): number {
    return this.#holiday ? FROST_TARGET : this.#target;
  }

  public set target(celsius: number) {
    if (this.#holiday) {
      throw new Error(`The thermostat is on holiday: the target stays at ${FROST_TARGET} °C`);
    }
    // ... the range and half-degree checks as before
  }

  public startHoliday(): void { this.#holiday = true; }
  public endHoliday(): void { this.#holiday = false; }
  public isOnHoliday(): boolean { return this.#holiday; }
  // heating now compares with this.target (the target in force), not this.#target
```

`main.ts` adds a Start/End holiday button, disables -, + and Set during a holiday (so the user is
not offered things that will be refused), and shows "On holiday: frost protection only".

Tests: not on holiday at first; on holiday the target is 7 and heating uses 7; setting the target,
`up()` and `down()` each refused (a `t.step` each) with the target still 7; after the holiday the
target is back to 21; starting twice then ending once restores 21; ending a holiday that never
started changes nothing.

**Look for:** `#target` never changes during the holiday, so there is nothing to save or restore -
the getter simply chooses. Students often add a `#savedTarget` and copy values in and out; it
works, but ask what happens if `startHoliday()` is called twice (the saved value is overwritten
with 7, and the user's target is lost - the "twice" test catches it). The holiday check in the
**setter** only: `up()` and `down()` go through the setter, so they are refused without any extra
code - the payoff of "the class uses its own setter". `heating` must change to `this.target`; a
solution that leaves `this.#target` fails the frost test. Disabling buttons is the page's job; the
class still refuses, in case some other code tries.
