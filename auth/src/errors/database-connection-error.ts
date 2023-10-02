import { TError } from "../types/global";

export class DatabaseConnectionError extends Error {
  reason = "Failed to connect to database";
  statusCode = 500;

  constructor() {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError(): TError {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
