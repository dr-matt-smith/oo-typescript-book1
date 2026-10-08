// Money is kept in whole cents. Decimals such as 0.1 cannot be stored exactly (Chapter 3), so
// adding euros as decimals could lose a cent here and there; whole numbers of cents never do.

const CENTS_PER_EURO = 100;

/** Euros (as typed by a person, e.g. 12.5) to whole cents (1250), rounded to the nearest cent. */
export const toCents = (euros: number): number => Math.round(euros * CENTS_PER_EURO);

/** Cents to a string for the page: 1250 gives "€12.50". */
// CHALLENGE 3: an overdrawn balance is shown as -€5.00, not €-5.00
export const formatEuro = (cents: number): string => {
  const sign = cents < 0 ? "-" : "";
  return `${sign}€${(Math.abs(cents) / CENTS_PER_EURO).toFixed(2)}`;
};
