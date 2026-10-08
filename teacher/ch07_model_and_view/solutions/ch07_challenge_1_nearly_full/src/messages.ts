// CHALLENGE 1: the status line has three possible messages now - a rule, so it moves out of the
// view into a plain function that can be tested.

import type { Tally } from "./Tally.ts";

/** "Full - ...", "Nearly full - 2 spaces left" or "5 spaces left". */
export const statusMessage = (tally: Tally): string => {
  if (tally.isFull) {
    return "Full - nobody else may come in";
  }
  if (tally.isNearlyFull) {
    return `Nearly full - ${tally.spacesLeft} spaces left`;
  }
  return `${tally.spacesLeft} spaces left`;
};
