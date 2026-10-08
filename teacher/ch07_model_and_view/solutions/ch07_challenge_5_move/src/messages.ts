// The words the page shows. Plain functions, not view code, so they can be tested.

import type { Filter } from "./filter.ts";

/** "1 item left", "3 items left", "Nothing left to do". */
export const remainingText = (count: number): string => {
  if (count === 0) {
    return "Nothing left to do";
  }
  return count === 1 ? "1 item left" : `${count} items left`;
};

/** What to show instead of an empty list - it depends on which filter is chosen. */
export const emptyText = (filter: Filter): string => {
  if (filter === "active") {
    return "Nothing active - well done!";
  }
  if (filter === "done") {
    return "Nothing done yet";
  }
  return "Nothing to do - add something above";
};
