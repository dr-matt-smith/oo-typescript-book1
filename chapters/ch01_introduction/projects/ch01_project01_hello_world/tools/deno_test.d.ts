// The part of Deno that the tests use - Deno.test and t.step - described for the TypeScript compiler (tsc),
// which type checks the project when Node is used. (Deno knows all about itself, and never reads this file.)
// You never need to edit this file.

declare namespace Deno {
  /** What a test is given: t.step(name, fn) runs one named step inside it. */
  interface TestContext {
    name: string;
    step(name: string, fn: (t: TestContext) => void | Promise<void>): Promise<boolean>;
  }

  interface TestDefinition {
    name: string;
    fn: (t: TestContext) => void | Promise<void>;
    ignore?: boolean;
  }

  /** Declares a test: a name (a sentence saying what should be true) and the code that checks it. */
  function test(name: string, fn: (t: TestContext) => void | Promise<void>): void;
  function test(definition: TestDefinition): void;
}
