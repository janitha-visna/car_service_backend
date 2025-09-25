export type LogLevel = "error" | "warn" | "info";

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorStack?: any;
  public logError?: boolean;
  public logLevel: LogLevel;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean,
    errorStack?: any,
    logError?: boolean,
    logLevel: LogLevel = "warn" // default level
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logError;
    this.logLevel = logLevel;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class APIError extends AppError {
  constructor(
    name: string,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational,undefined,true,"error");
  }
}

export class BadRequestError extends AppError {
  constructor(description = "Bad Request", logError?: boolean) {
    super(
      "BAD_REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      undefined,
      logError,
      "warn"
    );
  }
}

export class NotFoundError extends AppError {
  constructor(description = "Resource not found", logError?: boolean) {
    super(
      "NOT_FOUND",
      STATUS_CODES.NOT_FOUND,
      description,
      true,
      undefined,
      logError,
      "warn"
    );
  }
}
