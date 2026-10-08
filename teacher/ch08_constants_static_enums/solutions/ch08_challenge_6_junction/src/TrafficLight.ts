// One traffic light. It shows a colour, and next() moves it on to the next one.
// It uses all three kinds of "never changes" value: see the comments on each.

import { type LightColour, nextColour } from "./light_colour.ts";

/** The three lamps in the light's housing, top to bottom. */
export type Lamp = "red" | "amber" | "green";

/** Every lamp, top to bottom. */
export const LAMPS: Lamp[] = ["red", "amber", "green"];

export class TrafficLight {
  // static readonly: one value for the whole class, shared by every light, never reassigned.
  // Used from outside as TrafficLight.STARTING_COLOUR - no object needed.
  public static readonly STARTING_COLOUR: LightColour = "red";

  /** How many seconds each colour stays on. Record<LightColour, number> needs a key for every colour. */
  public static readonly SECONDS: Record<LightColour, number> = {
    "red": 5,
    "red-amber": 2,
    "green": 5,
    "amber": 3,
  };

  private colour: LightColour = TrafficLight.STARTING_COLOUR;

  // readonly (a parameter property): each light has its own name, set once in the constructor.
  constructor(public readonly name: string) {}

  /** The colour showing now. */
  public getColour(): LightColour {
    return this.colour;
  }

  /** Moves on to the next colour in the sequence. */
  public next(): void {
    this.colour = nextColour(this.colour);
  }

  // CHALLENGE 6
  /** Sets the light to a colour - used by a Junction, which decides what each of its lights shows. */
  public show(colour: LightColour): void {
    this.colour = colour;
  }

  /** How long the current colour stays on, in seconds. */
  public secondsShowing(): number {
    return TrafficLight.SECONDS[this.colour];
  }

  /** Whether a lamp is lit. Red and amber show together just before green. */
  public isLit(lamp: Lamp): boolean {
    switch (lamp) {
      case "red":
        return this.colour === "red" || this.colour === "red-amber";
      case "amber":
        return this.colour === "red-amber" || this.colour === "amber";
      case "green":
        return this.colour === "green";
    }
  }
}
