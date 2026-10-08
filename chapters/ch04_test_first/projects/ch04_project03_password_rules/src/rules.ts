// Password rules. Each rule is a small object: what it asks for, in words, and a function that
// says whether a password meets it. A checker (PasswordChecker.ts) is given a list of them.

/** One rule: a description for people, and a test for the computer. */
export type Rule = {
  description: string;
  isMetBy: (password: string) => boolean;
};

const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:'\",.<>/?\\|`~";

/** True if `text` contains at least one of the characters in `characters`. */
export const containsAny = (text: string, characters: string): boolean => {
  // A for ... of loop over a string visits its characters one at a time.
  for (const character of text) {
    if (characters.includes(character)) {
      return true;
    }
  }
  return false;
};

/**
 * A rule asking for at least `length` characters. A length below 1, or not a whole number, makes
 * no sense - it is a mistake in the program, not in the password - so it throws an error.
 */
export const minLength = (length: number): Rule => {
  if (!Number.isInteger(length) || length < 1) {
    throw new Error(`a minimum length must be a whole number of at least 1, not ${length}`);
  }
  return {
    description: `at least ${length} characters`,
    isMetBy: (password) => password.length >= length,
  };
};

export const HAS_DIGIT: Rule = {
  description: "a digit (0-9)",
  isMetBy: (password) => containsAny(password, DIGITS),
};

// If making the password lower case changes it, it must have had a capital letter in it.
export const HAS_UPPER_CASE: Rule = {
  description: "a capital letter",
  isMetBy: (password) => password.toLowerCase() !== password,
};

export const HAS_LOWER_CASE: Rule = {
  description: "a small letter",
  isMetBy: (password) => password.toUpperCase() !== password,
};

export const HAS_SYMBOL: Rule = {
  description: "a symbol such as ! or #",
  isMetBy: (password) => containsAny(password, SYMBOLS),
};

const STANDARD_LENGTH = 10;

/** The rules the page uses. */
export const STANDARD_RULES: Rule[] = [minLength(STANDARD_LENGTH), HAS_UPPER_CASE, HAS_LOWER_CASE, HAS_DIGIT, HAS_SYMBOL];
