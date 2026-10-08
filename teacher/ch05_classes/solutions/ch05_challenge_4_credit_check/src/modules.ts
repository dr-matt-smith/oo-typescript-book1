// Plain functions for working with a list of modules: making them from data, choosing, adding up.

// CHALLENGE 4
/** A full-time year is worth this many credits. */
const FULL_YEAR_CREDITS = 60;

import { Module } from "./Module.ts";

/** The shape of one module in modules.json. credits and semester may be missing. */
export type ModuleData = {
  code: string;
  title: string;
  credits?: number;
  semester?: number;
};

/** One Module object for each piece of data. Missing credits become the default. */
export const modulesFrom = (data: ModuleData[]): Module[] =>
  data.map((d) => new Module(d.code, d.title, d.credits, d.semester));

/** The modules that run in a semester - including the year-long ones. */
export const modulesIn = (modules: Module[], semester: number): Module[] =>
  modules.filter((module) => module.runsIn(semester));

/** The credits of all the modules added together. */
export const totalCredits = (modules: Module[]): number =>
  modules.reduce((total, module) => total + module.getCredits(), 0);

// CHALLENGE 4
/** "60 credits - complete", "55 credits - 5 short" or "65 credits - 5 over". The target is 60 unless given. */
export const creditCheck = (modules: Module[], target: number = FULL_YEAR_CREDITS): string => {
  const total = totalCredits(modules);
  if (total < target) {
    return `${total} credits - ${target - total} short`;
  }
  if (total > target) {
    return `${total} credits - ${total - target} over`;
  }
  return `${total} credits - complete`;
};
