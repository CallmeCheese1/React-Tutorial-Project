import { describe, it, expect } from "vitest";
import { add } from "../src/script.ts";

describe("add function", () => {
  it("should return 3 when adding 1 and 2", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("should handle negative numbers correctly", () => {
    expect(add(-1, -5)).toBe(-6);
  });
});
