// The shape of course.json: plain data, no classes. Only types, so this file vanishes completely
// when the TypeScript is turned into JavaScript.

export type StudentData = { id: string; name: string };

export type ModuleData = { code: string; title: string; credits: number; studentIds: string[] };

export type CourseData = { name: string; students: StudentData[]; modules: ModuleData[] };
