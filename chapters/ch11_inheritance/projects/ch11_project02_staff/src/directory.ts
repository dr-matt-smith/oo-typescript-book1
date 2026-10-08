// Turning plain data into Student and Lecturer objects, and choosing which people to show.

import { Lecturer } from "./Lecturer.ts";
import type { Person, Role } from "./Person.ts";
import { Student } from "./Student.ts";

/** The shape of people.json: two lists of plain objects. */
export type DirectoryData = {
  students: { name: string; email: string; studentId: string; course: string }[];
  lecturers: { name: string; email: string; department: string; office: string }[];
};

/** Everybody, as objects. The result is a Person[], holding Students and Lecturers together. */
export const peopleFrom = (data: DirectoryData): Person[] => {
  const students = data.students.map((s) => new Student(s.name, s.email, s.studentId, s.course));
  const lecturers = data.lecturers.map((l) => new Lecturer(l.name, l.email, l.department, l.office));
  return [...students, ...lecturers];
};

/** Only the people with this role. */
export const withRole = (people: Person[], role: Role): Person[] =>
  people.filter((person) => person.getRole() === role);

/** A copy, in alphabetical order of name. */
export const byName = (people: Person[]): Person[] =>
  people.toSorted((a, b) => a.getName().localeCompare(b.getName()));
