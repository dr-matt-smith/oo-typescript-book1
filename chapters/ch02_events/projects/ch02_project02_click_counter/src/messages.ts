// Turns a number of clicks into words for the page. A plain function - not every piece of code
// needs to be in a class in TypeScript.

/** For example: 0 -> "No clicks yet", 1 -> "1 click", 5 -> "5 clicks" */
export function describeCount(count: number): string {
  if (count === 0) {
    return "No clicks yet";
  }
  if (count === 1) {
    return "1 click";
  }
  return `${count} clicks`;
}
