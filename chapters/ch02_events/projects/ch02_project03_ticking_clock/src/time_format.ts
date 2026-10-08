// Formats a time as "hh:mm:ss", always with two digits each - "09:05:03", not "9:5:3".

/** A number as two digits: 7 becomes "07", 42 stays "42". */
export function twoDigits(value: number): string {
  // padStart adds "0"s to the front of the string until it is 2 characters long.
  return `${value}`.padStart(2, "0");
}

/** For example, formatTime(9, 5, 3) is "09:05:03". */
export function formatTime(hours: number, minutes: number, seconds: number): string {
  return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
}
