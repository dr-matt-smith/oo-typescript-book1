// The model folder's front door. Other code imports from "./model/index.ts" and does not need to
// know which file each class lives in. Only what is listed here is meant to be used from outside.

export { Course } from "./Course.ts";
export { Module } from "./Module.ts";
export { Student } from "./Student.ts";
