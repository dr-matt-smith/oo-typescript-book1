// CHALLENGE 6
// Tests for src/Junction.ts. The safety rule is checked for every phase, by looping over PHASES.

import { assertEquals } from "@std/assert";
import { Junction, PHASES } from "../src/Junction.ts";
import { nextColour } from "../src/light_colour.ts";

Deno.test("a new junction starts in the first phase: north-south getting ready", () => {
  const junction = new Junction();
  assertEquals(junction.getPhase(), "ns-ready");
  assertEquals(junction.northSouth.getColour(), "red-amber");
  assertEquals(junction.eastWest.getColour(), "red");
});

Deno.test("next moves the junction to the next phase", () => {
  const junction = new Junction();
  junction.next();
  assertEquals(junction.getPhase(), "ns-go");
  assertEquals(junction.northSouth.getColour(), "green");
});

Deno.test("after the last phase the junction goes back to the first", () => {
  const junction = new Junction();
  for (let step = 0; step < PHASES.length; step++) {
    junction.next();
  }
  assertEquals(junction.getPhase(), PHASES[0]);
});

Deno.test("in every phase, at least one light is red", () => {
  const junction = new Junction();
  for (const phase of PHASES) {
    assertEquals(junction.getPhase(), phase);
    const oneIsRed = junction.northSouth.getColour() === "red" || junction.eastWest.getColour() === "red";
    assertEquals(oneIsRed, true, `both lights let traffic go in phase ${phase}`);
    junction.next();
  }
});

Deno.test("in every phase, each light either stays the same or moves on one colour", () => {
  // So each light still follows the UK sequence: no jumping from green straight to red.
  const junction = new Junction();
  for (const phase of PHASES) {
    const northSouth = junction.northSouth.getColour();
    const eastWest = junction.eastWest.getColour();
    junction.next();
    const nsNow = junction.northSouth.getColour();
    const ewNow = junction.eastWest.getColour();
    assertEquals(nsNow === northSouth || nsNow === nextColour(northSouth), true, `north-south after ${phase}`);
    assertEquals(ewNow === eastWest || ewNow === nextColour(eastWest), true, `east-west after ${phase}`);
  }
});
