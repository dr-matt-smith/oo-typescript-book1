// Lets Node run tests written for Deno. The tests in this book are written with Deno.test(...), and each
// one's steps with t.step(...); Node has no Deno.test, so when Node runs the tests this file (loaded
// first, with node --import) makes a small Deno.test that hands each test to Node's own test runner.
// Deno never loads this file. You never need to edit it.

import { test, type TestContext as NodeTestContext } from "node:test";

type TestFunction = (t: DenoTestContext) => void | Promise<void>;
interface DenoTestContext {
  name: string;
  step(name: string, fn: TestFunction): Promise<boolean>;
}
interface TestDefinition {
  name: string;
  fn: TestFunction;
  ignore?: boolean;
}

// A Deno test context made from Node's: t.step(name, fn) becomes a subtest.
function contextFor(t: NodeTestContext): DenoTestContext {
  return {
    name: t.name,
    step: async (name, fn) => {
      let passed = true;
      await t.test(name, (inner) => fn(contextFor(inner))).catch(() => (passed = false));
      return passed;
    },
  };
}

function denoTest(nameOrDefinition: string | TestDefinition, fn?: TestFunction): void {
  const definition = typeof nameOrDefinition === "string"
    ? { name: nameOrDefinition, fn: fn! }
    : nameOrDefinition;
  test(definition.name, { skip: definition.ignore ?? false }, (t) => definition.fn(contextFor(t)));
}

// noColor: @std/assert colours its diffs unless Deno.noColor is true; the report wants plain text.
Object.defineProperty(globalThis, "Deno", { value: { test: denoTest, noColor: true }, configurable: true });
