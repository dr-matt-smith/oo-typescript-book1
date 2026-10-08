// Anything that can be put in order and shown in a list. Like Java's Comparable, each class
// decides its own order - here by giving a number to sort by (smaller comes first).

export interface Sortable {
  /** The text to show in a list. */
  label(): string;
  /** Where it goes in the order: smaller numbers come first. */
  sortKey(): number;
}
