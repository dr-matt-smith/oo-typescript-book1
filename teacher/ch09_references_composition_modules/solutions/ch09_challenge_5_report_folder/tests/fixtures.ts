// Test data shared by the test files - as a FUNCTION, not a constant. Each call builds a brand new
// course, so a test that enrols or withdraws a student cannot change what any other test sees.

import { Course, type Module } from "../src/model/index.ts";

/** Two modules, three students; Ann is on Programming. A new course every time. */
export const makeCourse = (): Course => {
  const course = new Course("Test course");
  course.addStudent("S1", "Ann");
  course.addStudent("S2", "Bob");
  course.addStudent("S3", "Cat");
  course.addModule("MATH", "Maths", 5);
  course.addModule("PROG", "Programming", 10);
  course.enrol("PROG", "S1");
  return course;
};

/** The course's module with this code. Throws if there is none, so tests need no undefined checks. */
export const moduleOf = (course: Course, code: string): Module => {
  const module = course.getModule(code);
  if (module === undefined) {
    throw new Error(`The test course has no module ${code}`);
  }
  return module;
};
