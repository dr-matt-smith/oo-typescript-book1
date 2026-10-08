// CHALLENGE 5
// The course's enrolments as CSV text (comma-separated values), ready to paste into a spreadsheet.
// Only reads the model, so the model classes are imported as types.

import type { Course } from "../model/index.ts";

const HEADER = "module,id,name";

/** One line per enrolment, module by module: "OOP2,C001,Aoife Byrne". */
export const courseToCsv = (course: Course): string => {
  const lines = [HEADER];
  for (const module of course.getModules()) {
    for (const student of module.getStudents()) {
      lines.push(`${module.code},${student.id},${student.name}`);
    }
  }
  return lines.join("\n");
};
