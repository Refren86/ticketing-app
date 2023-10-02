import { ValidationError } from "express-validator";
import { TError } from "../types/global";

export class RequestValidationError extends Error {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError(): TError {
    return this.errors.map((error) => {
      if (error.type === "field") {
        return {
          message: error.msg,
          field: error.path,
        };
      }

      return {
        message: error.msg,
      };
    });
  }
}
