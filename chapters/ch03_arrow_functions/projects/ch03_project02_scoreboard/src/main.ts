// A scoreboard for two teams. Each team has a button for each number of points, made from an array.
// Every button's listener is an arrow function that remembers which team, and how many points.

import { Team } from "./Team.ts";
import { leader } from "./leader.ts";

const POINTS: number[] = [1, 2, 3];

const home = new Team("Home");
const away = new Team("Away");

const homeScore = document.querySelector<HTMLElement>("#home-score");
const awayScore = document.querySelector<HTMLElement>("#away-score");
const message = document.querySelector<HTMLElement>("#leader");

const render = (): void => {
  if (homeScore !== null) homeScore.textContent = `${home.getScore()}`;
  if (awayScore !== null) awayScore.textContent = `${away.getScore()}`;
  if (message !== null) message.textContent = leader(home, away);
};

/** Puts a +1, +2 and +3 button for `team` into the element with id `containerId`. */
const addButtons = (team: Team, containerId: string): void => {
  const container = document.querySelector<HTMLElement>(containerId);
  if (container === null) {
    return;
  }
  for (const points of POINTS) {
    const button = document.createElement("button");
    button.textContent = `+${points}`;
    // The listener is written right here, as an arrow function. It can use `team` and `points`,
    // and it remembers them: each button gets its own team and its own number of points.
    button.addEventListener("click", () => {
      team.addPoints(points);
      render();
    });
    container.appendChild(button);
  }
};

addButtons(home, "#home-buttons");
addButtons(away, "#away-buttons");

const resetButton = document.querySelector<HTMLButtonElement>("#reset");
if (resetButton !== null) {
  resetButton.addEventListener("click", () => {
    home.reset();
    away.reset();
    render();
  });
}

render();
