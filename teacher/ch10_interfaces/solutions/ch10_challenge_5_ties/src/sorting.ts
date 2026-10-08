// Sorting that works for anything Sortable: songs, planets, mountains - one function for all.

import type { Sortable } from "./Sortable.ts";

// CHALLENGE 5: ties are broken by label
/** A sorted copy: smallest sort key first, and alphabetical by label when keys tie. */
export const sortAll = (items: Sortable[]): Sortable[] =>
  items.toSorted((a, b) => {
    const byKey = a.sortKey() - b.sortKey();
    if (byKey !== 0) {
      return byKey;
    }
    return a.label().localeCompare(b.label());
  });

/** The labels, in order - what the page shows. */
export const labels = (items: Sortable[]): string[] => items.map((item) => item.label());
