import AppError from "../src/errors/appError";

describe("AppError", () => {
  it("should create an error with a message and status code", () => {
    const error = new AppError("Test error", 400);
    expect(error.message).toBe("Test error");
    expect(error.statusCode).toBe(400);
    expect(error.status).toBe("fail");
    expect(error.isOperational).toBe(true);
  });

  it('should set status to "error" for 5xx status codes', () => {
    const error = new AppError("Server error", 500);
    expect(error.status).toBe("error");
  });
});
