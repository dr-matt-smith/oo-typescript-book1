// Shows whether the year in the box is a leap year, and the leap years of the next few decades.
// main.ts is the only file that touches the page; the rule is in leap_year.ts, and tested.

import { isLeapYear } from "./leap_year.ts";

const FIRST_LISTED_YEAR = 2020;
const LAST_LISTED_YEAR = 2060;
// The leap year rules (and isLeapYear) start here.
const FIRST_COVERED_YEAR = 1583;

const yearBox = document.querySelector<HTMLInputElement>("#year");
const answer = document.querySelector<HTMLElement>("#answer");
const upcoming = document.querySelector<HTMLElement>("#upcoming");

const render = (): void => {
  if (yearBox === null || answer === null) {
    return;
  }
  const year = Number(yearBox.value);
  if (year < FIRST_COVERED_YEAR) {
    // isLeapYear will throw for these years, so the page does not ask it.
    answer.textContent = "The leap year rules start in 1583";
    return;
  }
  answer.textContent = isLeapYear(year) ? `${year} is a leap year` : `${year} is not a leap year`;
};

if (upcoming !== null) {
  const years: number[] = [];
  for (let year = FIRST_LISTED_YEAR; year <= LAST_LISTED_YEAR; year++) {
    if (isLeapYear(year)) {
      years.push(year);
    }
  }
  upcoming.textContent = years.length === 0 ? "(none yet - make the tests pass!)" : years.join(", ");
}

yearBox?.addEventListener("input", () => render());
render();
