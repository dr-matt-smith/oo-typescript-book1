// Something that can drift out of tune and be tuned again. Not every instrument can be tuned
// (try tuning a drum kit's cymbal), so this is a separate interface: a class can implement both.

export interface Tunable {
  readonly name: string;
  isInTune(): boolean;
  tune(): void;
}
