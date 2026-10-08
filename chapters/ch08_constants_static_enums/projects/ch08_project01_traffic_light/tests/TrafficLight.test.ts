// Tests for src/TrafficLight.ts.

import { assertEquals } from "@std/assert";
import { LIGHT_COLOURS, type LightColour } from "../src/light_colour.ts";
import { LAMPS, TrafficLight } from "../src/TrafficLight.ts";

Deno.test("a new light starts on the class's starting colour, red", () => {
  const light = new TrafficLight("Main Street");
  assertEquals(light.getColour(), TrafficLight.STARTING_COLOUR);
  assertEquals(TrafficLight.STARTING_COLOUR, "red");
});

Deno.test("each light keeps its own name", () => {
  const first = new TrafficLight("Main Street");
  const second = new TrafficLight("Station Road");
  assertEquals(first.name, "Main Street");
  assertEquals(second.name, "Station Road");
});

Deno.test("next moves the light on one colour", () => {
  const light = new TrafficLight("Main Street");
  light.next();
  assertEquals(light.getColour(), "red-amber");
});

Deno.test("two lights change independently", () => {
  const first = new TrafficLight("Main Street");
  const second = new TrafficLight("Station Road");
  first.next();
  assertEquals(second.getColour(), "red");
});

Deno.test("every colour stays on for a positive number of seconds", () => {
  for (const colour of LIGHT_COLOURS) {
    assertEquals(TrafficLight.SECONDS[colour] > 0, true);
  }
});

Deno.test("the light reports how long its current colour stays on", () => {
  const light = new TrafficLight("Main Street");
  assertEquals(light.secondsShowing(), TrafficLight.SECONDS.red);
});

// Which lamps are lit for each colour, in the order the light shows them. `lit` lists the lamps
// top to bottom: red, amber, green.
type Expected = { colour: LightColour; lit: boolean[] };

const EXPECTED: Expected[] = [
  { colour: "red", lit: [true, false, false] },
  { colour: "red-amber", lit: [true, true, false] },
  { colour: "green", lit: [false, false, true] },
  { colour: "amber", lit: [false, true, false] },
];

Deno.test("the right lamps are lit for every colour", () => {
  const light = new TrafficLight("Main Street");
  for (const row of EXPECTED) {
    assertEquals(light.getColour(), row.colour);
    assertEquals(LAMPS.map((lamp) => light.isLit(lamp)), row.lit);
    light.next();
  }
});
