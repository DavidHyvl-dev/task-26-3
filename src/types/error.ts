// This file defines a custom error class `AppError` that extends the built-in `Error` class.
export type AppErrorCode =
  | "NETWORK_ERROR"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "VALIDATION_ERROR"
  | "UNKNOWN_ERROR";

// The `AppError` class includes additional properties such as `code`, `status`, `isRetryable`, and `originalError` to provide more context about the error.
// It also has a constructor that initializes these properties based on the provided parameters.
export class AppError extends Error {
  code: AppErrorCode;
  status?: number;
  isRetryable: boolean;
  originalError?: unknown;

  constructor(
    message: string,
    code: AppErrorCode = "UNKNOWN_ERROR",
    options?: {
      status?: number;
      isRetryable?: boolean;
      originalError?: unknown;
    },
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = options?.status;
    this.isRetryable = options?.isRetryable ?? false;
    this.originalError = options?.originalError;
  }
}
