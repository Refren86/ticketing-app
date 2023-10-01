export class DatabaseConnectionError extends Error {
  reason = "Failed to connect to database";
  constructor() {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
