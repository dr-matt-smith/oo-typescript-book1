// Works out how many characters are left, out of a limit - like a box for a short post.

export const LIMIT = 140;

/** How many more characters can be typed (negative if the text is already too long). */
export function charactersLeft(text: string, limit: number): number {
  return limit - text.length;
}

/** The words to show under the box, e.g. "12 characters left", "1 character left", "3 too many". */
export function describeLeft(left: number): string {
  if (left < 0) {
    return `${-left} too many`;
  }
  if (left === 1) {
    return "1 character left";
  }
  return `${left} characters left`;
}
