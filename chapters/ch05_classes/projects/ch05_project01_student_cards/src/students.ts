// Turning plain student data (from JSON) into Student objects.

import { Student } from "./Student.ts";

/** The shape of one student in students.json. course and nickname may be missing. */
export type StudentData = {
  id: number;
  firstName: string;
  surname: string;
  course?: string;
  nickname?: string;
};

/** One Student object for each piece of data. A missing course becomes the default. */
export const studentsFrom = (data: StudentData[]): Student[] =>
  data.map((d) => new Student(d.id, d.firstName, d.surname, d.course, d.nickname));
