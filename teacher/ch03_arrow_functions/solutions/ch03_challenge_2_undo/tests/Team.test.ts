// Tests for src/Team.ts

import { assertEquals } from "@std/assert";
import { Team } from "../src/Team.ts";

Deno.test("a new team has its name and no points", () => {
  const team = new Team("Home");
  assertEquals(team.getName(), "Home");
  assertEquals(team.getScore(), 0);
});

Deno.test("points add up", () => {
  const team = new Team("Home");
  team.addPoints(2);
  team.addPoints(3);
  team.addPoints(1);
  assertEquals(team.getScore(), 6);
});

Deno.test("reset goes back to zero", () => {
  const team = new Team("Home");
  team.addPoints(3);
  team.reset();
  assertEquals(team.getScore(), 0);
});

// CHALLENGE 2

Deno.test("undo takes away the last basket", () => {
  const team = new Team("Home");
  team.addPoints(2);
  team.addPoints(3);
  team.undo();
  assertEquals(team.getScore(), 2);
});

Deno.test("undo twice takes away two baskets", () => {
  const team = new Team("Home");
  team.addPoints(2);
  team.addPoints(3);
  team.undo();
  team.undo();
  assertEquals(team.getScore(), 0);
});

Deno.test("undo with no baskets does nothing", () => {
  const team = new Team("Home");
  team.undo();
  assertEquals(team.getScore(), 0);
});
