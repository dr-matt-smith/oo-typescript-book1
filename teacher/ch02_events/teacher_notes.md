# Chapter 2 - Events: teacher notes

## Overview

How web pages respond: the event-driven model, the browser's event loop, listeners, timers and
keyboard input - and the first TypeScript class. Students arrive having only written pages that do
their work once, on load. The big conceptual shift is that **`main.ts` runs once and finishes**;
after that, code runs only when the browser calls a listener. Students who have done Swing or JavaFX
will recognise it; those who have only written console programs need the two diagrams and a live
demo.

The second big idea is the pattern used for the rest of the book: **object → event → render**. The
object holds the state, listeners change it and call `render()`, and `render()` shows it.

Listeners are still named `function`s passed by name. Chapter 3 rewrites some of them as arrow
functions; resist introducing arrows here.

## Prerequisites

- Chapter 1 (functions, `export`/`import`, `querySelector` and null checks, tests)
- Java classes, fields, methods, `private`/`public`

## Learning outcomes

Students can:

1. explain the difference between a program that runs top to bottom and an event-driven page
2. describe the event loop: queue, listener, redraw; and why a slow listener freezes the page
3. register a listener with `addEventListener`, passing the function without calling it
4. write and test a small TypeScript class, using `this.` correctly
5. structure a page as object → event → render
6. use `setInterval`, `clearInterval` and `setTimeout`, and keep a timer id in a `number | null`
7. handle `input` and `keydown` events, and read `event.key` from a `KeyboardEvent`
8. keep unpredictable values (random numbers, the time) out of tested functions by passing them in

## Suggested session plan (2 x 2 hour labs)

**Session 1 - events and a first class (projects 1-2)**

| Time | Activity |
|---|---|
| 0:00 - 0:20 | Slides 1-6: programs that wait; the lifecycle and event loop diagrams. Ask: "when does `main.ts` run? When does `handleToss` run?" |
| 0:20 - 0:35 | **Live demo** project 1: add `console.log("main.ts ran")` at the top of `main.ts` and `console.log("toss")` in `handleToss`; open `dist/index.html` in a browser with developer tools and click. One "ran", many "toss" |
| 0:35 - 0:50 | Slides 7-9: passing a function; testing randomness. **Demo**: add the brackets (`handleToss()`), show the error |
| 0:50 - 1:10 | Slides 10-13: `Counter.ts` and `Counter.java`; object → event → render; testing the class |
| 1:10 - 1:55 | Challenges 1-3 |
| 1:55 - 2:00 | Recap |

**Session 2 - timers and keys (projects 3-4)**

| Time | Activity |
|---|---|
| 0:00 - 0:20 | Slides 14-15: timers, `number \| null`, testing the formatting |
| 0:20 - 0:40 | Slides 16-17: `input` and `keydown`, the event object, common events |
| 0:40 - 1:55 | Challenges 4-6 |
| 1:55 - 2:00 | Recap: object → event → render; pass, don't call; keep randomness out of tested code |

## Key points to stress

- **`main.ts` runs once.** Everything after page load happens in listeners
- **Pass, don't call**: `addEventListener("click", handleToss)`. With brackets, TypeScript reports
  *"No overload matches this call"*, ending *"Argument of type 'void' is not assignable to parameter
  of type ..."* - the last line is the useful one
- **`this.` is compulsory** in a class. TypeScript's error even suggests the fix
- **The page never keeps its own copy of the state.** `render()` always reads the object
- **Listeners should be quick** - one event at a time, and nothing redraws while a listener runs
- **A timer id must be kept** to stop the timer - hence `let timerId: number | null` outside the
  functions. Starting a second interval without stopping the first is the classic bug (the clock or
  stopwatch runs at double speed)
- **Testability by design**: `coinFace(random)` and `formatTime(h, m, s)` exist so tests can choose
  their inputs - the same move as `greeting(hour)` in Chapter 1

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `No overload matches this call ... Argument of type 'void' ...` | `addEventListener("click", handleToss())` | remove the brackets |
| Button does nothing, no errors | wrong id in `querySelector`, so the listener was never added; or the listener was never registered | check ids; check the `addEventListener` line runs |
| `Cannot find name 'count'. Did you mean the instance member 'this.count'?` | missing `this.` | `this.count` |
| The count changes but the page does not | forgot to call `render()` after changing the object | call `render()` at the end of every listener |
| The page is blank until the first click | forgot the `render()` at the end of `main.ts` | call it once at start-up |
| Clock/stopwatch runs twice as fast after pressing Start twice | two intervals running | only start if `timerId === null`; or `clearInterval` first |
| `Variable 'timerId' implicitly has type 'any' in some locations where its type cannot be determined.` | declared `let timerId = null;` - TypeScript cannot tell what it will hold | `let timerId: number \| null = null;` |
| `Property 'value' does not exist on type 'HTMLElement'` | `querySelector<HTMLElement>` used for a text box | `querySelector<HTMLTextAreaElement>` (or `HTMLInputElement`) |
| `handleKey` never sees Escape | listener added for `"input"` instead of `"keydown"` | `input` has no key; use `keydown` |

## Discussion questions

1. If a listener took ten seconds to run, what would the user see? Why?
2. Why does `render()` read from the `Counter`, rather than `main.ts` keeping its own `let count`?
3. `coinFace` takes the random number as a parameter. What would a test look like if `coinFace`
   called `Math.random()` itself?
4. Java lets any object variable be `null`. TypeScript makes you say so (`number | null`). Which do
   you prefer, and why?
5. Which parts of the ticking clock *cannot* be tested by our tests? How else could you check them?

## Extension ideas

- `document.addEventListener("keydown", ...)` to make keyboard shortcuts for the whole page (e.g.
  `+` to increment the counter)
- `MouseEvent`: show the mouse position (`event.clientX`, `event.clientY`) in a `mousemove` listener
- Show the event loop freezing: a listener with a loop that runs for three seconds, while a clock ticks

## Assessment ideas

- Lab check: Challenge 2 or 3 with tests; ask the student to point to the object, the event and the
  render in their code
- Short answer: "What is wrong with `button.addEventListener("click", handleClick());`?"
- Trace: given a `main.ts` with three `console.log`s (top level, in a listener, in a `setTimeout`
  callback), put the output in order after two clicks
