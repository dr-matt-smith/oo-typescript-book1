// Converting and describing temperatures - small functions, each written as an arrow function.
//
// An arrow function is a function written as  (parameters) => result  - TypeScript's version of a
// Java lambda. Stored in a const, it can be exported and called like any other function.

/** Celsius to Fahrenheit. A one-line arrow function: the value after => is returned. */
export const toFahrenheit = (celsius: number): number => celsius * 9 / 5 + 32;

/** Fahrenheit to Celsius. */
export const toCelsius = (fahrenheit: number): number => (fahrenheit - 32) * 5 / 9;

/** Rounds to one decimal place: 97.88000000000001 becomes 97.9. */
export const roundToTenth = (value: number): number => Math.round(value * 10) / 10;

/** How a temperature in Celsius feels. An arrow function with a { block } body needs a return. */
export const describe = (celsius: number): string => {
  if (celsius < 0) {
    return "freezing";
  }
  if (celsius < 10) {
    return "cold";
  }
  if (celsius < 20) {
    return "mild";
  }
  if (celsius < 30) {
    return "warm";
  }
  return "hot";
};
