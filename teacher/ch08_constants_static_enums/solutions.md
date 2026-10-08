# Chapter 8 - Constants, static and enums: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. What should drivers do?

**Project:** [solutions/ch08_challenge_1_instructions](solutions/ch08_challenge_1_instructions/)
(from `ch08_project01_traffic_light`)

`src/light_colour.ts`
```ts
// CHALLENGE 1
/** What a driver should do when the light shows this colour. */
export const instruction = (colour: LightColour): string => {
  switch (colour) {
    case "red":
      return "Stop";
    case "red-amber":
      return "Stop - get ready to go";
    case "green":
      return "Go if the way is clear";
    case "amber":
      return "Stop unless it is unsafe to do so";
  }
};
```

Tests: one per colour, plus a loop over `LIGHT_COLOURS` checking each has an instruction. `main.ts`
shows it in a new `#instruction` paragraph.

**Look for:** a written return type and no `default` - ask the student to delete a case and read the
`TS2366` error. Tests written before the function (a student who writes the function first usually
copies its strings into the tests, which tests nothing).

---

## 2. A new diet

**Project:** [solutions/ch08_challenge_2_pescatarian](solutions/ch08_challenge_2_pescatarian/)
(from `ch08_project02_menu_order`)

`src/diet.ts`
```ts
export const DIETS = ["vegan", "vegetarian", "pescatarian", "meat"] as const; // CHALLENGE 2

export const suits = (dish: Diet, eater: Diet): boolean => {
  switch (eater) {
    case "vegan":
      return dish === "vegan";
    case "vegetarian":
      // CHALLENGE 2: was `dish !== "meat"`, which compiled - and would have served fish to vegetarians.
      return dish === "vegan" || dish === "vegetarian";
    case "pescatarian": // CHALLENGE 2
      return dish !== "meat";
    case "meat":
      return true;
  }
};
```

Adding the value to `DIETS` immediately gives two `TS2366` errors - in `dietLabel` and `suits` - so
the compiler finds both switches. Five existing tests also fail: the three `suits` tests and the
labels test (their expected arrays now need four entries), and "a string that is not a diet is
rejected", which used `"pescatarian"` as its example of a non-diet (now `"fruitarian"`). New tests:
what a pescatarian eats, and "a vegetarian does not eat fish". `menu.json` marks Fish and chips as
pescatarian (JSON has no comments, so that change is not marked), `FILTERS` in `main.ts` gets
`"pescatarian"`, and `styles.css` gets `.diet-pescatarian`.

**Look for:** the point of the challenge is the code the compiler *cannot* check. The old vegetarian
rule, `dish !== "meat"`, is still type-correct after the change, but now lets fish through; only the
test "a vegetarian does not eat fish" catches it. The CSS class is another place nothing checks -
without it, pescatarian labels are white text on the white card - invisible. Ask: "how would you have found these
without tests?"

---

## 3. Back to the start

**Project:** [solutions/ch08_challenge_3_wrap_around](solutions/ch08_challenge_3_wrap_around/)
(from `ch08_project03_ticket_numbers`)

`src/Ticket.ts`
```ts
  /** CHALLENGE 3: the largest number that fits in DIGITS digits - 999. After it, numbering starts at 1. */
  public static readonly LARGEST = 10 ** Ticket.DIGITS - 1;

  // CHALLENGE 3: the numbers now go round, so nextNumber - 1 is no longer the count. Keep a count too.
  private static issued = 0;

  constructor() {
    this.number = Ticket.nextNumber;
    // CHALLENGE 3: after the largest number, start again at 1
    Ticket.nextNumber = Ticket.nextNumber === Ticket.LARGEST ? 1 : Ticket.nextNumber + 1;
    Ticket.issued++;
  }
```

Tests: ticket 999 is A999; the 1000th ticket is A001; `issuedCount()` is 1000 after 1000 tickets. A
helper `makeTickets(count)` makes the tickets in a loop and returns the last.

**Look for:** `LARGEST` worked out from `DIGITS` rather than a second magic number. Each new test
calls `Ticket.resetNumbering()` first. Many students will not notice that `issuedCount` breaks (it
returns 0 after 999 tickets, and 1 after 1000) - the third test is there to make them notice; it is fair to accept a
solution that removes `issuedCount` if the student can say why.

---

## 4. Courses in order

**Project:** [solutions/ch08_challenge_4_course_order](solutions/ch08_challenge_4_course_order/)
(from `ch08_project02_menu_order`)

`src/Order.ts`
```ts
  // CHALLENGE 4
  public byCourse(): Dish[] {
    return this.dishes.toSorted((a, b) => COURSES.indexOf(a.course) - COURSES.indexOf(b.course));
  }
```

Tests: dishes added dessert, main, starter come out starter, main, dessert; two starters keep the
order they were added in; `getDishes()` is unchanged afterwards. `main.ts` lists `order.byCourse()`.

**Look for:** the course order taken from `COURSES`, not a second list or a `switch` returning 0, 1,
2. `toSorted`, not `sort` (which would reorder the order itself - the third test catches it). The
"same course keeps its order" test relies on `toSorted` being stable, which JavaScript guarantees.

---

## 5. Two desks

**Project:** [solutions/ch08_challenge_5_two_desks](solutions/ch08_challenge_5_two_desks/)
(from `ch08_project03_ticket_numbers`)

`src/TicketMachine.ts`
```ts
export class TicketMachine {
  private nextNumber = 1;

  constructor(private readonly prefix: string) {}

  /** Prints the next ticket. */
  public take(): Ticket {
    const ticket = new Ticket(this.prefix, this.nextNumber);
    this.nextNumber++;
    return ticket;
  }
```

`Ticket` becomes `constructor(public readonly prefix: string, public readonly number: number) {}`,
and keeps only `static readonly DIGITS` and `static format(prefix, number)`. `TicketQueue` is given a
machine in its constructor. `main.ts` builds two desks, Parcels (P) and Payments (M), from one
function. The key test:

```ts
Deno.test("two desks each number their own tickets from 1", () => {
  const parcels = new TicketMachine("P");
  const payments = new TicketMachine("M");
  const first = parcels.take();
  const second = parcels.take();
  const third = payments.take();
  assertEquals([first.toString(), second.toString(), third.toString()], ["P001", "P002", "M001"]);
});
```

**Look for:** the written answer - the tests no longer need `resetNumbering` because each test makes
its own `TicketMachine`, and a new object always starts fresh; there is no shared state left. This
is the chapter's "could there ever be two?" rule in action, and a first taste of passing a
collaborator in through the constructor (Book 2's dependency injection). Some students will try to
keep a static counter per prefix (a static object keyed by prefix): it passes the test but keeps all
the test-order problems - worth discussing.

---

## 6. A junction

**Project:** [solutions/ch08_challenge_6_junction](solutions/ch08_challenge_6_junction/)
(from `ch08_project01_traffic_light`)

`src/Junction.ts`
```ts
export const PHASES = ["ns-ready", "ns-go", "ns-stopping", "ew-ready", "ew-go", "ew-stopping"] as const;
export type Phase = (typeof PHASES)[number];

export class Junction {
  public static readonly COLOURS: Record<Phase, PhaseColours> = {
    "ns-ready": { northSouth: "red-amber", eastWest: "red" },
    "ns-go": { northSouth: "green", eastWest: "red" },
    // ... one entry per phase
  };

  public next(): void {
    const index = PHASES.indexOf(this.phase);
    this.phase = PHASES[(index + 1) % PHASES.length];
    this.showPhase();
  }
```

`TrafficLight` gets `show(colour)` so the junction can set its lights. The safety test:

```ts
Deno.test("in every phase, at least one light is red", () => {
  const junction = new Junction();
  for (const phase of PHASES) {
    assertEquals(junction.getPhase(), phase);
    const oneIsRed = junction.northSouth.getColour() === "red" || junction.eastWest.getColour() === "red";
    assertEquals(oneIsRed, true, `both lights let traffic go in phase ${phase}`);
    junction.next();
  }
});
```

A second test checks that in every phase each light either stays the same or moves on by
`nextColour` - so neither light jumps from green to red.

**Look for:** the phases as an `as const` array with the union derived from it, and the colours as a
`Record<Phase, ...>` (or a `switch`) so the compiler insists on every phase. The safety test loops
over every phase. To show the test working, change `"ew-go"` to `{ northSouth: "green", eastWest:
"green" }`: it fails with `both lights let traffic go in phase ew-go` (the third argument of
`assertEquals` is the message). The page's timer waits for whichever light is not simply red.
