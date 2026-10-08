# Chapter 11 - Inheritance: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. A cow

**Project:** [solutions/ch11_challenge_1_cow](solutions/ch11_challenge_1_cow/)
(from `ch11_project01_animals`)

`src/Cow.ts`
```ts
export class Cow extends Animal {
  public override getSound(): string {
    return "Moo";
  }

  public override toString(): string {
    return `${this.name}, a cow`;
  }
}
```

`main.ts` adds an "Add a cow" button, written like the cat and dog ones.

Tests (`tests/cow.test.ts`): says Moo; `speak()` gives "Daisy says Moo"; `toString`; is an `Animal`;
joins the `chorus` with a cat.

**Look for:** the tests written first - with `Cow.ts` missing, the report says the tests could not
run, which is a red of its own. No constructor in `Cow` (it inherits `Animal`'s). `override` on both
methods. Nothing in `Animal`, `farm.ts` or the other tests had to change.

---

## 2. A technician

**Project:** [solutions/ch11_challenge_2_technician](solutions/ch11_challenge_2_technician/)
(from `ch11_project02_staff`)

`src/Technician.ts`
```ts
export class Technician extends Person {
  constructor(name: string, email: string, private readonly lab: string) {
    super(name, email);
  }
  // ... getLab()

  public override getRole(): Role {
    return "Technician";
  }

  public override toString(): string {
    return `${super.toString()}, technician, lab ${this.lab}`;
  }
}
```

`Person.ts`: `"Technician"` added to the `Role` union. `directory.ts`: a `technicians` list in
`DirectoryData`, mapped to `Technician` objects. `people.json` has two technicians (JSON has no
comments, so that change is not marked). A Technicians filter button and an orange badge.

Tests: role, lab, `toString`, the inherited email check (`assertThrows`), `instanceof Person`; the
directory tests updated for one technician more, and `withRole(..., "Technician")`.

**Look for:** `super(name, email)` with only the new field as a parameter property; `super.toString()`
rather than repeating `Person`'s format. Adding `"Technician"` to `Role` *before* writing the class -
the type error in `getRole()` then points the way. The existing directory tests fail until
`DirectoryData` and the test data agree (TypeScript complains that `technicians` is missing).

---

## 3. Legs

**Project:** [solutions/ch11_challenge_3_legs](solutions/ch11_challenge_3_legs/)
(from `ch11_project01_animals`)

`src/Animal.ts`
```ts
  // CHALLENGE 3: a second parameter, legs. Each subclass now has to say how many.
  constructor(protected readonly name: string, private readonly legs: number) {}

  // CHALLENGE 3
  public getLegs(): number {
    return this.legs;
  }
```

`src/Cat.ts` (and `Dog.ts` the same)
```ts
const CAT_LEGS = 4; // CHALLENGE 3

export class Cat extends Animal {
  // CHALLENGE 3: Animal's constructor now needs the legs, so Cat needs a constructor of its own.
  constructor(name: string) {
    super(name, CAT_LEGS);
  }
```

and a new `Bird` with `super(name, BIRD_LEGS)` (2), saying "Tweet". The page shows "(4 legs)" after
each animal, and has an "Add a bird" button.

Tests (`tests/legs.test.ts`): a cat and a dog have 4, a bird has 2; a bird's `speak()` and `toString()`.

**Look for:** the answer to "do the old tests still pass without changes?" - **yes**: `new Cat("Tom")`
still takes one argument, because `Cat`'s new constructor supplies the legs. This is the moment
students see why a subclass that inherits its constructor is fragile: the instant `Animal` gained a
parameter, `new Cat("Tom")` would have been a type error (`Expected 2 arguments, but got 1`) until
`Cat` got its own constructor. `legs` is `private` (no subclass needs it), not `protected`. Named
constants, not a bare `4`.

---

## 4. A student account

**Project:** [solutions/ch11_challenge_4_student_account](solutions/ch11_challenge_4_student_account/)
(from `ch11_project03_bank_accounts`)

`src/StudentAccount.ts`
```ts
const STUDENT_OVERDRAFT_LIMIT = 50;
const MAX_SINGLE_WITHDRAWAL = 200;

export class StudentAccount extends CurrentAccount {
  constructor(owner: string) {
    super(owner, STUDENT_OVERDRAFT_LIMIT);
  }

  public override getKind(): string {
    return "Student account";
  }

  public override withdraw(amount: number): void {
    if (amount > MAX_SINGLE_WITHDRAWAL) {
      throw new Error(`A student account allows at most ${formatEuro(MAX_SINGLE_WITHDRAWAL)} at a time`);
    }
    super.withdraw(amount);
  }
}
```

`tests/student.test.ts` starts with `testAccountRules("StudentAccount", (owner) => new StudentAccount(owner));`
then: €50 overdraft, not €51, over €200 refused (balance unchanged), exactly €200 allowed,
`isOverdrawn()` inherited. A third card on the page.

**Look for:** the limit is **not** in `available()` - "how much may I take in one go" is a different
question from "how much is there". If a student puts `Math.min(..., 200)` in `available()` it works
here, but the error message then says "Not enough money: €200.00 available" when there is €500,
which is misleading - a good discussion. `super.withdraw(amount)` so the shared rules still run: if
it is replaced by `this.balance -= amount`, the shared tests "a withdrawal of zero or less is
rejected" and "no more than what is available can be withdrawn" go red (see the live demo in the
teacher notes). Three levels: `BankAccount` -> `CurrentAccount` -> `StudentAccount`, with
`super(owner, 50)` reaching `CurrentAccount`'s constructor.

---

## 5. Three levels deep

**Project:** [solutions/ch11_challenge_5_phd_student](solutions/ch11_challenge_5_phd_student/)
(from `ch11_project02_staff`)

`src/PhdStudent.ts`
```ts
export class PhdStudent extends Student {
  constructor(name: string, email: string, studentId: string, course: string, private readonly module: string) {
    // Student's constructor needs four arguments; it passes name and email on to Person's.
    super(name, email, studentId, course);
  }
  // ... getModule()

  public override toString(): string {
    // super.toString() is Student's, which itself starts with Person's.
    return `${super.toString()}, teaches ${this.module}`;
  }
}
```

`directory.ts` and `people.json` gain a `phdStudents` list.

Tests (`tests/phd.test.ts`): the three-level `toString`; getters from all three classes; role
`"Student"` (inherited, not overridden); `instanceof Student` and `instanceof Person`, and the email
check, in one test. A directory test checks PhD students are found by `withRole(..., "Student")`.

**Look for:** `super(...)` passes four arguments - `PhdStudent` talks to `Student`, never to
`Person` directly. Only `module` is a parameter property. `super.toString()` chains through both
superclasses. No `getRole()` override: a PhD student shows under "Students", which is a reasonable
choice to discuss (should they appear under Lecturers too? A single role cannot say "both" - a hint
that roles might be better as composition).

---

## 6. Month end

**Project:** [solutions/ch11_challenge_6_month_end](solutions/ch11_challenge_6_month_end/)
(from `ch11_project03_bank_accounts`)

`src/BankAccount.ts`
```ts
  // CHALLENGE 6
  /** What happens to this account at the end of each month. Each kind of account decides. */
  public abstract monthEnd(): void;
```

`src/SavingsAccount.ts`
```ts
  public override monthEnd(): void {
    this.balance = roundToCent(this.balance * (1 + this.interestRate / 100 / MONTHS_PER_YEAR));
  }
```

`src/CurrentAccount.ts`
```ts
  public override monthEnd(): void {
    if (this.isOverdrawn()) {
      this.balance -= OVERDRAWN_FEE;
    }
  }
```

`main.ts` keeps `const accounts: BankAccount[] = [savings, current];` and the End of month button loops
over it calling `account.monthEnd()`.

Tests: a new shared rule in `account_rules.ts`, "month end on a new, empty account leaves it at
zero", so both subclasses (and any future one) get it; savings: €1000 at 6% gains €5, rounding to the
cent (€100 at 2% gives €100.17); current: overdrawn by €30 becomes -€35, in credit is unchanged, and
the fee may go past the overdraft (-€100 becomes -€105).

**Look for:** the answer to the hint - adding the abstract method first makes **every** subclass a
type error at once (`TS2515 ... does not implement inherited abstract member monthEnd from class
'BankAccount'`): the compiler lists exactly what is left to do. The fee changes `balance` directly,
not through `withdraw` (which would refuse it at the limit). The button loop is polymorphism - one
call, two behaviours - the subject of Book 2 Chapter 1.
