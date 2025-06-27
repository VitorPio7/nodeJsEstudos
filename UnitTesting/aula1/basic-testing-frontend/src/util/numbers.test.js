import { describe, test, expect } from "vitest";
import { cleanNumbers, transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  test("should transform a string number to a number of type number", () => {
    const input = "1";
    const result = transformToNumber(input);
    expect(result).toBe(1).toBeTypeOf("number");
  });
  test("should transform a string number to a number of type number", () => {
    const input = "1";
    const result = transformToNumber(input);
    expect(result).toBeTypeOf("number");
  });

  test("should yield NaN for non-transformable values", () => {
    const input = "invalid";
    const input2 = {};
    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);
    expect(result).toBeNaN();
    expect(result2).toBeNaN();
  });
});

describe("cleanNumbers()", () => {
  test("should return an array of number values if an array of string number values is provided", () => {
    const numberValues = ["1", "2"];
    const cleanedNumbers = cleanNumbers(numberValues);
    expect(cleanedNumbers[0]).toBeTypeOf("number");
    expect(cleanedNumbers).toBe([1, 2]);
  });
  test("should throw an error if an array with at least one empty string is provided", () => {
    const numberValues = ["", 1];
    const cleanFn = () => cleanNumbers(numberValues);
    expect(cleanFn).toThrow();
  });
});
