import { HttpError, ValidationError } from "./errors";
import { it, describe, expect, beforeEach } from "vitest";
let newHttpError;
beforeEach(() => {
  newHttpError = new HttpError(404, "Ocurred an error", "There is no data.");
});
beforeEach(() => {});

describe("httpError()", () => {
  it("should show this properties.", () => {
    expect(newHttpError).toHaveProperty("statusCode");
    expect(newHttpError).toHaveProperty("message");
    expect(newHttpError).toHaveProperty("data");
  });
});
describe("httpError()", () => {
  it("Should accetps this type of primitives.", () => {
    expect(newHttpError.data).toBeTypeOf("string");
    expect(newHttpError.message).toBeTypeOf("string");
    expect(newHttpError.statusCode).toBeTypeOf("number");
  });
});

describe("validationError()", () => {});
