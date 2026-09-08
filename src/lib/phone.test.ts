import { describe, expect, it } from "vitest";

import { formatUsPhone, normalizeUsPhone } from "./phone";

describe("normalizeUsPhone", () => {
  it.each([
    ["3105550182", "+13105550182"],
    ["(310) 555-0182", "+13105550182"],
    ["1-310-555-0182", "+13105550182"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizeUsPhone(input)).toBe(expected);
  });

  it.each(["", "555-0182", "010-555-0182", "2-310-555-0182"])(
    "rejects %s",
    (input) => {
      expect(normalizeUsPhone(input)).toBeNull();
    },
  );
});

describe("formatUsPhone", () => {
  it("formats a valid number", () => {
    expect(formatUsPhone("3105550182")).toBe("(310) 555-0182");
  });
});
