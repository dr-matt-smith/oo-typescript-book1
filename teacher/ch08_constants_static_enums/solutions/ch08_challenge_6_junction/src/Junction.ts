// CHALLENGE 6
// A crossroads with two traffic lights: north-south and east-west. The junction steps through a fixed
// cycle of phases, and in every phase at least one light is red - the tests check every phase.

import { type LightColour } from "./light_colour.ts";
import { TrafficLight } from "./TrafficLight.ts";

/** Every phase, in order. as const, so the Phase union is worked out from the array. */
export const PHASES = ["ns-ready", "ns-go", "ns-stopping", "ew-ready", "ew-go", "ew-stopping"] as const;

/** One step of the junction's cycle. */
export type Phase = (typeof PHASES)[number];

/** What the two lights show in one phase. */
export type PhaseColours = { northSouth: LightColour; eastWest: LightColour };

export class Junction {
  /** What each light shows in each phase. A Record, so the compiler insists on every phase. */
  public static readonly COLOURS: Record<Phase, PhaseColours> = {
    "ns-ready": { northSouth: "red-amber", eastWest: "red" },
    "ns-go": { northSouth: "green", eastWest: "red" },
    "ns-stopping": { northSouth: "amber", eastWest: "red" },
    "ew-ready": { northSouth: "red", eastWest: "red-amber" },
    "ew-go": { northSouth: "red", eastWest: "green" },
    "ew-stopping": { northSouth: "red", eastWest: "amber" },
  };

  public readonly northSouth = new TrafficLight("North-south");
  public readonly eastWest = new TrafficLight("East-west");
  private phase: Phase = PHASES[0];

  constructor() {
    this.showPhase();
  }

  /** The phase the junction is in now. */
  public getPhase(): Phase {
    return this.phase;
  }

  /** Moves on to the next phase, going back to the first after the last. */
  public next(): void {
    const index = PHASES.indexOf(this.phase);
    this.phase = PHASES[(index + 1) % PHASES.length];
    this.showPhase();
  }

  /** Sets both lights to the colours for the current phase. */
  private showPhase(): void {
    const colours = Junction.COLOURS[this.phase];
    this.northSouth.show(colours.northSouth);
    this.eastWest.show(colours.eastWest);
  }
}
