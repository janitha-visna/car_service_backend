import { NextFunction, Request, Response } from "express";
import { createLogger, transports, format, level } from "winston";
import { AppError } from "./app-errors";

// Setup Winston Logger
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

export class ErrorLogger {
  async logError(err: any) {
    // Respect the logError flag
    if (err instanceof AppError && err.logError === false) {
      return; // Skip logging
    }

    console.log("========= Start Error Logger =========");

    // Dynamically choose log level (default to "error" if not provided)
    const level = err instanceof AppError ? err.logLevel || "error" : "error";
    
    logger.log(level, {
      timestamp: new Date().toISOString(),
      name: err.name || "Error",
      message: err.message,
      //stack: err.stack,
      statusCode: err.statusCode || 500,
      logError: err.logError,
    });
    console.log("========= End Error Logger =========");
  }

  isTrustedError(error: any): boolean {
    return error instanceof AppError && error.isOperational;
  }
}

// Main Express error handler
export const ErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorLogger = new ErrorLogger();

  await errorLogger.logError(err); // Respect logError flag

  if (errorLogger.isTrustedError(err)) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Unknown/untrusted errors
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
