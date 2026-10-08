// Says who is winning, e.g. "Home lead by 3" or "All square".

import { Team } from "./Team.ts";

export const leader = (home: Team, away: Team): string => {
  const difference = home.getScore() - away.getScore();
  if (difference > 0) {
    return `${home.getName()} lead by ${difference}`;
  }
  if (difference < 0) {
    return `${away.getName()} lead by ${-difference}`;
  }
  return "All square";
};
