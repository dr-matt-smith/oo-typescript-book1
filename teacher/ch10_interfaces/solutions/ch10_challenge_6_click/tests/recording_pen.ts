// A fake Pen for tests: instead of drawing, it writes down every call it gets.
// It is a plain object literal - no class, no "implements" - and TypeScript accepts it as a Pen
// because it has the right shape.

import type { Pen } from "../src/Pen.ts";

/** A pen that records its calls, and the list it records them in. */
export const recordingPen = (): { pen: Pen; calls: string[] } => {
  const calls: string[] = [];
  const pen: Pen = {
    beginPath: () => {
      calls.push("beginPath");
    },
    arc: (x, y, radius, startAngle, endAngle) => {
      calls.push(`arc ${x} ${y} ${radius} ${startAngle} ${endAngle.toFixed(2)}`);
    },
    rect: (x, y, width, height) => {
      calls.push(`rect ${x} ${y} ${width} ${height}`);
    },
    moveTo: (x, y) => {
      calls.push(`moveTo ${x} ${y}`);
    },
    lineTo: (x, y) => {
      calls.push(`lineTo ${x} ${y}`);
    },
    closePath: () => {
      calls.push("closePath");
    },
    fill: () => {
      calls.push("fill");
    },
  };
  return { pen, calls };
};
