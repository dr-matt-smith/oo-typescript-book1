# Chapter 7 - Model and view: challenge solutions

Each solution is a complete project in [solutions/](solutions/), made from the chapter project the
challenge starts from. Every change is marked with a `CHALLENGE n` comment, so a search for
`CHALLENGE` finds them all. Every solution builds with all tests passing, 0 type errors and 0 lint
warnings.

---

## 1. Nearly full

**Project:** [solutions/ch07_challenge_1_nearly_full](solutions/ch07_challenge_1_nearly_full/)
(from `ch07_project01_tally_counter`)

`src/Tally.ts`
```ts
// CHALLENGE 1: "nearly full" starts at 80% of the capacity
const NEARLY_FULL_FRACTION = 0.8;

  // CHALLENGE 1
  /** True when the room is at least 80% full, but not full. */
  public get isNearlyFull(): boolean {
    return !this.isFull && this.current >= this.capacity * NEARLY_FULL_FRACTION;
  }
```

The status line now has three messages, so the solution moves it out of the view into a tested
`statusMessage(tally)` in a new `src/messages.ts` (as the chapter did with `remainingText`). The view
adds a `warning` class (orange) with `classList.toggle("warning", tally.isNearlyFull)`.

Tests: a room of 10 with 7 (no), 8 (yes) and 10 (no - full, not nearly full); and the three status
messages.

**Look for:** the edge at exactly 80% tested both sides; "full" excluded from "nearly full" (a
student who forgets `!this.isFull` gets a red test for 10 people - good); a named constant rather
than `0.8` in the code; the rule in the model or a tested function, not an `if` in the view. Accept
an `if` chain in the view from students who have not yet absorbed "rules out of the view", but ask
them where its test is.

---

## 2. Clear the list

**Project:** [solutions/ch07_challenge_2_clear_list](solutions/ch07_challenge_2_clear_list/)
(from `ch07_project02_shopping_list`)

`src/ShoppingList.ts`
```ts
  // CHALLENGE 2
  /** Removes every item. */
  public clear(): void {
    // The array is readonly (the field can never point at a different array), so empty it in place.
    this.items.length = 0;
  }
```

`src/ShoppingListView.ts` disables the button in `render`: `this.clearButton.disabled = items.length
=== 0;`. `main.ts` adds a listener: `list.clear(); view.showMessage(""); render();`.

Tests: clear removes every item; clearing an empty list is fine; an item can be added again after
clearing (the duplicate rule must not remember cleared items).

**Look for:** students who write `this.items = []` hit a compile error, because the field is
`readonly` - a good moment to separate "the field cannot be reassigned" from "the array cannot
change" (Chapter 9 again). Either making the field non-readonly or `length = 0` is fine. On "which
file decides": the *view* decides the button is disabled, from what the model tells it (the number of
items) - an `isEmpty` getter on the model is an equally good answer.

---

## 3. Two rooms

**Project:** [solutions/ch07_challenge_3_two_rooms](solutions/ch07_challenge_3_two_rooms/)
(from `ch07_project01_tally_counter`)

`src/TallyView.ts`
```ts
  // CHALLENGE 3
  constructor(root: string) {
    // "#lab .count" means: the element with class "count" inside the element with id "lab".
    this.countText = requireElement<HTMLElement>(`${root} .count`);
    // ... the same for .status, .add, .remove, .reset
  }

  /** Calls the functions when this room's +, − and Reset buttons are clicked. */
  public onClicks(add: () => void, remove: () => void, reset: () => void): void {
```

`index.html` has two `<section>`s with ids `lab` and `library`; inside each, the elements have
*classes* (an id must be unique on the page). `main.ts` has a `setUpRoom(root, capacity)` function
that makes a `Tally` and a `TallyView` and wires them, called twice.

Tests: two tallies are independent; each has its own capacity. The view is unchanged in spirit and
still untested.

**Look for:** the model needed **no change at all** - make students notice that. The test is quick
to write and passes at once: that is fine; it documents that `Tally` keeps no shared state (Chapter 8
introduces `static`, which would break it). Watch for students who copy-paste the whole of `main.ts`
for the second room instead of writing a function; and for duplicate ids in the HTML, which make
`querySelector` find only the first. Giving the view its buttons (`onClicks`) rather than having
`main.ts` find `#lab .add` itself is a nice touch but not required.

---

## 4. Clear done

**Project:** [solutions/ch07_challenge_4_clear_done](solutions/ch07_challenge_4_clear_done/)
(from `ch07_project03_todo_filters`)

`src/TodoList.ts`
```ts
  // CHALLENGE 4
  /** Removes every done to-do, and says how many were removed. */
  public clearDone(): number {
    const before = this.todos.length;
    this.todos = this.todos.filter((todo) => !todo.done);
    return before - this.todos.length;
  }

  // CHALLENGE 4
  /** True if at least one to-do is done - so there is something to clear. */
  public get hasDone(): boolean {
    return this.visible("done").length > 0;
  }
```

`TodoHandlers` gains `onClearDone`; the view adds the listener in its constructor and a
`showNotice(text)` method; `render` takes a fourth argument, `canClear`, to disable the button.
`main.ts`:

```ts
  onClearDone: () => {
    const removed = list.clearDone();
    view.showNotice(`Removed ${removed}`);
    setTimeout(() => view.showNotice(""), NOTICE_MILLISECONDS);
    render();
  },
```

Tests: clearDone removes the done to-do and returns 1; with nothing done it returns 0 and removes
nothing; `hasDone` before and after.

**Look for:** adding `onClearDone` to `TodoHandlers` makes the compiler point at `main.ts` until the
handler is written - show this; it is the type system doing a review. The timer lives in `main.ts`
(it is about the page, not the data), not in the model. `setTimeout` with a named constant.

---

## 5. Move up and down

**Project:** [solutions/ch07_challenge_5_move](solutions/ch07_challenge_5_move/)
(from `ch07_project03_todo_filters`)

`src/TodoList.ts`
```ts
  public moveUp(id: number, filter: Filter = "all"): void {
    this.move(id, filter, -1);
  }

  private move(id: number, filter: Filter, step: number): void {
    const todo = this.get(id); // throws if there is no such to-do
    const shown = this.visible(filter);
    const from = shown.indexOf(todo);
    const to = from + step;
    if (from === -1 || to < 0 || to >= shown.length) {
      return;
    }
    const i = this.todos.indexOf(todo);
    const j = this.todos.indexOf(shown[to]);
    [this.todos[i], this.todos[j]] = [this.todos[j], this.todos[i]];
  }
```

The view adds ▲ and ▼ buttons to each to-do (disabled for the first and last *on the screen*) and two
handlers, `onMoveUp` and `onMoveDown`; `main.ts` passes the current filter to the model.

Tests: an ordinary move up and down; both edges do nothing; with the Active filter a to-do moves past
the hidden done one; an unknown id throws.

**Look for:** the filter question has no single right answer - the point is that students *decide*,
and write a test that records the decision. The simple version (swap with the neighbour in the full
list, ignoring the filter) is acceptable if the student explains that under "Active" the to-do can
appear not to move. The solution's choice - move among the to-dos the user can see - uses a default
parameter so the plain `moveUp(id)` still means the whole list. Edge cases tested; the destructuring
swap (or a temporary variable - both fine); `indexOf` on objects works because it compares by
identity (`===`), which Chapter 9 explains.

---

## 6. Remember the list

**Project:** [solutions/ch07_challenge_6_remember](solutions/ch07_challenge_6_remember/)
(from `ch07_project03_todo_filters`)

`src/TodoList.ts`
```ts
/** One to-do as plain data: what is saved, and what a list can be built from. */
export type TodoData = { id: number; text: string; done: boolean };

  constructor(data: TodoData[] = []) {
    this.todos = data.map((d) => new Todo(d.id, d.text, d.done));
    this.nextId = data.reduce((largest, d) => Math.max(largest, d.id), 0) + 1;
  }

  /** The list as plain data, ready for JSON.stringify. */
  public toData(): TodoData[] {
    return this.todos.map((todo) => ({ id: todo.id, text: todo.text, done: todo.done }));
  }
```

`Todo` gains a third constructor parameter, `done: boolean = false`. `main.ts` loads the saved data
(or `null` the first time), builds the list from it, adds the three starting to-dos only the first
time, and saves inside `render`:

```ts
const render = (): void => {
  // CHALLENGE 6: every change comes through render, so this is the one place to save
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.toData()));
  view.render(list.visible(filter), list.remaining, filter);
};
```

Tests: `toData` gives the expected plain objects; a list survives the round trip (`new
TodoList(list.toData())`), including which are done; the next id after `[7, 3]` is 8; and a round
trip through an actual JSON string.

**Look for:** the model still knows nothing about `localStorage` - the round trip is tested in Deno
with no browser. The next id is restored (a student who forgets it gets duplicate ids after a
reload, and their "ids are never reused" reasoning should catch it). `({ ... })` - an arrow function
returning an object literal needs the brackets; students who leave them out get a confusing error.
Saving in `render` is the payoff of "every change goes through one place"; saving in each handler
works but is easy to forget. `JSON.parse` returns an untyped value: the solution trusts it because
only this page writes it, with a comment. A stronger answer checks the shape (Book 2's narrowing
chapter) or catches a parse error (Book 2's errors chapter). Note: `localStorage` works for
`dist/index.html` opened from disk in most browsers, but each browser keeps its own copy.
