// Plain functions for working with a list of modules: making them from data, choosing, adding up.

import { Module } from "./Module.ts";

/** The shape of one module in modules.json. credits and semester may be missing. */
export type ModuleData = {
  code: string;
  title: string;
  credits?: number;
  semester?: number;
  lecturer?: string; // CHALLENGE 3
};

// CHALLENGE 3: the lecturer is passed on too
/** One Module object for each piece of data. Missing credits become the default. */
export const modulesFrom = (data: ModuleData[]): Module[] =>
  data.map((d) => new Module(d.code, d.title, d.credits, d.semester, d.lecturer));

/** The modules that run in a semester - including the year-long ones. */
export const modulesIn = (modules: Module[], semester: number): Module[] =>
  modules.filter((module) => module.runsIn(semester));

/** The credits of all the modules added together. */
export const totalCredits = (modules: Module[]): number =>
  modules.reduce((total, module) => total + module.getCredits(), 0);
