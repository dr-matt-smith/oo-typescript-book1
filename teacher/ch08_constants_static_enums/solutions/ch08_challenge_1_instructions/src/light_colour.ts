// The colours a UK traffic light can show, and the order it shows them in.
// LightColour is a string-literal union type: a variable of this type can only ever hold one of
// these four strings, and the compiler checks every assignment.

/** One of the four things a UK traffic light can show. */
export type LightColour = "red" | "red-amber" | "green" | "amber";

/** Every colour, in the order the light shows them - so the tests can check every one. */
export const LIGHT_COLOURS: LightColour[] = ["red", "red-amber", "green", "amber"];

/** The colour that comes after this one. A UK light goes red, red and amber, green, amber, red... */
export const nextColour = (colour: LightColour): LightColour => {
  // A switch over a union: the compiler knows the four possible values. Because the return type is
  // LightColour, leaving a case out is a compile error ("Function lacks ending return statement").
  switch (colour) {
    case "red":
      return "red-amber";
    case "red-amber":
      return "green";
    case "green":
      return "amber";
    case "amber":
      return "red";
  }
};

/** The words shown under the light. */
export const colourName = (colour: LightColour): string => {
  switch (colour) {
    case "red":
      return "Red";
    case "red-amber":
      return "Red and amber";
    case "green":
      return "Green";
    case "amber":
      return "Amber";
  }
};

// CHALLENGE 1
/** What a driver should do when the light shows this colour. */
export const instruction = (colour: LightColour): string => {
  switch (colour) {
    case "red":
      return "Stop";
    case "red-amber":
      return "Stop - get ready to go";
    case "green":
      return "Go if the way is clear";
    case "amber":
      return "Stop unless it is unsafe to do so";
  }
};
