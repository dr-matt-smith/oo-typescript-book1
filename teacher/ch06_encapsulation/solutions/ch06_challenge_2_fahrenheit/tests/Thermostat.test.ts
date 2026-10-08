// Tests for src/Thermostat.ts. `target` is read and written like a field, but the setter checks it.

import { assertAlmostEquals, assertEquals, assertThrows } from "@std/assert"; // CHALLENGE 2: assertAlmostEquals
import { Thermostat } from "../src/Thermostat.ts";

Deno.test("a new thermostat aims for 20 °C", () => {
  assertEquals(new Thermostat(18).target, 20);
});

Deno.test("the target can be set to an allowed value", () => {
  const thermostat = new Thermostat(18);

  thermostat.target = 21.5;

  assertEquals(thermostat.target, 21.5);
});

Deno.test("the lowest and highest targets are allowed", () => {
  const thermostat = new Thermostat(18);

  thermostat.target = 5;
  assertEquals(thermostat.target, 5);

  thermostat.target = 30;
  assertEquals(thermostat.target, 30);
});

Deno.test("a target outside 5-30 °C is refused, and the old target is kept", async (t) => {
  const thermostat = new Thermostat(18);

  for (const celsius of [4.5, 30.5, -10, 100]) {
    await t.step(`${celsius} °C is refused`, () => {
      // Braces make it clear that the body is an assignment, run for what it does, not for a value.
      assertThrows(() => {
        thermostat.target = celsius;
      }, Error, "The target must be from 5 to 30 °C");
    });
  }
  assertEquals(thermostat.target, 20);
});

Deno.test("a target that is not a whole or half degree is refused", () => {
  const thermostat = new Thermostat(18);

  assertThrows(() => {
    thermostat.target = 21.3;
  }, Error, "whole or half degree");
});

Deno.test("NaN is refused as a target", () => {
  const thermostat = new Thermostat(18);

  assertThrows(() => {
    thermostat.target = NaN;
  });
});

Deno.test("up and down move the target by half a degree", () => {
  const thermostat = new Thermostat(18);

  thermostat.up();
  assertEquals(thermostat.target, 20.5);

  thermostat.down();
  thermostat.down();
  assertEquals(thermostat.target, 19.5);
});

Deno.test("up stops at 30 °C instead of going past it", () => {
  const thermostat = new Thermostat(18);
  thermostat.target = 30;

  thermostat.up();

  assertEquals(thermostat.target, 30);
});

Deno.test("down stops at 5 °C instead of going past it", () => {
  const thermostat = new Thermostat(18);
  thermostat.target = 5;

  thermostat.down();

  assertEquals(thermostat.target, 5);
});

Deno.test("the heating is on when the room is colder than the target", () => {
  assertEquals(new Thermostat(18).heating, true);
});

Deno.test("the heating is off when the room reaches the target", () => {
  assertEquals(new Thermostat(20).heating, false);
});

Deno.test("heating follows the room temperature as it changes", () => {
  const thermostat = new Thermostat(18);

  thermostat.room = 22;

  assertEquals(thermostat.heating, false);
});

// CHALLENGE 2: the target in Fahrenheit

Deno.test("20 °C is 68 °F", () => {
  assertEquals(new Thermostat(18).targetFahrenheit, 68);
});

Deno.test("targetFahrenheit follows the target after up()", () => {
  const thermostat = new Thermostat(18);

  thermostat.up();

  assertAlmostEquals(thermostat.targetFahrenheit, 68.9);
});

Deno.test("the lowest and highest targets in Fahrenheit", () => {
  const thermostat = new Thermostat(18);

  thermostat.target = 5;
  assertEquals(thermostat.targetFahrenheit, 41);

  thermostat.target = 30;
  assertEquals(thermostat.targetFahrenheit, 86);
});
