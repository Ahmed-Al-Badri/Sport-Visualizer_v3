import { search_pattern } from "./../src/Class Specs/Class_sport";
import { test, expect } from "vitest";

test("Check data to be fasle when comparing Test with TEST", () => {
  expect(search_pattern("Test", "TEST")).toBe(false);
});

test("Expect the result to be true when searching est inside a word Called Test", () => {
  expect(search_pattern("Test", "est")).toBe(true);
});
