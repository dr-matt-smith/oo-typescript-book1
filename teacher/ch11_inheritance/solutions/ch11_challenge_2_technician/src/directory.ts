// Turning plain data into Student and Lecturer objects, and choosing which people to show.

import { Lecturer } from "./Lecturer.ts";
import type { Person, Role } from "./Person.ts";
import { Student } from "./Student.ts";
import { Technician } from "./Technician.ts"; // CHALLENGE 2

/** The shape of people.json: two lists of plain objects. */
export type DirectoryData = {
  students: { name: string; email: string; studentId: string; course: string }[];
  lecturers: { name: string; email: string; department: string; office: string }[];
  technicians: { name: string; email: string; lab: string }[]; // CHALLENGE 2
};

/** Everybody, as objects. The result is a Person[], holding Students and Lecturers together. */
export const peopleFrom = (data: DirectoryData): Person[] => {
  const students = data.students.map((s) => new Student(s.name, s.email, s.studentId, s.course));
  const lecturers = data.lecturers.map((l) => new Lecturer(l.name, l.email, l.department, l.office));
  const technicians = data.technicians.map((t) => new Technician(t.name, t.email, t.lab)); // CHALLENGE 2
  return [...students, ...lecturers, ...technicians];
};

/** Only the people with this role. */
export const withRole = (people: Person[], role: Role): Person[] =>
  people.filter((person) => person.getRole() === role);

/** A copy, in alphabetical order of name. */
export const byName = (people: Person[]): Person[] =>
  people.toSorted((a, b) => a.getName().localeCompare(b.getName()));
