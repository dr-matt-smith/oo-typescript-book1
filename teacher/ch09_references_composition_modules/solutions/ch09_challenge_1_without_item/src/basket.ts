// A shopping basket is an array of items, and each item is an object.
// The functions here copy baskets in different ways and change them, so the tests (and the page)
// can show exactly what is shared and what is not.

/** One line in a basket. An object, so it is shared, not copied, when you assign it. */
export type Item = { name: string; quantity: number };

/** The three ways the page can make basket B from basket A. */
export type CopyMode = "same array" | "spread copy" | "structuredClone";

export const COPY_MODES: CopyMode[] = ["same array", "spread copy", "structuredClone"];

/** Makes B from A. Only one of the three ways gives B nothing in common with A. */
export const copyBasket = (basket: Item[], mode: CopyMode): Item[] => {
  switch (mode) {
    case "same array":
      // Not a copy at all: a second name for the same array.
      return basket;
    case "spread copy":
      // A new array - but its elements are the same Item objects as before.
      return [...basket];
    case "structuredClone":
      // A new array of new Item objects: nothing is shared.
      return structuredClone(basket);
  }
};

/** The line of TypeScript each way of copying stands for, to show on the page. */
export const copyCode = (mode: CopyMode): string => {
  switch (mode) {
    case "same array":
      return "const b = a;";
    case "spread copy":
      return "const b = [...a];";
    case "structuredClone":
      return "const b = structuredClone(a);";
  }
};

/** Puts an item in the basket. Changes the basket it is given - on purpose. */
export const addItem = (basket: Item[], item: Item): void => {
  basket.push(item);
};

/** One more of the item at `index`. Changes that Item object, wherever else it is used. */
export const oneMore = (basket: Item[], index: number): void => {
  const item = basket[index];
  if (item === undefined) {
    return;
  }
  item.quantity += 1;
};

/** A new basket with the item added. The basket it is given is left as it was. */
export const withItem = (basket: Item[], item: Item): Item[] => [...basket, item];

// CHALLENGE 1
/** A new basket without the item called `name`. The basket it is given is left as it was. */
export const withoutItem = (basket: Item[], name: string): Item[] => basket.filter((item) => item.name !== name);

/** What do two baskets have in common? Uses ===, which asks "the same object?". */
export const sharing = (a: Item[], b: Item[]): string => {
  if (a === b) {
    return "A and B are the same array";
  }
  const shared = a.filter((item) => b.includes(item)).length;
  if (shared === 0) {
    return "A and B share nothing";
  }
  return `A and B are different arrays, but share ${shared} item objects`;
};

/** "bread × 1, milk × 2" - or "empty". */
export const describeBasket = (basket: Item[]): string =>
  basket.length === 0 ? "empty" : basket.map((item) => `${item.name} × ${item.quantity}`).join(", ");
