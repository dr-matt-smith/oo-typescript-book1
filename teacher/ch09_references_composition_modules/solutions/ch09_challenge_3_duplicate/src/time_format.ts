// Turns a number of seconds into minutes and seconds, the way music players show it.

const SECONDS_PER_MINUTE = 60;

/** 225 -> "3:45", 65 -> "1:05", 3600 -> "60:00". */
export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${`${seconds}`.padStart(2, "0")}`;
};
