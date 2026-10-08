// Tests for src/leader.ts

import { assertEquals } from "@std/assert";
import { Team } from "../src/Team.ts";
import { leader } from "../src/leader.ts";

Deno.test("level scores are all square", () => {
  assertEquals(leader(new Team("Home"), new Team("Away")), "All square");
});

Deno.test("the home team leading", () => {
  const home = new Team("Home");
  home.addPoints(3);
  assertEquals(leader(home, new Team("Away")), "Home lead by 3");
});

Deno.test("the away team leading", () => {
  const away = new Team("Away");
  away.addPoints(2);
  assertEquals(leader(new Team("Home"), away), "Away lead by 2");
});
