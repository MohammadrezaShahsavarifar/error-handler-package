import { Request, Response, NextFunction } from "express";
import AppError from "../src/errors/appError";
import errorController from "../src/errors/errorController";

describe("Error Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { originalUrl: "/api/test" };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      render: jest.fn(),
    };
    next = jest.fn();
  });

  it("should handle CastError", () => {
    const error = new AppError("Invalid ID", 400);
    error.name = "CastError";
    error.path = "id";
    error.value = "123";

    errorController(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Invalid id: 123.",
    });
  });

  // Add more tests for other error types...
});
