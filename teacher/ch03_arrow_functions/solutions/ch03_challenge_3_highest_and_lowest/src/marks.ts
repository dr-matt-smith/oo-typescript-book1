// Working with a list of students' marks, using the array methods that take a function:
//   map      - make a new array with every element changed
//   filter   - make a new array with only the elements that pass a test
//   reduce   - combine every element into one value (e.g. a total)
//   find     - the first element that passes a test
//   toSorted - a sorted copy of the array
// Each is given an arrow function saying what to do with one element.

/** One student and their mark. `type` gives a name to a type, so it can be used again. */
export type Student = { name: string; mark: number };

export const PASS_MARK = 40;

/** A: 70+, B: 60-69, C: 50-59, D: 40-49, F: below 40. */
export const gradeFor = (mark: number): string => {
  if (mark >= 70) return "A";
  if (mark >= 60) return "B";
  if (mark >= 50) return "C";
  if (mark >= PASS_MARK) return "D";
  return "F";
};

/** Just the marks: [72, 38, 65, ...]. */
export const marksOf = (students: Student[]): number[] => students.map((student) => student.mark);

/** Only the students who passed. */
export const passed = (students: Student[]): Student[] => students.filter((student) => student.mark >= PASS_MARK);

/** The average of some marks - 0 if there are none. */
export const average = (marks: number[]): number => {
  if (marks.length === 0) {
    return 0;
  }
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  return total / marks.length;
};

/** The student with this name, or undefined if there is none. */
export const findStudent = (students: Student[], name: string): Student | undefined =>
  students.find((student) => student.name === name);

/** A copy, highest mark first. (toSorted leaves the original array as it was.) */
export const byMark = (students: Student[]): Student[] => students.toSorted((a, b) => b.mark - a.mark);

/** A copy, in alphabetical order of name. */
export const byName = (students: Student[]): Student[] => students.toSorted((a, b) => a.name.localeCompare(b.name));

/** The student with the highest mark, or undefined if there are no students. */
export const topStudent = (students: Student[]): Student | undefined => byMark(students)[0];

// CHALLENGE 3
/** The student with the lowest mark, or undefined if there are no students. */
export const bottomStudent = (students: Student[]): Student | undefined => byMark(students).at(-1);
