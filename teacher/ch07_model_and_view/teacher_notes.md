# Chapter 7 - Model and view: teacher notes

## Overview

This chapter gives the "object -> event -> render" pattern from Chapter 2 a firm shape that lasts for
the rest of the series: a **model** (classes with the data and the rules, no DOM), a **view** (code
that copies the model onto the page and makes no decisions about the data) and a thin `main.ts` that
joins them. The model is tested; the view is kept so thin that looking at it is enough.

Along the way it pays two debts from earlier chapters: the `requireElement(selector)` helper promised
in Chapter 1's solutions (a missing element should be loud, not silent), and the `innerHTML` vs
`textContent` question raised in Chapter 1 and left hanging by Chapter 3's marks table. The
`innerHTML` demonstration (the page turning red) is the most memorable moment of the chapter - do it
live.

Three projects grow in size: a tally counter (one model, one small view class), a shopping list
(user input, rules about it, a view that reports clicks through a function), and a to-do list with
filters (two model classes, an object of handlers, many events taking one path).

The house rule changes slightly here: "`main.ts` is the only file that touches the DOM" becomes
"**model files never touch the DOM**; DOM code lives in `main.ts` and view files (`dom.ts`, `*View.ts`)".
Make this explicit - students will meet it in every later project.

## Prerequisites

- Chapters 1-3: the DOM, events, `render`, arrow functions and closures, the `this` trap, function
  types, `type` for object shapes, `map`/`filter`/`find`
- Chapter 4: red-green-refactor, `assertThrows`, helper functions in tests
- Chapters 5-6: constructors, parameter properties, default parameters, `private`, `readonly`, `get`
  accessors, throwing errors, invariants
- Java: MVC in Swing or a web framework helps, but is not required

## Learning outcomes

Students can:

1. explain what belongs in a model, a view and `main.ts`, and why the model must not touch the DOM
2. write a view class that finds its elements once and has a `render` method that can be called at
   any time
3. write and use `requireElement<T>(selector)`, and explain why a loud failure beats a silent `null`
4. explain cross-site scripting, demonstrate it with `innerHTML`, and build elements safely with
   `createElement` and `textContent`
5. pass a function (or an object of functions) into a view so that it can report clicks without
   changing the model
6. route every event through "change the model, then render", including state that is a plain
   variable (the filter)
7. test a model thoroughly, move rules that creep into the view into tested functions, and say why
   the view itself goes untested

## Suggested session plan (2 x 2 hour labs)

**Session 1 - model, view, requireElement (project 1, start of project 2)**

| Time | Activity |
|---|---|
| 0:00 - 0:15 | Slides 1-5: why split; the model-view picture; the new house rule |
| 0:15 - 0:40 | **Live-code** `Tally` test first: "decrement never goes below zero" red (`-1`), green; the capacity edge; refactor to `isFull`/`isEmpty` getters. Students do Exercise 7.1 |
| 0:40 - 0:55 | Slides 8-10: `requireElement`. **Demo**: rename `id="count"` and show the console error, then the same typo with plain `querySelector` and `?.` (blank page, no clue) |
| 0:55 - 1:10 | Slides 11-13: the `TallyView` class, `render`, `main.ts`. The **Try it** (comment out a `render()`) |
| 1:10 - 1:55 | Challenges 1 and 3 |
| 1:55 - 2:00 | Recap: which file would each of these go in? (a rule, a colour, a click) |

**Session 2 - user input, innerHTML, many events (projects 2-3)**

| Time | Activity |
|---|---|
| 0:00 - 0:20 | Slides 14-16: `problemWith` vs a throwing `add`; the case-insensitive red; handing out a copy |
| 0:20 - 0:40 | Slides 17-19: **the innerHTML demo** below, then XSS, then the `textContent` rule |
| 0:40 - 0:55 | Slides 20-21: the view reports clicks (`RemoveHandler`); Exercise 7.2 |
| 0:55 - 1:15 | Slides 22-26: ids not positions; `type Filter`; words out of the view (Exercise 7.3); `TodoHandlers`; event, model, render at scale |
| 1:15 - 1:55 | Challenges 2, 4, 5 (6 for the fast ones) |
| 1:55 - 2:00 | Recap: "keep the view thin, put everything that can be wrong where it can be tested" |

### The innerHTML demo

Copy `ch07_project02_shopping_list`, and in `ShoppingListView.render` replace the `replaceChildren` /
`forEach` lines with:

```ts
this.listElement.innerHTML = items.map((name) => `<li><span>${name}</span><button class="secondary">Remove</button></li>`).join("");
```

Build. Add "Milk" (fine), then `<b>cheese</b>` (bold - the browser obeyed it), then:

```text
<img src=x onerror="document.body.style.background=`red`">
```

The page turns red (`chapters/ch07_model_and_view/images/innerhtml_attack.png`). Ask: what else could
that `onerror` have done? (Read the page, read cookies, send them anywhere with `fetch`.) Then put the
real code back and add the same three items: all shown as typed. Note the Remove buttons in the
`innerHTML` version have no listeners - another reason the chapter builds elements one by one.

## Key points to stress

- **The model never touches the DOM.** One `document` in a model file and none of its tests can run
  (`ReferenceError: document is not defined`)
- **Change the model, then render** - every listener, every handler. Listeners never tweak the page
  directly
- **`render` shows the model as it is now**, so it can be called at any time; it never "adds one to
  the number on the screen"
- **Fail loudly** for elements the page must have. `?.` and `if (x !== null)` are right for things
  that may genuinely be missing, and wrong for typos
- **`textContent` for anything a user typed** (or that came from a file or a server). `innerHTML`
  only for HTML you wrote yourself, with nothing from outside in it
- **The view reports, `main.ts` decides.** The view is given functions to call; it does not change the
  model. That keeps the view reusable (Challenge 3) and the decisions in one place
- **Ids, not positions**, once a view can filter or sort
- **A rule in the view is a smell**: if an `if` in view code could be wrong, move it into a tested
  function (`remainingText`)
- `requireElement` is students' first look at writing a generic function. Keep it to "you have been
  using `<T>` since Chapter 1; this passes your choice on" - Book 2 does generics properly

## Common problems and errors

| What students see | Cause | Fix |
|---|---|---|
| `ReferenceError: document is not defined` (with a hint about happy-dom, deno_dom ...) when the tests run | a test imports a view class or `main.ts`, or a model file uses `document` | test only the model; move the DOM code into the view |
| `Error: No element matches "#count" - check index.html` in the browser console, blank page | an id in `index.html` does not match the selector (that is the helper working) | fix the id or the selector |
| `TS2339 [ERROR]: Property 'disabled' does not exist on type 'HTMLElement'.` | `requireElement("#add")` without `<HTMLButtonElement>` | give the element type in angle brackets |
| The page does not change after a click, no error; the next click "jumps" | a listener changes the model but forgets `render()` | always end with `render()` |
| `TypeError: Cannot read properties of undefined (reading 'length')` on clicking Remove | `new ShoppingListView(list.remove)` - the `this` trap from Chapter 3: `remove` runs with `this` set to the view | `(index) => { list.remove(index); render(); }` |
| `TS2448 [ERROR]: Block-scoped variable 'render' used before its declaration.` | `render()` called above the line `const render = ...` | call it at the end of `main.ts` |
| `TS2820 [ERROR]: Type '"All"' is not assignable to type 'Filter'. Did you mean '"all"'?` | wrong case for a union member | use the exact string - that is the point of the union |
| User text appears in bold, or the page misbehaves after typing `<...>` | `innerHTML` with user text | `createElement` + `textContent` |
| Deleting under the Active filter removes the wrong to-do | the view passed a *position* in the filtered list | pass the to-do's `id` |
| A test that pushes onto `list.all` "fails to add" | `all` returns a copy - working as designed | add through the model's methods |

## Discussion questions

1. The tally view disables the **+** button when the room is full, and `increment` also refuses. Is
   that the same rule written twice? What would go wrong if only the view checked?
2. `problemWith` returns a message; `add` throws. Why have both? When would you only want one?
3. The view is not tested. Is that acceptable? What would have to be true of the view for you to
   change your mind?
4. Where would you put a rule like "items are shown in alphabetical order" - model, view, or a
   function between them? Does it depend on whether the order matters to anything but the screen?
5. `render` rebuilds the whole list every time. When might that become a problem, and what would you
   measure before changing it? (A preview of Book 2's runtime quality chapter.)
6. Where else might user text end up somewhere it is treated as code? (SQL injection is the same idea
   in a database.)

## Extension ideas

- A second view of the same model: the to-do count also shown in the page's title
  (`document.title`). The model does not change at all - a strong argument for the split
- An **Edit** feature for to-dos: double-click a to-do to edit its text. Where does the "is editing"
  state live?
- Write a tiny `el(tag, text)` helper in `dom.ts` that does `createElement` plus `textContent`, and
  use it to shorten the views
- Compare with a framework: show the same to-do list in a few lines of React or Vue, and point out the
  same split - state, a render function, and events that change state (frameworks escape text for
  you, which is one reason they are popular)

## Assessment ideas

- Given a 60-line `main.ts` that mixes state, rules and DOM code, split it into model, view and
  `main.ts`, and write tests for the model
- Spot the bugs: a view that uses `innerHTML` for a user's name, a listener with no `render()`, a
  delete button that passes a position under a filter
- Lab check: Challenge 4 or 5 with tests, including the edge cases
