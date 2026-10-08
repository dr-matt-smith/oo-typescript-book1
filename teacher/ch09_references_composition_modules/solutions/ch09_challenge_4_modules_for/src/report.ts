// Text about a course, for the page. No DOM here, so all of it can be tested.
// It only reads the model, so it imports the classes as types only.

import type { Course, Module } from "./model/index.ts";

/** "BSc in Computing, Year 2 · 4 modules · 25 credits · 7 students". */
export const courseSummary = (course: Course): string =>
  `${course.name} · ${course.getModules().length} modules · ${course.totalCredits()} credits · ` +
  `${course.getStudents().length} students`;

/** "OOP2 Object-oriented Programming 2 (10 credits) · 4 students". */
export const moduleSummary = (module: Module): string => {
  const count = module.count();
  return `${module} · ${count} ${count === 1 ? "student" : "students"}`;
};

// CHALLENGE 4
/** "Ann is on: MATH, PROG" - or "Ann is not on any module". */
export const studentModules = (name: string, modules: Module[]): string =>
  modules.length === 0 ? `${name} is not on any module` : `${name} is on: ${modules.map((m) => m.code).join(", ")}`;
