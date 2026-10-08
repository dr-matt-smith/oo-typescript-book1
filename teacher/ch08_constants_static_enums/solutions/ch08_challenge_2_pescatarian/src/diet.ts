// Diets and courses: each is a fixed list of allowed strings.
// The list is written once, as an array `as const`, and the union type is worked out from it -
// so the values exist at run time (to loop over, and to check JSON data against) and the type
// can never get out of step with them.

/** Every diet a dish can have, from strictest to least strict. */
export const DIETS = ["vegan", "vegetarian", "pescatarian", "meat"] as const; // CHALLENGE 2

/** "vegan" | "vegetarian" | "pescatarian" | "meat" - the type of one element of DIETS. */
export type Diet = (typeof DIETS)[number];

/** Every course, in the order they are eaten (and shown on the menu). */
export const COURSES = ["starter", "main", "dessert"] as const;

/** "starter" | "main" | "dessert". */
export type Course = (typeof COURSES)[number];

/** Turns a string (from a JSON file, say) into a Diet - or throws if it is not one. */
export const toDiet = (text: string): Diet => {
  // find gives back an element of DIETS, so its type is Diet | undefined - no cast needed.
  const diet = DIETS.find((value) => value === text);
  if (diet === undefined) {
    throw new Error(`"${text}" is not a diet - expected one of ${DIETS.join(", ")}`);
  }
  return diet;
};

/** Turns a string into a Course - or throws if it is not one. */
export const toCourse = (text: string): Course => {
  const course = COURSES.find((value) => value === text);
  if (course === undefined) {
    throw new Error(`"${text}" is not a course - expected one of ${COURSES.join(", ")}`);
  }
  return course;
};

/** The label shown next to a dish. */
export const dietLabel = (diet: Diet): string => {
  switch (diet) {
    case "vegan":
      return "Vegan";
    case "vegetarian":
      return "Vegetarian";
    case "pescatarian": // CHALLENGE 2
      return "Pescatarian";
    case "meat":
      return "Contains meat";
  }
};

/** Whether a dish with diet `dish` suits someone who eats `eater`. Vegan dishes suit vegetarians too. */
export const suits = (dish: Diet, eater: Diet): boolean => {
  switch (eater) {
    case "vegan":
      return dish === "vegan";
    case "vegetarian":
      // CHALLENGE 2: was `dish !== "meat"`, which compiled - and would have served fish to vegetarians.
      return dish === "vegan" || dish === "vegetarian";
    case "pescatarian": // CHALLENGE 2
      return dish !== "meat";
    case "meat":
      return true;
  }
};
