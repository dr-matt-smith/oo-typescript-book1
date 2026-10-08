// The conversions the converter knows. Each one is an object holding some text AND a function:
// in TypeScript a function is a value, so it can be stored in an object like a number or a string.

/** The type of a conversion function: it takes a number and gives back a number. */
export type ConvertFunction = (value: number) => number;

/** One conversion: its name, the two units, and the function that does it. */
export type Converter = {
  name: string;
  from: string;
  to: string;
  convert: ConvertFunction;
};

// The parameter types below - (celsius), (km) ... - are not written: TypeScript knows them from the
// Converter type, because convert must be a ConvertFunction.
export const CONVERTERS: Converter[] = [
  { name: "Celsius to Fahrenheit", from: "°C", to: "°F", convert: (celsius) => celsius * 9 / 5 + 32 },
  { name: "Kilometres to miles", from: "km", to: "miles", convert: (km) => km * 0.621371 },
  { name: "Kilograms to pounds", from: "kg", to: "lb", convert: (kg) => kg * 2.20462 },
  { name: "Metres to feet", from: "m", to: "ft", convert: (metres) => metres * 3.28084 },
];

/** The converter with this name, or undefined if there is none. */
export const findConverter = (name: string): Converter | undefined =>
  CONVERTERS.find((converter) => converter.name === name);

/** Applies any conversion function to every value. The function is passed in, like a listener. */
export const convertAll = (values: number[], convert: ConvertFunction): number[] => values.map(convert);

/** Rounds to two decimal places. */
export const roundTo2 = (value: number): number => Math.round(value * 100) / 100;

/** For example: "10 km = 6.21 miles". */
export const describeConversion = (value: number, converter: Converter): string =>
  `${value} ${converter.from} = ${roundTo2(converter.convert(value))} ${converter.to}`;
