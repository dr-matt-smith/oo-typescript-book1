// The Aliasing Lab page. Basket A always starts as bread and milk; the buttons make basket B from A
// in one of three ways, then change B. The page shows both baskets after every click, so you can
// see when changing B changes A too.

import { addItem, COPY_MODES, copyBasket, copyCode, type CopyMode, describeBasket, type Item, oneMore, sharing, withoutItem } from "./basket.ts";

/** querySelector that throws, naming the element, if it is missing (Chapter 7's helper). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches ${selector} - check index.html`);
  }
  return element;
};

/** A brand new basket A: a new array of new objects, every time. */
const freshBasket = (): Item[] => [
  { name: "bread", quantity: 1 },
  { name: "milk", quantity: 2 },
];

let a: Item[] = freshBasket();
let b: Item[] = [];
let mode: CopyMode | null = null;

const copyButtons = requireElement<HTMLElement>("#copy-buttons");
const addEggsButton = requireElement<HTMLButtonElement>("#add-eggs");
const oneMoreButton = requireElement<HTMLButtonElement>("#one-more");
const removeEggsButton = requireElement<HTMLButtonElement>("#remove-eggs"); // CHALLENGE 1
const resetButton = requireElement<HTMLButtonElement>("#reset");
const basketA = requireElement<HTMLElement>("#basket-a");
const basketB = requireElement<HTMLElement>("#basket-b");
const code = requireElement<HTMLElement>("#code");
const status = requireElement<HTMLElement>("#status");

/** Fills a list element with one <li> per item. textContent, so no text is ever read as HTML. */
const showBasket = (list: HTMLElement, basket: Item[]): void => {
  list.replaceChildren();
  for (const item of basket) {
    const li = document.createElement("li");
    li.textContent = `${item.name} × ${item.quantity}`;
    list.appendChild(li);
  }
  if (basket.length === 0) {
    const li = document.createElement("li");
    li.className = "muted";
    li.textContent = describeBasket(basket);
    list.appendChild(li);
  }
};

const render = (): void => {
  showBasket(basketA, a);
  showBasket(basketB, b);
  addEggsButton.disabled = mode === null;
  oneMoreButton.disabled = mode === null;
  removeEggsButton.disabled = mode === null; // CHALLENGE 1
  if (mode === null) {
    code.textContent = "const b = ...";
    status.textContent = "Make basket B with one of the three buttons.";
    return;
  }
  code.textContent = copyCode(mode);
  status.textContent = sharing(a, b);
};

for (const copyMode of COPY_MODES) {
  const button = document.createElement("button");
  button.textContent = copyCode(copyMode);
  button.addEventListener("click", () => {
    // Start again from a fresh A each time, so earlier experiments do not get in the way.
    a = freshBasket();
    b = copyBasket(a, copyMode);
    mode = copyMode;
    render();
  });
  copyButtons.appendChild(button);
}

addEggsButton.addEventListener("click", () => {
  addItem(b, { name: "eggs", quantity: 6 });
  render();
});
oneMoreButton.addEventListener("click", () => {
  oneMore(b, 0);
  render();
});
// CHALLENGE 1: withoutItem gives a new array, so B now refers to it - and A is never touched,
// whichever way B was made.
removeEggsButton.addEventListener("click", () => {
  b = withoutItem(b, "eggs");
  render();
});
resetButton.addEventListener("click", () => {
  a = freshBasket();
  b = [];
  mode = null;
  render();
});

render();
