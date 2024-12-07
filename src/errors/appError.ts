import { AppError as IAppError } from "../types/appErrorType";

class AppError extends Error implements IAppError {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number;
  path?: string;
  value?: string;

  constructor(message: string, statusCode: number, code?: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    if (code) this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
