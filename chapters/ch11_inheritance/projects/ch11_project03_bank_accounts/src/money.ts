// Showing amounts of money, and rounding them to whole cents.

const CENTS_PER_EURO = 100;

/** 120 -> "€120.00", -70.5 -> "-€70.50". */
export const formatEuro = (amount: number): string => {
  const sign = amount < 0 ? "-" : "";
  return `${sign}€${Math.abs(amount).toFixed(2)}`;
};

/** Rounds to the nearest cent, so interest never leaves fractions of a cent behind. */
export const roundToCent = (amount: number): number => Math.round(amount * CENTS_PER_EURO) / CENTS_PER_EURO;
