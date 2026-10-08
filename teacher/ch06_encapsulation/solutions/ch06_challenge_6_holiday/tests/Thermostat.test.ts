// Tests for src/Thermostat.ts. `target` is read and written like a field, but the setter checks it.

import { assertEquals, assertThrows } from "@std/assert";
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

// CHALLENGE 6: holiday mode

/** A thermostat set to 21 °C, then put on holiday. */
const onHoliday = (): Thermostat => {
  const thermostat = new Thermostat(10);
  thermostat.target = 21;
  thermostat.startHoliday();
  return thermostat;
};

Deno.test("a new thermostat is not on holiday", () => {
  assertEquals(new Thermostat(18).isOnHoliday(), false);
});

Deno.test("on holiday, the target is 7 °C", () => {
  const thermostat = onHoliday();

  assertEquals(thermostat.isOnHoliday(), true);
  assertEquals(thermostat.target, 7);
});

Deno.test("on holiday, the heating uses the frost target", () => {
  const thermostat = onHoliday(); // the room is 10 °C

  assertEquals(thermostat.heating, false);

  thermostat.room = 6;
  assertEquals(thermostat.heating, true);
});

Deno.test("on holiday, every change to the target is refused", async (t) => {
  const thermostat = onHoliday();

  await t.step("setting the target", () => {
    assertThrows(() => {
      thermostat.target = 22;
    }, Error, "on holiday");
  });
  await t.step("up()", () => {
    assertThrows(() => thermostat.up(), Error, "on holiday");
  });
  await t.step("down()", () => {
    assertThrows(() => thermostat.down(), Error, "on holiday");
  });
  assertEquals(thermostat.target, 7);
});

Deno.test("after the holiday, the target goes back to what it was", () => {
  const thermostat = onHoliday();

  thermostat.endHoliday();

  assertEquals(thermostat.isOnHoliday(), false);
  assertEquals(thermostat.target, 21);
});

Deno.test("starting a holiday twice changes nothing: one end brings the target back", () => {
  const thermostat = onHoliday();

  thermostat.startHoliday();
  thermostat.endHoliday();

  assertEquals(thermostat.target, 21);
});

Deno.test("ending a holiday that never started changes nothing", () => {
  const thermostat = new Thermostat(18);

  thermostat.endHoliday();

  assertEquals(thermostat.target, 20);
});
