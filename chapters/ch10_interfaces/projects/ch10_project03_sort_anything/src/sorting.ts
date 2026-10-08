// Sorting that works for anything Sortable: songs, planets, mountains - one function for all.

import type { Sortable } from "./Sortable.ts";

/** A sorted copy: smallest sort key first. The original array is left as it was. */
export const sortAll = (items: Sortable[]): Sortable[] => items.toSorted((a, b) => a.sortKey() - b.sortKey());

/** The labels, in order - what the page shows. */
export const labels = (items: Sortable[]): string[] => items.map((item) => item.label());
