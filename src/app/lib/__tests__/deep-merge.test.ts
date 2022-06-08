/**
 * @jest-environment node
 */
import { deepMerge } from "lib/deep-merge";

describe("deepMerge", () => {
  it("overrides nested fields and keeps defaults the source lacks", () => {
    const target = { a: 1, nested: { b: 2, c: 3 } };
    expect(deepMerge(target, { nested: { c: 30 } })).toEqual({
      a: 1,
      nested: { b: 2, c: 30 },
    });
  });

  it("does not mutate the target", () => {
    const target = { nested: { b: 2 } };
    deepMerge(target, { nested: { b: 5 } });
    expect(target.nested.b).toBe(2);
  });

  it("replaces arrays instead of merging them", () => {
    expect(deepMerge({ list: [1, 2, 3] }, { list: [9] })).toEqual({
      list: [9],
    });
  });

  it("ignores a non-object source", () => {
    expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 });
  });
});
