// Turns the plain data of course.json into objects. Each student becomes ONE Student object, and
// every module they are on refers to that same object.

import { Course } from "../model/index.ts";
import type { CourseData } from "./course_data.ts";

export const buildCourse = (data: CourseData): Course => {
  const course = new Course(data.name);
  for (const student of data.students) {
    course.addStudent(student.id, student.name);
  }
  for (const module of data.modules) {
    course.addModule(module.code, module.title, module.credits);
    for (const id of module.studentIds) {
      course.enrol(module.code, id);
    }
  }
  return course;
};
