// CHALLENGE 4: formats a stopwatch time, in milliseconds, as minutes:seconds.tenths - "1:02.0".

const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;
const MS_PER_TENTH = 100;

/** For example, 7300 ms is "0:07.3", and 62000 ms is "1:02.0". */
export function formatElapsed(ms: number): string {
  const minutes = Math.floor(ms / MS_PER_MINUTE);
  const seconds = Math.floor(ms / MS_PER_SECOND) % 60;
  const tenths = Math.floor(ms / MS_PER_TENTH) % 10;
  return `${minutes}:${`${seconds}`.padStart(2, "0")}.${tenths}`;
}
