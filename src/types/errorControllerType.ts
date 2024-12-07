import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/appErrorType";

export type ErrorController = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
