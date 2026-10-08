// Turning plain student data (from JSON) into Student objects.

import { Student, type StudentData } from "./Student.ts"; // CHALLENGE 6: StudentData moved to Student.ts

// CHALLENGE 6: the data already has the constructor's shape, so it is passed straight in.
/** One Student object for each piece of data. A missing course or year becomes the default. */
export const studentsFrom = (data: StudentData[]): Student[] => data.map((d) => new Student(d));
