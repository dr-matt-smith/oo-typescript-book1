// A course HAS modules and students - and owns them. The course creates its own Module and Student
// objects (addModule, addStudent), and nothing else makes them: this is composition. A module only
// refers to students the course already has, and shares those objects (aggregation).

import { Module } from "./Module.ts";
import { Student } from "./Student.ts";

export class Course {
  private modules: Module[] = [];
  private students: Student[] = [];

  constructor(public readonly name: string) {}

  /** Makes a new module on this course, and gives it back so it can be used straight away. */
  public addModule(code: string, title: string, credits: number): Module {
    if (this.getModule(code) !== undefined) {
      throw new Error(`${this.name} already has a module ${code}`);
    }
    const module = new Module(code, title, credits);
    this.modules.push(module);
    return module;
  }

  /** Registers a new student on this course. */
  public addStudent(id: string, name: string): Student {
    if (this.getStudent(id) !== undefined) {
      throw new Error(`${this.name} already has a student ${id}`);
    }
    const student = new Student(id, name);
    this.students.push(student);
    return student;
  }

  /** The module with this code - the course's own object, not a copy - or undefined. */
  public getModule(code: string): Module | undefined {
    return this.modules.find((module) => module.code === code);
  }

  public getStudent(id: string): Student | undefined {
    return this.students.find((student) => student.id === id);
  }

  /** A copy of the array of modules. (The Module objects in it are the real ones.) */
  public getModules(): readonly Module[] {
    return [...this.modules];
  }

  /** A copy of the array of students, in the order they were added. */
  public getStudents(): readonly Student[] {
    return [...this.students];
  }

  /** Enrols one of this course's students on one of its modules. */
  public enrol(code: string, id: string): void {
    const module = this.getModule(code);
    const student = this.getStudent(id);
    if (module === undefined) {
      throw new Error(`${this.name} has no module ${code}`);
    }
    if (student === undefined) {
      throw new Error(`${this.name} has no student ${id}`);
    }
    module.enrol(student);
  }

  /** The course's students who are not on this module - the ones who could still enrol. */
  public studentsNotOn(module: Module): Student[] {
    return this.students.filter((student) => !module.isEnrolled(student));
  }

  // CHALLENGE 4
  /** The modules the student with this id is on, in course order. None for an unknown id. */
  public modulesFor(id: string): Module[] {
    const student = this.getStudent(id);
    if (student === undefined) {
      return [];
    }
    return this.modules.filter((module) => module.isEnrolled(student));
  }

  public totalCredits(): number {
    return this.modules.reduce((total, module) => total + module.credits, 0);
  }
}
