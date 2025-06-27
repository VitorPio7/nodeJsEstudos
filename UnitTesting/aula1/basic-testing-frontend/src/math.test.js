import { test, expect } from "vitest";
import { add } from "./math.js";
/**podemos usar o "test" ou "it" */

test("should summarize all number values in an array", () => {
  /*dados que serao carregados */
  // Arrange
  const numbers = [1, 2, 3, 4, 5];
  // Act
  const expectedResult = numbers.reduce(
    (prevValue, curValue) => prevValue + curValue,
    0
  );
  const result = add(numbers);
  /*resultado esperado */
  // Assert
  expect(result).toBe(expectedResult);
});

test("should yield NaN if at least one invalid number is provided", () => {
  const inputs = ["invalid", 1];
  const result = add(inputs);
  expect(result).toBeNaN();
});

test("should yield a correct sum if an array of numeric string values is provided", () => {
  const numbers = ["1", "2"];
  const result = add(numbers);
  const expectedResult = numbers.reduce(
    (prevValue, curValue) => +prevValue + +curValue
  );
  expect(result).toBe(expectedResult);
});

test("should yield 0 if an empty array is provided ", () => {
  const number = [];
  const result = add(number);
  expect(result).toBe(0);
});
test("should throw an error if no values is passed into the function", () => {
  const resultFn = () => {
    add();
  };
  expect(resultFn).toThrow(/is not iterable/);
});
test("should throw an error if provided with multiple arguments instead of an array", () => {
  const num1 = 1;
  const num2 = 2;
  const resultFn = () => {
    add(num1, num2);
  };
  expect(resultFn).toThrow(/is not iterable/);
});
